import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
	Image,
  Modall,
} from 'react-native';

import Styles from './Styles';
export default class PayPopupwindow extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      pagePosition: 0,
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
     
        
      </View>
    )
  }

renderItem()
{
	return(
		 <View style={[Styles.HORIZONTAL,{justifyContent: 'space-between',height:50}]}>
                
                <Image style={{width:20,height:20,}} source={{uri: 'ic_arrow'}}/>
                <Text style={Styles.TITLE_TEXT15_BLACK}>{this.state.payflag}</Text>
        </View>
	);
}

}

