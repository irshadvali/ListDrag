import React, {Component} from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  PanResponder,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const {height, width} = Dimensions.get('window');
export default class Card extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    this.state = {
      bgcolor: '#00BFA5',
      zIndex: 0,
      dragId: -10001,
      isDrag: false,
      isFunctionCalled: false,
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // onMoveShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (e, gestureState) => {
        Animated.timing(this.position, {
          toValue: 0,
          duration: 1000,
        }).start();
        // return Math.abs(gestureState.dx) >= 1 || Math.abs(gestureState.dy) >= 1;
      },
      // onMoveShouldSetResponderCapture: () => true,
      // onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.setState({zIndex: 100});
        this.setState({
          bgcolor: '#d00000',
          dragId: this.props.itemid,
          isDrag: true,
        });
      },
      onPanResponderMove: (e, gesture) => {
        this.colorset(this.props.itemid, gesture.moveY);
        position.setValue({x: gesture.dx, y: gesture.dy});
        this.setState({
          isDrag: true,
        });
      },
      onPanResponderRelease: (e, gesture) => {
        // console.log('onPanResponderRelease', props);
        this.resetPosition(gesture);
      },
      onPanResponderReject: (e, gesture) => {
        console.log('onPanResponderReject');
        console.log(gesture);
      },
    });
    this.position = position;
  }
  //handling onPress action
  colorset(id, y) {
    const cc = this.state.isDrag ? 'rgba(52, 52, 52, 0.1)' : '#00BFA5';
    if (this.state.isDrag && !this.state.isFunctionCalled) {
      this.props?.colorFunc(cc, y);
      this.setState({
        isFunctionCalled: true,
      });
    }
  }

  resetPosition(gesture) {
    console.log(gesture.moveY, '======== gesture.moveY===', gesture.y0);
    // console.log('=============height, width=', height, width);
    // console.log('=============gesture.x0, gesture.y0=', gesture.x0, gesture.y0);
    // console.log('=============position=', this.position);
    this.props?.colorFunc('#00BFA5', gesture.moveX);
    this.setState({
      isFunctionCalled: false,
    });
    console.log('onPanResponderRelease', gesture);
    Animated.timing(this.position, {
      toValue: 0,
      duration: 1000,
    }).start();
    gesture.moveX !== 0 &&
      gesture.moveY !== 0 &&
      gesture.moveX < 110 &&
      gesture.moveY < 120 &&
      this.props?.nextPage();
    Animated.spring(this.position, {
      toValue: {x: 0, y: 0},
    }).start();
    this.setState({
      bgcolor: '#00BFA5',
    });
    this.setState({
      bgcolor: '#00BFA5',
      dragId: -10001,
      isDrag: false,
    });
  }

  myStyle() {
    return {
      ...this.position.getLayout(),
    };
  }
  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={styles.container}>
        {this.props.itemIndex === 0 ? (
          <View style={[styles.container]}>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={[styles.gridbox, {backgroundColor: this.props.itemColor}]}>
              <Text style={styles.gridText}>{this.props.title}</Text>
            </View>
          </View>
        ) : (
          <View>
            {this.state.dragId === this.props.itemid ? (
              // eslint-disable-next-line react-native/no-inline-styles
              <View style={[styles.container]}>
                <Animated.View
                  {...this.panResponder.panHandlers}
                  // eslint-disable-next-line no-undef
                  style={[
                    styles.gridbox,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      backgroundColor: 'rgba(52, 52, 52, 0.9)',
                    },
                    this.myStyle(),
                    // eslint-disable-next-line react-native/no-inline-styles
                  ]}>
                  <Text style={styles.gridText}>{this.props.title}</Text>
                </Animated.View>
              </View>
            ) : (
              <View style={styles.container}>
                <Animated.View
                  {...this.panResponder.panHandlers}
                  // eslint-disable-next-line no-undef
                  style={[
                    styles.gridbox,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      backgroundColor: this.props.itemColor,
                    },
                    this.myStyle(),
                  ]}>
                  <Text style={styles.gridText}>{this.props.title}</Text>
                </Animated.View>
              </View>
            )}
            {/* </TouchableOpacity> */}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    justifyContent: 'center',
    alignContent: 'center',
    // width: '100%',
  },
  gridbox: {
    flex: 1,
    height: 125,
    margin: 2,
    backgroundColor: '#00BFA5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gridText: {
    fontSize: 24,
    color: 'white',
  },
});
