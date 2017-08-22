import React, {
  Component,
} from 'react';
import {
  Dimensions,
  DrawerLayoutAndroid,
  StyleSheet,
  ToolbarAndroid,
  Text,
  View
} from 'react-native';
import { ROUTES } from './Routes';
import {FlowerListAction} from './ToolbarAction';
import DrawerMenuList from './DrawerMenuList';
import FlowerListTabScreen from './FlowerListTabScreen';
import FlowerCarList from './FlowerCarList'
import Styles from './Styles';
import OrderList from './OrderList'
import SerchScreen from './SerchScreen';

export default class MainScreen extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      route: ROUTES[0]
    };
  }

  render() {
    return (
      <DrawerLayoutAndroid
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={200}
        keyboardDismissMode="on-drag"
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={this._renderNavigationView.bind(this)}>

        <ToolbarAndroid
          navIcon={{uri:'ic_drawer'}}
          onIconClicked={() => this.drawer.openDrawer()}
          actions={FlowerListAction}
           onActionSelected={this._onActionSelected.bind(this)}
          style={Styles.TOOLBAR}
 
          title="吾花先生">
          <Text style={{paddingTop:5}}>深圳</Text>
          </ToolbarAndroid>
        {this._renderScene()}
      </DrawerLayoutAndroid>
    );
  }

  _renderNavigationView() {
    return (
      <DrawerMenuList
        routes={ROUTES}
        onPressRow={this._onSelectMenuItem.bind(this)}
        username='吾花先生'
        usericon='http://a3.topitme.com/e/83/9b/119790961997f9b83el.jpg'
      />
    );
  }

  _renderScene() {
   const Component = this.state.route.component;
    return (
      <View style={styles.container}>
        <Component
navigator={this.props.navigator}

        />
      </View>
    );
  }
_onActionSelected(position)
{
  this.props.navigator.push({
      name:'serch',
      page:<SerchScreen
            style={{flex: 1}}
       
            navigator={this.props.navigator}
         />,});
}
  _onSelectMenuItem(route) {
    this.drawer.closeDrawer();
    this.setState({ route: route });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    backgroundColor: '#ffffff',
    height: 48,
  },
  navBarText: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 16,
  },
});
