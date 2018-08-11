const Groups    = require('../dao/groups');
const Comments = require('../dao/comments');
const Users = require('../dao/users');
const moment   = require('moment');

module.exports = {
    /**
     * 获取自己相关的微信群列表信息
     */
    getGroups: function(req, res, next) {
	const skey = req.query.skey;
	console.log("skey=%s",skey);
        Groups.getGroups(skey).then(function(resData) {
	    console.log(resData);
            res.json({
                result: 0,
                data: resData.map(function(item) {
                    // 返回的map结构
                    return {
                       	group_count: item.count || '',
                       	title: item.ttitle || '',
                       	content: item.tcontent || '',
                       	uid: item.uid || '',
                       	uname: item.uname || '',
                        uavatar: item.uavatar || '',
                        topicid: item.tid || 0,
                        groupid: item.gid || '',
                        comment_num: item.comment_num || 0,
                        create_time: item.create_time || ''
                    }  
                })
            })
        }).catch(function (reason) {
    console.log('失败：' + reason);
});
    },

    /**
     * 增加微信群基本信息
     */
    addGroup: function(req, res, next) {
        Groups.addGroup(req.body.group_openid, req.body.group_name,req.body.group_avatar).then(function(resData) {

            if(resData && resData.insertId) {
                /**
                 * 推送评论消息
                 */
                //Pusher.pushMessageToUser(req);

                res.json({
                    result: 0,
                    errmsg: 'insert success!'
                });

            } else {
                
                res.json({
                    result: -2,
                    errmsg: '提交失败'
                });

            }
        })
        .catch(function(e) {
	    console.log(e);
            res.json({
                result: -3,
                errmsg: '网络错误'
            })
            
        })
    }
}
