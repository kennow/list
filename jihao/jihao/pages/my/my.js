/** my.js **/
const api = require('../../config/config.js');
//获取app实例
const app = getApp();

Page({
    data: {
        userInfo: {},   // 用户信息
        hasUserInfo: true,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    // 检查本地 storage 中是否有用户态标识
    checkUserStatus: function () {
      let that = this;
      let loginFlag = wx.getStorageSync('userFlag');
      if (loginFlag) {
        // 检查 session_key 是否过期
        wx.checkSession({
          // session_key 有效(为过期)
          success: function () {
            // 直接从Storage中获取用户信息
            let userStorageInfo = wx.getStorageSync('userInfo');
            if (userStorageInfo) {
              app.globalData.userInfo = JSON.parse(userStorageInfo);
            }
          }
        });
      } 
    },

    /**
     * 执行登录操作
     */
    bindViewTap: function() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },

    /**
     * 跳转我的话题页面
     */
    goMyTopics: function() {
        wx.switchTab({
            url: '/pages/topic/topic'
        });
    },

    /**
     * 跳转意见反馈页面
     */
    suggest: function () {
      wx.navigateTo({
        url: '/pages/suggest/suggest'
      });
    },

    clearStorageManual: function(){
      try {
        wx.clearStorageSync();
        wx.showToast({
          title: '缓存清理成功',
          icon: 'success',
          duration: 2000//持续的时间

        })
      } catch (err) {
        console.log(err)
        // Do something when catch error
      }
      let that = this;
      // 展示本地存储能力
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: api.loginUrl,

            data: {
              code: res.code                    // 临时登录凭证
            },

            success: function (resData) {
              console.log('login success');
              resData = resData.data;

              if (resData.result == 0) {
                wx.setStorageSync('loginFlag', resData.skey);
                wx.setStorageSync('sessionKey', resData.sessionKey);
                app.globalData.sessionKey = resData.sessionKey;
              } else {
                app.showInfo(resData.errmsg);
              }
              // 检查用户信息状态
              //that.checkUserStatus();
            },

            fail: function (error) {
              // 调用服务端登录接口失败
              app.showInfo('调用接口失败');
              console.log(error);
            }
          });
        }
      });
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


    getUserInfo: function (e) {
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
    },

    onLoad: function() {
      let that = this;
      console.log("hasUserInfo:%s, canIUse:%s, != !hasUserInfo && canIUse", this.data.hasUserInfo, this.data.canIUse, !this.data.hasUserInfo && this.data.canIUse)

      that.checkUserStatus();
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      }
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

    onShow: function () {
      let that = this;
      that.setData({
        userInfo: app.globalData.userInfo
      });
    }

})