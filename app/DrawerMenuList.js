import React, {
  Component,
} from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';
import Labels from './Labels';
import Styles from './Styles';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

export default class DrawerMenuList extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      dataSource: ds.cloneWithRows(this.props.routes),
    };
  }

  render() {
    return (
      <View style={Styles.CONTAINER}>
        <View style={styles.horizontal}>

            <Image style={styles.usericon} source={{uri:this.props.usericon}}/>
            <Text style={styles.rowTitleText}>{this.props.username}</Text>
        </View>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
            keyboardShouldPersistTaps='always'
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
        />
      </View>
    );
  }

  _renderRow(route:any, i:number) {
    return (
      <View key={i}>
        <TouchableHighlight
          onPress={() => this.props.onPressRow(route)}>
          <View style={styles.row} accessibilityLabel={Labels.Drawer.itemPrefix + route.title}>
            <Text style={styles.rowTitleText}>
              {route.title}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: '#eeeeee',
  },
  row: {
    backgroundColor: 'white',
    paddingLeft:40,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rowTitleText: {
    fontSize: 16,
    fontWeight: '200',
  },
  horizontal:{
    alignItems:'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    flexDirection: 'row',

     paddingVertical: 15,
  },
  usericon:{
    width:40,
    height:40,
    borderRadius:25,

  },
  separator: {
    height: 1,
    backgroundColor: '#99000000',
  },
});
