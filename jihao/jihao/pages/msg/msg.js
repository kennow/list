var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    msgs: [],
    noReadBgc: "#4DA9EB",
    noReadFc: "white",
    noReadDisappearTime: 5000
  },
  onShow: function () {
	var that = this
	wx.request({
	  url: app.globalData.urlHeader + '/api/v1/msg/query?userKey=' + app.globalData.openid,
	  method: 'GET',
	  success: function(res){
      var msgs = res.data
      if(msgs != null && msgs.length > 0){
        for(var i=0; i<msgs.length; i++){
          var msg = msgs[i]
          var time = util.formatTime(new Date(msg.createTime))
          msg.createTime = time
        }
      }
      that.setData({
        msgs: msgs
      })
	  },
	  fail: function(res) {
		console.error(res)
	  }
	})
	setTimeout(function(){
			that.setData({
        noReadBgc: "#DCDCDC",
				noReadFc: "black"
			})
			// 调用已读接口
      var idsArr = new Array();
      that.data.msgs.map(function(msg){
        if (!msg.isRead){
          idsArr.push(msg.id)
        }
      })
      wx.request({
        url: app.globalData.urlHeader + '/api/v1/msg/read?ids=' + idsArr.join(",")
      })
	}, that.data.noReadDisappearTime);
  },
  detail: function(e){
    var id = e.target.dataset.id
    var type = e.target.dataset.type
    var attValue = e.target.dataset.attvalue
    if(type == 1){
      wx.navigateTo({
        url: '../apv/apv?taskId=' + attValue
      })
    }
  }
})