import {DeviceEventEmitter} from 'react-native';
import {SHOW_TOAST_MESSAGE} from '../constant/toast';

const toast = {
  info: options => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'info'});
  },
  success: options => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'success'});
  },
  danger: options => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'danger'});
  },
  custom: options => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'custom'});
  },
};

export default toast;
