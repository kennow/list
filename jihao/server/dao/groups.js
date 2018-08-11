const $sqlQuery = require('./sqlCRUD').group;
const _ = require('./query');

const comments = {
    getGroups: function(skey) {
        return _.query($sqlQuery.getGroups, [skey, skey]);
    },
    addGroup: function(group_openid, group_name, group_avatar) {
        return _.query($sqlQuery.addGroup, [group_openid, group_name, group_avatar]);
    }
};
module.exports = comments;
