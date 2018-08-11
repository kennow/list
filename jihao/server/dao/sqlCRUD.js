// 用户相关的CRUD操作
const user = {
    queryById: 'select * from users where uid=?',
    queryBySkey: 'select * from users where skey=?',
    add: 'insert into users set ?',
    suggest: 'insert into suggest(email, content, uid) select ?, ?, uid from users where skey=?',
    hasUser: 'select count(*) as userCount from users where uid=?',
    hasUserBySkey: 'select count(*) as userCount from users where skey=?',
    update: 'update users set ? where uid=?',
    updateUserBySkey: 'update users set ? where skey=?',
    getId: 'select users.uid,users.uname,comment.create_time from users left join comment on comment.uid=users.uid where users.skey=? and comment.ccontent=?'
};

// 话题相关的CRUD操作
const topic = {
    getNextId:'insert into id_producer(sourcetype) values(1)',
    queryCreateTopicList: 'select * from topic where uid in (select uid from users where users.skey=?) order by tid desc',
    getTopicDetail: 'select * from topic, users where topic.uid = users.uid and topic.tid=?',
    queryJoinTopicList: 'select join_topic.uid as uid, join_topic.tid as tid, join_topic.gid as gid, topic.tcontent as tcontent, topic.ttitle as ttitle, topic.comment_num as comment_num, topic.create_time as create_time, topic.uid as create_uid, users.uname as uname, users.uavatar as uavatar, join_topic.create_time as join_time from (join_topic left join topic  on topic.tid = join_topic.tid) left join users on topic.uid = users.uid where join_topic.uid in (select uid from users where users.skey=?)  and join_topic.uid != topic.uid order by join_topic.create_time desc',
    queryGroupTopicList: 'select topic.uid as uid, users.uname as uname, users.uavatar as uavatar, topic.ttitle as ttitle, topic.tcontent as tcontent, topic.tid as tid, topic.gid as gid, topic.comment_num as comment_num, topic.create_time as create_time from topic,users where topic.uid = users.uid and topic.gid=? order by topic.tid desc',
    createTopicBySkey: 'insert into topic (tid, uid,gid,ttitle,tcontent,comment_num) select ?,uid, ?, ?,?, 0 from users where users.skey = ?',
    joinTopicBySkey: 'insert into join_topic (uid,tid,gid) select uid, ?, ? from users where users.skey=? on DUPLICATE KEY UPDATE create_type = 0'
};

// 评论相关的CRUD操作
const comment = {
    queryById: 'select * from comment where tid=?',
    addComment: 'insert into comment (uid,uname,uavatar,ccontent,tid) select uid,uname,uavatar,?,? from users where users.skey=?',
    queryComments: 'select * from comment where tid=? order by create_time desc limit 0,1000'
};

// 群组相关的CRUD操作
const group = {
    getGroups: "select * from users,topic, (select gid, substring_index(group_concat(tid order by tid desc), ',',1) as max_tid,  count(1) as count from topic where uid in (select uid from users where skey = ?) or tid in (select tid from join_topic where uid in  (select uid from users where skey = ?)) group by gid) b where users.uid = topic.uid and topic.tid = b.max_tid order by topic.create_time desc",
    addGroup: 'insert into wgroup (gid, gname, gavatar) VALUES (?,?,?)'
};

// 接口凭据相关的CRUD操作
const access = {
    queryToken: 'select token from access'
};

module.exports = {
    user,
    topic,
    comment,
    group,
    access
}
