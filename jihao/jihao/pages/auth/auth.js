// pages/auth/auth.js

const api = require('../../config/config.js');
//获取app实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:''
  },
  bindGetUserInfo: function (e) {
    let that = this;
    if (e.detail.userInfo != undefined) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.setStorageSync('userInfo', JSON.stringify(e.detail.userInfo));
      wx.setStorageSync('userFlag', true);
      // 发送userinfo到后台
      wx.request({
        url: api.updateUserInfoUrl,
        method: 'POST',
        data: {
          skey: wx.getStorageSync('loginFlag'),
          userinfo: e.detail.userInfo
        },

        success: function (resData) {
          console.log('update success');
          resData = resData.data;

          if (resData.result == 0) {
          } else {
            that.showInfo(resData.errmsg);
          }
        },

        fail: function (error) {
          // 调用服务端登录接口失败
          that.showInfo('调用接口失败');
          console.log(error);
        }
      });
    }
    wx.navigateBack({
     delta:1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  
})