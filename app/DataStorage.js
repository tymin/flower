'use strict';

import React, {
  Component,
} from 'react';
import {
  AsyncStorage,
  
} from 'react-native';



function equalse( x, y ) { 
// If both x and y are null or undefined and exactly the same 
if ( x === y ) { 
 return true; 
} 
 
// If they are not strictly equal, they both need to be Objects 
if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) { 
 return false; 
} 
 
//They must have the exact same prototype chain,the closest we can do is
//test the constructor. 
if ( x.constructor !== y.constructor ) { 
 return false; 
} 
  
for ( var p in x ) { 
 //Inherited properties were tested using x.constructor === y.constructor
 if ( x.hasOwnProperty( p ) ) { 
 // Allows comparing x[ p ] and y[ p ] when set to undefined 
 if ( ! y.hasOwnProperty( p ) ) { 
  return false; 
 } 
 
 // If they have the same strict value or identity then they are equal 
 if ( x[ p ] === y[ p ] ) { 
  continue; 
 } 
 
 // Numbers, Strings, Functions, Booleans must be strictly equal 
 if ( typeof( x[ p ] ) !== "object" ) { 
  return false; 
 } 
 
 // Objects and Arrays must be tested recursively 
 if ( ! Object.equals( x[ p ], y[ p ] ) ) { 
  return false; 
 } 
 } 
} 
 
for ( p in y ) { 
 // allows x[ p ] to be set to undefined 
 if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) { 
 return false; 
 } 
} 
return true; 
}
function parseDateFromYYYYMMdd(str) {
  if (!str) return new Date();
  return new Date(str.slice(0, 4),str.slice(4, 6) - 1,str.slice(6, 8));
}

Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};

function DataStorage() { // Singleton pattern
  if (typeof DataStorage.instance === 'object') {
    return DataStorage.instance;
  }

  DataStorage.instance = this ;
}
//添加。不会添加重复的，但是不能更新
DataStorage.prototype.updateItem = function(obj,key,e) {
    AsyncStorage.getItem(key, (err, result) => {
    var x;
    let b=true;

    if(result===null)
    {
      x=new Array();
    }else{
       x=JSON.parse(result)
    }
  
     for(var i=0;i<x.length;i++)
     {
        if(equalse(x[i],obj))
        {
            b=false;
        }
     }
      var  xarray;
      if(b)
      {
        xarray=x.concat(obj);
     
      }else{
        AsyncStorage.getItem(key,  e);
      }
        AsyncStorage.setItem(key, JSON.stringify(xarray), e);
    });
      
}
DataStorage.prototype.getOrderList = function(e) {
    this.getItem('orderList', e);
}
DataStorage.prototype.getAdressList = function(e) {
    this.getItem('addressList', e);
}
DataStorage.prototype.getSearchList = function(e) {
    this.getItem('search1', e);
}

DataStorage.prototype.getCarList = function(e) {
    this.getItem('carlist', e);
}
DataStorage.prototype.getItem = function(key,e) {
    AsyncStorage.getItem(key, e);
}
 DataStorage.prototype.updateSearchList = function(obj,e) {
    this.updateItem(obj,'search1',e);
}
DataStorage.prototype.updateCarList = function(obj,e) {
	
    this.updateItem(obj,'carlist',e);
}
DataStorage.prototype.updateOrderList = function(obj,e) {
    this.updateItem(obj,'orderList',e);
}
DataStorage.prototype.updateAddressList = function(obj,e) {
    this.updateItem(obj,'addressList',e);
}


module.exports = DataStorage;
