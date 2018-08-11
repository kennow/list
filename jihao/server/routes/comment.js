const express   = require('express');
const router    = express.Router();
const Comment   = require('../controllers/comments');
/**
 *  @desc 写评论
 *  @method {*请求方法} POST
 */
router.post('/write', function (req, res, next) {
    console.log("skey:%s", req.body.skey);
    const skey = req.body.skey;
    const content = req.body.content;
    const topicid = parseInt(req.body.topicid);

    if(skey === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
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

    if (topicid === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数topicid字段，请检查后重试'
        });
        return;
    }

    Comment.addCommentBySkey(req, res, next);
});

module.exports = router;
