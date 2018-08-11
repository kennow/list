// 服务器域名
const baseUrl = 'https://topic.doglucky.cn/';
// 创建话题
const topicCreateUrl 		= baseUrl + 'api/topic/create';
// 加入话题
const topicJoinUrl = baseUrl + 'api/topic/join';
// 获取下一个话题序列号ID
const getNextIdUrl = baseUrl + 'api/topic/getNextId';
//获取我创建的话题列表
const createTopicListUrl = baseUrl + 'api/topic/getCreateTopicList';
//获取我加入的话题列表
const joinTopicListUrl = baseUrl + 'api/topic/getJoinTopicList'; 
//获取群组对应的话题列表
const getGroupTopicListUrl = baseUrl + 'api/topic/getGroupTopicList';
//获取话题详情及评论列表
const getTopicDetailUrl = baseUrl + 'api/topic/getTopicDetail'; 
//添加话题评论
const addCommentUrl = baseUrl + 'api/comment/write'; 
//获取我参与的群列表
const queryGroupsUrl = baseUrl + 'api/group/getGroups';
// 写评论接口
const commentUrl 		= baseUrl + 'api/comment/write';
// 查询当前用户是否已经购买该书籍并返回评论列表接口
const queryBookUrl 		= baseUrl + 'api/book/queryBook';
// 登录接口
const loginUrl 			= baseUrl + 'login';
// 更新用户信息
const updateUserInfoUrl = baseUrl + 'api/user/updateUserInfo';
// 提交用户反馈信息
const suggestUrl = baseUrl + 'api/user/suggest';


module.exports = {
	topicCreateUrl: 		topicCreateUrl,
  topicJoinUrl: topicJoinUrl,
  createTopicListUrl: createTopicListUrl,
  joinTopicListUrl: joinTopicListUrl,
  getNextIdUrl:getNextIdUrl,
  queryGroupsUrl: queryGroupsUrl,
  getTopicDetailUrl: getTopicDetailUrl,
  getGroupTopicListUrl: getGroupTopicListUrl,
	commentUrl: 		commentUrl,
  addCommentUrl: addCommentUrl,
	queryBookUrl: 		queryBookUrl,
	loginUrl: 			loginUrl,
  updateUserInfoUrl: updateUserInfoUrl,
  suggestUrl: suggestUrl
};
