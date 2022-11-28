import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

export default class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
    };
  }

  componentWillMount() {
    console.log('===pan=', new Animated.ValueXY());
    console.log('===opa=', new Animated.Value(1));
    this._val = {x: 0, y: 0};
    this.state.pan.addListener(value => (this._val = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y: this._val.y,
        });
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null,
        {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),
      onPanResponderRelease: (e, gesture) => {
        console.log('====onPanResponderRelease=', e);
        if (this.isDropArea(gesture)) {
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 1000,
          }).start(() =>
            this.setState({
              showDraggable: false,
            }),
          );
        }
      },
      onPanResponderReject: evt => {
        console.info('=======onPanResponderReject', evt);
      },
    });
  }

  isDropArea(gesture) {
    console.log('=========1==', gesture);
    console.log('=========2==', this.state.showDraggable);
    this.forceUpdate();
    gesture.moveY > 640 && this.props.myFunction(this.props.item);
    gesture.moveY > 640 && console.log(this.props.item);
    return gesture.moveY > 640;
  }
  myViewHeight = () => {
    console.log('======in drag');
  };

  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{width: '20%', alignItems: 'center'}}>
        <TouchableOpacity onPress={this.myViewHeight}>
          {this.renderDraggable()}
        </TouchableOpacity>
      </View>
    );
  }

  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    if (this.state.showDraggable) {
      return (
        <View style={{position: 'absolute'}}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle, {opacity: this.state.opacity}]}>
            <Text>{this.props.title}</Text>
          </Animated.View>
        </View>
      );
    }
  }
}
let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ballContainer: {
    height: 200,
  },
  circle: {
    backgroundColor: 'skyblue',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  dropZone: {
    height: 200,
    backgroundColor: '#00334d',
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
