import React from 'react';
import {ScrollView} from 'react-native';
import Container from './Container';
import ItemsContainer from './ItemsContainer';
import ZonesContainer from './ZonesContainer';
const PERCENT = 0.15;
class DragAndDrop extends Container {
  state = {
    items: this.props.items,
    zones: this.props.zones,
    dragging: false,
    layout: null,
    changed: null,
    contentSize: null,
    scrollY: 0,
    counter: 0,
    itemsContainerLayout: null,
    addedHeight: 0,
    mounted: false,
  };
  timeout = null;
  ref = React.createRef();
  UNSAFE_componentWillReceiveProps(nextProps) {
    const newState = {};
    if (nextProps.items !== this.props.items) {
      newState.items = nextProps.items;
    }
    if (nextProps.zones !== this.props.zones) {
      newState.zones = nextProps.zones;
      for (let zone of newState.zones) {
        const finded = this.state.zones.find(
          z =>
            nextProps.zoneKeyExtractor(zone) === nextProps.zoneKeyExtractor(z),
        );
        if (finded) {
          zone.layout = finded.layout;
        }
      }
    }
    if (newState.items || newState.zones) {
      this.setState(newState, () => {
        this.setState({changed: true}, () => {
          this.setState({changed: false});
        });
      });
    }
  }
  onDrag = (gesture, layoutElement, cb, zoneId) => {
    const cb2 = () => {
      setTimeout(() => {
        if (this.state.dragging) {
          cb();
          this.onDrag(gesture, layoutElement, cb, zoneId);
        }
      }, 400);
    };
    const HEIGHT =
      (this.state.layout?.height || 0) - (layoutElement?.height || 0) * 0.5;
    const {zoneKeyExtractor} = this.props;
    const x = gesture.moveX;
    const y =
      gesture.dy + (layoutElement?.y || 0) + (this.state.addedHeight || 0);
    const div = gesture.moveY / (this.state.layout?.height || 0);
    if (div < 1 - PERCENT && div > PERCENT) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = null;
    }
    if (!this.timeout) {
      this.timeout = setTimeout(() => {
        const div = gesture.moveY / (this.state.layout?.height || 0);
        let added = parseInt(String(HEIGHT * 0.5));
        if (div >= 1 - PERCENT) {
          let rest =
            (this.state.contentSize?.height || 0) -
            this.state.scrollY -
            (this.state.layout?.height || 0);
          if (parseInt(String(rest)) >= 0) {
            if (rest <= added) {
              this.setState(
                {addedHeight: (this.state.addedHeight || 0) + rest},
                cb2,
              );
              this.ref.current?.scrollTo({
                animated: true,
                y: this.state.scrollY + rest,
              });
            } else {
              this.setState(
                {addedHeight: (this.state.addedHeight || 0) + added},
                cb2,
              );
              this.ref.current?.scrollTo({
                animated: true,
                y: this.state.scrollY + added,
              });
            }
          }
        } else if (div <= PERCENT) {
          if (this.state.scrollY > 0) {
            let rest = this.state.scrollY - added;
            if (parseInt(String(rest)) <= 0) {
              this.setState(
                {
                  addedHeight:
                    (this.state.addedHeight || 0) - this.state.scrollY,
                },
                cb2,
              );
              this.ref.current?.scrollTo({animated: true, y: 0});
            } else {
              this.setState(
                {addedHeight: (this.state.addedHeight || 0) - added},
                cb2,
              );
              this.ref.current?.scrollTo({
                animated: true,
                y: Math.abs(this.state.scrollY - added),
              });
            }
          }
        }
        this.timeout = null;
      }, 800);
    }
    const zones = [...this.state.zones];
    for (let z of zones) {
      if (zoneKeyExtractor(z) === zoneId) {
        z.dragged = true;
      }
      const {layout} = z;
      const offsetTop = layout.y - (layoutElement?.height || 0) * 0.3;
      const offsetBottom =
        layout.y + layout.height + (layoutElement?.height || 0) * 0.3;
      const offsetLeft = layout.x - (layoutElement?.width || 0) * 0.3;
      const offsetRight =
        layout.x + layout.width + (layoutElement?.width || 0) * 0.3;
      if (
        offsetTop <= y &&
        offsetBottom >= y &&
        offsetLeft <= x &&
        offsetRight >= x
      ) {
        for (let z2 of zones) {
          if (z2 === z) {
            z.layout.hover = true;
          } else {
            z2.layout.hover = false;
          }
        }
      } else {
        zones[zones.indexOf(z)].layout.hover = false;
      }
    }
    this.setState({zones});
  };
  onDragEnd = item => {
    const oldZones = this.state.zones.map(i => ({...i}));
    const {maxItemsPerZone} = this.props;
    let ok = true;
    this.setState({addedHeight: 0});
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    const {itemKeyExtractor: ke, onMaj} = this.props;
    let zones = [...this.state.zones];
    let items = [...this.state.items];
    const hoverIndex = zones.findIndex(z => z.layout.hover);
    if (hoverIndex === -1) {
      let itemsIndex = items.findIndex(i => ke(i) === ke(item));
      if (itemsIndex === -1) {
        items.push(item);
        for (let z of zones) {
          z.items = z.items?.filter(i => ke(i) !== ke(item));
        }
      }
    } else {
      items = items.filter(i => ke(i) !== ke(item));
      const zone = zones[hoverIndex];
      for (let z of zones) {
        if (z === zone) {
          if (!zone.items) {
            zone.items = [item];
          } else {
            let itemIndex = zone?.items.findIndex(i => ke(i) === ke(item));
            if (itemIndex === -1) {
              if (maxItemsPerZone && maxItemsPerZone === zone.items.length) {
                ok = false;
              } else {
                zone.items.push(item);
              }
            }
          }
        } else {
          z.items = z.items?.filter(i => ke(i) !== ke(item));
        }
      }
    }
    if (ok) {
      for (let z of zones) {
        z.layout.hover = false;
        z.dragged = false;
      }
      this.setState({changed: true}, () => {
        this.setState({changed: false}, () => {
          this.setState({zones, items});
        });
      });
      onMaj(
        zones.map(z => {
          const {layout, dragged, ...rest} = z;
          return rest;
        }),
        items,
      );
    } else {
      for (let z of oldZones) {
        z.layout.hover = false;
        z.dragged = false;
      }
    }
    return false;
  };
  render() {
    const {
      itemKeyExtractor,
      zoneKeyExtractor,
      renderItem,
      renderZone,
      itemsContainerStyle,
      zonesContainerStyle,
      itemsContainerHeightFixe = true,
      draggedElementStyle,
      contentContainerStyle,
      itemsInZoneStyle,
      style,
      headerComponent,
      footerComponent,
      itemsDisplay,
      itemsInZoneDisplay,
      itemsInZoneNumCollumns,
      itemsNumCollumns,
    } = this.props;
    const {items, zones, dragging, itemsContainerLayout} = this.state;
    const otherStyle = {};
    if (this.state.dragging) {
      otherStyle.zIndex = 2;
      otherStyle.elevation = 2;
    }
    return React.createElement(
      ScrollView,
      {
        onContentSizeChange: (width, height) => {
          this.setState({contentSize: {width, height}});
          this.onSetLayout(null);
        },
        disableScrollViewPanResponder: true,
        scrollEnabled: !this.state.dragging,
        style: [{flex: 1, backgroundColor: '#CCC'}, style, otherStyle],
        onScroll: e => {
          let y = e.nativeEvent.contentOffset.y;
          this.setState({scrollY: y});
        },
        scrollEventThrottle: 400,
        contentContainerStyle: [contentContainerStyle, otherStyle],
        ref: this.ref,
        onLayout: e => this.onSetLayout(e),
      },
      headerComponent,
      React.createElement(ItemsContainer, {
        itemsContainerStyle: itemsContainerStyle,
        dragging: dragging,
        itemKeyExtractor: itemKeyExtractor,
        addedHeight: this.state.addedHeight || 0,
        onGrant: grant => this.setState({dragging: grant}),
        renderItem: renderItem,
        numCollumns: itemsNumCollumns,
        itemsDisplay: itemsDisplay,
        draggedElementStyle: draggedElementStyle,
        changed: this.state.changed,
        layout: itemsContainerLayout,
        onLayout: layout => this.setState({itemsContainerLayout: layout}),
        onDragEnd: this.onDragEnd,
        itemsContainerHeightFixe: itemsContainerHeightFixe,
        onDrag: this.onDrag,
        items: items,
      }),
      React.createElement(ZonesContainer, {
        renderZone: renderZone,
        zones: zones,
        zoneKeyExtractor: zoneKeyExtractor,
        changed: this.state.changed,
        addedHeight: this.state.addedHeight || 0,
        draggedElementStyle: draggedElementStyle,
        onGrant: grant => this.setState({dragging: grant}),
        itemsInZoneStyle: itemsInZoneStyle,
        numCollumns: itemsInZoneNumCollumns,
        itemsDisplay: itemsInZoneDisplay,
        onZoneLayoutChange: (key, layout) => {
          const zones = [...this.state.zones];
          const index = zones.findIndex(z => zoneKeyExtractor(z) === key);
          zones[index].layout = layout;
          this.setState({zones});
        },
        zonesContainerStyle: zonesContainerStyle,
        itemKeyExtractor: itemKeyExtractor,
        renderItem: renderItem,
        onDragEnd: this.onDragEnd,
        onDrag: this.onDrag,
      }),
      footerComponent,
    );
  }
}
export default DragAndDrop;
