-- MySQL dump 10.13  Distrib 5.6.40, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: topicx
-- ------------------------------------------------------
-- Server version	5.6.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `access`
--
DROP TABLE IF EXISTS `access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `token` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'access_token',
  `expires` int(11) NOT NULL COMMENT '过期时间，单位(s)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `suggest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suggest` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `uid` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户ID',
  `email` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户email',
  `content` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户反馈内容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '意见反馈创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access`
--

LOCK TABLES `access` WRITE;
/*!40000 ALTER TABLE `access` DISABLE KEYS */;
INSERT INTO `access` VALUES (4,'9_rSqEd5oN7EPLwBrCD8kszQtqsmjWoPDsxzdwIOgzQ2Dqid6Yyj2eoJGDlNbutHgjMp44PlHH3KN8jFfbpCniQK5tFSsBpWLFKlK7YHhx6Oi74C-2pz1wwR1U0FxumP7ZSQGiGQfFQLb0SKrFROSbACAJGK',7200);
/*!40000 ALTER TABLE `access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `cmid` int(16) unsigned NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `uname` varchar(48) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名称',
  `uavatar` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `ccontent` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '评论内容',
  `tid` int(11) unsigned NOT NULL COMMENT '话题ID',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
  PRIMARY KEY (`cmid`),
  KEY `tid` (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'11111','1uname','1uavatar','好啊，一起玩',2,'2018-05-10 12:23:16'),(2,'11111','1uname','1uavatar','哈哈哈哈，再评论一条',2,'2018-05-10 12:29:51'),(3,'11111','1uname','1uavatar','第三条',2,'2018-05-10 12:32:19');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `join_topic`
--

DROP TABLE IF EXISTS `join_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `join_topic` (
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `tid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '话题ID',
  `gid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信群id',
  `create_type` int(2) DEFAULT '0' COMMENT '创建主题type，0是加入别人的话题',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '话题创建时间',
  PRIMARY KEY (`uid`,`tid`),
  KEY `gid` (`gid`),
  KEY `tid` (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `join_topic`
--

LOCK TABLES `join_topic` WRITE;
/*!40000 ALTER TABLE `join_topic` DISABLE KEYS */;
INSERT INTO `join_topic` VALUES ('2222',1,'11111group',0,'2018-05-10 10:56:37'),('2222',2,'11111group',0,'2018-05-10 10:56:59'),('2222',5,'oRxKK5SpxY1SJLL0QbCfgS4oiCrsgroup',0,'2018-05-11 08:00:19'),('anotheropenid',1,'oRxKK5SpxY1SJLL0QbCfgS4oiCrsgroup',0,'2018-05-10 10:16:14'),('oRxKK5SpxY1SJLL0QbCfgS4oiCrs',2,'11111group',0,'2018-05-11 05:49:57');
/*!40000 ALTER TABLE `join_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic` (
  `tid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '话题ID',
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `gid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信群id',
  `tcontent` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '话题内容',
  `comment_num` int(11) DEFAULT '0' COMMENT '评论个数',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '话题创建时间',
  `ttitle` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (1,'oRxKK5SpxY1SJLL0QbCfgS4oiCrs','oRxKK5SpxY1SJLL0QbCfgS4oiCrsgroup','大家一起来001',0,'2018-05-10 10:11:56','001'),(2,'11111','11111group','大家一起来002',0,'2018-05-10 10:56:12','002'),(3,'11111group','11111group','大家一起来002',0,'2018-05-11 03:28:14','003'),(4,'11111group','11111group','大家一起来003',0,'2018-05-11 03:28:55','004'),(5,'11111','11111group','大家一起来004',0,'2018-05-11 03:29:42','005'),(6,'11111','11111group','大家一起来005',0,'2018-05-11 03:31:35','006'),(7,'11111','11111group','大家一起来006',0,'2018-05-11 03:35:04','007'),(8,'oRxKK5SpxY1SJLL0QbCfgS4oiCrs','','银河系有多少颗恒星和行星？',0,'2018-05-11 04:58:08','008'),(9,'oRxKK5SpxY1SJLL0QbCfgS4oiCrs','','银河系有多少颗恒星和行星？',0,'2018-05-11 04:58:24','009'),(10,'oRxKK5SpxY1SJLL0QbCfgS4oiCrs','','银河系有多少颗恒星和行星？',0,'2018-05-11 04:58:41','010'),(11,'oRxKK5SpxY1SJLL0QbCfgS4oiCrs','','银河系有多少颗恒星和行星？',0,'2018-05-11 05:38:54','011'),(12,'oRxKK5SpxY1SJLL0QbCfgS4oiCrs','','银河系有多少颗恒星和行星？',0,'2018-05-11 05:39:13','012'),(13,'oRxKK5SpxY1SJLL0QbCfgS4oiCrs','','银河系有多少颗恒星和行星？',0,'2018-05-11 05:40:05','013'),(14,'oRxKK5SpxY1SJLL0QbCfgS4oiCrs','oRxKK5SpxY1SJLL0QbCfgS4oiCrsgroup','银河系属于哪个星系？',0,'2018-05-11 05:43:50','014');
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_topic`
--

DROP TABLE IF EXISTS `user_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_topic` (
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `tid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '话题ID',
  `gid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信群id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '话题创建时间',
  PRIMARY KEY (`uid`,`tid`),
  KEY `gid` (`gid`),
  KEY `tid` (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_topic`
--

LOCK TABLES `user_topic` WRITE;
/*!40000 ALTER TABLE `user_topic` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  KEY `skey` (`skey`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'oRxKK5SpxY1SJLL0QbCfgS4oiCrs','Ken',1,'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbFnhvbKASOVKGlNwibCz1Q6gfJ5EyGlCN2pibiciaKWdEQhYaOo9jvc46ibHc3M9iaLCeOHiaanYnact6A/1','Beijing,China','5ca596b7bf2617f4cea2f228c0b971089ce32791','IM6adxb2zneV3QdZspKNGw==','2018-05-10 10:10:00','2018-05-13 11:17:56'),(2,'11111','1uname',1,'1uavatar','1uaddress','1skey','1sessionkey','2018-05-10 11:00:07','2018-05-10 19:00:07'),(3,'2222','2uname',1,'2uavatar','2uaddress','2skey','2sessionkey','2018-05-10 11:00:39','2018-05-10 19:00:39');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wgroup`
--

DROP TABLE IF EXISTS `wgroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wgroup` (
  `gid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信群openid',
  `gname` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '微信群微信名',
  `gavatar` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '微信群头像',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  KEY `gid` (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wgroup`
--

LOCK TABLES `wgroup` WRITE;
/*!40000 ALTER TABLE `wgroup` DISABLE KEYS */;
INSERT INTO `wgroup` VALUES ('oRxKK5SpxY1SJLL0QbCfgS4oiCrsgroup','轻话题01','file://xxxx01','2018-05-11 07:48:35'),('11111group','轻话题02','file://xxxx02','2018-05-11 07:49:06');
/*!40000 ALTER TABLE `wgroup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-14 11:32:18
