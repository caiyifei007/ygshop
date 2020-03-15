import {
  request
} from "../../request/index.js";


// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        value: "综合",
        isActive: true
      },
      {
        value: "待付款",
        isActive: false
      },
      {
        value: "待发货",
        isActive: false
      },
      {
        value: "退款/退货",
        isActive: false
      }
    ],
    orders: []
  },

  // 点击 从子组件传递数据过来
  handleTabsItemChange(e) {
    // 获取被点击的标题的索引
    const {
      index
    } = e.detail;
    // console.log(index);
    this.changeTitleByIndex(index);

  },
  changeTitleByIndex(index) {
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

  onShow() {
    // 判断token是否存在
    // const token = wx.getStorageSync("token");
    // if (!token) {
    //   wx.navigateTo({
    //     url: "/pages/auth/auth"
    //   });
    //   return;
    // };

    // 获取当前的小程序的页面栈-数组  长度最大是10个页面
    let pages = getCurrentPages();
    // 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    // console.log(currentPage);
    // 获取url上得type参数
    const {
      type
    } = currentPage.options;
    // 激活选中页面标题
    this.changeTitleByIndex(type - 1);
    this.getOrders(type);
  },
  //获取订单列表的方法
  async getOrders(type) {
    const res = await request({
      url: "/my/orders/all",
      data: {
        type
      }
    });
    // console.log(res);
    // this.setData({
    //   orders: res.data.message.orders
    // })
  }



})