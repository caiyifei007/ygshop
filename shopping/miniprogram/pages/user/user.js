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

  demo() {},

  demo2() {
    console.log('这是一些操作')
  },
  test2() {
    console.log('这里做修改，看看还怎么提交')
  },


  onShow() {
    const userInfo = wx.getStorageSync("userInfo");
    let collectNums = wx.getStorageSync('collect').length;
    this.setData({
      userInfo,
      collectNums
    });
  },

  nnnd() {
    console.log('ninainaide')
  }
})