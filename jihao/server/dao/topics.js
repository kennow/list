const $sqlQuery = require('./sqlCRUD').topic;
const _ = require('./query');

const topics = {
    getNextId: function() {
        return _.query($sqlQuery.getNextId,[]);
    },
    getCreateTopicList: function(skey) {
	console.log("dao getCreateTopicList:%s",skey);
        return _.query($sqlQuery.queryCreateTopicList, skey);
    },
    getJoinTopicList: function(skey) {
        return _.query($sqlQuery.queryJoinTopicList, skey);
    },
    getGroupTopicList: function(gid) {
        return _.query($sqlQuery.queryGroupTopicList, gid);
    },
    getTopicDetail: function(tid) {
        return _.query($sqlQuery.getTopicDetail, tid);
    },
    createTopicBySkey: function(topicid, skey,gid,title, content) {
        return _.query($sqlQuery.createTopicBySkey, [topicid, gid,title, content,skey]);
    },
    joinTopicBySkey: function(skey, tid, gid) {
        return _.query($sqlQuery.joinTopicBySkey, [tid, gid,skey]);
    }
};
module.exports = topics;
