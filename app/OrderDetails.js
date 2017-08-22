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

  ScrollView,
  Image,
  View
} from 'react-native';
import Styles from './Styles';
import {FlowerDetailsAction} from './ToolbarAction';
import FlowerDetails from './FlowerDetails';
var route;
export default class OrderDetails extends Component {
  constructor() {
    super(...arguments);
    route=this.props.details;
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
     
         
           style={Styles.TOOLBAR}
         
          title='订单详情'>
          
          </ToolbarAndroid>
      <ScrollView>

        {this._renderScene()}
        </ScrollView>
        
       
      </View>
    );
  }



  _renderScene() {
  
    return (
      <View style={Styles.CONTAINER}>

      

          <View style={[Styles.HORIZONTAL,{alignItems:'center',marginLeft:15}]} >
          
           <TouchableHighlight
          underlayColor='#00000000'
          onPress={e=>this._onPressFlower(route)}>
          <View style={[Styles.HORIZONTAL,{alignItems:'center'}]} >
            <Image  style={Styles.WEIIMG}   source={{uri:route.icon}} />

          
          
          <View style={Styles.ROW} >
           <View style={{ marginLeft: 15,width:Dimensions.get('window').width-115,}}>
                <Text numberOfLines={2} style={Styles.TITLE_TEXT17_BLACK}>{route.title}</Text>
           <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginTop:10,  }]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>数量</Text>
                <Text style={Styles.TITLE_TEXT14_BLACK}>1</Text>
            </View>
            <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between'}]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>价格</Text>
                <Text style={Styles.Comment_TEXT14_RED}>{route.price}</Text>
            </View>
            </View>
          </View>

        </View>
          </TouchableHighlight>
      </View>  

       <View style={[Styles.DIV,{marginTop:10}]}/>
      
        <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginLeft:15,marginRight:15,marginTop:15,}]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>订单编号</Text>
                <Text style={Styles.RANGE_TEXT14_GRAY}>2015456878</Text>
        </View>
        <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginLeft:15,marginRight:15,marginTop:15,}]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>订单时间</Text>
                <Text style={Styles.RANGE_TEXT14_GRAY}>2016-01-08 16:35</Text>
        </View>
        <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginLeft:15,marginRight:15,marginTop:15,}]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>订单状态</Text>
                <Text style={Styles.RANGE_TEXT14_GRAY}>已付款</Text>
        </View>
       <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginLeft:15,marginRight:15,marginTop:15,}]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>收货人</Text>
                <Text style={Styles.RANGE_TEXT14_GRAY}>爱花人</Text>
        </View>
         <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginLeft:15,marginRight:15,marginTop:15,}]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>联系方式</Text>
                <Text style={Styles.RANGE_TEXT14_GRAY}>13655889988</Text>
        </View>
        <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginLeft:15,marginRight:15,marginTop:15,}]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>收货地址</Text>
                <Text style={Styles.RANGE_TEXT14_GRAY}>深圳市福田区车公庙泰然九路</Text>
        </View>
       <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginLeft:15,marginRight:15,marginTop:15,}]}>
                <Text style={Styles.RANGE_TEXT14_GRAY}>取货状态</Text>
                <Text style={Styles.RANGE_TEXT14_GRAY}>已查收</Text>
        </View> 
    
     
    
      </View>
    );
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
 
}


