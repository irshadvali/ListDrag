import React, {Component} from 'react';
import {Animated, PanResponder, TouchableOpacity} from 'react-native';
class Draggable extends Component {
  state = {
    pan: new Animated.ValueXY(),
    dragging: false,
    pressed: false,
  };
  panResponder;
  onResponderMove = (e, gesture) => {
    this.state.pan.setValue({
      x: gesture.dx,
      y: gesture.dy + this.props.addedHeight,
    });
    this.props.onDrag(gesture, this.props.layout, () => {
      this.state.pan.setValue({
        x: gesture.dx,
        y: gesture.dy + this.props.addedHeight,
      });
    });
  };
  onDragEnd = (e, gesture) => {
    this.setState(old => {
      if (old.dragging) {
        this.props.onGrant(true);
        if (!this.props.onDragEnd(gesture)) {
          this.state.pan.setValue({x: 0, y: 0});
        }
        return {...old, dragging: false, pressed: false};
      } else {
        this.props.onGrant(false);
      }
      return old;
    });
  };
  onEnd = (e, gesture) => {
    this.onDragEnd(e, gesture);
  };
  UNSAFE_componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => this.state.pressed,
      onPanResponderGrant: () => {
        this.props.onGrant(true);
        this.setState({dragging: true});
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: this.onResponderMove,
      onPanResponderTerminate: this.onEnd,
      onPanResponderEnd: this.onEnd,
      onPanResponderRelease: this.onDragEnd,
      onMoveShouldSetPanResponderCapture: () => this.state.pressed,
      onPanResponderReject: this.onEnd,
      onMoveShouldSetPanResponder: () => this.state.pressed,
      onPanResponderTerminationRequest: () => this.state.pressed,
      onShouldBlockNativeResponder: () => this.state.pressed,
      onStartShouldSetPanResponderCapture: () => this.state.pressed,
    });
  }
  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    let {draggedElementStyle, style} = this.props;
    if (this.state.pressed) {
      style = {...style, ...draggedElementStyle};
    }
    if (this.state.dragging) {
      panStyle.zIndex = 1000;
      panStyle.elevation = 1000;
      style = {...style, ...(draggedElementStyle || {opacity: 0.6})};
    }
    return React.createElement(
      Animated.View,
      {...this.panResponder?.panHandlers, style: [panStyle, style]},
      React.createElement(
        TouchableOpacity,
        {
          delayLongPress: 400,
          onLongPress: () => this.setState({pressed: true}, () => {}),
        },
        this.props.children,
      ),
    );
  }
}
export default Draggable;
