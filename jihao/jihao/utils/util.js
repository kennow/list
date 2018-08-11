//获取app实例
const app = getApp();

/**
 * @desc: 格式化时间
 * @return: eg: '2018/04/09 21:31:00'
 * @param {Date对象} date 
 */
const formatTime = date => {

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


/**
 * @desc: 格式化数字
 * @return: n > 10 [eg: 12] => 12 | n < 10 [eg: 3] => '03'
 * @param {*} n 
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

function compareDate(DateOne, DateTwo) {
  var OneMonth = DateOne.substring(5, DateOne.lastIndexOf("-"));
  var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf("-") + 1);
  var OneYear = DateOne.substring(0, DateOne.indexOf("-"));
  var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf("-"));
  var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf("-") + 1);
  var TwoYear = DateTwo.substring(0, DateTwo.indexOf("-"));
  if (Date.parse(OneMonth + "/" + OneDay + "/" + OneYear) > Date.parse(TwoMonth + "/" + TwoDay + "/" + TwoYear)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  compareDate: compareDate
}

var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')

function getData(url) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}

function getData2() {
  return index.index;
}

function getNext() {
  return index_next.next;
}

function getDiscovery() {
  return discovery.discovery;
}

function discoveryNext() {
  return discovery_next.next;
}

// 封装 wx.showToast 方法
function showInfo(info = 'error', icon = 'none') {
  wx.showToast({
    title: info,
    icon: icon,
    duration: 1500,
    mask: true
  });
}

// 检查本地 storage 中是否有登录态标识
function checkUserStatus() {
  console.log("enter checkUserStatus");
  let that = this;
  let _userFlag = wx.getStorageSync('userFlag');
  if (_userFlag) {
    console.log("_userFlag:%s", _userFlag);
    // 检查 session_key 是否过期
    wx.checkSession({
      // session_key 有效(为过期)
      success: function () {
        // 直接从Storage中获取用户信息
        let userStorageInfo = wx.getStorageSync('userInfo');
        if (userStorageInfo) {
          app.globalData.userInfo = JSON.parse(userStorageInfo);
        } else {
          that.showInfo('缓存信息缺失');
          console.error('登录成功后将用户信息存在Storage的userStorageInfo字段中，该字段丢失');
        }

      },
      // session_key 过期
      fail: function () {
        // session_key过期
        wx.navigateTo({

          url: '/pages/auth/auth'

        })
      }
    });

  } else {
    // 无登录态
    console.log("无登录态");
    wx.navigateTo({
      url: '/pages/auth/auth',
      success: function (e) {
        console.info(e)
      },
      fail: function (e) {
        console.info(e)
      }
    });
  }
  return wx.getStorageSync('userFlag');
}


module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.checkUserStatus = checkUserStatus;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;
module.exports.showInfo = showInfo;



