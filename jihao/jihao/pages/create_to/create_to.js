const api = require('../../config/config.js');

Page({
  data: {
    name: '',
    content:'',
    encryptedData:'',
    iv:'',
    _topicid:''
  },

  // 封装 wx.showToast 方法
  showInfo: function (info = 'error', icon = 'none') {
    wx.showToast({
      title: info,
      icon: icon,
      duration: 1500,
      mask: true
    });
  },

  onShareAppMessage() {
    let that = this;
    //let _topicid='';
   // let _path='';
    return {
      title: that.data.name,
      path: "/pages/detail/detail?topicid=" + that.data._topicid,
      //path: _path,
      //path: "/pages/topic/topic",
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }

        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            that.data.encryptedData = res.encryptedData;
            that.data.iv = res.iv;
            console.log('res encryptedData，%s,%s', res.encryptedData, res.iv);
            console.log(res);
            console.log("shareTickets:%s", shareTickets[0]);
            console.log('encryptedData，%s,%s', that.data.encryptedData, that.data.iv);
            // 发送topic content 到后台服务，创建新话题
            wx.request({
              url: api.topicCreateUrl,

              data: {
                topicid: that.data._topicid,
                skey: wx.getStorageSync('loginFlag'),
                sessionKey: wx.getStorageSync('sessionKey'),
                title: that.data.name,
                content: that.data.content,
                encryptedData: that.data.encryptedData,
                iv: that.data.iv
              },

              method: 'POST',

              success: function (resData) {
                console.log('login success，%s,%s', that.data.encryptedData, that.data.iv);
                resData = resData.data;
                

                if (resData.result == 0) {
                  wx.switchTab({
                    url: '/pages/topic/topic',
                    success: function (res) {
                      // success
                    }
                  })
                } else {
                  that.showInfo(resData.errmsg);
                }
              },

              fail: function (error) {
                // 调用服务端登录接口失败
                that.showInfo('调用接口失败');
                console.log(error);
                wx.switchTab({
                  url: '/pages/create/create',
                  success: function (res) {
                    // success
                  }
                })
              }
            });
          }
        })
        
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  bindClose: function () {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
    this.setData({
        name: options.name,
        content: options.content
    })
    let that = this;
    wx.request({
      url: api.getNextIdUrl,
      data: {
      },
      success: function (res) {
        let data = res.data;
        console.log(res.data);

        if (data.result === 0) {
          that.data._topicid = res.data.topicid;
        }

        //console.log("topicid:%d",that.data._topicid);
        console.log("topicid url: %s", "/pages/detail/detail?topicid=" + that.data._topicid)
        //_path = "/pages/detail/detail?topicid=" + that.data._topicid;
        //console.log("_path: %s", _path)

      },
      error: function (err) {
        console.log(err);
      }
    })
  }
  
});