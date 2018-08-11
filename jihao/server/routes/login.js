const express = require('express');
const router  = express.Router();

/**
 * @desc    登录
 * @method  {*方法} GET
 */
router.get('/', function(req, res, next) {
  console.log(res);
  if(res['auth_data']) {
    res.json(Object.assign(res['auth_data'],{result: 0}));
  } else {
    res.json({
      result: -3,
      errmsg: '返回数据出错'
    })
  }
  
});

module.exports = router;