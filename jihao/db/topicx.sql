# ************************************************************
# Host: topicx.cn (MySQL 5.7.21)
# Database: topicx
# Generation Time: 2018-05-09 20:40:10 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table access
# ------------------------------------------------------------

/*CREATE DATABASE `topicx`;*/

use `topicx`;

DROP TABLE IF EXISTS `access`;

CREATE TABLE `access` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `token` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'access_token',
  `expires` int(11) NOT NULL COMMENT '过期时间，单位(s)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `access` WRITE;
/*!40000 ALTER TABLE `access` DISABLE KEYS */;

INSERT INTO `access` (`id`, `token`, `expires`)
VALUES
	(4,'8_cuEOR6I9zyYSMRje-tji4g6JFKFwKdOWHv3mF9ZjDvRaIJLU_0Nda_2abRNM9lo86IITgt8L1Sg5Wy7rsyZ15HFVeuKvYOXlO7NddeE5FzV1hQuR-r1KQil4sitpjJs_rezA3-US6rEovpB2VGOcAGAMXF',7200);

/*!40000 ALTER TABLE `access` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table wgroup
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wgroup`;

CREATE TABLE `wgroup` (
  `gid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信群openid',
  `gname` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '微信群微信名',
  `gavatar` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '微信群头像',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  key(`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `cmid` int(16) unsigned NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `uname` varchar(48) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名称',
  `uavatar` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `ccontent` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '评论内容',
  `tid` int(11) unsigned NOT NULL COMMENT '话题ID',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
  PRIMARY KEY (`cmid`),
  key(`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table topic
# ------------------------------------------------------------

DROP TABLE IF EXISTS `topic`;

CREATE TABLE `topic` (
  `tid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '话题ID',
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `gid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信群id',
  `tcontent` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '话题内容',
  `comment_num` int(11) DEFAULT '0' COMMENT '评论个数',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '话题创建时间',
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table join_topic
# ------------------------------------------------------------

DROP TABLE IF EXISTS `join_topic`;

CREATE TABLE `join_topic` (
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `tid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '话题ID',
  `gid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信群id',
  `create_type` int(2) DEFAULT '0' COMMENT '创建主题type，0是加入别人的话题',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '话题创建时间',
  PRIMARY KEY (`uid`, `tid`),
  KEY(`gid`),
  KEY(`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(64) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `uname` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '用户微信名',
  `ugender` int(1) DEFAULT NULL COMMENT '用户性别',
  `uavatar` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `uaddress` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户地址',
  `skey` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户登录态标识',
  `sessionkey` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信登录态标识',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '账号注册时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '用户最近登录时间',
  PRIMARY KEY (`id`),
  key(`skey`),
  key(`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
