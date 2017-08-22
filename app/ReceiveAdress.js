import React, {
  Component,
} from 'react';
import {
  Dimensions,
  DrawerLayoutAndroid,
  StyleSheet,
  ToolbarAndroid,
  Text,
  TouchableHighlight,
TextInput,
  ScrollView,
  Image,
  View
} from 'react-native';
import Styles from './Styles';
import {EditAdressAction} from './ToolbarAction';
import DataStorage from'./DataStorage';

var dataStorge = new DataStorage();

var name,address_w,address_d,phonenum;

export default class ReceiveAdress extends Component {
  constructor() {
    super(...arguments);
   	let item=this.props.details;
  	if(item===undefined)
  	{
  		item={name:'',phonenum:'',address:'/@'};
  	}
  	name=item.name;
  	phonenum=item.phonenum;
  	
 let array= item.address.split('/@')
    address_w=array[0];
    address_d=array[1];
    this.state = {
      isLike:true,
      
    };
  }

  render() {
    return (
      <View style={Styles.CONTAINER}>
        <ToolbarAndroid
          navIcon={{uri:'ic_back'}}
          onIconClicked={() => this.props.navigator.pop()}
      actions={EditAdressAction}
         onActionSelected={this.onActionSelected.bind(this)}
           style={Styles.TOOLBAR}
         
          title='新增收货地址'>
          
          </ToolbarAndroid>
      <ScrollView>

        {this._renderScene()}
        </ScrollView>
        
       
      </View>
    );
  }
onActionSelected()
{
      let obj={
          name:name,
          address:address_w+'/@'+address_d,
          phonenum:phonenum,

      }

      dataStorge.updateAddressList(obj,(erro,result)=>{
        this.props.navigator.pop();
      })
}


  _renderScene() {
  
    return (
      <View style={Styles.CONTAINER}>

      <TextInput style={[Styles.MARGIN_H,Styles.MARGIN_TOP]} placeholder='收款人姓名' 
      value={name}
          onChangeText={(text) => {
            name = text.replace(/ /g, '_'); }}/>
       <TextInput style={[Styles.MARGIN_H,]} placeholder='手机号' maxLength={11} keyboardType='numeric'
               value={phonenum}
              onChangeText={(text) => {
            phonenum = text.replace(/ /g, '_'); }}/>
        <TextInput style={[Styles.MARGIN_H]} placeholder='省市区'
         value={address_w}
             onChangeText={(text) => {
            address_w = text.replace(/ /g, '_'); }}
        />
         <TextInput style={[Styles.MARGIN_H]} placeholder='详细地址' multiline={true} 
          value={address_d}
            onChangeText={(text) => {
            address_d = text.replace(/ /g, '_'); }}
         />


     
    
      </View>
    );
  }

 
}


