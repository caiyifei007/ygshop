import {
  request
} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        isActive: true,
        value: '综合'
      },
      {
        isActive: false,
        value: '销量'
      },
      {
        isActive: false,
        value: '价格'
      }
    ],
    goodsList: []
  },
  totalPages: 1,
  // 接口要的参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
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

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.queryParams
    })
    // 获取总的数据量
    var total = res.data.message.total;
    // 计算总的页数
    this.totalPages = Math.ceil(total / this.queryParams.pagesize);
    // console.log(this.totalPages);
    // console.log(res);
    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    });

    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
  },
  // getGoodsList() {
  //   wx.cloud.callFunction({
  //     name: "ygGoodsList",
  //     data: this.queryParams,
  //     config: {
  //       env: "web-cai-952h1"
  //     }
  //   }).then(res => {
  //     // console.log(res.result.message);
  //     // 获取总的数据量
  //     var total = JSON.parse(res.result).message.total;
  //     // 计算总的页数
  //     this.totalPages = Math.ceil(total / this.queryParams.pagesize);
  //     // console.log(this.totalPages);
  //     // console.log(res);
  //     this.setData({
  //       goodsList: [...this.data.goodsList, ...JSON.parse(res.result).message.goods]
  //     });
  //     // 关闭下拉刷新的窗口
  //     wx.stopPullDownRefresh();
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid;
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断还有没有下一页数据
    if (this.queryParams.pagenum >= this.totalPages) {
      // 没有下一页数据
      wx.showToast({
        title: "没有下一页数据"
      });
    } else {
      // 还有下一页数据
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 重置数据
    this.setData({
      goodsList: []
    });
    // 重置页码
    this.queryParams.pagenum = 1;
    // 发送请求
    this.getGoodsList();
  }
})