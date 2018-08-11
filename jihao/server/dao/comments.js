const $sqlQuery = require('./sqlCRUD').comment;
const _ = require('./query');

const comments = {
    getComments: function(topicid) {
        return _.query($sqlQuery.queryComments, topicid);
    },
    addCommentBySkey: function(skey, content, topicid) {
        return _.query($sqlQuery.addComment, [content, topicid, skey]);
    }
};
module.exports = comments;
