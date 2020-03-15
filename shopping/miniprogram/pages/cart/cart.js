// pages/cart/cart.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart') || [];
    // 计算全选
    // const allChecked = cart.length ? cart.every(v => v.checked) : false;
    this.setData({
      address
    })
    // 调用计算商品总价总数量函数
    this.setCart(cart);
  },
  // 点击 收货地址
  async handleChooseAddress() {
    // 获取权限状态
    // wx.getSetting({
    //   success(res) {
    //     const scopeAddress = res.authSetting["scope.address"];
    //     if (scopeAddress == true || scopeAddress == undefined) {
    //       wx.chooseAddress({
    //         success(res1) {
    //           console.log(res1);
    //         }
    //       })
    //     } else {
    //       // 用户 以前拒绝过授予权限 先诱导用户打开授权页面
    //       wx.openSetting({
    //         success(res2) {
    //           // 可以调用 收货地址代码
    //           wx.chooseAddress({
    //             success(res3) {
    //               console.log(res3);
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })

    try {
      // 获取 权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting['scope.address'];
      // 判断 权限状态
      if (scopeAddress == false) {
        await openSetting();
      }
      // 调用获取收货地址的api
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      // 存入到缓存中
      wx.setStorageSync("address", address);
    } catch (err) {
      console.log(err)
    }
  },

  // 商品的选中状态
  handleItemChange(e) {
    // 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // console.log(goods_id);
    // 获取购物车数据
    let {
      cart
    } = this.data;
    // 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id == goods_id);
    // 选中状态取反
    cart[index].checked = !cart[index].checked;
    // 把购物车数据重新设置回data中和缓存中
    this.setCart(cart);

  },

  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格  购买的数量
  setCart(cart) {
    let allChecked = true;
    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    // 判断数据是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    // 给data赋值
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync("cart", cart);
  },

  // 商品全选功能
  handleItemAllcheck() {
    // 获取data中的数据
    let {
      cart,
      allChecked
    } = this.data;
    // 修改值
    allChecked = !allChecked;
    // 循环修改cart数组中的商品的选中状态
    cart.forEach(v => v.checked = allChecked);
    // 把修改后的值 填充回data和缓存中
    this.setCart(cart);
  },

  // 商品数量的编辑功能
  async handleItemNumEdit(e) {
    // 获取传递过来的参数
    const {
      operation,
      id
    } = e.currentTarget.dataset;
    // 获取购物车数组
    let {
      cart
    } = this.data;
    // 找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id == id);
    // 判断是否要删除
    if (cart[index].num == 1 && operation == -1) {
      // 弹窗提示
      const res = await showModal({
        content: "您是否要删除?"
      });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      // 进行修改数量
      cart[index].num += operation;
      // 设置回缓存和data中
      this.setCart(cart);
    }
  },

  // 点击 结算
  async handlePay() {
    // 判断收货地址
    const {
      address,
      totalNum
    } = this.data;
    if (!address.userName) {
      await showToast({
        title: "您还没有选择收货地址"
      });
      return;
    }
    // 判断用户有没有选购商品
    if (totalNum == 0) {
      await showToast({
        title: "您还没有选购商品"
      });
      return;
    }
    // 跳转到支付页面
    wx.navigateTo({
      url: "/pages/pay/pay"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }


})