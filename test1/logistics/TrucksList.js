'use strict';
import React,{Component} from 'react';
import {
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  StyleSheet,
  Navigator,
  ScrollView
} from 'react-native';
import GoodsDetail from './GoodsDetail';
import AddrPicker from './AddrPicker';

// let _pageNo=2;
// const _pageSize=30;
const moreText="加载完毕"; //foot显示的文案
var pageNum =1;
const pageSize=10;
var pageCount=0;
var totalList=new Array();

var GOODSURL='http://m-sta.kachemama.com/mobile/logistics-info/latest-goods';
var callPhoneImage={src:require('../images/logistics/call_phone.png')}
//var GOODSURL='http://m-sta.kachemama.com/mobile/category';
//var GOODSURL='https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
// const moreText = '加载完毕';
// var pageNum = 1;
// const pageSize = 10;
// var pageCount = 0;
// var totalList = new Array();


 class GoodsList extends Component {

  // 构造
 constructor(props) {
   super(props);
   // 初始状态
   this.state = {
     dataSource : new ListView.DataSource({
       rowHasChanged:(row1,row2) => row1 !== row2,
     }),
     loaded :false,
     foot:0,
     error:false,
   };
   // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
   // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
//   this._fetchListData = this._fetchListData.bind(this);
 }

/*ComponentWillMount 加载数据*/
componentDidMount(){
  this._fetchListData();
}

//从服务端获取数据
_fetchListData(){
  if(pageNum > 1){
    this.setState({loaded:true});
  }
  fetch(GOODSURL,{
      method:'get',
      headers:{},

  }).then(response => {
    if(response.ok){
       console.log(""+response.json);
      return response.json();
    }else{
      this.setState({error:true,loaded:true});
    }
  }).then(json=>{
    let responseCode = json.code;
    if(responseCode == 0){
      let responseData = json.data;

      pageCount = responseData.count;
      let list = responseData.data;

      if(orderList == null){
        orderList = [];
        currentCount = 0;
      }else{
        currentCount = list.length;
      }
      if(currentCount < pageSize){
        this.setState({foot:1,moreText:moreText}) //当前返回的数据小于pageSize时，认为已加载完毕
      }else{
        this.setState({foot:0});
      }
      for(var i=0;i < list.length;i++){
        totalList.push(list[i]);
      }

      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(totalList),
        loaded:true,
      });
    }else {
      this.setState({error:true,loaded:true});
    }
  }).catch(function(error){
    this.setState({error:true,loaded:true});
  });
}

/*
_fetchListData(){
  console.log("fetch.before....");
  fetch(GOODSURL)
      .then((response) =>  response.json())
      .then((responseData) => {

        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(responseData.data),
          loaded:true,
        });
    })
    .done();

}
*/

_renderLoadingView(){
  return(
    <View style={{flex:1,
    justifyContent:'center',alignItems:'center',backgroundColor:'#F5FCFF'}}>
        <Text>Loading GoodsList data .....</Text>
    </View>
  )
}
  _renderRow(item){
    return(
      <TouchableHighlight onPress = { this._pressRow.bind(this,item)} >
      <View style={[styles.listContainer,{justifyContent:'flex-start',
      alignItems:'flex-start', }]}>

          <View style={[styles.leftContainer,{justifyContent:'space-around',alignItems:'center'}]}>
          <Image source={require('../images/logistics/find_car_user.png')} style={styles.siji_protrait}/>
            <Text>{item.realName}</Text>
            <Image source={callPhoneImage.src} style={styles.image_uri}/>
          </View>

          <View style={styles.rightContainer}>
            <View>
              <Text>{item.updateTime}</Text>
            </View>
            <View >
              <Text sytle={styles.title}>{item.origin}</Text>
              <Text sytle={styles.title}>{item.destination}</Text>
              <Text sytle={styles.title}>{item.carType}</Text>
              <Text sytle={styles.title}>{item.goodsWeight} 吨</Text>
              <Text>00001</Text>
            </View>
        </View>
      </View>
      </TouchableHighlight>
    );
  }
  _pressRow(itemId){
    console.log("id==="+itemId.id);
    const {navigator} =this.props;
    if(navigator){
      navigator.push({
        name:'GoodsDetail',
        component:GoodsDetail,
        params:{
          item:itemId,
        }
      })
    }
    // this.props.Navigator.push({
    //   title:'货源详情',
    //   component:GoodsDetail
    // })
  //   alert("ddd"+item.id+" "+item.origin+" "+item.destination)
  }
  _renderHeader(){
    return(
      <View>header</View>
    )
  }

  _renderFooter(){
    if(this.state.foot ===1){ //加载完毕
      return(
        <View style={{height:40,alignItems:'center',justifyContent:'flex-start',}}>
          <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
              {this.state.moreText}
          </Text>
        </View>
      );
    }else if(this.state.foot === 2){
      return(
        <View style={{height:40,alignItems:'center',justifyContent:'center',}}>
            <Image sourc={{uri:loadgif}} style={{width:20,height:20}}/>
        </View>
      );
    }
    return(
      <View>footer</View>
    )
  }

_endReached(){
  if(this.state.foot !=0){
    return;
  }
  this.setState({
    foot:2,
  });
  this.timer =setTimeout(
    () => {
      pageNum ++;
      this._fetchListData()
    },500);
}

componentWillMount(){
  this.timer && clearTimeout(this.timer);
}

/*
_toEnd(){
  const{reducer} =this.props;
   //ListView滚动到底部，根据是否正在加载更多 是否正在刷新 是否已加载全部来判断是否执行加载更多
  if(reducer.isLoadingMore || reducer.products.products.length >= reducer.totalProductCount || reducer.isRefreshing){
    return;
  }
  InteractionManager.runAfterInteractions(() =>{
    console.log('触发加载更多 toEnd() ---');
    this._loadMoreData();
  });
}


_loadMoreData(){
  const{reducer,dispatch}=this.props;
  dispatch(changProductListLoadingMore(true));
  _pageNo=Number.parseInt(reducer.products.length);
  dispatch(getProductList(_pageNo));
}
_renderFooter(){
  const{reducer} =this.props;
  if(reducer.products.length<1 || reducer.isRefreshing){
    return null;
  };
  if(reducer.products.length < reducer.totalProductCount){
    return <LoadMoreFooter />
  }else{
    return <LoadMoreFooter isLoadAll={true}/>
  }
}
*/
  render(){
    const {reducer}  = this.props;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log("goodslist render .if before....")
    if (!this.state.loaded){
      return this._renderLoadingView();
    }
    return(

      <ScrollView>
      <View>
          <AddrPicker />
      </View>
      <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          style={styles.listView}

          renderFooter={this._renderFooter.bind(this)}
          onEndReached={this._toEnd.bind(this)}
          onEndReachedThreshold={0}


          refreshControl={
            <refreshControl
              refreshControl ={reducer.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor='gray'
              colors={['#ff0000','#00ff00','#0000ff']}
              progressBackgroundColor='gray'/>
          }/>
     </ScrollView>

        //  renderFooter={this._renderFooter.bind(this)}/>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    listView: {
      flex:1,
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
    thumbnail: {
        width: 53,
        height: 81,

    },
    listContainer:{
      flex:1,
      flexDirection:'row',
      borderWidth: 1,
      borderColor: '#eeeeee',
    },
    leftContainer:{
      flex:1,
      flexDirection:'column'
    },
    //让rightContainer在父容器中占据Image之外剩下的全部空间。
    rightContainer: {
        flex: 3,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    siji_protrait:{
      height:60,
      resizeMode:'cover'
    },
    image_uri:{
      height:35,
      resizeMode:'cover',

    },

    year: {
        textAlign: 'center',
    },
});
module.exports=GoodsList;
