// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        value: "商品收藏",
        isActive: true
      },
      {
        value: "品牌收藏",
        isActive: false
      },
      {
        value: "店铺收藏",
        isActive: false
      },
      {
        value: "浏览足迹",
        isActive: false
      }
    ],
    collect: []
  },

  onShow() {
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
      collect
    });
  },

  handleTabsItemChange(e) {
    // 获取被点击的标题的索引
    const {
      index
    } = e.detail;
    // 修改源数据
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => {
      return v.isActive = i == index ? true : false;
    });
    this.setData({
      tabs
    })

  },

})