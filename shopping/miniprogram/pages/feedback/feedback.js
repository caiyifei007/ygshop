// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        isActive: true,
        value: '体验问题'
      },
      {
        isActive: false,
        value: '商品、商家投诉'
      }
    ],
  },
  // 标题点击事件，从组件传递过来
  handleTabsItemChange(e) {
    // 获取被点击的标题的索引
    const {
      index
    } = e.detail;
    // console.log(index);
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