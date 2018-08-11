//group.js

var util = require('../../utils/util.js')
const api = require('../../config/config.js');
//获取app实例
const app = getApp();

Page({
  data: {
    groups: [],
    groups_length: 0
  },
  //事件处理函数
  bindItemTap: function(ev) {
    let info = ev.currentTarget.dataset;

    let navigateUrl = '../group_topic/group_topic?';

    for (let key in info) {
      info[key] = encodeURIComponent(info[key]);
      navigateUrl += key + '=' + info[key] + '&';
    }

    navigateUrl = navigateUrl.substring(0, navigateUrl.length - 1);

    wx.navigateTo({
      url: navigateUrl
    });
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.getGroupList();
  },

  onShow: function(){
    console.log('onShow')
    var that = this
    //调用应用实例的方法获取全局数据
    this.getGroupList();
  },

  onShareAppMessage() {
    return {
      title: '快来参与话题讨论',
      path: '/pages/topic/topic',
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            console.log(res);
          }
        })
        console.log("shareTickets:%s", shareTickets[0])
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },


  /**
 * 获取我创建的所有群列表
 */
  getGroupList: function () {

    let that = this;

    wx.request({
      url: api.queryGroupsUrl,
      data: {
        skey: wx.getStorageSync('loginFlag')
      },
      success: function (res) {
        let data = res.data;
        console.log(data);

        if (data.result === 0) {
          //setTimeout(function () {
          that.setData({
            groups: data.data,
            groups_length: data.data.length,
            showLoading: false
          });
          console.log(data.data);
          console.log(data.data.length);
          //}, 800);
        }

      },
      error: function (err) {
        console.log(err);
      }
    });
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    wx.hideNavigationBarLoading();
    that.nextLoad();
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现首页刷新
  refresh0: function(){
    var index_api = '';
    util.getData(index_api)
        .then(function(data){
          //this.setData({
          //
          //});
          console.log(data);
        });
  },

  //使用本地 fake 数据实现刷新效果
  getData: function(){
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
  },
  refresh: function(){
    let that = this;
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getData2();
    console.log("loaddata");
    that.getGroupList();
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })

  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
    let that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    })
    var next = util.getNext();
    console.log("continueload");
    that.getGroupList();
    wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
  }


})
