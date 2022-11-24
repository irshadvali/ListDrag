import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  PanResponder,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Draggable from './Draggable';
var datat = [
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
    };
  }
  myFunction = item => {
    console.log('===aaaaa==', item);
    this.setState({
      newData: [item],
    });
  };
  renderItem = ({item}) => {
    console.log('=======', item);
    return (
      <View style={styles.item}>
        {/* <Text>{item.mtext}</Text> */}
        <TouchableOpacity>
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
  }
  render() {
    console.log('===this.state.newData==', this.state.newData);
    return (
      <View style={styles.mainContainer}>
        {/* <View style={styles.dropZone}>
          <Text style={styles.text}>Drop them here!</Text>
        </View> */}
        {/* <View style={styles.ballContainer} /> */}
        <View style={styles.dropZone}>
          <FlatList
            data={datat}
            horizontal
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{marginHorizontal: 10}}
          />
        </View>
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
