import React from 'react';
import {View} from 'react-native';
import Container from './Container';
import DragZOne from './DragZone';
class ZonesContainer extends Container {
  ref = React.createRef();
  render() {
    const {
      itemKeyExtractor,
      renderItem,
      zonesContainerStyle,
      onZoneLayoutChange,
      onDragEnd,
      zoneKeyExtractor,
      itemsInZoneStyle,
      onGrant,
      changed,
      onDrag,
      zones,
      renderZone,
      draggedElementStyle,
      addedHeight,
      itemsDisplay,
      numCollumns,
    } = this.props;
    return React.createElement(
      View,
      {style: zonesContainerStyle},
      zones.map(zone => {
        const key = zoneKeyExtractor(zone);
        return React.createElement(DragZOne, {
          onZoneLayoutChange: onZoneLayoutChange,
          zoneId: key,
          key: key,
          renderItem: renderItem,
          addedHeight: addedHeight,
          itemsDisplay: itemsDisplay,
          numCollumns: numCollumns,
          changed: changed,
          onGrant: onGrant,
          onDragEnd: onDragEnd,
          draggedElementStyle: draggedElementStyle,
          zone: zone,
          itemsInZoneStyle: itemsInZoneStyle,
          itemKeyExtractor: itemKeyExtractor,
          onDrag: onDrag,
          renderZone: renderZone,
        });
      }),
    );
  }
}
export default ZonesContainer;
