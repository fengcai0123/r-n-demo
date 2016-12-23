'use strict';
import React,{Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Navigator
} from 'react-native';

import HomePage from './home/HomePage';
import Category  from './category/Category';
// import GoodsList from './logistics/GoodsList';
 import GoodsList from './logistics/ListDefault';

import TabNavigator from 'react-native-tab-navigator';
import ViewPager from 'react-native-viewpager';

const HOME='首页';
const HOME_NORMAL = require('./images/tabs/home_normal.png');
const HOME_FOCUS = require('./images/tabs/home_focus.png');
const CATEGORY = 'Category';
const CATEGORY_NORMAL = require('./images/tabs/category_normal.png');
const CATEGORY_FOCUS = require('./images/tabs/category_focus.png');
const FAXIAN = '发现';
const FAXIAN_NORMAL = require('./images/tabs/faxian_normal.png');
const FAXIAN_FOCUS = require('./images/tabs/faxian_focus.png');
const CART = '购物车';

const CART_NORMAL = require('./images/tabs/cart_normal.png');
const CART_FOCUS = require('./images/tabs/cart_focus.png');
const PERSONAL = '个人中心';
const PERSONAL_NORMAL = require('./images/tabs/personal_normal.png');
const PERSONAL_FOCUS = require('./images/tabs/personal_focus.png');

const BANNER_IMGS = [
  require('./images/banner/1.jpg'),
  require('./images/banner/2.jpg'),
  require('./images/banner/3.jpg'),
  require('./images/banner/4.jpg')
];

export default class MainScreen extends Component {

  constructor(props){
    super(props);
    this.state={selectedTab:HOME}

    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    this.state = {
      dataSource:dataSource.cloneWithPages(BANNER_IMGS)
    }
  }



  _renderTabItem(img,selectedImg,tag,childView){
    return(
      <TabNavigator.Item
          selected={this.state.selectedTab===tag}
          renderIcon={() => <Image style={styles.tabIcon}  source={img} />}
          renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg} />}
          onPress={() => this.setState({selectedTab:tag})} >
          {childView}
      </TabNavigator.Item>

    )
  }

  _createChildView(tag){
    return(
      <View style={{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:22}}> {tag}</Text>
            <Category />
      </View>
    )
  }
  _createHomeChildView(tag){
    return(
      <View style={{flex:1}}>
      <HomePage/>
      </View>
    )
  }
  _createListChildView(tag){
    return(
      <View style={{flex:1}}>
      <GoodsList/>
      </View>
    )
  }

_renderPage(data,pageID){
  return(
    <Image source={data} style={styles.page}/>
  )
}

/*
<ViewPager style={{height:130}}
  dataSource={this.state.dataSource}
  renderPage={this._renderPage}
  isLoop={true}
  autoPlay={true}>
</ViewPager>
*/
  render(){
    return(
      <View style={{flex:1}}>
          <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
              {this._renderTabItem(HOME_NORMAL,HOME_FOCUS,HOME,this._createHomeChildView(HomePage))}
              {this._renderTabItem(CATEGORY_NORMAL,CATEGORY_FOCUS,CATEGORY,this._createChildView(CATEGORY))}
              {this._renderTabItem(FAXIAN_NORMAL,FAXIAN_FOCUS,FAXIAN,this._createChildView(FAXIAN))}
              {this._renderTabItem(CART_NORMAL,CART_FOCUS,CART,this._createListChildView(GoodsList))}
              {this._renderTabItem(PERSONAL_NORMAL,PERSONAL_FOCUS,PERSONAL,this._createChildView(PERSONAL))}
          </TabNavigator>
      </View>
    )
  }
}
const styles=StyleSheet.create({
    tab:{
      height:52,
      backgroundColor:'#333333',
      alignItems:'center'
    },
    tabIcon:{
      width:30,
      height:35,
      resizeMode:'stretch',
      marginTop:10
    },
    page:{
      height:130,
      resizeMode:'stretch'
    },
    viewPagerHeight:{
      height:130
    }
  });
