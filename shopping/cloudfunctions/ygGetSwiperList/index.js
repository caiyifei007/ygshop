// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 引入request-promise模块
var rq = require("request-promise");

// 云函数入口函数
exports.main = async (event, context) => {
  let url = `https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata`;
  return await rq(url).then(res => {
    return res
  }).catch(err => {
    console.log(err);
  }) 

  
}