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
} from 'react-native';

export default class HomeFour extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    // bgcolor: '#00BFA5';
    // this.state({
    //   bgcolor: '#00BFA5',
    // });
    this.state = {
      bgcolor: '#00BFA5',
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
       // console.log('========tt=', this.props.item);
        console.log('=======onPanResponderMove===', gesture);
        // eslint-disable-next-line no-undef
        this.colorset(this.props.itemid);
        position.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (e, gesture) => {
        // console.log('onPanResponderRelease', props);
        this.resetPosition(gesture);
      },
      onPanResponderReject: (e, gesture) => {
        console.log('onPanResponderReject');
        console.log(gesture);
      },
      onPress: (e, gesture) => {
        console.log('onPress');
        console.log(gesture);
      },
    });
    this.position = position;
  }

  //handling onPress action
  colorset(id) {
    console.log('=============', id);
    if (id === this.props.item.id) {
      this.setState({
        bgcolor: '#d00000',
      });
    } else {
      this.setState({
        bgcolor: '#00BFA5',
      });
    }
  }

  resetPosition(gesture) {
    console.log('=======resetPosition===', gesture);
    gesture.moveX < 100 &&
      gesture.moveY < 100 &&
      console.log('====call function');
    Animated.spring(this.position, {
      toValue: {x: 0, y: 0},
    }).start();
    this.setState({
      bgcolor: '#00BFA5',
    });
    //   this.position({
    //       x:0, y:0
    //   })
  }

  myStyle() {
    return {
      ...this.position.getLayout(),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          {...this.panResponder.panHandlers}
          // eslint-disable-next-line no-undef
          style={[
            styles.gridbox,
            {backgroundColor: this.state?.bgcolor},
            this.myStyle(),
          ]}>
          <Text style={styles.gridText}>{this.props.title}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
