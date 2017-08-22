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
  Image,
} from 'react-native';
import Styles from './Styles';
import DataRepository from './DataRepository';
import { FowerListData } from './FlowerListData';
import DataStorage from'./DataStorage'
var dataStorge = new DataStorage();
var List=FowerListData;
const  repository = new DataRepository();
var num;
export default class DrawerMenuList extends Component {
  constructor() {
    super(...arguments);


    this.state = {
      dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2}),
      isRefreshing:true,
      
    };
  }
  componentWillMount() {
   dataStorge.getCarList((erro,result)=>{

        if(result==null)
        {
            num=0;
        }else{
          let x= JSON.parse(result);
       num=x.length;
        }
       
   });
    this.fetchData(1);
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
           ordernum:num,
        });

      })
      .catch((error) => {this.setState({
           dataSource: this.state.dataSource.cloneWithRows(List),
           isRefreshing:false,
           ordernum:num,
        });})
      .done();

  }
  render() {
    return (
      <View style={Styles.CONTAINER}>
   
        <ListView
          style={{ backgroundColor: '#eeeeee',}}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          keyboardShouldPersistTaps='always'
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
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

  _onRefresh()
  {
      this.fetchData(FowerListData[FowerListData.length-1].title);

  }

  _renderRow(route:any, i:number)
  {

      if(route.type===0)
      {
          return this._renderAD(route,i);
      }else{
 return this._renderFlower(route,i);
      }
  }
_renderAD(route:any, i:number) {
    return (
      <View key={i}>
        <TouchableHighlight
          onPress={e=>this.props.onPressAD(route)}>
       
            <Image  style={Styles.FLOWERLIST_ADIMG}   source={{uri:route.icon}}>
    
            </Image>

            

        
        </TouchableHighlight>
       
      </View>
    );
  }
  _renderFlower(route:any, i:number) {
    return (
      <View key={i}>
        <TouchableHighlight
        underlayColor='#00000000'
          onPress={e=>this.props.onPressFlower(route)}>
          <View style={Styles.ROW} >
            <Image  style={Styles.FLOWERLIST_IMG}   source={{uri:route.icon}} >

            
           </Image>
           <View style={{ paddingHorizontal: 15,marginTop:15}}>
                <Text style={Styles.TITLE_TEXT18_BLACK}>{route.title}</Text>
           <View style={[Styles.HORIZONTAL,{justifyContent: 'flex-start',marginTop:10}]}>
                <Text style={Styles.Comment_TEXT14_GRAY}>{route.address}</Text>
                <Text style={[Styles.Comment_TEXT14_GRAY,{marginLeft:15,}]}>{route.component} </Text>
            </View>
            <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',marginTop:10}]}>
                <Text style={Styles.RANGE_TEXT13_GRAY}>{route.range}</Text>
                <Text style={Styles.PRICE_TEXT17_RED}>{route.price}</Text>
            </View>
            </View>
          </View>
        </TouchableHighlight>
        
      </View>
    );
  }
  _onPress(route){

alert(route.icon);

  }
}


