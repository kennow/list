var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
      * 页面的初始数据
      */
  data: {
    name: '',
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
      title: '快去创建你的话题',
      path: '/pages/create/create',
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
   * 用户输入标题
   */
  inputName: function (ev) {
    let that = this;
    that.setData({
      name: ev.detail.value
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
    let name = that.data.name;
    let content = that.data.content;
    let showToastFlag = false;
    let toastWording = '';

    if (that.checkEmpty(name)) {
      showToastFlag = true;
      toastWording = '标题输入不能为空';
    } else if (that.checkIllegal(name)) {
      showToastFlag = true;
      toastWording = '标题含有非法字符';
    } else if (name.length > 50) {
      showToastFlag = true;
      toastWording = '标题长度超出限制';
    }

    if (that.checkEmpty(content)) {
      showToastFlag = true;
      toastWording = '话题内容输入不能为空';
    } else if (that.checkIllegal(content)) {
      showToastFlag = true;
      toastWording = '话题内容含有非法字符';
    } else if (content.length > 1000) {
      showToastFlag = true;
      toastWording = '话题内容长度超出限制';
    }

    if (showToastFlag) {
      that.showInfo(toastWording);
      return false;
    } else {
      return true;
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
  },

  submitTopic: function (event) {
    let that = this;
    if (that.checkUserInput()) {
    util.checkUserStatus();
    console.log(event);
    wx.navigateTo({
      url: '/pages/create_to/create_to?name=' + that.data.name + '&content='+that.data.content,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
  }
})