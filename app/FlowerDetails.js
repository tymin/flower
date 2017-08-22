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
ToastAndroid,
  ScrollView,
  Image,
  View,
  Share,
  
} from 'react-native';
import Styles from './Styles';
import {FlowerDetailsAction} from './ToolbarAction';
import CheckOrder from './CheckOrder';
import DataStorage from'./DataStorage';

var dataStorge = new DataStorage();

var route;
export default class FolwerDetails extends Component {
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
      actions={FlowerDetailsAction}
           onActionSelected={this._onActionSelected.bind(this)}
           style={Styles.TOOLBAR}
         
          title='鲜花详情'>
          
          </ToolbarAndroid>
      <ScrollView>

        {this._renderScene()}
        </ScrollView>
        <View style={Styles.DIV}/>
        <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',backgroundColor:'white',paddingVertical:10,paddingHorizontal:15,alignItems:'center'}]}>
          <TouchableHighlight
                  underlayColor='#22000000'
                  style={{width:30,height:30}}

                  onPress={()=>this.setState({isLike:!this.state.isLike})}>
                  <Image style={{width:30,height:30}} source={this.state.isLike?{uri:'ic_like_select'}:{uri:'ic_like_nomal'}}/>
          </TouchableHighlight>

          <Image source={{uri:'ic_cart'}} style={{width:30,height:30}}/>
           <TouchableHighlight
                  underlayColor='#22000000'
                  
                  onPress={e=>this.addCar() } >
          <Text style={Styles.TITLE_TEXT17_BLACK}>加入购物车</Text>
          </TouchableHighlight>
           <TouchableHighlight
                  underlayColor='#22000000'
                  style={[{ backgroundColor:'red',paddingVertical: 4,paddingLeft:10,paddingRight:10,marginLeft:50},Styles.O_BUTTON]}
                  onPress={()=>this.props.navigator.push({
                  name:route.title,
                  page:<CheckOrder
                  style={{flex: 1}}
                  details={route}
                  navigator={this.props.navigator}/>,}) } >
          <View>
              <Text style={Styles.TITLE_TEXT17_WHITE}>立即购买</Text>
          </View>
            </TouchableHighlight>
        </View> 
      </View>
    );
  }
_onActionSelected()
{
	this._shareMessage('吾花先生祝您新年快乐'+route.title);
}
addCar()
{

  
  dataStorge.updateCarList(route,(error,result)=>{

    ToastAndroid.show('已加入购物车', ToastAndroid.LONG);
  });
}

 _shareMessage(mes) {
    Share.share({
      message: mes
    })
    .then(this._showResult)
    .catch((error) => {ToastAndroid.show(error.message,ToastAndroid.SHORT);});
  }
  _renderScene() {
  
    return (
      <View style={Styles.CONTAINER}>

          <View>
              <Image  style={Styles.FLOWERLIST_IMG}   source={{uri:route.icon}} >
                
              </Image>
           
                <View style={{ paddingHorizontal: 15,marginTop:15}}>
                  <Text style={Styles.TITLE_TEXT18_BLACK}>{route.title}</Text>
         
                  <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',}]}>
                    <View style={[Styles.HORIZONTAL,{justifyContent: 'flex-start',}]}>

                        <Text style={Styles.Comment_TEXT14_GRAY}>{route.address}</Text>
                        <Text style={[Styles.Comment_TEXT14_GRAY,{marginLeft:15,}]}>{route.component} </Text>
                     </View>
                    <Text style={Styles.PRICE_TEXT17_RED}>{route.price}</Text>
                  </View>
             
                </View>
          
            <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginTop:10}]}>
                <View style={{height:0.5,backgroundColor:'#bbbbbb',width:Dimensions.get('window').width/2-40,marginTop:10}}/>
                      <Text>更多介绍</Text>
                <View style={{height:0.5,backgroundColor:'#bbbbbb',width:Dimensions.get('window').width/2-40,marginTop:10}}/>
           </View>
           <View style={{width:Dimensions.get('window').width,alignItems:'center',marginTop:10}}>

           <Image style={[Styles.CIRCLEIMG,{width:50,height:50,marginTop:10}]} source={{uri:'http://a4.topitme.com/o061/1006153310c92d4768.jpg'}}/>
           <Text style={[Styles.TITLE_TEXT14_BLACK,{marginTop:10}]}>一米阳光鲜花店</Text>
           <View style={[Styles.HORIZONTAL,{ backgroundColor:'#ffffff',borderWidth:0.2,alignItems:'center',paddingVertical: 2,paddingHorizontal:10,borderRadius:10,marginTop:10}]}>
              <Image  style={{width:15,height:15,}} source={{uri:'ic_call'}}/>
              <Text style={Styles.TITLE_TEXT14_BLACK}>13856568888</Text>
          </View>
          <Text style={[Styles.RANGE_TEXT13_GRAY,{marginTop:10}]}>{this.props.details.address}泰然九路123号</Text>
           </View>
         
        </View>
    
      </View>
    );
  }
  renderShare()
  {

  }

 
}


