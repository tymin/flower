import React, {
  Component,
} from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  PixelRatio,
     Dimensions,
  View,
  RefreshControl,
  ToolbarAndroid,
  Image,
} from 'react-native';
import Styles from './Styles';
import DataRepository from './DataRepository';
import { FowerListData } from './FlowerListData';
import FlowerDetails from './FlowerDetails';
import OrderDetails from './OrderDetails';
import DataStorage from'./DataStorage'
import {FlowerDetailsAction} from './ToolbarAction';
var dataStorge = new DataStorage();
var List=FowerListData;
var OldList;
const  repository = new DataRepository();
export default class OrderList extends Component {
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

 dataStorge.getOrderList((err, result) => {
 


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
          navIcon={{uri:'ic_back'}}
          onIconClicked={() => this.props.navigator.pop()}
    
         
           style={Styles.TOOLBAR}
         
          title='订单列表'>
          
          </ToolbarAndroid>
   
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
</View>
    

     
    );
     }else{
     	 return (
      <View style={Styles.CONTAINER}>
    
     	
   
        <ListView
          style={{ backgroundColor: '#ffffff'}}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          keyboardShouldPersistTaps={true}
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
</View>
    

     
    );
     }
   
  }
 

  _onRefresh()
  {
      this.fetchData(FowerListData[FowerListData.length-1].title);

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
_renderAD(route:any, i:number) {
    return (
      <View key={i}>
        <TouchableHighlight
          onPress={e=>this.props.onPressAD(route)}>
          <View style={styles.row} >
            <Image  style={Styles.FLOWERLIST_ADIMG}   source={{uri:route.icon}}>
    
            </Image>

            

          </View>
        </TouchableHighlight>
       
      </View>
    );
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
            <View >
      <View sytle={{marginLeft:15,marginVertal:15}}>
          <View style={[Styles.HORIZONTAL_MARGIN]}>
                <Text style={Styles.RANGE_TEXT12_GRAY}>订单号：2016051089</Text>
                <Text style={Styles.RANGE_TEXT12_GRAY}>订单时间：2016-5-10</Text>
            </View>
          <View style={[Styles.HORIZONTAL,{marginLeft:15,}]} >
          
           <TouchableHighlight
          underlayColor='#00000000'
          onPress={e=>this._onPressFlower(route)}>
          <View style={[Styles.HORIZONTAL,{marginTop:5}]} >
            <Image  style={Styles.WEIIMG}   source={{uri:route.icon}} />

          
          
          <View style={{height:70,marginBottom:10}} >
           <View style={{ marginLeft: 15,width:Dimensions.get('window').width-115,}}>
               
           <View style={[Styles.HORIZONTAL,{ justifyContent: 'space-between',marginBottom:16}]}>
            <Text numberOfLines={2} style={[Styles.TITLE_TEXT15_BLACK,{width:150}]}>{route.title}</Text>
            <View style={{justifyContent: 'space-between',alignItems:'flex-end'}}>
                <Text style={Styles.TITLE_TEXT14_BLACK}>{route.price}</Text>
                <Text style={[Styles.Comment_TEXT15_GRAY]}>*1</Text>
            </View>
             </View>
            <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between'}]}>
                <Text style={Styles.Comment_TEXT14_GRAY}>已付款</Text>
                 <Text style={Styles.TITLE_TEXT14_BLACK}>正在配送中</Text>
            </View>
            </View>
          </View>

        </View>
          </TouchableHighlight>
           </View>  

       <View style={Styles.DIV}/>
        
      </View>
        </View>
    );
  }
 
  _onPress(route){

alert(route.icon);

  }
}

const styles = StyleSheet.create({
 
  
  

  rowADText:{
  fontSize: 17,
    fontWeight: '500',
      justifyContent: 'center',

  },
  
});
