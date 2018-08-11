var util = require('../../utils/util.js')
// 获取服务器接口地址
const api = require('../../config/config.js');
var app = getApp()
Page({

    /**
        * 页面的初始数据
        */
    data: {
      email: '',
      content:''
    },


    onLoad: function () {
      wx.showShareMenu({
        withShareTicket: true //要求小程序返回分享目标信息
      })
    },
    /*
      onShow: function () {
        wx.showShareMenu({
          withShareTicket: true //要求小程序返回分享目标信息
        })
      },
      */

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
     * 用户输入电子邮件地址
     */
    inputEmail: function (ev) {
      let that = this;
      that.setData({
        email: ev.detail.value
      });
    },

    /**
   * 用户输入内容
   */
    inputContent: function (ev) {
      let that = this;
      that.setData({
        content: ev.detail.value
      });
    },

    /**
        * 检查输入是否为空
        */
    checkEmpty: function (input) {
      return input === '';
    },

    /**
     *  检查用户是否输入了非法字符
     */
    checkIllegal: function (input) {
      let patern = /[`#^<>:"?{}\/;'[\]]/im;
      let _result = patern.test(input);
      return _result;
    },

    /**
     * 检查用户输入
     */
    checkUserInput: function () {
      /*
       * 检测用户输入
       * 1. 是否包含非法字符
       * 2. 是否为空
       * 3. 是否超出长度限制
       */
      let that = this;
      let email = that.data.email;
      let content = that.data.content;
      let showToastFlag = false;
      let toastWording = '';

      if (that.checkEmpty(email)) {
        showToastFlag = true;
        toastWording = '邮件地址输入不能为空';
      } else if (that.checkIllegal(email)) {
        showToastFlag = true;
        toastWording = '邮件地址含有非法字符';
      } else if (email.length > 50) {
        showToastFlag = true;
        toastWording = '邮件地址长度超出限制';
      } else if (email.indexOf('@') === -1){
        showToastFlag = true;
        toastWording = '邮件地址格式不对，需要包含@等字符';
      }

      if (that.checkEmpty(content)) {
        showToastFlag = true;
        toastWording = '反馈内容输入不能为空';
      } else if (that.checkIllegal(content)) {
        showToastFlag = true;
        toastWording = '反馈内容含有非法字符';
      } else if (content.length > 1000) {
        showToastFlag = true;
        toastWording = '反馈内容长度超出限制';
      }

      if (showToastFlag) {
        that.showInfo(toastWording);
        return false;
      } else {
        return true;
      }
    },

    /**
     * 提交意见反馈
     */
    submitSuggest: function (ev) {

      let that = this;

        let formId = ev.detail.formId;

        if (that.checkUserInput()) {

          console.log('submit!');

          let requestData = {
            content: that.data.content,
            email: that.data.email,
            skey: wx.getStorageSync('loginFlag')
          };

          wx.request({
            url: api.suggestUrl,
            method: 'POST',
            data: requestData,
            success: function (res) {
              console.log(requestData);
              // 接口返回成功
              if (res.data.result == 0) {
                that.showInfo('反馈成功', 'success', function () {
                  wx.setStorageSync('isFromBack', '1');
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    });
                  }, 1500);
                });
              } else {
                console.log(requestData)
                console.log(res.data);
                that.showInfo(res.data.errmsg);
              }

            },
            fail: function (error) {
              that.showInfo('请求失败');
            }
          });
        }
    },


    /**
     *  封装 wx.showToast
     */
    showInfo: function (info, icon = 'none', callback = () => { }) {
      wx.showToast({
        title: info,
        icon: icon,
        duration: 1500,
        mask: true,
        success: callback
      });
    }
})