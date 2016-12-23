'use strict';
import React,{Component} from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class Category extends Component{
  render(){
    return(
      <View>
        <Text>hello this is category </Text>
      </View>
    )
  }

  /*fetch网络请求
  var url='http://m-sta.kachemama.com/mobile/category';
  post(url,params,headers,callback){
    fetch(url,{
      method:'post',
      headers:{
        'token':headers
      },
      body:JSON.stringify({
          ‘start’:'0',
          ‘limit’:'2',
          ‘firstName’:'3',
          ‘lastName’:'4',

      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      alert(responseData)
    })
    .catch((error) =>{
      alert('网络请求出错')；
    })
  }*/
}
