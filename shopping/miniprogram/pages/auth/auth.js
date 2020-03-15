// pages/auth/auth.js
import {
  request
} from '../../request/index.js';
import {
  login
} from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async handleGetUserInfo(e) {
    // console.log(e);
    try {
      // 获取用户信息
      const {
        encryptedData,
        rawData,
        iv,
        signatrue
      } = e.detail;
      // 获取小程序登录成功后的code
      const {
        code
      } = await login();
      const loginParams = {
        encryptedData,
        rawData,
        iv,
        signatrue
      };
      // 发送请求， 获取用户的token
      const {
        token
      } = await request({
        url: "/users/wxlogin",
        data: loginParams,
        methods: "post"
      })
      // console.log(res);
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      })
    } catch (err) {
      console.log(err);
    }


  },

})