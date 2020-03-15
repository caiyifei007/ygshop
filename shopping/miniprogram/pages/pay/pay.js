// pages/cart/cart.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment
} from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import {
  request
} from '../../request/index.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync('cart') || [];
    // 过滤后的购物车
    cart = cart.filter(v => v.checked);
    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });
    // 给data赋值
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },

  // 点击支付
  async handleOrderPay() {
    try {
      // 判断缓存中有没有token
      const token = wx.getStorageSync("token");
      // 判断
      if (!token) {
        wx.navigateTo({
          url: "/pages/auth/auth"
        });
        return;
      }
      console.log('已经存在token');
      // 创建订单
      // 准备请求头数据
      // const header = {
      //   Authorization: token
      // };
      // 准备请求体参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const {
        cart
      } = this.data;
      let goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParams = {
        order_price,
        consignee_addr,
        goods
      };
      // 准备发送请求  创建订单  获取订单编号
      const {
        order_number
      } = await request({
        url: "/my/orders/create",
        method: "POST",
        data: orderParams
      });
      // 发起 与支付接口
      const {
        pay
      } = await request({
        url: "/my/orders/req_unifiedorder",
        methos: "POST",
        data: {
          order_number
        }
      });
      // 发起微信支付
      await requestPayment(pay);
      // 查询后台 订单状态
      const res = await request({
        url: "/my/orders/chkOrder",
        methos: "POST",
        data: {
          order_number
        }
      });
      await showToast({
        title: "支付成功"
      });
      // 手动删除缓存中 已经支付了的商品
      let newCat = wx.getStorageSync("cart");
      newCart = newCart.forEach(v => !v.cheched);
      wx.setStorageSync('cart', newCart);
      // 支付成功了 跳转到订单页面
      wx.navigateTo({
        url: "/pages/order/order"
      })

    } catch (err) {
      await showToast({
        title: "支付失败"
      });
      console.log(err);
    }

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }


})