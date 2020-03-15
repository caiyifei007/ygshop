import {
  request
} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单列表
    leftMenuList: [],
    // 右侧的内容
    rightContent: [],
    // 左侧被点击是的状态值
    currentIndex: 0,
    // 距离顶部的距离
    scrollTop: 0
  },
  // 接口返回的数据
  cates: [],
  async getCates() {
    const res = await request({
      url: '/categories'
    });
    this.cates = res.data.message;
    // 把接口的数据存入到本地存储中
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.cates
    });
    // 左侧菜单数据
    var leftMenuList = this.cates.map(v => v.cat_name);
    // 右侧内容数据
    var rightContent = this.cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  /* getCates() {
    wx.cloud.callFunction({
      name: 'ygCates',
      config: {
        env: "web-cai-952h1"
      }
    }).then(res => {
      this.cates = JSON.parse(res.result).message;
      // 把接口的数据存入到本地存储中
      wx.setStorageSync('cates', {
        time: Date.now(),
        data: this.cates
      });
      // 左侧菜单数据
      var leftMenuList = this.cates.map(v => v.cat_name);
      // 右侧内容数据
      var rightContent = this.cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    }).catch(err => {
      console.log(err);
    })
  }, */
  // 左侧菜单的点击事件
  handleItemTap(e) {
    /* 
      获取别点击的标题身上的索引
      给data中的currentIndex赋值
      根据不同的索引来渲染右侧的商品内容
    */
    const {
      index
    } = e.currentTarget.dataset;
    let rightContent = this.cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      /* 点击左侧菜单时 右侧内容跳转顶部 每次都重置为0即为顶部 */
      scrollTop: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 
      先判断一下本地存储中有没有旧的数据
      没有旧数据 直接发送请求
      有旧数据 同时 旧数据也没有过期 就是用本地存储中的旧数据即可
    */
    // 获取本地存储中的数据  
    const cates = wx.getStorageSync("cates");
    // 判断
    if (!cates) {
      // 不存在 发送请求获取数据
      this.getCates();
    } else {
      // 有旧数据 定义过期时间 为1小时
      if (Date.now() - cates.time > 1000 * 60 * 60) {
        // 重新发送请求
        this.getCates();
      } else {
        // 可以使用旧数据
        this.cates = cates.data;
        let leftMenuList = this.cates.map(v => v.cat_name);
        let rightContent = this.cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }

    }
  }
})