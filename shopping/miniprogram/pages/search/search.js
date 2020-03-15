// pages/search/search.js
import {
  request
} from '../../request/index.js';
// import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData: [],
    // 取消按钮是否显示
    isFocus: false,
    // 输入框的值
    inpValue: ''
  },
  TimeId: 1,
  // 输入框的值发生改变 就会触发该事件
  handleInput(e) {
    // 获取输入框的值
    const {
      value
    } = e.detail;
    // 检测合法性
    if (!value.trim()) {
      // 值不合法 为空
      this.setData({
        searchData: [],
        isFocus: false
      })
      return;
    }
    this.setData({
      isFocus: true
    })
    // 准备发送请求获取数据
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000)
  },
  // 发送请求获取搜索建议 数据
  async qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    })
    let searchData = res.data.message;
    this.setData({
      searchData
    })
  },

  // 点击 取消按钮
  handleCancel() {
    this.setData({
      inpValue: "",
      isFocus: false,
      searchData: []
    })
  }

})