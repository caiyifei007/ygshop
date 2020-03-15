// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise');
// 云函数入口函数
exports.main = async (event, context) => {
  let url = `https://api-hmugo-web.itheima.net/api/public/v1/goods/search?cid=${event.cid}`;
  return await rp(url).then(res => {
    return res;
  }).catch(err => {
    console.log(err);
  })
}