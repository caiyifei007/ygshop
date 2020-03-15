import {
  request
} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    // 商品是否被收藏过
    isCollect: false
  },
  // 商品对象
  goodsInfo: {},

  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    });
    let result = res.data.message;
    this.goodsInfo = result;
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    // 判断当前商品是否被收藏
    let isCollect = collect.some(v => v.goods_id == this.goodsInfo.goods_id);
    this.setData({
      goodsObj: {
        goods_name: result.goods_name,
        goods_price: result.goods_price,
        // iphone部分手机 不识别 webp图片格式
        // 最好找到后台  让他进行修改
        // 临时自己改 确保后台存在 1webp => 1.jpg
        goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: result.pics
      },
      isCollect
    })
  },

  // 点击轮播图 放大预览
  handlePreviewImage(e) {
    // 先构造要预览的图片数组
    const urls = this.goodsInfo.pics.map(v => v.pics_mid);
    // 接受传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },

  // 点击 加入购物车
  handleCartAdd() {
    // 获取缓存中的购物车 数组
    let cart = wx.getStorageSync('cart') || [];
    // 判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id == this.goodsInfo.goods_id);
    if (index === -1) {
      // 不存在 第一次添加
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
      // 已经存在购物车数据 执行num++
      cart[index].num++
    }
    // 吧购物车重新添加回缓存中
    wx.setStorageSync('cart', cart);
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const {
      goods_id
    } = options;
    this.getGoodsDetail(goods_id);
  },

  // 点击商品收藏图片
  handleCollect() {
    let isCollect = false;
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    // 判断该商品是否被收藏过
    let index = collect.findIndex(v => v.goods_id == this.goodsInfo.goods_id);
    // 当index ！= -1时表示 已经收藏过
    if (index !== -1) {
      // 能找到 已经收藏过了 在数组中删除该商品
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: "success",
        mask: true
      })
    } else {
      // 没有收藏过
      collect.push(this.goodsInfo);
      isCollect = true;
      wx.showToast({
        title: "收藏成功",
        icon: "success",
        mask: true
      })
    }
    // 把数组存入到缓存中
    wx.setStorageSync('collect', collect);
    // 修改data中的属性 isCollect
    this.setData({
      isCollect
    })

  }




})