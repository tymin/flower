import React, {
  Component,
} from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  PixelRatio,
  ToastAndroid,
     Dimensions,
  View,
  RefreshControl,
  Image,
} from 'react-native';
import Styles from './Styles';
import DataRepository from './DataRepository';
import { FowerListData } from './FlowerListData';
import FlowerDetails from './FlowerDetails';
import CheckOrder from './CheckOrder';
import DataStorage from'./DataStorage'
var dataStorge = new DataStorage();
var List=FowerListData;
var OldList;
var selectList;
const  repository = new DataRepository();
export default class DrawerMenuList extends Component {
  constructor() {
    super(...arguments);
    selectList=new Array();

    this.state = {
      dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2}),
      isRefreshing:true,
      selectAll:false,
      
    };
  }
  componentWillMount() {
      
    this.loadSeachHistory(1);
  }
 loadSeachHistory()
  {

 dataStorge.getCarList((err, result) => {
 


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
  getTotal()
{

 
 	  let a=0;
 	  
    for(var i=0;i<selectList.length;i++)
    {
      if(selectList[i].num===undefined)
      {
        a=a+121;
      }else{
         a=a+selectList[i].num*121;
      }
      
     
     }
 


  return a;
 
  
    

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
    return (
      <View style={Styles.CONTAINER}>
     
  

       
        <ListView
          style={{ backgroundColor: '#ffffff'}}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
  			 keyboardShouldPersistTaps='always'
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          enalebEmptySections={false}
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

    

       <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',
        paddingVertical:10,paddingHorizontal:15,alignItems:'center'}]}>
      <TouchableHighlight
        underlayColor='#00000000'
           style={{width:30,height:30,marginLeft:15,marginRight:15}} 
           onPress={e=>this._onSelectAll()}>
             <Image style={{width:15,height:15,marginTop:5}} source={this.state.selectAll ? {uri: 'checkbox_on'}: {uri: 'checkbox_normal'}}/>
        </TouchableHighlight>
         
        <Text style={Styles.Comment_TEXT14_GRAY}>全选</Text>
         <View style={[Styles.HORIZONTAL,{justifyContent: 'flex-start',}]}>
         <Text style={Styles.TITLE_TEXT17_BLACK}>总计：</Text>
         <Text style={Styles.PRICE_TEXT17_RED}>{this.getTotal()}</Text>
          </View> 
           <TouchableHighlight
                  underlayColor='#00000000'
                  style={[{ backgroundColor:'red',paddingVertical: 4,marginLeft:50},Styles.O_BUTTON]}
                  onPress={()=>this._pushToCheckOrder() }>
          <View style={[{ backgroundColor:'red'},Styles.O_BUTTON]}>
              <Text style={Styles.TITLE_TEXT17_WHITE}>立即购买</Text>
          </View>
          </TouchableHighlight>
        </View> 
      </View>
    );
  }

_pushToCheckOrder()
{
  if(selectList.length>0)
  {
    this.props.navigator.push({
                  name:'checkorder',
                  page:<CheckOrder
                  style={{flex: 1}}
                  details={selectList}
                  navigator={this.props.navigator}/>,}) ;
  }else{
   
    ToastAndroid.show('请选择要购买的商品', ToastAndroid.LONG);
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
      page:<FlowerDetails
            style={{flex: 1}}
            details={item}
            navigator={this.props.navigator}
         />,});
  }

    


  _renderFlower(route:any, i:number) {
   
 
  if(route.num===undefined)
  {
    route.num=1;
  }
    return (
      
      <View key={i}>

          <View style={[Styles.HORIZONTAL,{alignItems:'center'}]} >
           <TouchableHighlight
           underlayColor='#00000000'
           style={{width:30,height:30,marginLeft:10,marginRight:10,}} 
          onPress={e=>this.onPressSelect(route)}>
          <Image  style={{width:15,height:15,marginLeft:5,marginTop:5}} source={route.check||this.state.selectAll ? {uri: 'checkbox_on'}:{uri: 'checkbox_normal'}}/>
           </TouchableHighlight>
           <TouchableHighlight
          underlayColor='#00000000'
          onPress={e=>this._onPressFlower(route)}>
          <View style={[Styles.HORIZONTAL,{alignItems:'center'}]} >
            <Image  style={Styles.WEIIMG}   source={{uri:route.icon}} />

          
          
          <View style={Styles.ROW} >
           <View style={{ marginLeft: 15,width:Dimensions.get('window').width-170,}}>
                <Text numberOfLines={2} style={Styles.TITLE_TEXT15_BLACK}>{route.title}</Text>
          <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginTop:10, alignItems:'center' }]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>数量</Text>
                <View style={[Styles.HORIZONTAL,{justifyContent: 'flex-start',marginTop:10, }]}>
                       <TouchableHighlight
                           underlayColor='#55000000'
                           
                      onPress={e=>this.down(route,i)}>
                           <Image style={{width:20,height:20}} source={{uri: 'ic_de'}}/>
                        </TouchableHighlight>
                      <Text style={[Styles.Comment_TEXT14_RED,{marginLeft:10,marginRight:10}]}>{route.num}</Text>
                      <TouchableHighlight
                          underlayColor='#55000000'
                           onPress={e=>this.plus(route,i)}>
                           <Image style={{width:20,height:20}} source={{uri: 'ic_add'}}/>
                        </TouchableHighlight>
                </View>
            </View>
            <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between'}]}>
                <Text style={Styles.RANGE_TEXT13_GRAY}>价格</Text>
                <Text style={Styles.Comment_TEXT14_RED}>{route.price}</Text>
            </View>
            </View>
          </View>

        </View>
          </TouchableHighlight>
           </View>  

       <View style={Styles.DIV}/>
        
      </View>
       
    );
  }
  onPressSelect(route){
    route.check=!route.check;
    this.setState({refreshList:true,});
    if(route.check)
    {
       selectList=selectList.concat(route);
   
     }else{
      for(var i=0;i<selectList.length;i++)
      {
        if(selectList[i].icon===route.icon)
        {
            selectList.splice(i,1);

        }
      }
       
      
     }
   

  }
  plus(route,i)
{
   route.num=route.num+1;
   
   this.setState({
          refreshList:true,
            
        });
  if(route.check)
  {
    
  }
 
  
 
 
}
_onSelectAll()
  {
    
    //List=OldList;
    //alert(OldList[0]);
   
  
    if(this.state.selectAll)
    {
    	   selectList=null;
    	 selectList=new Array();
      for(var i=0;i<OldList.length;i++)
      {
        OldList[i].check=false;
      }
    
    }else{
    	selectList=null;
    	 selectList=new Array();
   selectList= selectList.concat(OldList);
    }
    
   
  this.setState({selectAll:!this.state.selectAll,

      });
    
  }
down(route,i)
{
  route.num=route.num-1;
  if(route.num<0)
  {
    route.num=0;
  }
 
   this.setState({
          refreshList:true,
     
        });
  
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
