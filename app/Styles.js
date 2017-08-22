

import {
  Dimensions,
 
} from 'react-native';
module.exports = {
   CONTAINER: {
    flex: 1,
    backgroundColor:'white'
  },
   TITLE_TEXT18_BLACK: {
    color:'black',
    fontSize: 16,


  },
   TITLE_TEXT17_BLACK: {
    color:'black',
    fontSize: 15,


  },
    TITLE_TEXT16_BLACK: {
    color:'black',
    fontSize: 14,
   

  },
    TITLE_TEXT15_BLACK: {
    color:'black',
    fontSize: 13,


  },
  TITLE_TEXT14_BLACK: {
    color:'black',
    fontSize: 12,


  },
   TITLE_TEXT17_WHITE: {
    color:'white',
    fontSize: 16,
    


  },

  PRICE_TEXT17_RED: {
      color:'red',
      fontSize: 16,
     

  },
  
    Comment_TEXT14_GRAY: {
        color:'lightgray',
        fontSize: 13,
       
  },
   Comment_TEXT15_GRAY: {
      alignItems:'center',
      fontSize: 14,
    

  },
   RANGE_TEXT13_GRAY: {
      alignItems:'center',
      fontSize: 12,
    

  },
   RANGE_TEXT12_GRAY: {
      alignItems:'center',
      fontSize: 11,
    

  },
    Comment_TEXT14_RED: {
      color:'red',
        fontSize: 13,
        
  },
   HORIZONTAL :{
  flexDirection: 'row',

 
  },
    HORIZONTAL_MARGIN :{
  flexDirection: 'row',
justifyContent: 'space-between',
marginTop:5,
marginBottom:5,

marginLeft:15,
marginRight:15,
 
  },
   FLOWERLIST_IMG:{
      width:Dimensions.get('window').width,
      height:250,

  },
   FLOWERLIST_ADIMG:{
      width:Dimensions.get('window').width,
      height:200,

  },
   TOOLBAR: {
    backgroundColor: 'white',
    height: 54,
  },
  ROW: {
    backgroundColor: 'white',
  
    paddingVertical: 8,

    justifyContent: 'flex-start',
  },
  DIV: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  CARIMG:{width:50,
          height:50,
          marginTop:180,
          marginLeft:20, 
          borderRadius:25,
          backgroundColor:'#ffffff',
          justifyContent:'center',
          alignItems:'center',},
LIKE:{width:40,
          height:40,
         marginTop:15,
          marginLeft:Dimensions.get('window').width-40, 

      
          },
  CIRCLEIMG:{
     borderRadius:25,
  },
  WEIIMG:{
    width:70,
    height:70,
  },
  MARGIN_H:{
    marginLeft:15,
    marginRight:15,
  },
  MARGIN_TOP:
  {
    marginTop:15,

  },
  MARGIN_BOTTOM:
  {
    marginBottom:15,
  },
  O_BUTTON:{ 
              paddingVertical: 4,
              paddingHorizontal:5,
              borderRadius:5,
           }
  
};
