const moment = require('moment');
const _      = require('./query');
const $sqlQuery = require('./sqlCRUD').user;
const config = require('../conf/app').userConfig;

const user = {
    saveUserInfo: function (openid, session_key, skey) {
        const uid = openid,
            create_time = moment().format('YYYY-MM-DD HH:mm:ss'),
            update_time = create_time;
        const insertObj = {
            'uid': uid,
            'create_time': create_time,
            'update_time': update_time,
            'skey': skey,
            'sessionkey': session_key
        };
        const updateObj = {
            'update_time': update_time,
            'skey': skey,
            'sessionkey': session_key
        };
        return _.query($sqlQuery.hasUser, uid)
            .then(function(res) {
                if (res && res[0] && res[0].userCount) {         // 已经有此用户，则更新用户信息
                    return _.query($sqlQuery.update, [updateObj, uid])
                } else {                        // 否则，添加此用户
                    return _.query($sqlQuery.add, insertObj)
                }
            })
            .then(function () {
                return {
		    sessionKey: session_key,
                    skey: skey
                }
            })
            .catch(function(e) {
                console.log('save userInfo error', JSON.stringify(e));
                return {
                    errmsg: JSON.stringify(e)
                }
            })
    },
    updateUserInfo: function (skey, userinfo) {
        const update_time = moment().format('YYYY-MM-DD HH:mm:ss');
        const updateObj = {
            'update_time': update_time,
            'skey': skey,
            'uname': userinfo.nickName,
            'ugender': userinfo.gender,
            'uavatar': userinfo.avatarUrl,
            'uaddress': userinfo.province
        };
        return _.query($sqlQuery.hasUserBySkey, skey)
            .then(function(res) {
                if (res && res[0] && res[0].userCount) {         // 已经有此用户，则更新用户信息
                    return _.query($sqlQuery.updateUserBySkey, [updateObj,skey])
                } else {                        // 否则，添加此用户
                    //return _.query($sqlQuery.add, insertObj)
                }
            })
            .then(function () {
		console.log('updateUserInfo success, skey: %s', skey);
                return {
                    skey: skey
                }
            })
            .catch(function(e) {
                console.log('update userInfo error', JSON.stringify(e));
                return {
                    errmsg: JSON.stringify(e)
                }
            })
    },
    suggest: function (skey, email, content) {
        return _.query($sqlQuery.suggest, [email, content, skey])
            .then(function () {
		console.log('suggest success, skey: %s', skey);
                return {
                }
            })
            .catch(function(e) {
                console.log('suggest error', JSON.stringify(e));
                return {
                    errmsg: JSON.stringify(e)
                }
            })
    },
    getUserInfoBySkey: function (skey) {
        return _.query($sqlQuery.queryBySkey, skey);
    },
    getUserId: function (skey,content) {
        return _.query($sqlQuery.getId, [skey,content]);
    }
};

module.exports = user;
