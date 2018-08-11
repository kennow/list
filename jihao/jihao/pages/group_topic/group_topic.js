//group_topic.js
var util = require('../../utils/util.js')
const api = require('../../config/config.js');
//获取app实例
const app = getApp();

Page({
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    groupInfo:{},
    group_topic_list: [],
    group_topic_list_length: 0
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this;
    let _groupInfo = {};

    for (let key in options) {
      _groupInfo[key] = decodeURIComponent(options[key]);
    }

    console.log(_groupInfo);

    that.setData({
      groupInfo: _groupInfo
    });
  
    //调用应用实例的方法获取全局数据
    that.refresh();
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


  onShow: function () {
    console.log('onShow')
    var that = this
    //调用应用实例的方法获取全局数据
    that.refresh();
  },


  pointTab: function (e) {
    console.log(e);
    this.refresh();
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  /** 
    * 滑动切换tab 
    */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentNavtab: e.detail.current });

  },

  goDetail: function (ev) {

    let info = ev.currentTarget.dataset;

    let navigateUrl = '../detail/detail?';

    for (let key in info) {
      info[key] = encodeURIComponent(info[key]);
      navigateUrl += key + '=' + info[key] + '&';
    }

    navigateUrl = navigateUrl.substring(0, navigateUrl.length - 1);

    wx.navigateTo({
      url: navigateUrl
    });
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现刷新
  refresh0: function () {
    var index_api = '';
    util.getData(index_api)
      .then(function (data) {
        //this.setData({
        //
        //});
        console.log(data);
      });
  },

  //使用本地 fake 数据实现刷新效果
  refresh: function () {
    let that = this;
    that.getGroupTopicList();
    //setTimeout(function(){that.getJoinTopicList()}, 1000);
  },

  /**
* 获取群组对应的的所有话题列表
*/
  getGroupTopicList: function () {

    let that = this;

    wx.request({
      url: api.getGroupTopicListUrl,
      data: {
        gid: that.data.groupInfo.groupid
      },
      success: function (res) {
        let data = res.data;
        console.log(that.data.groupInfo.groupid);
        console.log(data);

        if (data.result === 0) {
          //setTimeout(function () {
          that.setData({
            group_topic_list: data.data,
            group_topic_list_length: data.data.length,
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


  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    /*
    var next = util.discoveryNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    */
  }
});
