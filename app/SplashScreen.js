'use strict';
import React, {
  Component,
} from 'react';
import {
 Dimensions,
Animated,
  StyleSheet,
  ToolbarAndroid,
  Text,
  Image,
  View
} from 'react-native';





var WINDOW_WIDTH = Dimensions.get('window').width;



export default class App extends Component {
   constructor() {
    super(...arguments);
    this.state = {
      cover: null,
      bounceValue: new Animated.Value(1),
    };
  }

  componentDidMount() {
  
    this.state.bounceValue.setValue(1);
    Animated.timing(
      this.state.bounceValue,
      {
        toValue: 1.2,
        duration: 5000,
      }
    ).start();
  }
  render() {
    var img, text;
    if (this.state.cover) {
      img = {uri: this.state.cover.img};
      text = this.state.cover.text;
    } else {
      img ={uri:'splash_bg'};
      text = '吾花.吾爱';
    }

    return(
      <View style={styles.container}>
        <Animated.Image
          source={img}
          style={{
            flex: 1,
            width: WINDOW_WIDTH,
            height: 1,
            transform: [
              {scale: this.state.bounceValue},
            ]
          }} />
        <Text style={styles.text}>
            {text}
        </Text>
       
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  cover: {
    flex: 1,
    width: 200,
    height: 1,
  },
  logo: {
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 30,
    height: 54,
    backgroundColor: 'transparent',
  },
  text: {
    flex: 1,
    fontSize: 20,
    fontStyle:'italic',
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    top:40,
    left: 250,
    right: 0,
  
    backgroundColor: 'transparent',
  }
});


