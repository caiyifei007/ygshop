// pages/home/home.js
// 引入 用来发送请求的方法 
import {
  request
} from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  // 获取轮播图数据
  getSwiperList() {
    request({
      url: "/home/swiperdata"
    }).then(res => {
      this.setData({
        swiperList: res.data.message
      })
    })
    /* wx.cloud.callFunction({
      name: "ygGetSwiperList",
      config: {
        env: "web-cai-952h1"
      }
    }).then(res => {
      // console.log(res);
      var swiperList = JSON.parse(res.result).message;
      this.setData({
        swiperList
      })
    }).catch(err => {
      console.log(err);
    }) */
  },
  // 获取 分页导航数据
  getCateList() {
    request({
      url: "/home/catitems"
    }).then(res => {
      // console.log(res);
      this.setData({
        cateList: res.data.message
      })
    })
    /* wx.cloud.callFunction({
      name: "ygGetCateList",
      config: {
        env: "web-cai-952h1"
      }
    }).then(res => {
      // console.log(res);
      var cateList = JSON.parse(res.result).message;
      this.setData({
        cateList
      })
    }).catch(err => {
      console.log(err);
    }) */
  },
  // 获取楼层数据
  getFloorList() {
    request({
      url: "/home/floordata"
    }).then(res => {
      this.setData({
        floorList: res.data.message
      })
    })
    /* wx.cloud.callFunction({
      name: "ygGetFloorList",
      config: {
        env: "web-cai-952h1"
      }
    }).then(res => {
      // console.log(res);
      var floorList = JSON.parse(res.result).message;
      this.setData({
        floorList
      })
    }).catch(err => {
      console.log(err);
    }) */
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送异步请求获取轮播图数据

    // var _this = this;
    // wx.request({
    //   url: "/home/swiperdata",
    //   success(result) {
    //     // console.log(result);
    //     _this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // })
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})