import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  PanResponder,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Draggable from './Draggable';
var data = [
  {id: 1, mtext: 'A'},
  {id: 2, mtext: 'B'},
  {id: 3, mtext: 'C'},
  {id: 4, mtext: 'D'},
  {id: 5, mtext: 'F'},
  {id: 6, mtext: 'G'},
  {id: 7, mtext: 'H'},
  {id: 8, mtext: 'I'},
  {id: 9, mtext: 'K'},
];
export default class HomeThree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newData: [],
      myStyle: {backgroundColor: '#d00000'},
      datat: data,
    };
  }
  myFunction = item => {
    console.log('===aaaaa==', item);
    this.forceUpdate();
    this.setState({
      datat: data,
    });
    this.setState({
      newData: [item],
    });
  };
  myViewHeight = () => {
    console.log('====lng==');
  };
  renderItem = ({item}) => {
    console.log('====item===', item);
    return (
      <View style={styles.item}>
        {/* <Text>{item.mtext}</Text> */}
        <TouchableOpacity onPress={this.myViewHeight}>
          <Draggable
            title={item.mtext}
            item={item}
            myFunction={this.myFunction}
          />
        </TouchableOpacity>
      </View>
    );
  };
  componentDidMount() {
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    this.setState({
      datat: data,
    });
  }
  // shouldComponentUpdate(prevProps, prevState) {
  //   // this.setState({
  //   //   datat: data,
  //   // });
  //   // if (prevState.value !== this.state.value) {
  //   //   return true;
  //   // } else {
  //   //   return false;
  //   // }
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   this.setState({
  //     datat: data,
  //   });
  //   // if (prevState.data !== this.state.data) {
  //   //   // Now fetch the new data here.
  //   // }
  // }
  render() {
    console.log('===this.state.newData==', this.state.newData);
    return (
      <View style={styles.mainContainer}>
        {/* <View style={styles.dropZone}>
          <Text style={styles.text}>Drop them here!</Text>
        </View> */}
        {/* <View style={styles.ballContainer} /> */}
        <View style={[styles.dropZone, this.state.myStyle]}>
          <FlatList
            data={this.state.datat}
            horizontal
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{marginHorizontal: 10}}
          />
        </View>
        {/* <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 100,
            width: '100%',
            backgroundColor: '#d00000',
          }}>
          <Text>second block</Text>
        </View> */}
        {/* </View> */}
        {/* <View style={styles.row}>
          <Draggable title="a" />
          <Draggable title="b" />
          <Draggable title="c" />
          <Draggable title="d" />
          <Draggable title="e" />
        </View> */}
        <View style={styles.footer}>
          {this.state?.newData.length > 0 && (
            <View style={styles.circle}>
              <Text>{this.state?.newData[0].mtext}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ballContainer: {
    height: 200,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  dropZone: {
    height: 100,
    backgroundColor: '#00334d',
    marginTop: 10,
    // zIndex: 100,
    // position: 'absolute',
    // top: 50,
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
  textt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  item: {
    width: 70,
  },
  footer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    width: '100%',
    backgroundColor: 'grey',
  },
  circle: {
    backgroundColor: 'skyblue',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
