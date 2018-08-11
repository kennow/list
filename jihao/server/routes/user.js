const express   = require('express');
const User      = require('../controllers/users');
const router    = express.Router();

module.exports = router;

/**
 *  @desc 更新user信息
 *  @method {*请求方法} POST
 */
router.post('/updateUserInfo', function (req, res, next) {
    const userinfo = req.body.userinfo;
    const skey = req.body.skey;

    console.log(skey);
    console.log(userinfo);

    if(skey === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
        });
        return;
    }

    if (userinfo === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数userinfo字段，请检查后重试'
        });
        return;
    }

    User.updateUserInfo(req, res, next);
});

/**
 *  @desc 提交反馈信息
 *  @method {*请求方法} POST
 */
router.post('/suggest', function (req, res, next) {
    const skey =req.body.skey;
    const content = req.body.content;
    const email = req.body.email;

    console.log(email);
    console.log(skey);
    console.log(content);

    if(skey === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
        });
        return;
    }

    if (email === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数email字段，请检查后重试'
        });
        return;
    }

    if (content === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数content字段，请检查后重试'
        });
        return;
    }

    User.suggest(req, res, next);
});

