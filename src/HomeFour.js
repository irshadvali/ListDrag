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
  Button,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {elastic} from 'react-native/Libraries/Animated/Easing';
import Card from './Card';
//import { createStackNavigator } from 'react-navigation';
import TextTicker from 'react-native-text-ticker';
var dataAA = [];
export default class HomeFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemColor: '#00BFA5',
      showZIndex: false,
      aaa: 0,
      myArraay: [],
      hashmap: new Map(),
    };
    // const position = new Animated.ValueXY();
    // this.panResponder = PanResponder.create({
    //   onStartShouldSetPanResponder: () => true,
    //   onPanResponderMove: (e, gesture) => {
    //     // console.log(gesture);
    //     position.setValue({x: gesture.dx, y: gesture.dy});
    //   },
    //   onPanResponderRelease: (e, gesture) => {
    //     console.log('onPanResponderRelease');
    //     console.log(gesture);
    //   },
    //   onPanResponderReject: (e, gesture) => {
    //     console.log('onPanResponderReject');
    //     console.log(gesture);
    //   },
    //   onPress: (e, gesture) => {
    //     console.log('onPress');
    //     console.log(gesture);
    //   },
    // });
    // this.position = position;
  }

  //handling onPress action
  // getListViewItem = item => {
  //   Alert.alert(item.key);
  // };

  // cardView = item => {
  //   return (
  //     <View
  //       // {...this.panResponder.panHandlers}
  //       style={styles.gridbox}>
  //       <Text
  //         style={styles.gridText}
  //         onPress={this.getListViewItem.bind(this, item)}>
  //         {item.key}
  //       </Text>
  //     </View>
  //   );
  // };

  // myStyle() {
  //   return {
  //     ...this.position.getLayout(),
  //   };
  // }
  nextPage = item => {
    this.props.navigation.navigate('NextPage', {});
  };

  colorFunc = (item, y) => {
    // y > 140 && this.flatListRef.scrollToIndex({animated: true, index: 0});

    this.setState({
      itemColor: item,
    });
    item === '#00BFA5'
      ? this.setState({
          showZIndex: false,
        })
      : this.setState({
          showZIndex: true,
          scrollToIndex: 0,
        });
  };

  changeIndex = () => {
    console.log('clicik', this.state.aaa);
    this.setState({
      aaa: 10,
    });
    // this.flatListRef.scrollToIndex({animated: true, index: 10});
  };
  renderItem = (item, index) => {
    return (
      <Card
        title={item.key}
        item={item}
        itemid={item.id}
        itemIndex={index}
        nextPage={this.nextPage}
        itemColor={this.state.itemColor}
        colorFunc={this.colorFunc}
        mzIndex={700}
      />
    );
  };

  checkPr = async () => {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Array of ids
    const responses = await Promise.all(
      ids.map(async id => {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
        ); // Send request for each id
        let resss = await res.json();
        let obj = {id: resss.id, name: resss.title};
        return obj;
      }),
    );
    console.log('===============responses=', responses);
  };

  render() {
    console.log(this.state.myArraay);
    return (
      <View
        ref={view => {
          this.myComponent = view;
        }}
        style={styles.container}>
        <Button
          title="click"
          onPress={() => {
            this.checkPr();
          }}
        />
        <View style={{width: 50}}>
          <TextTicker
            style={{fontSize: 12, color: 'red'}}
            duration={7000}
            loop
            bounce
            repeatSpacer={1}
            marqueeDelay={10}>
            Super long piece of text is long.
          </TextTicker>
        </View>
        {this.state.showZIndex && (
          <View style={styles.gridbox}>
            <Text style={styles.gridText}> Android</Text>
          </View>
        )}

        <View>
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
            // initialScrollIndex={this.state.aaa}
            // ref={ref => {
            //   this.flatListRef = ref;
            // }}
          />
        </View>
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
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 22,
    left: 22,
    zIndex: 5,
    width: 150,
  },

  gridText: {
    fontSize: 24,
    color: 'white',
  },
  scrolling1: {
    marginVertical: 10,
  },
  scrolling2: {
    backgroundColor: 'red',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  welcome: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    margin: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
