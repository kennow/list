//app.js
const api = require('./config/config.js');

App({

  // 封装 wx.showToast 方法
  showInfo: function (info = 'error', icon = 'none') {
    wx.showToast({
      title: info,
      icon: icon,
      duration: 1500,
      mask: true
    });
  },
    // 小程序启动生命周期
  onLaunch: function (ops) {
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
              that.globalData.sessionKey = resData.sessionKey;
            } else {
              that.showInfo(resData.errmsg);
            }
            // 检查用户信息状态
            //that.checkUserStatus();
          },

          fail: function (error) {
            // 调用服务端登录接口失败
            that.showInfo('调用接口失败');
            console.log(error);
          }
        });
      }
    });
    // 检查用户信息状态
    //that.checkUserStatus();

    if (ops.scene == 1044) {
      //console.log(ops.shareTicket)
    }
  },

    // 获取用户登录标示 供全局调用
    getLoginFlag: function () {
        return wx.getStorageSync('loginFlag');
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

    // 获取书籍已下载路径
    getDownloadPath: function (key) {
        return wx.getStorageSync(key);
    },

    // 调用 wx.saveFile 将下载的文件保存在本地
    saveDownloadPath: function (key, filePath) {
        return new Promise((resolve, reject) => {
            wx.saveFile({
                tempFilePath: filePath,
                success: function (res) {
                    // 保存成功 在Storage中标记 下次不再下载
                    let savedFilePath = res.savedFilePath;
                    wx.setStorageSync(key, savedFilePath);
                    resolve(savedFilePath);
                },
                fail: function () {
                    reject(false);
                }
            });
        })

    },

    // app全局数据
    globalData: {
        userInfo: null,
        sessionKey: null
    }
})