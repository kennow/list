/** pages/comment/comment.js **/

// 获取服务器接口地址
const api = require('../../config/config.js');
var util = require('../../utils/util.js');
// 获取app应用实例
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        topicInfo: {},
        comment: ''
    },

    /**
     * 用户输入评论
     */
    inputComment: function(ev) {
        let that = this;
        that.setData({
            comment: ev.detail.value
        });
    },

    /**
     * 检查输入是否为空
     */
    checkEmpty: function(input) {
        return input === '';
    },

    /**
     *  检查用户是否输入了非法字符
     */
    checkIllegal: function(input) {
        let patern = /[`#^<>:"?{}\/;'[\]]/im;
        let _result = patern.test(input);
        return _result;
    },

    /**
     * 检查用户输入
     */
    checkUserInput: function() {
        /*
         * 检测用户输入
         * 1. 是否包含非法字符
         * 2. 是否为空
         * 3. 是否超出长度限制
         */
        let that = this;
        let comment = that.data.comment;
        let showToastFlag = false;
        let toastWording = '';

        if (that.checkEmpty(comment)) {
            showToastFlag = true;
            toastWording = '输入不能为空';
        } else if (that.checkIllegal(comment)) {
            showToastFlag = true;
            toastWording = '含有非法字符';
        } else if (comment.length > 140) {
            showToastFlag = true;
            toastWording = '长度超出限制';
        }

        if (showToastFlag) {
            that.showInfo(toastWording);
            return false;
        } else {
            return true;
        }
    },

    /**
     * 提交评论内容
     */
    submitComment: function(ev) {
        
        let that = this;
        if(util.checkUserStatus()){
        
        let formId = ev.detail.formId;
        
        if (that.checkUserInput()) {

            console.log('submit!');

            let requestData = {
                content: that.data.comment,
                topicid: that.data.topicInfo.topicid,
                skey: wx.getStorageSync('loginFlag')
            };

            wx.request({
                url: api.addCommentUrl,
                method: 'POST',
                data: requestData,
                success: function(res) {
                    console.log(requestData);
                    // 接口返回成功
                    if (res.data.result == 0) {
                        that.showInfo('评论成功', 'success', function() {
                            wx.setStorageSync('isFromBack', '1');
                            setTimeout(function() {
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
                fail: function(error) {
                    that.showInfo('请求失败');
                }
            });
        }
        }
    },


    /**
     *  封装 wx.showToast
     */
    showInfo: function(info, icon = 'none', callback = () => {}) {
        wx.showToast({
            title: info,
            icon: icon,
            duration: 1500,
            mask: true,
            success: callback
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let _topicInfo = {};

        for (let key in options) {
            _topicInfo[key] = decodeURIComponent(options[key]);
        }

        console.log(_topicInfo);

        this.setData({
            topicInfo: _topicInfo
        });
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        console.log('current page is onReady');
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
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log('current page is onShow');
    }
});