import React from 'react';
import {Dimensions, Platform, View} from 'react-native';
import Button from '../src/ToastFile/Componet/Button';
import toast from '../src/ToastFile/helper/toast';

function ToastExample({navigation}) {
  return (
    <View style={{minHeight: Dimensions.get('screen').height - 75}}>
      <Button
        style={{}}
        title="SHOW SUCCESS"
        onPress={() => {
          toast.success({
            message: 'Ssuccess message',
            duration: 1000,
            type: 'danger',
          });
        }}
      />
      <Button
        title="SHOW ERROR"
        onPress={() => {
          toast.danger({message: 'Error message', duration: 1000});
        }}
      />
      <Button
        title="SHOW INFO"
        onPress={() => {
          toast.info({message: 'Info message', duration: 1000});
        }}
      />
      <Button
        title="SHOW CUSTOM"
        onPress={() => {
          toast.custom({message: 'Info message', duration: 1000});
        }}
      />
      {Platform.OS === 'android' && (
        <Button
          title="USE NATIVE TOAST"
          onPress={() => {
            toast.info({message: 'Am native lol', useNativeToast: true});
          }}
        />
      )}

      <Button title="TAKE 10 s" onPress={() => {}} />

      {/* <Button
        title="GO TO DETAIL"
        onPress={() => {
          navigation.navigate('Detail');
        }}
      /> */}
    </View>
  );
}

export default ToastExample;
