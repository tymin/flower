/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
   Navigator,
   BackAndroid,
   AsyncStorage,
  Text,
  View
} from 'react-native';

import MainScreen from './app/MainScreen';
import Splash from './app/SplashScreen';
var _navigator;

BackAndroid.addEventListener('hardwareBackPress', function() {
  
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {

    _navigator.pop();
    return true;
  }
  return false;
});
class RNFLOWER extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      splashed: true,
    };
  }
 
componentDidMount() {
    this.timer = setTimeout(
      () => { this.setState({splashed: false}); },
      3000
    );
  }
  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }


   render() {
      if(this.state.splashed)
        {
        	
          return (<View style={{flex:1,}}>
              <Splash/>
              </View>)
             
        }else{
          return (
                                              
                                               
       <Navigator
            configureScene={() => {
                  return Navigator.SceneConfigs.FadeAndroid;
                         }}
            renderScene={this._renderScene.bind(this)} 
                       
            initialRoute={{name: 'home',
                     }}
                       />
                                               
                                              
      );
    }
      
  }
  _renderScene(route, navigationOperations, onComponentRef) {


       
        _navigator=navigationOperations;
        if(route.name==='home')
        {

            
            return   <MainScreen  navigator={_navigator}  />;

           
                                
                                   
        }
        if(!navigationOperations)
        {
            console.error('页面导航请求没有传入nav.');
            return null;
        }
        
        
   if (!route.page) {
            console.error('页面导航请求没有传入page参数.');
            return null;
        }

        let page;

        if (typeof route.page === 'function') {
            page = route.page();
        } else {
            page = route.page;
        }


        let name = route.name;
        if (!name) {
            if (page) {
                name = page.type.name;
            }
        }
        console.log(`in render page ${name}`);

        return page;
  }                        
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
AppRegistry.registerComponent('RNFLOWER', () => RNFLOWER);
