const Topics    = require('../dao/topics');
const Comments = require('../dao/comments');
const moment   = require('moment');

const { appConfig: config } = require('../conf/app');
const WXBizDataCrypt = require('../util/WXBizDataCrypt');

module.exports = {
    /**
     * 获取下一个topicid信息
     */
    getNextId: function(req, res, next) {
        Topics.getNextId().then(function(resData) {
            res.json({
                result: 0,
                topicid: resData.insertId
                })
        }).catch(function (reason) {
    console.log('失败：' + reason);
});
    },

    /**
     * 获取自己发起的topic列表信息
     */
    getCreateTopicList: function(req, res, next) {
	const skey = req.query.skey;
	console.log("skey=%s",skey);
        Topics.getCreateTopicList(skey).then(function(resData) {
	    console.log("after skey = %s", skey);
            res.json({
                result: 0,
                data: resData.map(function(item) {
                    // 返回的map结构
                    return {
                        uid: item.uid || '',
                       	title: item.ttitle || '',
                       	content: item.tcontent || '',
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
     * 获取自己加入的topic列表信息
     */
    getJoinTopicList: function(req, res, next) {
	const skey = req.query.skey;
        Topics.getJoinTopicList(skey).then(function(resData) {
            res.json({
                result: 0,
                data: resData.map(function(item) {
                    // 返回的map结构
                    return {
                        uid: item.uid || '',
                        uname: item.uname || '',
                        uavatar: item.uavatar || '',
                        create_uid: item.create_uid || '',
                       	title: item.ttitle || '',
                       	content: item.tcontent || '',
                        topicid: item.tid || 0,
                        groupid: item.gid || '',
                        comment_num: item.comment_num || 0,
                        create_time: item.create_time || '',
                        join_time: item.join_time || ''
                    }  
                })
            })
        })
    },

    /**
     * 获取群组对应的topic列表信息
     */
    getGroupTopicList: function(req, res, next) {
	const gid = req.query.gid;
        Topics.getGroupTopicList(gid).then(function(resData) {
            res.json({
                result: 0,
                data: resData.map(function(item) {
                    // 返回的map结构
                    return {
                        uid: item.uid || '',
                       	uname: item.uname || '',
                        uavatar: item.uavatar || '',
                       	title: item.ttitle || '',
                       	content: item.tcontent || '',
                        topicid: item.tid || 0,
                        groupid: item.gid || '',
                        comment_num: item.comment_num || 0,
                        create_time: item.create_time || ''
                    }  
                })
            })
        })
    },

    /**
     * 根据topicid查询topic详情并返回评论列表
     */
    getTopicDetail: function(req, res, next) {
        const responseData = {};
	const topicid = req.query.topicid;
        Topics.getTopicDetail(topicid).then(function(resData) {
                responseData['tdetail'] = resData.map(function(item) {
                    // 返回的map结构
                    return {
                        uid: item.uid || '',
                       	uname: item.uname || '',
                        uavatar: item.uavatar || '',
                       	title: item.ttitle || '',
                       	content: item.tcontent || '',
                        topicid: item.tid || 0,
                        groupid: item.gid || '',
                        comment_num: item.comment_num || 0,
                        create_time: item.create_time || ''
                    }  
                })
            
            // 返回当前topic评论列表
            return Comments.getComments(topicid);
            
        })
        .then(function(resCommentData) {

            if(resCommentData && resCommentData.length) {
                resCommentData.forEach(function(item) {
                    item.create_time = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
                });
                responseData['lists'] = resCommentData;
            } else {
                responseData['lists'] = [];
            }

            res.json({
                result: 0,
                data: responseData
            });
        })
        .catch(function(e){

            res.json({
                result: -2,
                errmsg: '数据查询出错，' + JSON.stringify(e)
            })

        })
    },
    /**
     * 根据用户skey标识，创建topic
     */
    createTopicBySkey: function(req, res, next) {
	
    	const {
        	appid,
        	secret
    	} = config;

	console.log("appid:%s, secret:%s", appid, secret)

	const encryptedData = req.body.encryptedData;
	const iv = req.body.iv;
	const sessionKey = req.body.sessionKey;

	var pc = new WXBizDataCrypt(appid, sessionKey)
	
	console.log("encryptedData:%s, iv:%s", encryptedData, iv)

	var data = pc.decryptData(encryptedData , iv)

	console.log('解密后 data: ', data)

	console.log('skey, gid, title, content = %s, %s, %s, %s', req.body.skey, data.openGId, req.body.title, req.body.content)
        Topics.createTopicBySkey(req.body.topicid, req.body.skey, data.openGId, req.body.title, req.body.content).then(function(resData) {

            if(resData) {
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

    },
    /**
     * 根据用户skey标识，加入topic
     */
    joinTopicBySkey: function(req, res, next) {
        Topics.joinTopicBySkey(req.body.skey, req.body.topicid, req.body.group_openid).then(function(resData) {

            if(resData) {
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
