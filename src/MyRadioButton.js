import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const RadioButton = ({onPress, selected, children}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        selected
          ? styles.radioButtonContainerSelected
          : styles.radioButtonContainer
      }>
      <View style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </View>
      <View>
        <Text style={styles.radioButtonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MyRadioButton = () => {
  const [isLiked, setIsLiked] = useState([
    {id: 1, value: true, name: 'Yes', selected: false},
    {id: 2, value: false, name: 'No', selected: false},
  ]);
  const onRadioBtnClick = item => {
    let updatedState = isLiked.map(isLikedItem =>
      isLikedItem.id === item.id
        ? {...isLikedItem, selected: true}
        : {...isLikedItem, selected: false},
    );
    setIsLiked(updatedState);
  };
  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Text style={styles.title}>Radio Buttons</Text>
      </View>
      <Text style={styles.text}>Do you like Radio Buttons?</Text>
      {isLiked.map(item => (
        <RadioButton
          onPress={() => onRadioBtnClick(item)}
          selected={item.selected}
          key={item.id}>
          {item.name}
        </RadioButton>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    marginHorizontal: 'auto',
    maxWidth: 500,
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginVertical: '1em',
    textAlign: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    height: 70,
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor: '#f0f0f0',
  },
  radioButtonContainerSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#f0f0f0',
    height: 70,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#98CFB6',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
  text: {
    lineHeight: 30,
    fontSize: 20,
    marginVertical: 5,
  },
});

export default MyRadioButton;
