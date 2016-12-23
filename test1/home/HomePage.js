'use strict';
import React,{Component} from 'react';
import {
View,
Text
} from 'react-native';
import Header from '../Header';
export default class HomePage extends Component{

    render(){
      return(
        <View >
          <Header/>
          <Text> hello my HomePage!!</Text>
        </View>
      )
    }
}
