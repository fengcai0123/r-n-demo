'use strict';
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, } from 'react-native';
import ChinaRegionWheelPicker from 'rn-wheel-picker-china-region/lib/index';
  //import  LocationPicker from 'react-native-location-picker';

 class  AddrPicker extends Component{
   constructor(props) {
    super(props);
    this.state = {
      region1: '',
      isPickerVisible: false,
      region2: ''
    };
  }

  _onPress2Show() {
    this.setState({ isPickerVisible: true });
  }
  _onPressCancel() {
    this.setState({ isPickerVisible: false });
    console.log('cancel');
  }
  _onPressSubmit(params) {
    this.setState({ isPickerVisible: false });
    this.setState({ region2: `${params.province},${params.city},${params.area}` });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1,height:30,marginTop:20}}>
          <Text>找货源</Text>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
        <ChinaRegionWheelPicker style={{borderColor:'#eeeeee',borderRadius:1,flex:1,flexDirection:'row'}}
          onSubmit={(params) => this.setState({ region1: `${params.province},${params.city},${params.area}` })}
          onCancel={() => console.log('cancel')}
        >
          <TextInput
            style={{ backgroundColor: '#FFF', width: 200, paddingVertical: 20, textAlign: 'center' }}
            editable={false}
            placeholder="始发地"
            value={this.state.region1}
          />

        </ChinaRegionWheelPicker>
        <Image source={require('../images/logistics/line_column.png')}/>
        <ChinaRegionWheelPicker style={{flex:1,flexDirection:'row'}}
          onSubmit={(params) => this.setState({ region1: `${params.province},${params.city},${params.area}` })}
          onCancel={() => console.log('cancel')}
        >
          <TextInput
            style={{ backgroundColor: '#FFF', width: 200, paddingVertical: 20, textAlign: 'center' ,flex:1}}
            editable={false}
            placeholder="目的地"
            value={this.state.region1}
          />
        </ChinaRegionWheelPicker>  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backImg:{
  flex:1,
  height:20,
  justifyContent:'center',
  resizeMode:'cover'}
});

module.exports=AddrPicker;
