'use strict';
import React, { Component } from 'react';
import{
  View,
  Navigator
} from 'react-native';
import GoodsList from './GoodsList';

class ListDefault extends Component{
  render(){
    var defaultName='GoodsList';
    var defaultComponent=GoodsList;
    return(
      <Navigator initialRoute={{name:defaultName,component:defaultComponent}}
        configureScene={(route)=>{
          return Navigator.SceneConfigs.HorizontalSwipeJump;
        }}
        renderScene={(route,navigator) =>{
          let Component = route.component;
          return <Component{...route.params} navigator={navigator}/>
        }}
      />
    );
  }
}

module.exports=ListDefault;
