const express   = require('express');
const topic      = require('../controllers/topics');
const router    = express.Router();

/** 
 * @desc    获取下一个topicid序列号
 * @method  {*请求方法} GET
 */
router.get('/getNextId', function (req, res, next) {
    topic.getNextId(req, res, next);
});

/** 
/** 
 * @desc    获取自己发起的topic列表信息
 * @method  {*请求方法} GET
 */
router.get('/getCreateTopicList', function (req, res, next) {
    const skey = req.query.skey;

    if(skey === undefined || !skey) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
        });
        return;
    }

    topic.getCreateTopicList(req, res, next);
});

/** 
 * @desc    获取自己加入的topic列表信息
 * @method  {*请求方法} GET
 */
router.get('/getJoinTopicList', function (req, res, next) {
    const skey = req.query.skey;

    if(skey === undefined || !skey) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
        });
        return;
    }

    topic.getJoinTopicList(req, res, next);
});

/** 
 * @desc    获取群组的topic列表信息
 * @method  {*请求方法} GET
 */
router.get('/getGroupTopicList', function (req, res, next) {
    const gid = req.query.gid;

    if(gid === undefined || !gid) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数gid字段，请检查后重试'
        });
        return;
    }

    topic.getGroupTopicList(req, res, next);
});

/**
 * @desc    查询当前话题详情并返回评论列表
 * @method  {*请求方法} GET
 */
router.get('/getTopicDetail', function (req, res, next) {
    
    const topicid = parseInt(req.query.topicid);
    
    if(topicid === undefined || !topicid) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数topicid字段，请检查后重试'
        });
        return;
    }
    
    topic.getTopicDetail(req, res, next);
});

/**
 *  @desc 创建话题
 *  @method {*请求方法} POST
 */
router.post('/create', function (req, res, next) {
    const topicid = req.body.topicid;
    const skey = req.body.skey;
    const title = req.body.title;
    const content = req.body.content;
    const sessionKey = req.body.sessionKey;
    const iv = req.body.iv;
    const encryptedData = req.body.encryptedData;

    console.log(req);

    if(topicid === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数topicid字段，请检查后重试'
        });
        return;
    }
    if(skey === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
        });
        return;
    }
    if(title === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数title字段，请检查后重试'
        });
        return;
    }

    if(content === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数content字段，请检查后重试'
        });
        return;
    }

    if(sessionKey === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数sessionKey字段，请检查后重试'
        });
        return;
    }

    if(iv === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数iv字段，请检查后重试'
        });
        return;
    }

    if (encryptedData === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数encryptedData字段，请检查后重试'
        });
        return;
    }

    topic.createTopicBySkey(req, res, next);
});

/**
 *  @desc 加入话题
 *  @method {*请求方法} POST
 */
router.post('/join', function (req, res, next) {
    const skey = req.body.skey;
    const topicid = parseInt(req.body.topicid);
    const group_openid = req.body.group_openid;

    if(skey === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
        });
        return;
    }
    if(topicid === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数topicid字段，请检查后重试'
        });
        return;
    }

    if (group_openid === undefined) {
        res.json({
            result: -1,
            errmsg: 'joinTopicBySkey, 缺少请求参数gopenid字段，请检查后重试'
        });
        return;
    }

    topic.joinTopicBySkey(req, res, next);
});

module.exports = router;
