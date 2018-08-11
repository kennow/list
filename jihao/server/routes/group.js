const express   = require('express');
const group     = require('../controllers/groups');
const router    = express.Router();

/** 
 * @desc    获取自己相关的group列表信息
 * @method  {*请求方法} GET
 */
router.get('/getGroups', function (req, res, next) {
    const skey = req.query.skey;

    if(skey === undefined || !skey) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
        });
        return;
    }

    group.getGroups(req, res, next);
});

/**
 *  @desc 增加微信群组信息
 *  @method {*请求方法} POST
 */
router.post('/addGroup', function (req, res, next) {
    const group_openid = req.body.group_openid;
    const group_name = req.body.group_name;
    const group_avatar = req.body.group_avatar;

    if(group_openid === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数group_openid字段，请检查后重试'
        });
        return;
    }
    if(group_name === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数group_name字段，请检查后重试'
        });
        return;
    }

    if (group_avatar === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数group_avatar字段，请检查后重试'
        });
        return;
    }

    group.createTopicBySkey(req, res, next);
});

module.exports = router;
