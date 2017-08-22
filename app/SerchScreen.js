import React, {
  Component,
} from 'react';
import {
  Dimensions,
  DrawerLayoutAndroid,
  StyleSheet,
  ToolbarAndroid,
  TouchableHighlight,
  ListView,
  Image,
TextInput,
AsyncStorage,
  Text,
  View
} from 'react-native';

import {FlowerListAction} from './ToolbarAction';
import DrawerMenuList from './DrawerMenuList';
import FlowerListTabScreen from './FlowerListTabScreen';
import FlowerCarList from './FlowerCarList'
import Styles from './Styles';
import OrderList from './OrderList'
import DataStorage from'./DataStorage'
var dataStorge = new DataStorage();
  var content;
export default class MainScreen extends Component {
  constructor() {

    super(...arguments);
    this.state = {
      fresh:false,
      dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  }
componentDidMount() {
   this.loadSeachHistory();
  }
  loadSeachHistory()
  {


 dataStorge.getSearchList((err, result) => {
 
  if(JSON.parse(result)===null)
  {
    
      this.setState({
           dataSource: this.state.dataSource.cloneWithRows(new Array([])),
          
        });

  }else{

      this.setState({
           dataSource: this.state.dataSource.cloneWithRows(JSON.parse(result)),
          
        });

      }

    });

  }
  render() {
    return (
   

       <View style={Styles.CONTAINER}>
 
 <View style={{height:48, flexDirection: 'row',backgroundColor:'white',justifyContent:'space-between',alignItems:'center'}}>
      <TouchableHighlight
            underlayColor='#00000000'
            style={{width:40,height:40,marginLeft:5,}} 
            onPress={()=>this.props.navigator.pop()}>
              <Image style={{width:40,height:40}} source={{uri:'ic_back'}}/>
          </TouchableHighlight>
         <View style={{borderWidth:1,borderRadius:20,height:35, flexDirection: 'row',backgroundColor:'white',justifyContent:'space-between',alignItems:'center'}}>
         
          <TextInput
            onChangeText={(text) => {
            content = text.replace(/ /g, '_');
            
            
          }}
          underlineColorAndroid={'transparent'}
          style={{ width:Dimensions.get('window').width-120,height:40,marginLeft:10}}
            placeholder='可搜索商品，商家，商圈，分类'
          />
          <TouchableHighlight
            underlayColor='#00000000'
            style={{width:20,height:20,marginLeft:10,marginRight:10}} 
            onPress={()=>this.onSeach(content)}>
              <Image style={{width:20,height:20}} source={{uri:'ic_seach'}}/>
          </TouchableHighlight>
          </View>
          </View>
        {this._renderScene()}
 </View>
    );
  }




  onSeach(value){
  
if(value===null)
{
  return;
}


  var  obj = {
        key: value,

    };
    dataStorge.updateSearchList(obj,(erro,result)=>{
      this.loadSeachHistory();
    });
 



     
  }

  _renderScene() {
  
    return (
      <View style={styles.container}>
     
        <Text style={[Styles.MARGIN_H,Styles.MARGIN_TOP]}>历史纪录</Text>
         <ListView
          style={{ backgroundColor: '#ffffff'}}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          keyboardShouldPersistTaps='always'
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          
       
        />
         <View style={[Styles.HORIZONTAL,{justifyContent: 'center',marginBottom:25}]}>
     <TouchableHighlight
                  underlayColor='#00000000'
                 
                  onPress={()=> {AsyncStorage.setItem('search1',''),this.loadSeachHistory()}} >
          <View  style={[{ backgroundColor:'white',paddingVertical: 8,marginTop:20,alignItems:'center',width:150,height:30},Styles.O_BUTTON]}>
              <Text style={Styles.TITLE_TEXT18_BLACK}>清除历史纪录</Text>
          </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _renderRow(route,i) {

    return (<Text style={[Styles.TITLE_TEXT17_BLACK,Styles.MARGIN_H]}> {route.key}</Text>);
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
