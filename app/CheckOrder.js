import React, {
  Component,
} from 'react';
import {
  Dimensions,
  DrawerLayoutAndroid,
  StyleSheet,
  ToolbarAndroid,
  Text,
  TextInput,
  TouchableHighlight,
  ListView,
  ScrollView,
  Image,
  Button,
  Modal,
  View
} from 'react-native';
import Styles from './Styles';
import {FlowerDetailsAction} from './ToolbarAction';
import FlowerDetails from './FlowerDetails';
import ReceiveAdress from './ReceiveAdress';
import { FowerListData } from './FlowerListData';
import OrderList from './OrderList';
import util from 'util';
import AdressList from './AdressList';
import DataStorage from'./DataStorage';

var dataStorge = new DataStorage();
var desci;
var dataList;
var list=new Array;
export default class CheckOrder extends Component {
  constructor() {
    super(...arguments);
    desci=this.props.details;
    if( util.isArray(desci))
    {
        dataList=desci;
    }else{
      
     dataList=list.concat(desci);
    }
     
   
    this.state = {
      fresh:false,
       dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2}),
      payflag:'到付',
      modalVisible:false,
    };
  }
   componentWillMount() {
     
     
   this.setState({
           dataSource: this.state.dataSource.cloneWithRows(dataList),
          

        });
  }

  render() {
    return (
      <View style={Styles.CONTAINER}>
        <ToolbarAndroid
          navIcon={{uri: 'ic_back'}}
          onIconClicked={() => this.props.navigator.pop()}
     
           style={Styles.TOOLBAR}
         
          title='确认订单'>
          
          </ToolbarAndroid>
           <Modal
        style={{height:50,}}
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
        
          <View style={{ flex: 1,
    justifyContent: 'flex-end',
    padding: 5,}}>
            <Button
          onPress={()=>this.onButtonPress('到付')}
          title="到付"
          color="#778899"
          accessibilityLabel="Learn more about purple"
        />
          <Button
          onPress={()=>this.onButtonPress('支付宝')}
         title="支付宝"
          color="#778899"
          accessibilityLabel="Learn more about purple"
        />
            <Button
          onPress={()=>this.onButtonPress('微信')}
             title="微信"
          color="#778899"
          accessibilityLabel="Learn more about purple"
        />

          </View>
       
        </Modal>
      <ScrollView>

        {this._renderScene()}
        </ScrollView>
        
        
      </View>
    );
  }
onButtonPress(message)
{
	this.setState({payflag:message,modalVisible:false});
}
_renderItem(route,i)
{
  

  if(route.num===undefined)
  {
    route.num=1;
  }

 
   return (
    <View style={[Styles.HORIZONTAL,{alignItems:'center',marginLeft:15}]} >
          
           <TouchableHighlight
          underlayColor='#00000000'
          onPress={()=>this._onPressFlower(route)}>
          <View style={[Styles.HORIZONTAL,{alignItems:'center'}]} >
            <Image  style={Styles.WEIIMG}   source={{uri:route.icon}} />

          
          
          <View style={Styles.ROW} >
           <View style={{ marginLeft: 15,width:Dimensions.get('window').width-115,}}>
                <Text numberOfLines={2} style={Styles.TITLE_TEXT17_BLACK}>{route.title}</Text>
           <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginTop:10, alignItems:'center' }]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>数量</Text>
               
                       
              <Text style={[Styles.Comment_TEXT14_RED,{marginLeft:10,marginRight:10}]}>{route.num}</Text>
                      
                
            </View>
            <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between'}]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>价格</Text>
                <Text style={Styles.RANGE_TEXT14_GRAY}>{route.price}</Text>
            </View>
            </View>
          </View>

        </View>
          </TouchableHighlight>
      </View>  );
}

plus(route,i)
{
   route.num=route.num+1;
   
   this.setState({
          fresh:true,
            
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
          fresh:true,
     
        });
  
}
getTotal()
{

 
  
      let a=0;
    for(var i=0;i<dataList.length;i++)
    {
      if(dataList[i].num===undefined)
      {
        a=a+121;
      }else{
         a=a+dataList[i].num*121;
      }
      
     
     }
    


  return a;

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
  _onPressAddress(){
 this.props.navigator.push({
      name:'adressList',
      page:<AdressList
            style={{flex: 1}}
       		flag={true}
            navigator={this.props.navigator}
         />,});
  }

  _renderScene() {
  
  if(this.state.fresh)
  {
    alert(true);
  }
    return (
      <View style={Styles.CONTAINER}>

        
        <ListView
          style={{ backgroundColor: '#ffffff'}}
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          keyboardShouldPersistTaps='always'
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          
        
        />


        

       <View style={[Styles.DIV,{marginTop:10}]}/>
      
       
       
         <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginLeft:15,marginRight:15,marginTop:15,marginBottom:15,}]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>运送方式</Text>
                <Text style={Styles.TITLE_TEXT15_BLACK}>快递</Text>
        </View>
       
        
            <TouchableHighlight
          underlayColor='#00000000'
          onPress={()=>this._onPressAddress()}>
        <View>
        <View style={Styles.DIV}/>
        <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',alignItems:'center',marginLeft:15,marginRight:15,marginTop:5,marginBottom:5}]}>
          <View>
            <View style={[Styles.HORIZONTAL,{justifyContent: 'flex-start',marginRight:15,marginTop:15,}]}>
                <Text style={[Styles.RANGE_TEXT14_GRAY,{marginRight:15}]}>王某某</Text>
                <Text style={Styles.TITLE_TEXT15_BLACK}>13655889988</Text>
            </View>
            <Text style={Styles.RANGE_TEXT14_GRAY}>深圳市福田区车公庙泰然九路</Text>
        </View>
          <Image style={{width:20,height:20,}} source={{uri: 'ic_arrow'}}/>
               
        </View>
         <View style={Styles.DIV}/>
        </View>
        
         </TouchableHighlight>
              
            <TouchableHighlight
          underlayColor='#00000000'
          onPress={()=>this.pikerPay()}>
        <View>
        <View style={Styles.DIV}/>
        <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',alignItems:'center',marginLeft:15,marginRight:15,marginTop:15,marginBottom:15}]}>
       <Text style={Styles.RANGE_TEXT14_GRAY}>支付方式</Text>
           
            <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',}]}>
                <Text style={Styles.TITLE_TEXT15_BLACK}>{this.state.payflag}</Text>
                <Image style={{width:20,height:20,}} source={{uri: 'ic_arrow'}}/>
        </View>
   
         
               
        </View>
       
         <View style={Styles.DIV}/>
        </View>
        
         </TouchableHighlight>
        <TextInput style={[Styles.RANGE_TEXT14_GRAY,{paddingLeft:15,paddingRight:15}]} placeholder='留言' />
                
       
    
       <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginLeft:15,marginRight:15,marginTop:15,}]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>合计</Text>
                <Text style={Styles.RANGE_TEXT14_GRAY}>{this.getTotal()}</Text>
        </View> 
    
      <View style={[Styles.HORIZONTAL,{justifyContent: 'center',}]}>
     <TouchableHighlight
                  underlayColor='#00000000'
                 
                  onPress={()=>this.orderSuccess() } >
          <View  style={[{ backgroundColor:'red',paddingVertical: 8,marginTop:20,alignItems:'center',width:150,height:30},Styles.O_BUTTON]}>
              <Text style={Styles.TITLE_TEXT17_WHITE}>确认购买</Text>
          </View>
          </TouchableHighlight>
        </View>
       
      </View>
    );
  }
  
  pikerPay()
  {
  	//this.setState({modalVisible=true});
this.setState({modalVisible: true});
  	
  }
  orderSuccess()
  {
    

    dataStorge.updateOrderList(dataList,()=>{
      this.props.navigator.push({
                  name:'checkorder',
                  
                  page:<OrderList
                  style={{flex: 1}}
                  flag={true}
                  navigator={this.props.navigator}/>,});
    });

    
  }

 
}


