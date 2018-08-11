const Users = require('../dao/users');

module.exports = {
    /**
     * 保存用户信息
     */
    saveUserInfo: function(obj) {
        const openid = obj.openid || {},
            session_key = obj.session_key || '',
            skey = obj.skey || '';
        
        // 用户信息存表
        return Users.saveUserInfo(openid, session_key, skey).then(function(resData) {
            return resData
        })
    },

    updateUserInfo: function(req, res, next) {
        // 用户信息更新
        return Users.updateUserInfo(req.body.skey, req.body.userinfo).then(function(resData) {
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

    suggest: function(req, res, next) {
        // 用户意见反馈
        return Users.suggest(req.body.skey, req.body.email, req.body.content).then(function(resData) {
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
}
