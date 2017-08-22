import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
} from 'react-native';

import Labels from './Labels';
import List from './FlowerList';
import CARLIST from './FlowerCarList';
import FlowerDetails from './FlowerDetails';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
export default class FlowerListTabScreen extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      pagePosition: 0,
    };
  }

  render() {
    return (
      <View style={styles.viewPager}>
     <ScrollableTabView
      style={{ flex:1}}
      initialPage={0}
       tabBarUnderlineStyle={{backgroundColor:'#282828'}}
    tabBarBackgroundColor='white'
      tabBarActiveTextColor='#282828'
      tabBarInactiveTextColor='#383838'
      renderTabBar={() => <DefaultTabBar />}
    >
      <List  
 	 		onPressAD={this._onPressAD.bind(this)}
			onPressFlower={this._onPressFlower.bind(this)} 
			tabLabel='鲜花'/>
      <List  
 	 		onPressAD={this._onPressAD.bind(this)}
			onPressFlower={this._onPressFlower.bind(this)} 
			tabLabel='多肉'/>
      <List  
 	 		onPressAD={this._onPressAD.bind(this)}
			onPressFlower={this._onPressFlower.bind(this)} 
			tabLabel='盆栽'/>
      <List  
 	 		onPressAD={this._onPressAD.bind(this)}
			onPressFlower={this._onPressFlower.bind(this)} 
			tabLabel='水族世界'/>
   
     
    </ScrollableTabView>
        
      </View>
    )
  }
_onPressAD(ad)
{
  alert('广告'+ad.icon);

}
_onPressFlower(item)
{
     this.props.navigator.push({
      name:item.title,
      page:<FlowerDetails
            style={{flex: 1}}
            details={item}
            navigator={this.props.navigator}
         />,});

}
  _setPagePosition(e:Event) {
    const pagePosition = e.nativeEvent.position;
    this.setState({ pagePosition });
    // too bad ViewPagerAndroid doesn't support prop updates,
    // work around by forwarding changes using exposed API
    this.viewPager.setPage(pagePosition);
  }

}

const styles = StyleSheet.create({
  tabLayout: {
    flex: 1,
    width:300,
    backgroundColor: '#ffffff'
  },
  viewPager: {
  flex:1
  },
  content: {
    padding: 10,
  }
});
