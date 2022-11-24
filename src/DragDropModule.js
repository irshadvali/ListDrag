import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DragAndDrop from './myDrag';

export default function DragDropModule() {
  const [items, setItems] = React.useState([
    {id: 1, text: 'A'},
    {id: 2, text: 'B'},
    {id: 3, text: 'C'},
    {id: 4, text: 'D'},
    {id: 5, text: 'F'},
    {id: 6, text: 'G'},
    {id: 7, text: 'H'},
    {id: 8, text: 'I'},
    {id: 9, text: 'K'},
  ]);
  const [zones, setZones] = React.useState([
    {
      id: 1,
      text: 'Test zone 0',
      items: [{id: 10, text: 'L'}],
    },
  ]);

  return (
    <DragAndDrop
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      itemKeyExtractor={item => item.id}
      zoneKeyExtractor={zone => zone.id}
      zones={zones}
      items={items}
      onMaj={(zones, items) => {
        setItems(items);
        setZones(zones);
      }}
      itemsInZoneDisplay="row"
      itemsDisplay="row"
      itemsNumCollumns={4}
      itemsInZoneNumCollumns={3}
      renderItem={item => {
        return (
          <View style={styles.dragItemStyle}>
            <Text style={styles.dragItemTextStyle}>{item.text}</Text>
          </View>
        );
      }}
      renderZone={(zone, children, hover) => {
        return (
          <View style={{marginVertical: 10}}>
            <Text style={{marginBottom: 5}}>{zone.text}</Text>
            <View
              style={{
                ...styles.dragZoneStyle,
                minHeight: 150,
                backgroundColor: hover ? '#E2E2E2' : '#FFF',
              }}>
              {children}
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainerStyle: {
    padding: 20,
    paddingTop: 40,
  },
  dragItemStyle: {
    borderColor: '#F39200',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  dragItemTextStyle: {
    color: '#011F3B',
    fontWeight: '700',
    textAlign: 'center',
  },
  dragZoneStyle: {
    borderColor: '#F39200',
    borderWidth: 1,
    padding: 15,
  },
});
