'use strict';
import React,{Component} from 'react';
import{
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import AddrPicker from './AddrPicker';

//import CommonHeader from '../CommonHeader';
class GoodsDetail extends Component{
constructor(props){
  super(props);
  this.state={
    item:"id占用位置"
  };
}

componentDidMount(){
  this.setState({
      item:this.props.item,
  });
}

_pressBack(){
  const{navigator} = this.props;
  if(navigator){
    navigator.pop();
  }
}
  render(){
    return(
      <View style={styles.container}>

        <View style={{marginTop:5,flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <TouchableHighlight onPress={this._pressBack.bind(this)} style={{flex:1,height:20,}}>
            <Image source={require('../images/common/arrow_left_grey.png')} style={styles.backImg}/>
          </TouchableHighlight>
          <Text  style={{flex:4,justifyContent:'flex-end'}}>找货源</Text>
        </View>
        <View style={styles.detailTop}>
            <View  style={styles.detailItem_row}>
                <Image source={require('../images/logistics/find_car_user.png')}/>
                <Text>{this.state.item.realName}</Text>
            </View>
            <View  style={styles.detailItem_column}>
                <Text>{this.state.item.updateTime}</Text>
                <Text>{this.state.item.createTime}</Text>
            </View>
        </View>
        <View style={styles.detailCenter}>
              <View style={styles.detailItem_row}>
                  <Image source={require('../images/logistics/logistics_detail_start_address.png')}/>
                  <Text>{this.state.item.originAddress}</Text>
              </View>
              <View style={styles.detailItem_row} >
                  <Image source={require('../images/logistics/logistics_detail_end_address.png')}/>
                  <Text>{this.state.item.destinationAddress}</Text>
              </View>
        </View>
        <View style={styles.detailCenterDown}>
              <View style={styles.detailItem_row}>
                  <Image source={require('../images/logistics/logistics_publish_goods_name.png')}/>
                  <Text>货物名称</Text>
                  <Text>{this.state.item.originAddress}</Text>
              </View>
              <View style={styles.detailItem_row} >
                  <Image source={require('../images/logistics/logistics_publish_goods_weight.png')}/>
                  <Text>可载重量</Text>
                  <Text>{this.state.item.destinationAddress}</Text>
              </View>
              <View style={styles.detailItem_row}>
                  <Image source={require('../images/logistics/logistics_publish_car_length.png')}/>
                  <Text>车辆类型</Text>
                  <Text>{this.state.item.originAddress}</Text>
              </View>
              <View style={styles.detailItem_row} >
                  <Image source={require('../images/logistics/logistics_publish_price.png')}/>
                  <Text>意向价格</Text>
                  <Text>{this.state.item.destinationAddress}</Text>
              </View>
              <View style={styles.detailItem_row}>
                  <Image source={require('../images/logistics/logistics_publish_memo.png')}/>
                  <Text>备注</Text>
                  <Text>{this.state.item.originAddress}</Text>
              </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
container:{
  flex:1,
  flexDirection:'column',
  backgroundColor:'#eeeeee',
},
backImg:{
  flex:1,
  height:20,
  resizeMode:'cover',
  justifyContent:'center',
  alignItems:'center'
},
detailItem_row:{
   flex:1,
   flexDirection:'row',
   justifyContent:'space-between',
   borderWidth:0.5,
   borderColor:'#eeeeee'

},
detailItem_column:{
   flex:1,
   flexDirection:'column'
},
detailTop:{
  flex:1,
  flexDirection:'row',
  backgroundColor:'#ffffff',
},
detailCenter:{
  flex:1,
  backgroundColor:'#ffffff',
  marginTop:20,
},
detailCenterDown:{
  flex:1,
  marginTop:20,
  backgroundColor:'#ffffff',
},
detailBottom:{
  flex:1,
}
});

module.exports=GoodsDetail;
