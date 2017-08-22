import React, {
  Component,
} from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  ToolbarAndroid,
  PixelRatio,
     Dimensions,
  View,
  RefreshControl,
  Image,
} from 'react-native';
import Styles from './Styles';
import DataRepository from './DataRepository';
import { FowerListData } from './FlowerListData';
import FlowerDetails from './FlowerDetails';
import OrderDetails from './OrderDetails';
import DataStorage from'./DataStorage';
import ReceiveAdress from './ReceiveAdress';
import {AddAdressAction} from './ToolbarAction';
var dataStorge = new DataStorage();
var List=FowerListData;
var OldList;
const  repository = new DataRepository();
export default class AdressList extends Component {
  constructor() {
    super(...arguments);


    this.state = {
      dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2}),
      isRefreshing:true,
      flag:this.props.flag,
      
    };
  }
  componentWillMount() {
      
    this.loadSeachHistory();
  }

loadSeachHistory()
  {

 dataStorge.getAdressList((err, result) => {
 


  if(JSON.parse(result)===null)
  {
    
      this.setState({
           
          isRefreshing:false,
        });

  }else{
    OldList=JSON.parse(result);
      this.setState({
           dataSource: this.state.dataSource.cloneWithRows(OldList),
          isRefreshing:false,
        });

  }

    });

  }
  fetchData(key)
  {
    var totle;
    if(key===1)
    {

    }else{
        var temp =List;
    temp.sort();
    List= List.concat(temp);
    OldList=List;
    alert(List.length);
    }
  
     repository.fetchThemeStories(123, 456)
      .then((responseData) => {
        this.setState({
           dataSource: this.state.dataSource.cloneWithRows(List),
           isRefreshing:false,
           ordernum:0,

        });

      })
      .catch((error) => {this.setState({
           dataSource: this.state.dataSource.cloneWithRows(List),
           isRefreshing:false,
           ordernum:0,
           refreshList:false,
           selectAll:false,

        });})
      .done();

  }
  render() {
  
   if(this.state.flag)
   {
   	 return (
      <View style={Styles.CONTAINER}>
     
   <ToolbarAndroid
          navIcon={{uri: 'ic_back'}}
          onIconClicked={() => this.props.navigator.pop()}
          
         
          style={Styles.TOOLBAR}
        
          title="我的收获地址"/>

       
        <ListView
          style={{ backgroundColor: '#ffffff'}}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
            keyboardShouldPersistTaps='always'
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.loadSeachHistory.bind(this)}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressViewOffset={200,200}
            progressBackgroundColor="#ffff00"
          />
        }
        />
           <View style={[Styles.HORIZONTAL,{justifyContent: 'center',marginBottom:25}]}>
     <TouchableHighlight
                  underlayColor='#00000000'
                 
                  onPress={()=> this._onPressAddress()} >
          <View  style={[{ backgroundColor:'white',paddingVertical: 8,marginTop:20,alignItems:'center',width:150,height:30},Styles.O_BUTTON]}>
              <Text style={Styles.TITLE_TEXT18_BLACK}>添加收货地址</Text>
          </View>
          </TouchableHighlight>
        </View>
      
</View>
    

     
    );
   }else{
   	 return (
      <View style={Styles.CONTAINER}>
     
   
       
        <ListView
          style={{ backgroundColor: '#ffffff'}}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
            keyboardShouldPersistTaps='always'
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.loadSeachHistory.bind(this)}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressViewOffset={200,200}
            progressBackgroundColor="#ffff00"
          />
        }
        />
           <View style={[Styles.HORIZONTAL,{justifyContent: 'center',marginBottom:25}]}>
     <TouchableHighlight
                  underlayColor='#00000000'
                 
                  onPress={()=> this._onPressAddress()} >
          <View  style={[{ backgroundColor:'white',paddingVertical: 8,marginTop:20,alignItems:'center',width:150,height:30},Styles.O_BUTTON]}>
              <Text style={Styles.TITLE_TEXT18_BLACK}>添加收货地址</Text>
          </View>
          </TouchableHighlight>
        </View>
      
</View>
    

     
    );
   }
  }
 _onActionSelected()
 {
 this.props.navigator.push({
      name:'新增地址',
      page:<ReceiveAdress
            style={{flex: 1}}
           	
            navigator={this.props.navigator}
         />,});
 }

  _renderRow(route:any, i:number)
  {

      if(route.type===0)
      {
          return <View/>
      }else{
 return this._renderFlower(route,i);
      }
  }

  _onPressFlower(item){
 this.props.navigator.push({
      name:item.title,
      page:<OrderDetails
            style={{flex: 1}}
            details={item}
            navigator={this.props.navigator}
         />,});
  }

    


  _renderFlower(route:any, i:number) {
   
    return (
            <View>
              <TouchableHighlight
                underlayColor='#00000000'
                onPress={()=>this._onPressAddress(route)}>
              <View>
              <View style={Styles.DIV}/>
              <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',alignItems:'center',marginLeft:15,marginRight:15,marginTop:5,marginBottom:5}]}>
                <View>
                  <View style={[Styles.HORIZONTAL,{justifyContent: 'flex-start',marginRight:15,marginTop:15,}]}>
                      <Text style={[Styles.RANGE_TEXT14_GRAY,{marginRight:15}]}>{route.name}</Text>
                      <Text style={Styles.TITLE_TEXT15_BLACK}>{route.phonenum}</Text>
                  </View>
                  <Text style={Styles.RANGE_TEXT14_GRAY}>{route.address.replace('/@','')}</Text>
              </View>
                <Image style={{width:20,height:20,}} source={{uri: 'ic_arrow'}}/>
                     
              </View>
               <View style={Styles.DIV}/>
              </View>
               </TouchableHighlight>
             
            </View>
    );
  }
  _onPressAddress(route){
    this.props.navigator.push({
                  name:'ReceiveAdress',
                  page:<ReceiveAdress
                  style={{flex: 1}}
                  details={route}
                  navigator={this.props.navigator}/>,});

  }
}

const styles = StyleSheet.create({
 
  
  

  rowADText:{
  fontSize: 17,
    fontWeight: '500',
      justifyContent: 'center',

  },
  
});
