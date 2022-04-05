// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    // 被收藏的商品的数量
    collectNums: 0
  },

  onLoad() {
    
  },

  test() {},
  test2() {
    console.log('这个test1提交的数据')
  },


  onShow() {
    const userInfo = wx.getStorageSync("userInfo");
    let collectNums = wx.getStorageSync('collect').length;
    this.setData({
      userInfo,
      collectNums
    });
  }
})