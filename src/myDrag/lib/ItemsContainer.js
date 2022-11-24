import React from 'react';
import {View} from 'react-native';
import Container from './Container';
import DragItem from './DragItem';
class ItemsContainer extends Container {
  ref = React.createRef();
  onLayoutCallback = () => {
    if (this.props.onLayout) {
      this.props.onLayout(this.state.layout);
    }
  };
  render() {
    const {
      itemsContainerStyle,
      layout,
      dragging,
      itemKeyExtractor,
      onGrant,
      addedHeight,
      renderItem,
      onDragEnd,
      changed,
      onDrag,
      itemsContainerHeightFixe,
      draggedElementStyle,
      itemsInZoneStyle,
      items,
      itemsDisplay,
      numCollumns,
    } = this.props;
    const newItemsInZoneStyle = {};
    const newStyle = {};
    if (dragging) {
      newStyle.zIndex = 10000;
    }
    if (itemsContainerHeightFixe) {
      newStyle.width = layout?.width;
      newStyle.height = layout?.height;
    }
    if (itemsDisplay === 'row') {
      newStyle.flexDirection = 'row';
      newStyle.alignItems = 'center';
      newStyle.justifyContent = 'space-between';
      newStyle.flexWrap = 'wrap';
      newItemsInZoneStyle.width = `${
        100 / (numCollumns || 1) - (numCollumns && numCollumns > 0 ? 1 : 0)
      }%`;
    }
    return React.createElement(
      View,
      {
        onLayout: e => {
          this.onSetLayout(e);
        },
        style: [itemsContainerStyle, newStyle],
      },
      items.map(item => {
        const key = itemKeyExtractor(item);
        return React.createElement(DragItem, {
          key: key,
          onDrag: onDrag,
          onGrant: onGrant,
          changed: changed,
          draggedElementStyle: draggedElementStyle,
          addedHeight: addedHeight,
          itemsInZoneStyle: {...itemsInZoneStyle, ...newItemsInZoneStyle},
          onDragEnd: onDragEnd,
          item: item,
          renderItem: renderItem,
        });
      }),
    );
  }
}
export default ItemsContainer;
