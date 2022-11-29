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
  TouchableOpacity,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {elastic} from 'react-native/Libraries/Animated/Easing';
import Card from './Card';
//import { createStackNavigator } from 'react-navigation';
export default class HomeFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemColor: '#00BFA5',
    };
    const position = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        // console.log(gesture);
        position.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (e, gesture) => {
        console.log('onPanResponderRelease');
        console.log(gesture);
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
  renderSeparator = () => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };
  componentDidMount() {
    this.myComponent.measure((fx, fy, width, height, px, py) => {
      console.log('====Component width is: ' + width);
      console.log('====Component height is: ' + height);
      console.log('====X offset to frame: ' + fx);
      console.log('====Y offset to frame: ' + fy);
      console.log('====X offset to page: ' + px);
      console.log('====Y offset to page: ' + py);
    });
  }
  //handling onPress action
  getListViewItem = item => {
    Alert.alert(item.key);
  };

  cardView = item => {
    return (
      <View
        // {...this.panResponder.panHandlers}
        style={styles.gridbox}>
        <Text
          style={styles.gridText}
          onPress={this.getListViewItem.bind(this, item)}>
          {item.key}
        </Text>
      </View>
    );
  };

  myStyle() {
    return {
      ...this.position.getLayout(),
    };
  }
  //this.props.navigation.navigate('NextPage', {});
  nextPage = item => {
    this.props.navigation.navigate('NextPage', {});
  };

  colorFunc = item => {
    // let navigation = useNavigation();
    console.log('=====colorFunc==', item);
    this.setState({
      itemColor: item,
    });

  };
  renderItem = (item, index) => {
    // if (index === 0) {
    return (
      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: '50%'}}
        onPress={() => {
          console.log('==========click');
        }}>
        <Card
          title={item.key}
          item={item}
          itemid={item.id}
          itemIndex={index}
          nextPage={this.nextPage}
          itemColor={this.state.itemColor}
          colorFunc={this.colorFunc}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View
        ref={view => {
          this.myComponent = view;
        }}
        style={styles.container}>
        <FlatList
          // scrollEnabled={false}
          data={[
            {key: 'Android', id: 1},
            {key: 'iOS', id: 1},
            {key: 'Java', id: 1},
            {key: 'Swift', id: 10},
            {key: 'Php', id: 11},
            {key: 'Hadoop', id: 12},
            {key: 'Sap', id: 13},
            {key: 'Python', id: 14},
            {key: 'Ajax', id: 15},
            {key: 'C++', id: 16},
            {key: 'Ruby', id: 17},
            {key: 'Rails', id: 18},
            {key: '.Net', id: 19},
            {key: 'Perl', id: 21},
            {key: 'Sap', id: 31},
            {key: 'Python', id: 41},
            {key: 'Ajax', id: 51},
            {key: 'C++', id: 61},
            {key: 'Ruby', id: 71},
            {key: 'Rails', id: 81},
            {key: '.Net', id: 91},
            {key: 'Perl', id: 100},
          ]}
          numColumns={2}
          keyExtractor={(item, index) => String(item.id)}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
          }}
          renderItem={({item, index}) => this.renderItem(item, index)}
        />
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
