// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  handleGetUserInfo(e) {
    const {
      userInfo
    } = e.detail;
    // console.log(userInfo);
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    })
  },

})