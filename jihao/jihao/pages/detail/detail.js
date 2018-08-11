// pages/detail/detail.js

const app = getApp();
const api = require('../../config/config.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        commentList: [],        // 评论列表
        topicInfo: {},           // 话题信息
        topicDetail: {},        //话题详情
        commentLoading: true,  // 评论loading态
        isMine:false           //是否是自己创建的话题
    },

    onShareAppMessage() {
      let that = this;
      return {
        title: '快来参与话题讨论',
        path: "/pages/detail/detail?topicid=" + that.data.topicDetail.topicid,
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


    goComment: function(ev) {
        // 获取dataset
        let info = ev.currentTarget.dataset;
        let navigateUrl = '../comment/comment?';

        for (let key in info) {
            info[key] = encodeURIComponent(info[key]);
            navigateUrl += key + '=' + info[key] + '&';
        }

        navigateUrl = navigateUrl.substring(0, navigateUrl.length - 1);

        wx.navigateTo({
            url: navigateUrl
        });
    },

    readBook: function() {
        let that = this;
        let fileUrl = that.data.bookInfo.file;
        let key = 'book_' + that.data.bookInfo.id;
        // 书籍是否已下载过
        let downloadPath = app.getDownloadPath(key);
        if (downloadPath) {
            app.openBook(downloadPath);
            return;
        }

        const downloadTask = wx.downloadFile({
            url: fileUrl,
            success: function(res) {
                let filePath = res.tempFilePath
                that.setData({
                    downloading: false
                });

                // 调用 wx.saveFile 将下载的文件保存在本地
                app.saveDownloadPath(key, filePath)
                    .then(function(saveFilePath) {
                        app.openBook(saveFilePath);
                    })
                    .catch(function() {
                        app.showInfo('文件保存失败');
                    });

            },
            fail: function(error) {
                that.showInfo('文档下载失败');
                console.log(error);
            }
        });

        downloadTask.onProgressUpdate(function(res) {
            that.setData({
                downloading: true,
                downloadPercent: res.progress
            });
        });
    },


    confirmBuyBook: function() {
        let that = this;
        wx.showModal({
            title: '提示',
            content: '确定用1积分兑换此书吗？',
            showCancel: true,
            cancelText: '打扰了',
            cancelColor: '#8a8a8a',
            confirmText: '确定',
            confirmColor: '#1AAD19',
            success: function(res) {
                if (res.confirm) {
                    // 兑换
                    that.buyBook();

                } else if (res.cancel) {
                    // 取消
                }
            }
        });
    },

    // 获取话题详情及评论列表
    getPageData: function() {

        let that = this;

        let requestData = {
            topicid: that.data.topicInfo.topicid,
        };

        wx.request({
            url: api.getTopicDetailUrl,
            method: 'GET',
            data: requestData,
            success: function(res) {
                console.log(res);
                if (res.data.result === 0) {
                    that.setData({
                        commentList: res.data.data.lists || [],
                        topicDetail: res.data.data.tdetail[0]
                    });

                    console.log(that.data.topicDetail);
                    console.log(that.data.commentList);

                    console.log(that.data.topicDetail);
                    that.setData({
                      commentLoading: false
                    });
/*
                    setTimeout(function() {
                        that.setData({
                            commentLoading: false
                        });
                    }, 500);
*/
                } else {
                    that.showInfo('返回数据异常');
                }
                that.joinTopic();
            },
            fail: function(error) {
                that.showInfo('请求失败');
            }
        });
    },


    showInfo: function(info, icon = 'none') {
        wx.showToast({
            title: info,
            icon: icon,
            duration: 1500,
            mask: true
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let _topicInfo = {};
        let _isMine=false;
        let that = this;

        console.log(options.topicid);

        for (let key in options) {
            _topicInfo[key] = decodeURIComponent(options[key]);
        }

        if (_topicInfo['uavatar'] != undefined) {
          _isMine = false;
        }

        that.setData({
            isMine:_isMine,
            topicInfo: _topicInfo
        });

        console.log(_topicInfo);

        that.getPageData();

    },

    joinTopic: function()
    {
      let that = this;
      // 发送topic content 到后台服务，加入新话题
      wx.request({
        url: api.topicJoinUrl,

        data: {
          skey: wx.getStorageSync('loginFlag'),
          topicid: that.data.topicDetail.topicid,
          group_openid: that.data.topicDetail.groupid
        },

        method: 'POST',

        success: function (resData) {
          resData = resData.data;
          console.log(resData);

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
    },

    // 从上级页面返回时 重新拉去评论列表
    backRefreshPage: function() {

        let that = this;
        that.setData({
            commentLoading: true
        });

        that.getPageData();

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (wx.getStorageSync('isFromBack')) {
            wx.removeStorageSync('isFromBack')
            this.backRefreshPage();
        }
    }
});