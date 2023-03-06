-- MySQL dump 10.13  Distrib 8.0.28, for macos12.2 (arm64)
--
-- Host: localhost    Database: rentall
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AdminPrivileges`
--

DROP TABLE IF EXISTS `AdminPrivileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminPrivileges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `previlegeId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `AdminPrivileges_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `AdminRoles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminPrivileges`
--

LOCK TABLES `AdminPrivileges` WRITE;
/*!40000 ALTER TABLE `AdminPrivileges` DISABLE KEYS */;
INSERT INTO `AdminPrivileges` VALUES (1,1,1,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(2,1,3,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(3,1,5,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(4,1,7,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(5,1,9,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(6,1,11,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(7,1,13,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(8,1,15,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(9,1,17,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(10,1,2,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(11,1,4,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(12,1,6,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(13,1,8,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(14,1,10,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(15,1,12,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(16,1,14,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(17,1,16,'2022-03-28 04:14:08','2022-03-28 04:14:08'),(18,1,18,'2022-03-28 04:14:08','2022-03-28 04:14:08');
/*!40000 ALTER TABLE `AdminPrivileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminRoles`
--

DROP TABLE IF EXISTS `AdminRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminRoles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminRoles`
--

LOCK TABLES `AdminRoles` WRITE;
/*!40000 ALTER TABLE `AdminRoles` DISABLE KEYS */;
INSERT INTO `AdminRoles` VALUES (1,'full admin','all roles','2022-03-28 04:14:08','2022-03-28 04:14:08');
/*!40000 ALTER TABLE `AdminRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminUser`
--

DROP TABLE IF EXISTS `AdminUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminUser` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `isSuperAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminUser`
--

LOCK TABLES `AdminUser` WRITE;
/*!40000 ALTER TABLE `AdminUser` DISABLE KEYS */;
INSERT INTO `AdminUser` VALUES ('8b16c890-c205-11e6-a2c7-4195de507451','admin@bizverse.world','$2b$08$6m7zOlBVYsJNbD7vwaJSV.tSSPiVhoTkEgRlGuJal1nE0RGA6eq6m',1,1,'2016-12-14 13:59:34','2022-03-28 04:32:41',NULL);
/*!40000 ALTER TABLE `AdminUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Banner`
--

DROP TABLE IF EXISTS `Banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banner`
--

LOCK TABLES `Banner` WRITE;
/*!40000 ALTER TABLE `Banner` DISABLE KEYS */;
INSERT INTO `Banner` VALUES (1,'Explore the world with Bizverse!','Rent suitable homes and experience your trips at an affordable cost.',1,'2019-03-27 11:53:46','2022-02-09 15:44:55');
/*!40000 ALTER TABLE `Banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BedTypes`
--

DROP TABLE IF EXISTS `BedTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BedTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `bedCount` int DEFAULT NULL,
  `bedType` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `bedType` (`bedType`),
  CONSTRAINT `BedTypes_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BedTypes_ibfk_2` FOREIGN KEY (`bedType`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=552 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BedTypes`
--

LOCK TABLES `BedTypes` WRITE;
/*!40000 ALTER TABLE `BedTypes` DISABLE KEYS */;
INSERT INTO `BedTypes` VALUES (544,207,1,16,'2022-07-11 13:08:59','2022-07-11 13:08:59'),(550,205,1,16,'2022-08-03 07:58:58','2022-08-03 07:58:58'),(551,206,1,16,'2022-08-08 08:37:20','2022-08-08 08:37:20');
/*!40000 ALTER TABLE `BedTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BlockNumber`
--

DROP TABLE IF EXISTS `BlockNumber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BlockNumber` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blockNumber` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BlockNumber`
--

LOCK TABLES `BlockNumber` WRITE;
/*!40000 ALTER TABLE `BlockNumber` DISABLE KEYS */;
INSERT INTO `BlockNumber` VALUES (1,0,'2017-04-18 20:13:25','2017-04-18 20:13:25');
/*!40000 ALTER TABLE `BlockNumber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BlogDetails`
--

DROP TABLE IF EXISTS `BlogDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BlogDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaDescription` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pageUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `footerCategory` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isPrivate` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BlogDetails`
--

LOCK TABLES `BlogDetails` WRITE;
/*!40000 ALTER TABLE `BlogDetails` DISABLE KEYS */;
INSERT INTO `BlogDetails` VALUES (1,'Test new Content','Test new content','Test new content','test-new-content','<p>test new content</p>',1,'Bizverse Rental','2022-03-28 05:13:37','2022-03-28 05:13:37',NULL);
/*!40000 ALTER TABLE `BlogDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cancellation`
--

DROP TABLE IF EXISTS `Cancellation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cancellation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `policyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `policyContent` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `priorDays` int NOT NULL,
  `accommodationPriorCheckIn` float NOT NULL,
  `accommodationBeforeCheckIn` float NOT NULL,
  `accommodationDuringCheckIn` float NOT NULL,
  `guestFeePriorCheckIn` float NOT NULL,
  `guestFeeBeforeCheckIn` float NOT NULL,
  `guestFeeDuringCheckIn` float NOT NULL,
  `hostFeePriorCheckIn` float NOT NULL,
  `hostFeeBeforeCheckIn` float NOT NULL,
  `hostFeeDuringCheckIn` float NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `nonRefundableNightsPriorCheckIn` int DEFAULT '0',
  `nonRefundableNightsBeforeCheckIn` int DEFAULT '1',
  `nonRefundableNightsDuringCheckIn` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cancellation`
--

LOCK TABLES `Cancellation` WRITE;
/*!40000 ALTER TABLE `Cancellation` DISABLE KEYS */;
INSERT INTO `Cancellation` VALUES (1,'Flexible','Cancel up to 1 day prior to arrival and get a 100% refund',1,100,100,100,100,100,0,100,100,100,1,'2017-06-09 22:43:35','2017-06-09 22:43:35',0,1,0),(2,'Moderate','Cancel up to 5 days prior to arrival and get a 50% refund',5,100,50,50,100,100,0,100,100,100,1,'2017-06-09 22:46:10','2017-06-09 22:46:10',0,1,0),(3,'Strict','Cancel up to 7 days prior to arrival and get a 50% refund',7,50,0,0,100,100,0,100,100,100,1,'2017-06-09 22:47:38','2017-06-09 22:47:38',0,0,0);
/*!40000 ALTER TABLE `Cancellation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CancellationDetails`
--

DROP TABLE IF EXISTS `CancellationDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CancellationDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `cancellationPolicy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `refundToGuest` float NOT NULL,
  `payoutToHost` float NOT NULL,
  `guestServiceFee` float NOT NULL,
  `hostServiceFee` float NOT NULL,
  `total` float NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cancelledBy` enum('host','guest') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `CancellationDetails_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CancellationDetails`
--

LOCK TABLES `CancellationDetails` WRITE;
/*!40000 ALTER TABLE `CancellationDetails` DISABLE KEYS */;
INSERT INTO `CancellationDetails` VALUES (104,1197,'Strict',3.56,48.5,0,1.5,53.56,'USD','guest','2022-08-08 09:25:24','2022-08-08 09:25:24');
/*!40000 ALTER TABLE `CancellationDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countryCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `countryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT '2018-09-29 11:22:19',
  `updatedAt` datetime DEFAULT '2018-09-29 11:22:19',
  `dialCode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (1,'DZ','Algeria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+213'),(2,'AF','Afghanistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+93'),(3,'AL','Albania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+355'),(4,'AS','AmericanSamoa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 684'),(5,'AD','Andorra',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+376'),(6,'AO','Angola',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+244'),(7,'AI','Anguilla',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 264'),(8,'AQ','Antarctica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+672'),(9,'AG','Antigua and Barbuda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1268'),(10,'AR','Argentina',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+54'),(11,'AM','Armenia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+374'),(12,'AW','Aruba',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+297'),(13,'AU','Australia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(14,'AT','Austria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+43'),(15,'AZ','Azerbaijan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+994'),(16,'BS','Bahamas',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 242'),(17,'BH','Bahrain',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+973'),(18,'BD','Bangladesh',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+880'),(19,'BB','Barbados',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 246'),(20,'BY','Belarus',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+375'),(21,'BE','Belgium',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+32'),(22,'BZ','Belize',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+501'),(23,'BJ','Benin',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+229'),(24,'BM','Bermuda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 441'),(25,'BT','Bhutan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+975'),(26,'BO','Bolivia, Plurinational State of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+591'),(27,'BA','Bosnia and Herzegovina',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+387'),(28,'BW','Botswana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+267'),(29,'BR','Brazil',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+55'),(30,'IO','British Indian Ocean Territory',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+246'),(31,'BN','Brunei Darussalam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+673'),(32,'BG','Bulgaria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+359'),(33,'BF','Burkina Faso',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+226'),(34,'BI','Burundi',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+257'),(35,'KH','Cambodia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+855'),(36,'CM','Cameroon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+237'),(37,'CA','Canada',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1'),(38,'CV','Cape Verde',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+238'),(39,'KY','Cayman Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+ 345'),(40,'CF','Central African Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+236'),(41,'TD','Chad',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+235'),(42,'CL','Chile',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+56'),(43,'CN','China',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+86'),(44,'CX','Christmas Island',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(45,'CC','Cocos (Keeling) Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(46,'CO','Colombia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+57'),(47,'KM','Comoros',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+269'),(48,'CG','Congo',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+242'),(49,'CD','Congo, The Democratic Republic of the',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+243'),(50,'CK','Cook Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+682'),(51,'CR','Costa Rica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+506'),(52,'CI','Cote d\'Ivoire',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+225'),(53,'HR','Croatia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+385'),(54,'CU','Cuba',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+53'),(55,'CY','Cyprus',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+357'),(56,'CZ','Czech Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+420'),(57,'DK','Denmark',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+45'),(58,'DJ','Djibouti',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+253'),(59,'DM','Dominica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 767'),(60,'DO','Dominican Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 849'),(61,'EC','Ecuador',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+593'),(62,'EG','Egypt',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+20'),(63,'SV','El Salvador',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+503'),(64,'GQ','Equatorial Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+240'),(65,'ER','Eritrea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+291'),(66,'EE','Estonia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+372'),(67,'ET','Ethiopia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+251'),(68,'FK','Falkland Islands (Malvinas)',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+500'),(69,'FO','Faroe Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+298'),(70,'FJ','Fiji',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+679'),(71,'FI','Finland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+358'),(72,'FR','France',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+33'),(73,'GF','French Guiana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+594'),(74,'PF','French Polynesia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+689'),(75,'GA','Gabon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+241'),(76,'GM','Gambia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+220'),(77,'GE','Georgia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+995'),(78,'DE','Germany',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+49'),(79,'GH','Ghana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+233'),(80,'GI','Gibraltar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+350'),(81,'GR','Greece',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+30'),(82,'GL','Greenland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+299'),(83,'GD','Grenada',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 473'),(84,'GP','Guadeloupe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(85,'GU','Guam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 671'),(86,'GT','Guatemala',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+502'),(87,'GG','Guernsey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(88,'GN','Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+224'),(89,'GW','Guinea-Bissau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+245'),(90,'GY','Guyana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+595'),(91,'HT','Haiti',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+509'),(92,'VA','Holy See (Vatican City State)',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+379'),(93,'HN','Honduras',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+504'),(94,'HK','Hong Kong',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+852'),(95,'HU','Hungary',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+36'),(96,'IS','Iceland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+354'),(97,'IN','India',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+91'),(98,'ID','Indonesia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+62'),(99,'IR','Iran, Islamic Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+98'),(100,'IQ','Iraq',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+964'),(101,'IE','Ireland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+353'),(102,'IM','Isle of Man',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(103,'IL','Israel',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+972'),(104,'IT','Italy',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+39'),(105,'JM','Jamaica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 876'),(106,'JP','Japan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+81'),(107,'JE','Jersey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(108,'JO','Jordan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+962'),(109,'KZ','Kazakhstan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+7 7'),(110,'KE','Kenya',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+254'),(111,'KI','Kiribati',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+686'),(112,'KP','Korea, Democratic People\'s Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+850'),(113,'KR','Korea, Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+82'),(114,'KW','Kuwait',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+965'),(115,'KG','Kyrgyzstan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+996'),(116,'LA','Lao People\'s Democratic Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+856'),(117,'LV','Latvia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+371'),(118,'LB','Lebanon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+961'),(119,'LS','Lesotho',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+266'),(120,'LR','Liberia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+231'),(121,'LY','Libyan Arab Jamahiriya',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+218'),(122,'LI','Liechtenstein',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+423'),(123,'LT','Lithuania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+370'),(124,'LU','Luxembourg',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+352'),(125,'MO','Macao',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+853'),(126,'MK','Macedonia, The Former Yugoslav Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+389'),(127,'MG','Madagascar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+261'),(128,'MW','Malawi',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+265'),(129,'MY','Malaysia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+60'),(130,'MV','Maldives',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+960'),(131,'ML','Mali',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+223'),(132,'MT','Malta',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+356'),(133,'MH','Marshall Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+692'),(134,'MQ','Martinique',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+596'),(135,'MR','Mauritania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+222'),(136,'MU','Mauritius',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+230'),(137,'YT','Mayotte',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+262'),(138,'MX','Mexico',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+52'),(139,'FM','Micronesia, Federated States of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+691'),(140,'MD','Moldova, Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+373'),(141,'MC','Monaco',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+377'),(142,'MN','Mongolia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+976'),(143,'ME','Montenegro',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+382'),(144,'MS','Montserrat',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1664'),(145,'MA','Morocco',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+212'),(146,'MZ','Mozambique',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+258'),(147,'MM','Myanmar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+95'),(148,'NA','Namibia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+264'),(149,'NR','Nauru',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+674'),(150,'NP','Nepal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+977'),(151,'NL','Netherlands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+31'),(152,'AN','Netherlands Antilles',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+599'),(153,'NC','New Caledonia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+687'),(154,'NZ','New Zealand',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+64'),(155,'NI','Nicaragua',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+505'),(156,'NE','Niger',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+227'),(157,'NG','Nigeria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+234'),(158,'NU','Niue',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+683'),(159,'NF','Norfolk Island',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+672'),(160,'MP','Northern Mariana Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 670'),(161,'NO','Norway',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+47'),(162,'OM','Oman',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+968'),(163,'PK','Pakistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+92'),(164,'PW','Palau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+680'),(165,'PS','Palestinian Territory, Occupied',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+970'),(166,'PA','Panama',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+507'),(167,'PG','Papua New Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+675'),(168,'PY','Paraguay',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+595'),(169,'PE','Peru',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+51'),(170,'PH','Philippines',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+63'),(171,'PN','Pitcairn',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+872'),(172,'PL','Poland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+48'),(173,'PT','Portugal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+351'),(174,'PR','Puerto Rico',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 939'),(175,'QA','Qatar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+974'),(176,'RO','Romania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+40'),(177,'RU','Russia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+7'),(178,'RW','Rwanda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+250'),(179,'RE','Réunion',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+262'),(180,'BL','Saint Barthélemy',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(181,'SH','Saint Helena, Ascension and Tristan Da Cunha',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+290'),(182,'KN','Saint Kitts and Nevis',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 869'),(183,'LC','Saint Lucia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 758'),(184,'MF','Saint Martin',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(185,'PM','Saint Pierre and Miquelon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+508'),(186,'VC','Saint Vincent and the Grenadines',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 784'),(187,'WS','Samoa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+685'),(188,'SM','San Marino',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+378'),(189,'ST','Sao Tome and Principe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+239'),(190,'SA','Saudi Arabia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+966'),(191,'SN','Senegal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+221'),(192,'RS','Serbia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+381'),(193,'SC','Seychelles',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+248'),(194,'SL','Sierra Leone',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+232'),(195,'SG','Singapore',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+65'),(196,'SK','Slovakia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+421'),(197,'SI','Slovenia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+386'),(198,'SB','Solomon Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+677'),(199,'SO','Somalia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+252'),(200,'ZA','South Africa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+27'),(201,'GS','South Georgia and the South Sandwich Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+500'),(202,'ES','Spain',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+34'),(203,'LK','Sri Lanka',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+94'),(204,'SD','Sudan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+249'),(205,'SR','Suriname',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+597'),(206,'SJ','Svalbard and Jan Mayen',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+47'),(207,'SZ','Swaziland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+268'),(208,'SE','Sweden',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+46'),(209,'CH','Switzerland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+41'),(210,'SY','Syrian Arab Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+963'),(211,'TW','Taiwan, Province of China',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+886'),(212,'TJ','Tajikistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+992'),(213,'TZ','Tanzania, United Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+255'),(214,'TH','Thailand',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+66'),(215,'TL','Timor-Leste',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+670'),(216,'TG','Togo',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+228'),(217,'TK','Tokelau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+690'),(218,'TO','Tonga',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+676'),(219,'TT','Trinidad and Tobago',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 868'),(220,'TN','Tunisia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+216'),(221,'TR','Turkey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+90'),(222,'TM','Turkmenistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+993'),(223,'TC','Turks and Caicos Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 649'),(224,'TV','Tuvalu',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+688'),(225,'UG','Uganda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+256'),(226,'UA','Ukraine',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+380'),(227,'AE','United Arab Emirates',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+971'),(228,'GB','United Kingdom',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(229,'US','United States',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1'),(230,'UY','Uruguay',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+598'),(231,'UZ','Uzbekistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+998'),(232,'VU','Vanuatu',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+678'),(233,'VE','Venezuela, Bolivarian Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+58'),(234,'VN','Viet Nam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+84'),(235,'VG','Virgin Islands, British',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 284'),(236,'VI','Virgin Islands, U.S.',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 340'),(237,'WF','Wallis and Futuna',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+681'),(238,'YE','Yemen',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+967'),(239,'ZM','Zambia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+260'),(240,'ZW','Zimbabwe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+263'),(241,'AX','Åland Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+358');
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Currencies`
--

DROP TABLE IF EXISTS `Currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Currencies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `isBaseCurrency` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isPayment` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Currencies`
--

LOCK TABLES `Currencies` WRITE;
/*!40000 ALTER TABLE `Currencies` DISABLE KEYS */;
INSERT INTO `Currencies` VALUES (1,'AUD',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(2,'BGN',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(3,'BRL',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(4,'CAD',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(5,'CHF',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(6,'CNY',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(7,'CZK',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(8,'DKK',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(9,'EUR',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(10,'GBP',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(11,'HKD',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(12,'HRK',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(13,'HUF',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(14,'IDR',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(15,'ILS',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(16,'INR',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(17,'JPY',1,0,'2019-03-27 11:53:47','2022-04-25 08:29:52',1),(18,'KRW',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(19,'MXN',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(20,'MYR',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(21,'NOK',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(22,'NZD',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(23,'PHP',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(24,'PLN',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(25,'RON',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(26,'RUB',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(27,'SEK',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(28,'SGD',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(29,'THB',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(30,'TRY',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(31,'USD',1,1,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(32,'ZAR',1,0,'2019-03-27 11:53:47','2022-02-09 16:38:44',1),(33,'VND',1,0,'2019-03-27 11:53:47','2019-03-27 11:53:47',1);
/*!40000 ALTER TABLE `Currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CurrencyRates`
--

DROP TABLE IF EXISTS `CurrencyRates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CurrencyRates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `currencyCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` float NOT NULL,
  `isBase` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=749 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CurrencyRates`
--

LOCK TABLES `CurrencyRates` WRITE;
/*!40000 ALTER TABLE `CurrencyRates` DISABLE KEYS */;
INSERT INTO `CurrencyRates` VALUES (1,'AED',3.6731,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(2,'AFN',88.2305,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(3,'ALL',115.579,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(4,'AMD',480.139,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(5,'ANG',1.80699,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(6,'AOA',429.255,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(7,'ARS',128.838,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(8,'AUD',1.46001,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(9,'AWG',1.79749,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(10,'AZN',1.7,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(11,'BAM',1.93086,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(12,'BBD',2.02327,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(13,'BDT',94.1664,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(14,'BGN',1.92639,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(15,'BHD',0.37695,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(16,'BIF',2064.22,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(17,'BMD',1,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(18,'BND',1.39971,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(19,'BOB',6.88327,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(20,'BRL',5.4377,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(21,'BSD',1.00261,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(22,'BTN',80.108,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(23,'BWP',12.797,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(24,'BYN',2.52595,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(25,'BYR',25259.5,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(26,'BZD',2.01981,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(27,'CAD',1.2957,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(28,'CDF',2004.81,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(29,'CHF',0.976156,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(30,'CLF',0.0380806,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(31,'CLP',1050.76,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(32,'CNY',6.7487,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(33,'COP',4363,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(34,'CRC',684.789,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(35,'CUC',1,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(36,'CVE',104.35,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(37,'CZK',24.194,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(38,'DJF',178.498,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(39,'DKK',7.33589,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(40,'DOP',54.5724,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(41,'DZD',146.38,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(42,'EGP',18.8819,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(43,'ETB',52.3351,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(44,'EUR',0.9855,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(45,'FJD',2.213,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(46,'FKP',0.83584,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(47,'GBP',0.835974,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(48,'GEL',2.93255,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(49,'GHS',8.14655,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(50,'GIP',0.83584,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(51,'GMD',54.09,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(52,'GNF',8695.65,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(53,'GTQ',7.7582,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(54,'GYD',209.777,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(55,'HKD',7.84999,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(56,'HNL',24.6526,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(57,'HRK',7.4026,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(58,'HTG',116.187,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(59,'HUF',395.679,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(60,'IDR',14984,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(61,'ILS',3.443,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(62,'INR',79.9095,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(63,'IQD',1462.63,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(64,'ISK',136.89,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(65,'JMD',151.969,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(66,'JOD',0.708991,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(67,'JPY',138.007,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(68,'KES',118.66,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(69,'KGS',80.5253,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(70,'KHR',4086.64,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(71,'KMF',464.624,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(72,'KRW',1312.4,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(73,'KWD',0.30761,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(74,'KYD',0.835026,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(75,'KZT',487.643,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(76,'LAK',15151.5,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(77,'LBP',1516.17,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(78,'LKR',358.942,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(79,'LRD',152.493,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(80,'LSL',17.1257,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(81,'LYD',4.88513,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(82,'MAD',10.5212,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(83,'MDL',19.371,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(84,'MGA',4217.63,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(85,'MKD',60.8282,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(86,'MMK',1856.39,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(87,'MNT',3144.3,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(88,'MOP',8.10213,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(89,'MUR',45.5994,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(90,'MVR',13.4891,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(91,'MWK',1029.82,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(92,'MXN',20.4308,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(93,'MYR',4.457,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(94,'MZN',63.8679,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(95,'NAD',15.8228,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(96,'NGN',426.858,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(97,'NIO',35.9436,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(98,'NOK',10.0804,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(99,'NPR',128.168,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(100,'NZD',1.62001,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(101,'OMR',0.384994,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(102,'PAB',1.00263,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(103,'PEN',3.91347,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(104,'PGK',3.53307,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(105,'PHP',56.341,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(106,'PKR',216.183,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(107,'PLN',4.7278,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(108,'PYG',6877.58,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(109,'QAR',3.641,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(110,'RON',4.86769,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(111,'RSD',115.67,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(112,'RUB',56.5005,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(113,'RWF',1027.01,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(114,'SAR',3.75436,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(115,'SBD',8.15997,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(116,'SCR',13.487,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(117,'SEK',10.3917,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(118,'SHP',0.814531,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(119,'SLL',13157.9,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(120,'SOS',577.297,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(121,'SRD',22.6193,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(122,'SSP',130.26,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(123,'STD',22538.9,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(124,'SVC',8.77351,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(125,'SZL',17.1226,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(126,'THB',36.67,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(127,'TJS',10.2272,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(128,'TMT',3.50358,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(129,'TND',3.064,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(130,'TOP',2.35571,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(131,'TRY',17.4836,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(132,'TTD',6.80774,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(133,'TWD',29.9185,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(134,'TZS',2336.99,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(135,'UAH',29.5503,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(136,'UGX',3796.51,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(137,'UYU',41.0846,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(138,'UZS',10979,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(139,'VES',4031330,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(140,'VND',23255.8,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(141,'VUV',119.189,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(142,'WST',2.72883,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(143,'XAF',646.246,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(144,'XAG',0.0534259,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(145,'XAU',0.000585,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(146,'XCD',2.7026,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(147,'XDR',0.738779,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(148,'XOF',625,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(149,'XPD',0.000529148,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(150,'XPF',113.2,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(151,'XPT',0.00116,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(152,'XTS',3550.41,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(153,'YER',250.25,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(154,'ZAR',17.1037,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(155,'ZMW',16.4682,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(156,'JEP',0.83584,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(157,'GGP',0.83584,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(158,'IMP',0.83584,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(159,'GBX',84.0396,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(160,'CNH',6.75273,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(161,'ZWD',488.464,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(162,'ZWL',322,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(163,'VEF',403133000000,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(164,'SGD',1.39532,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(165,'USD',1,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(166,'BTC',0.0000454483,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(167,'BCH',0.0084987,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(168,'BSV',0.0177839,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(169,'ETH',0.000653494,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(170,'ETH2',0.000653494,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(171,'ETC',0.0396589,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(172,'LTC',0.0175855,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(173,'ZRX',3.18032,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(174,'USDC',1,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(175,'BAT',2.35571,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(176,'LOOM',19.5312,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(177,'MANA',1.06208,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(178,'KNC',0.630239,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(179,'LINK',0.145698,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(180,'DNT',20.1207,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(181,'MKR',0.000978794,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(182,'CVC',6.74309,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(183,'OMG',0.516796,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(184,'GNT',6.21493,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(185,'DAI',1.00005,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(186,'SNT',32.3939,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(187,'ZEC',0.0156482,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(188,'XRP',2.79246,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(189,'REP',0.122249,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(190,'XLM',8.85054,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(191,'EOS',0.966184,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(192,'XTZ',0.591366,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(193,'ALGO',2.84779,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(194,'DASH',0.0207555,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(195,'ATOM',0.105591,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(196,'OXT',8.58369,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(197,'COMP',0.0177085,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(198,'ENJ',1.76835,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(199,'REPV2',0.122249,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(200,'BAND',0.65703,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(201,'NMR',0.0686813,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(202,'CGLD',0.983284,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(203,'UMA',0.36914,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(204,'LRC',2.28258,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(205,'YFI',0.000155854,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(206,'UNI',0.135593,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(207,'BAL',0.174825,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(208,'REN',6.61594,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(209,'WBTC',0.0000453829,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(210,'NU',5.56019,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(211,'YFII',0.000697562,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(212,'FIL',0.172637,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(213,'AAVE',0.0103093,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(214,'BNT',1.91571,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(215,'GRT',9.13242,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(216,'SNX',0.350816,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(217,'STORJ',1.46477,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(218,'SUSHI',0.692042,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(219,'MATIC',1.09541,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(220,'SKL',17.7148,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(221,'ADA',2.0674,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(222,'ANKR',34.4116,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(223,'CRV',0.778756,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(224,'ICP',0.13725,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(225,'NKN',9.12409,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(226,'OGN',4.5977,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(227,'1INCH',1.37363,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(228,'USDT',1.00008,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(229,'FORTH',0.27933,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(230,'CTSI',5.94001,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(231,'TRB',0.0591891,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(232,'POLY',4.84262,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(233,'MIR',5.47795,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(234,'RLC',1.03231,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(235,'DOT',0.130993,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(236,'SOL',0.0229358,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(237,'DOGE',15.0365,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(238,'MLN',0.0383804,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(239,'GTC',0.37594,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(240,'AMP',108.519,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(241,'SHIB',85360.6,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(242,'CHZ',8.75274,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(243,'KEEP',5.32765,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(244,'LPT',0.106952,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(245,'QNT',0.00986923,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(246,'BOND',0.133869,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(247,'RLY',22.6757,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(248,'CLV',9.98502,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(249,'FARM',0.0216638,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(250,'MASK',0.625,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(251,'FET',11.4943,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(252,'PAX',1.00035,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(253,'ACH',75.0948,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(254,'ASM',48.216,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(255,'PLA',2.61712,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(256,'RAI',0.342466,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(257,'TRIBE',6.46204,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(258,'ORN',0.773395,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(259,'IOTX',25.5591,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(260,'UST',23.2572,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(261,'QUICK',0.0116707,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(262,'AXS',0.0610314,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(263,'REQ',8.65426,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(264,'WLUNA',9415.31,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(265,'TRU',11.3895,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(266,'RAD',0.557103,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(267,'COTI',9.34579,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(268,'DDX',1.1976,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(269,'SUKU',9.7371,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(270,'RGT',0.194553,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(271,'XYO',141.143,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(272,'ZEN',0.0575209,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(273,'AST',11.2613,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(274,'AUCTION',0.162866,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(275,'BUSD',1,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(276,'JASMY',104.877,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(277,'WCFG',3.52113,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(278,'BTRST',0.429553,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(279,'AGLD',2.28859,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(280,'AVAX',0.0424899,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(281,'FX',3.70028,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(282,'TRAC',4.4823,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(283,'LCX',13.5593,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(284,'ARPA',25.4777,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(285,'BADGER',0.262812,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(286,'KRL',2.24871,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(287,'PERP',1.18294,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(288,'RARI',0.375235,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(289,'DESO',0.120555,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(290,'API3',0.518001,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(291,'NCT',53.8358,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(292,'SHPING',80.1764,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(293,'UPI',53.9084,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(294,'CRO',7.75494,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(295,'AVT',0.626959,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(296,'MDT',32.0667,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(297,'VGX',2.34357,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(298,'ALCX',0.0363372,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(299,'COVAL',84.4595,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(300,'FOX',11.6686,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(301,'MUSD',1.00231,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(302,'GALA',16.9578,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(303,'POWR',4.02658,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(304,'GYEN',139.159,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(305,'ALICE',0.419903,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(306,'INV',0.00841822,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(307,'LQTY',1.06952,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(308,'PRO',1.22699,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(309,'SPELL',976.324,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(310,'ENS',0.0917431,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(311,'DIA',2.2595,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(312,'BLZ',10.2881,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(313,'CTX',0.237812,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(314,'ERN',0.555556,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(315,'IDEX',13.089,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(316,'MCO2',0.224467,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(317,'POLS',1.69693,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(318,'SUPER',7.08516,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(319,'UNFI',0.150038,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(320,'STX',2.41809,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(321,'KSM',0.0156764,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(322,'GODS',2.1459,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(323,'IMX',1.01087,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(324,'RBN',3.89666,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(325,'BICO',1.84043,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(326,'GFI',0.865801,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(327,'ATA',5.5417,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(328,'GLM',4.04613,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(329,'MPL',0.0683761,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(330,'PLU',0.133156,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(331,'SAND',0.729927,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(332,'FIDA',1.86829,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(333,'ORCA',0.738171,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(334,'CRPT',6.07349,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(335,'QSP',40.7664,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(336,'RNDR',1.76663,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(337,'PRQ',4.73485,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(338,'HOPR',8.97263,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(339,'JUP',70.9925,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(340,'MATH',4.19111,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(341,'SYN',0.870701,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(342,'AIOZ',13.5962,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(343,'WAMPL',0.255428,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(344,'AERGO',7.67165,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(345,'INDEX',0.261438,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(346,'HIGH',0.623441,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(347,'GUSD',1.00251,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(348,'FLOW',0.590145,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(349,'ROSE',17.5485,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(350,'OP',1.36799,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(351,'APE',0.172161,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(352,'MINA',1.38889,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(353,'MUSE',0.076476,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(354,'DREP',1.77573,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(355,'ELA',0.628141,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(356,'FORT',3.49834,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(357,'ALEPH',3.82629,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(358,'DEXT',6.34719,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(359,'FIS',2.57136,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(360,'BIT',1.96098,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(361,'GMT',0.949668,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(362,'GST',13.3333,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(363,'MEDIA',0.0621504,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(364,'C98',1.9363,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(365,'DAR',3.13972,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(366,'GAL',0.33162,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(367,'MONA',0.000902902,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(368,'TIME',0.0108702,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(369,'BOBA',2.29621,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(370,'POND',81.3008,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(371,'DYP',3.2774,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(372,'METIS',0.0347403,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(373,'XCN',10.8826,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(374,'USD',1,1,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(375,'AED',3.6731,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(376,'AFN',88.2305,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(377,'ALL',115.579,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(378,'AMD',480.139,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(379,'ANG',1.80699,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(380,'AOA',429.255,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(381,'ARS',128.838,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(382,'AUD',1.46001,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(383,'AWG',1.79749,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(384,'AZN',1.7,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(385,'BAM',1.93086,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(386,'BBD',2.02327,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(387,'BDT',94.1664,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(388,'BGN',1.92639,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(389,'BHD',0.37695,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(390,'BIF',2064.22,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(391,'BMD',1,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(392,'BND',1.39971,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(393,'BOB',6.88327,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(394,'BRL',5.4377,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(395,'BSD',1.00261,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(396,'BTN',80.108,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(397,'BWP',12.797,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(398,'BYN',2.52595,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(399,'BYR',25259.5,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(400,'BZD',2.01981,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(401,'CAD',1.2957,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(402,'CDF',2004.81,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(403,'CHF',0.976156,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(404,'CLF',0.0380806,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(405,'CLP',1050.76,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(406,'CNY',6.7487,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(407,'COP',4363,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(408,'CRC',684.789,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(409,'CUC',1,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(410,'CVE',104.35,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(411,'CZK',24.194,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(412,'DJF',178.498,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(413,'DKK',7.33589,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(414,'DOP',54.5724,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(415,'DZD',146.38,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(416,'EGP',18.8819,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(417,'ETB',52.3351,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(418,'EUR',0.9855,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(419,'FJD',2.213,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(420,'FKP',0.83584,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(421,'GBP',0.835974,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(422,'GEL',2.93255,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(423,'GHS',8.14655,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(424,'GIP',0.83584,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(425,'GMD',54.09,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(426,'GNF',8695.65,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(427,'GTQ',7.7582,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(428,'GYD',209.777,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(429,'HKD',7.84999,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(430,'HNL',24.6526,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(431,'HRK',7.4026,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(432,'HTG',116.187,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(433,'HUF',395.679,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(434,'IDR',14984,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(435,'ILS',3.443,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(436,'INR',79.9095,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(437,'IQD',1462.63,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(438,'ISK',136.89,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(439,'JMD',151.969,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(440,'JOD',0.708991,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(441,'JPY',138.007,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(442,'KES',118.66,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(443,'KGS',80.5253,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(444,'KHR',4086.64,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(445,'KMF',464.624,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(446,'KRW',1312.4,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(447,'KWD',0.30761,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(448,'KYD',0.835026,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(449,'KZT',487.643,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(450,'LAK',15151.5,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(451,'LBP',1516.17,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(452,'LKR',358.942,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(453,'LRD',152.493,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(454,'LSL',17.1257,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(455,'LYD',4.88513,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(456,'MAD',10.5212,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(457,'MDL',19.371,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(458,'MGA',4217.63,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(459,'MKD',60.8282,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(460,'MMK',1856.39,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(461,'MNT',3144.3,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(462,'MOP',8.10213,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(463,'MUR',45.5994,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(464,'MVR',13.4891,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(465,'MWK',1029.82,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(466,'MXN',20.4308,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(467,'MYR',4.457,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(468,'MZN',63.8679,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(469,'NAD',15.8228,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(470,'NGN',426.858,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(471,'NIO',35.9436,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(472,'NOK',10.0804,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(473,'NPR',128.168,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(474,'NZD',1.62001,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(475,'OMR',0.384994,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(476,'PAB',1.00263,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(477,'PEN',3.91347,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(478,'PGK',3.53307,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(479,'PHP',56.341,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(480,'PKR',216.183,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(481,'PLN',4.7278,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(482,'PYG',6877.58,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(483,'QAR',3.641,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(484,'RON',4.86769,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(485,'RSD',115.67,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(486,'RUB',56.5005,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(487,'RWF',1027.01,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(488,'SAR',3.75436,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(489,'SBD',8.15997,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(490,'SCR',13.487,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(491,'SEK',10.3917,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(492,'SHP',0.814531,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(493,'SLL',13157.9,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(494,'SOS',577.297,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(495,'SRD',22.6193,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(496,'SSP',130.26,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(497,'STD',22538.9,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(498,'SVC',8.77351,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(499,'SZL',17.1226,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(500,'THB',36.67,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(501,'TJS',10.2272,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(502,'TMT',3.50358,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(503,'TND',3.064,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(504,'TOP',2.35571,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(505,'TRY',17.4836,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(506,'TTD',6.80774,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(507,'TWD',29.9185,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(508,'TZS',2336.99,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(509,'UAH',29.5503,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(510,'UGX',3796.51,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(511,'UYU',41.0846,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(512,'UZS',10979,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(513,'VES',4031330,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(514,'VND',23255.8,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(515,'VUV',119.189,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(516,'WST',2.72883,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(517,'XAF',646.246,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(518,'XAG',0.0534259,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(519,'XAU',0.000585,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(520,'XCD',2.7026,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(521,'XDR',0.738779,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(522,'XOF',625,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(523,'XPD',0.000529148,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(524,'XPF',113.2,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(525,'XPT',0.00116,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(526,'XTS',3550.41,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(527,'YER',250.25,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(528,'ZAR',17.1037,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(529,'ZMW',16.4682,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(530,'JEP',0.83584,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(531,'GGP',0.83584,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(532,'IMP',0.83584,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(533,'GBX',84.0396,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(534,'CNH',6.75273,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(535,'ZWD',488.464,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(536,'ZWL',322,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(537,'VEF',403133000000,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(538,'SGD',1.39532,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(539,'USD',1,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(540,'BTC',0.0000454483,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(541,'BCH',0.0084987,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(542,'BSV',0.0177839,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(543,'ETH',0.000653494,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(544,'ETH2',0.000653494,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(545,'ETC',0.0396589,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(546,'LTC',0.0175855,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(547,'ZRX',3.18032,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(548,'USDC',1,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(549,'BAT',2.35571,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(550,'LOOM',19.5312,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(551,'MANA',1.06208,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(552,'KNC',0.630239,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(553,'LINK',0.145698,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(554,'DNT',20.1207,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(555,'MKR',0.000978794,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(556,'CVC',6.74309,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(557,'OMG',0.516796,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(558,'GNT',6.21493,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(559,'DAI',1.00005,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(560,'SNT',32.3939,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(561,'ZEC',0.0156482,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(562,'XRP',2.79246,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(563,'REP',0.122249,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(564,'XLM',8.85054,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(565,'EOS',0.966184,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(566,'XTZ',0.591366,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(567,'ALGO',2.84779,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(568,'DASH',0.0207555,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(569,'ATOM',0.105591,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(570,'OXT',8.58369,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(571,'COMP',0.0177085,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(572,'ENJ',1.76835,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(573,'REPV2',0.122249,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(574,'BAND',0.65703,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(575,'NMR',0.0686813,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(576,'CGLD',0.983284,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(577,'UMA',0.36914,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(578,'LRC',2.28258,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(579,'YFI',0.000155854,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(580,'UNI',0.135593,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(581,'BAL',0.174825,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(582,'REN',6.61594,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(583,'WBTC',0.0000453829,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(584,'NU',5.56019,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(585,'YFII',0.000697562,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(586,'FIL',0.172637,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(587,'AAVE',0.0103093,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(588,'BNT',1.91571,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(589,'GRT',9.13242,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(590,'SNX',0.350816,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(591,'STORJ',1.46477,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(592,'SUSHI',0.692042,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(593,'MATIC',1.09541,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(594,'SKL',17.7148,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(595,'ADA',2.0674,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(596,'ANKR',34.4116,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(597,'CRV',0.778756,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(598,'ICP',0.13725,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(599,'NKN',9.12409,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(600,'OGN',4.5977,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(601,'1INCH',1.37363,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(602,'USDT',1.00008,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(603,'FORTH',0.27933,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(604,'CTSI',5.94001,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(605,'TRB',0.0591891,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(606,'POLY',4.84262,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(607,'MIR',5.47795,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(608,'RLC',1.03231,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(609,'DOT',0.130993,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(610,'SOL',0.0229358,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(611,'DOGE',15.0365,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(612,'MLN',0.0383804,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(613,'GTC',0.37594,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(614,'AMP',108.519,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(615,'SHIB',85360.6,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(616,'CHZ',8.75274,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(617,'KEEP',5.32765,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(618,'LPT',0.106952,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(619,'QNT',0.00986923,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(620,'BOND',0.133869,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(621,'RLY',22.6757,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(622,'CLV',9.98502,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(623,'FARM',0.0216638,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(624,'MASK',0.625,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(625,'FET',11.4943,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(626,'PAX',1.00035,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(627,'ACH',75.0948,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(628,'ASM',48.216,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(629,'PLA',2.61712,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(630,'RAI',0.342466,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(631,'TRIBE',6.46204,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(632,'ORN',0.773395,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(633,'IOTX',25.5591,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(634,'UST',23.2572,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(635,'QUICK',0.0116707,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(636,'AXS',0.0610314,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(637,'REQ',8.65426,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(638,'WLUNA',9415.31,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(639,'TRU',11.3895,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(640,'RAD',0.557103,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(641,'COTI',9.34579,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(642,'DDX',1.1976,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(643,'SUKU',9.7371,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(644,'RGT',0.194553,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(645,'XYO',141.143,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(646,'ZEN',0.0575209,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(647,'AST',11.2613,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(648,'AUCTION',0.162866,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(649,'BUSD',1,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(650,'JASMY',104.877,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(651,'WCFG',3.52113,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(652,'BTRST',0.429553,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(653,'AGLD',2.28859,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(654,'AVAX',0.0424899,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(655,'FX',3.70028,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(656,'TRAC',4.4823,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(657,'LCX',13.5593,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(658,'ARPA',25.4777,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(659,'BADGER',0.262812,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(660,'KRL',2.24871,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(661,'PERP',1.18294,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(662,'RARI',0.375235,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(663,'DESO',0.120555,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(664,'API3',0.518001,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(665,'NCT',53.8358,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(666,'SHPING',80.1764,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(667,'UPI',53.9084,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(668,'CRO',7.75494,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(669,'AVT',0.626959,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(670,'MDT',32.0667,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(671,'VGX',2.34357,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(672,'ALCX',0.0363372,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(673,'COVAL',84.4595,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(674,'FOX',11.6686,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(675,'MUSD',1.00231,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(676,'GALA',16.9578,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(677,'POWR',4.02658,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(678,'GYEN',139.159,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(679,'ALICE',0.419903,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(680,'INV',0.00841822,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(681,'LQTY',1.06952,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(682,'PRO',1.22699,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(683,'SPELL',976.324,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(684,'ENS',0.0917431,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(685,'DIA',2.2595,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(686,'BLZ',10.2881,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(687,'CTX',0.237812,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(688,'ERN',0.555556,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(689,'IDEX',13.089,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(690,'MCO2',0.224467,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(691,'POLS',1.69693,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(692,'SUPER',7.08516,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(693,'UNFI',0.150038,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(694,'STX',2.41809,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(695,'KSM',0.0156764,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(696,'GODS',2.1459,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(697,'IMX',1.01087,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(698,'RBN',3.89666,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(699,'BICO',1.84043,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(700,'GFI',0.865801,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(701,'ATA',5.5417,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(702,'GLM',4.04613,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(703,'MPL',0.0683761,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(704,'PLU',0.133156,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(705,'SAND',0.729927,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(706,'FIDA',1.86829,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(707,'ORCA',0.738171,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(708,'CRPT',6.07349,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(709,'QSP',40.7664,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(710,'RNDR',1.76663,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(711,'PRQ',4.73485,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(712,'HOPR',8.97263,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(713,'JUP',70.9925,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(714,'MATH',4.19111,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(715,'SYN',0.870701,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(716,'AIOZ',13.5962,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(717,'WAMPL',0.255428,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(718,'AERGO',7.67165,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(719,'INDEX',0.261438,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(720,'HIGH',0.623441,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(721,'GUSD',1.00251,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(722,'FLOW',0.590145,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(723,'ROSE',17.5485,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(724,'OP',1.36799,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(725,'APE',0.172161,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(726,'MINA',1.38889,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(727,'MUSE',0.076476,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(728,'DREP',1.77573,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(729,'ELA',0.628141,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(730,'FORT',3.49834,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(731,'ALEPH',3.82629,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(732,'DEXT',6.34719,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(733,'FIS',2.57136,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(734,'BIT',1.96098,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(735,'GMT',0.949668,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(736,'GST',13.3333,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(737,'MEDIA',0.0621504,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(738,'C98',1.9363,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(739,'DAR',3.13972,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(740,'GAL',0.33162,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(741,'MONA',0.000902902,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(742,'TIME',0.0108702,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(743,'BOBA',2.29621,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(744,'POND',81.3008,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(745,'DYP',3.2774,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(746,'METIS',0.0347403,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(747,'XCN',10.8826,0,'2022-07-19 06:00:00','2022-07-19 06:00:00'),(748,'USD',1,1,'2022-07-19 06:00:00','2022-07-19 06:00:00');
/*!40000 ALTER TABLE `CurrencyRates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DocumentVerification`
--

DROP TABLE IF EXISTS `DocumentVerification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocumentVerification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `fileName` varchar(255) DEFAULT NULL,
  `fileType` varchar(255) DEFAULT NULL,
  `documentStatus` enum('pending','approved') DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentVerification`
--

LOCK TABLES `DocumentVerification` WRITE;
/*!40000 ALTER TABLE `DocumentVerification` DISABLE KEYS */;
/*!40000 ALTER TABLE `DocumentVerification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EmailToken`
--

DROP TABLE IF EXISTS `EmailToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EmailToken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `EmailToken_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EmailToken`
--

LOCK TABLES `EmailToken` WRITE;
/*!40000 ALTER TABLE `EmailToken` DISABLE KEYS */;
INSERT INTO `EmailToken` VALUES (82,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','tranngoclinh2411@gmail.com','1655864260672','2022-06-22 02:17:40','2022-06-22 02:17:40'),(83,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','khanhdangbmt@gmail.com','1655968799280','2022-06-23 07:19:59','2022-06-23 07:19:59'),(84,'d2716a40-0bf3-11ed-8935-9de63631d3af','linhtn@bizverse.world','1658737735392','2022-07-25 08:28:55','2022-07-25 08:28:55');
/*!40000 ALTER TABLE `EmailToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FailedTransactionHistory`
--

DROP TABLE IF EXISTS `FailedTransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FailedTransactionHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `amount` float NOT NULL,
  `currency` varchar(255) NOT NULL,
  `reason` text NOT NULL,
  `transactionId` varchar(255) DEFAULT NULL,
  `paymentMethodId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `failedtransactionhistory_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FailedTransactionHistory`
--

LOCK TABLES `FailedTransactionHistory` WRITE;
/*!40000 ALTER TABLE `FailedTransactionHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `FailedTransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FooterBlock`
--

DROP TABLE IF EXISTS `FooterBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FooterBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title1` varchar(255) NOT NULL,
  `content1` text NOT NULL,
  `title2` varchar(255) NOT NULL,
  `content2` text NOT NULL,
  `title3` varchar(255) NOT NULL,
  `content3` text NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FooterBlock`
--

LOCK TABLES `FooterBlock` WRITE;
/*!40000 ALTER TABLE `FooterBlock` DISABLE KEYS */;
INSERT INTO `FooterBlock` VALUES (1,'24/7 customer support','If you need help while traveling or hosting, contact us at our toll free number: 000 000 0000 000','6,00,00,000 host guarantee','Hosts are protected against property damages for up to 6,00,00,000.','Verified ID','We aim to build a trusted community by giving you more info when youre deciding who to host or stay with.',1,'2018-05-22 11:12:19','2018-05-23 05:37:44');
/*!40000 ALTER TABLE `FooterBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ForgotPassword`
--

DROP TABLE IF EXISTS `ForgotPassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ForgotPassword` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `ForgotPassword_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ForgotPassword`
--

LOCK TABLES `ForgotPassword` WRITE;
/*!40000 ALTER TABLE `ForgotPassword` DISABLE KEYS */;
/*!40000 ALTER TABLE `ForgotPassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HomeBanner`
--

DROP TABLE IF EXISTS `HomeBanner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HomeBanner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `enable` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HomeBanner`
--

LOCK TABLES `HomeBanner` WRITE;
/*!40000 ALTER TABLE `HomeBanner` DISABLE KEYS */;
INSERT INTO `HomeBanner` VALUES (22,'ebec9261e9f251512c6eca594c70e82d.jpeg',1,'2022-06-03 04:52:12','2022-06-03 04:52:12'),(23,'acd4c29030088cd3325c39107d5db31c.jpeg',1,'2022-06-03 04:52:18','2022-06-03 04:52:18'),(24,'9871aa752bc5a3f1a98dce14fcbacaa8.jpeg',1,'2022-06-03 04:52:26','2022-06-03 04:52:26');
/*!40000 ALTER TABLE `HomeBanner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ImageBanner`
--

DROP TABLE IF EXISTS `ImageBanner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ImageBanner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `buttonLabel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ImageBanner`
--

LOCK TABLES `ImageBanner` WRITE;
/*!40000 ALTER TABLE `ImageBanner` DISABLE KEYS */;
INSERT INTO `ImageBanner` VALUES (1,'Hosting Fee for as low as 1%','Start earning while sharing a room with travelers.','Have A Look What You Can Earn','a3c6ee32e6725dbef015ce29276e25f0.jpeg','2019-03-27 11:53:47','2022-06-02 09:41:35');
/*!40000 ALTER TABLE `ImageBanner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListBlockedDates`
--

DROP TABLE IF EXISTS `ListBlockedDates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListBlockedDates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `reservationId` int DEFAULT NULL,
  `blockedDates` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `calendarId` int DEFAULT NULL,
  `calendarStatus` enum('available','blocked','reservation') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isSpecialPrice` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `ListBlockedDates_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ListBlockedDates_ibfk_2` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListBlockedDates`
--

LOCK TABLES `ListBlockedDates` WRITE;
/*!40000 ALTER TABLE `ListBlockedDates` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListBlockedDates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListCalendar`
--

DROP TABLE IF EXISTS `ListCalendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListCalendar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListCalendar_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListCalendar`
--

LOCK TABLES `ListCalendar` WRITE;
/*!40000 ALTER TABLE `ListCalendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListCalendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Listing`
--

DROP TABLE IF EXISTS `Listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Listing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `houseType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `residenceType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bedrooms` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buildingSize` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bedType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `beds` int DEFAULT NULL,
  `personCapacity` int DEFAULT NULL,
  `bathrooms` float DEFAULT NULL,
  `bathroomType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buildingName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lng` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isMapTouched` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `coverPhoto` int DEFAULT NULL,
  `bookingType` enum('request','instant') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'instant',
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `isReady` tinyint(1) NOT NULL DEFAULT '0',
  `reviewsCount` tinyint(1) DEFAULT '0',
  `listApprovalStatus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bizverseLat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bizverseLng` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bizverseLink360` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hasBizverseLocation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `vr360Data` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '[]',
  `isPayLater` tinyint(1) DEFAULT '0',
  `customRule` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `bizverseSpaceData` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '[]',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Listing_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Listing`
--

LOCK TABLES `Listing` WRITE;
/*!40000 ALTER TABLE `Listing` DISABLE KEYS */;
INSERT INTO `Listing` VALUES (205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'VN','157 Hồ Hán Thương',NULL,'Sơn Trà','Đà Nẵng','550000','16.091016536202922','108.22786586931151',1,'2022-06-22 02:34:51','2022-08-08 08:07:05','test','test\n',356,'instant',1,1,0,'approved',NULL,NULL,NULL,'0','[{\"title\":\"dsfdsf\",\"url\":\"https://rentall.bizverse.world/\",\"id\":\"l4qtn718\"}]',1,'','[{\"title\":\"Link bizverse space 1\",\"url\":\"https://bitbucket.org/bizverse/bizverse-rentall-web/src/2b670a07c00b20de38564308efec3ba3d0e8500c/db/config/config.json?at=master\",\"id\":\"l60krty5\"}]'),(206,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'VN','157 Hồ Hán Thương',NULL,'Sơn Trà','Đà Nẵng','550000','16.090934068118585','108.22803753068847',1,'2022-07-04 07:46:58','2022-08-08 08:37:20',NULL,NULL,NULL,'instant',0,0,0,'approved',NULL,NULL,NULL,'0','[{\"title\":\"sdfsd\",\"url\":\"https://bitbucket.org/bizverse/bizverse-rentall-web/src/2b670a07c00b20de38564308efec3ba3d0e8500c/db/config/config.json?at=master\",\"id\":\"l60ko9nn\"}]',0,'','[{\"title\":\"33333\",\"url\":\"https://bitbucket.org/bizverse/bizverse-rentall-web/src/2b670a07c00b20de38564308efec3ba3d0e8500c/db/config/config.json?at=master\",\"id\":\"l60koe08\"}]'),(207,'e3e88120-f2c4-11ec-a230-e7eb96f6f196',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'VN','109 Đường Phạm Như Xương',NULL,'Liên Chiểu','Đà Nẵng','550000','16.063741162006085','108.15302146137697',1,'2022-07-11 13:08:35','2022-07-11 13:10:20','sdf sf sf sf sf','Hello test2',348,'instant',1,1,0,'approved',NULL,NULL,NULL,'0','[]',1,'s sf sfs fs sfs','[]');
/*!40000 ALTER TABLE `Listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListingData`
--

DROP TABLE IF EXISTS `ListingData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListingData` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int DEFAULT NULL,
  `bookingNoticeTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checkInStart` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Flexible',
  `checkInEnd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Flexible',
  `minNight` int DEFAULT NULL,
  `maxNight` int DEFAULT NULL,
  `priceMode` tinyint(1) DEFAULT NULL,
  `basePrice` float DEFAULT '0',
  `maxPrice` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hostingFrequency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weeklyDiscount` float DEFAULT '0',
  `monthlyDiscount` float DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `cleaningPrice` float DEFAULT '0',
  `maxDaysNotice` enum('unavailable','3months','6months','9months','12months','available') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unavailable',
  `cancellationPolicy` int DEFAULT '1',
  `taxRate` float DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListingData_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListingData`
--

LOCK TABLES `ListingData` WRITE;
/*!40000 ALTER TABLE `ListingData` DISABLE KEYS */;
INSERT INTO `ListingData` VALUES (138,205,'58','Flexible','Flexible',0,0,NULL,50,NULL,'USD',NULL,0,0,'2022-06-22 02:36:20','2022-08-08 08:07:05',2,'available',3,0),(139,207,'58','Flexible','Flexible',0,0,NULL,5,NULL,'USD',NULL,0,0,'2022-07-11 13:10:14','2022-07-11 13:10:14',1,'available',1,0);
/*!40000 ALTER TABLE `ListingData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListingPermissionHistory`
--

DROP TABLE IF EXISTS `ListingPermissionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListingPermissionHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListingPermissionHistory`
--

LOCK TABLES `ListingPermissionHistory` WRITE;
/*!40000 ALTER TABLE `ListingPermissionHistory` DISABLE KEYS */;
INSERT INTO `ListingPermissionHistory` VALUES (178,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','submitForverification',NULL,'2022-06-22 02:36:24','2022-06-22 02:36:24'),(179,207,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','submitForverification',NULL,'2022-07-11 13:10:20','2022-07-11 13:10:20');
/*!40000 ALTER TABLE `ListingPermissionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListPhotos`
--

DROP TABLE IF EXISTS `ListPhotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListPhotos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `isCover` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isPanorama` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListPhotos_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=361 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListPhotos`
--

LOCK TABLES `ListPhotos` WRITE;
/*!40000 ALTER TABLE `ListPhotos` DISABLE KEYS */;
INSERT INTO `ListPhotos` VALUES (348,207,'00a28987afd35e681b2d2c1583e46281.jpeg','image/jpeg',0,'2022-07-11 13:09:09','2022-07-11 13:09:09',0),(356,205,'bbc34805d78524412c62c8a166782852.jpeg','image/jpeg',0,'2022-07-27 02:28:57','2022-07-27 02:29:04',1),(357,205,'ad5e86844eabf573d951d69430d72bfd.jpeg','image/jpeg',0,'2022-07-27 02:28:57','2022-07-27 07:42:58',1),(358,205,'b89612529080f2692988076610ff84c0.jpeg','image/jpeg',0,'2022-07-27 08:27:36','2022-07-27 08:27:36',0),(359,205,'050934eb96f65158744651fb1b50fac7.jpeg','image/jpeg',0,'2022-07-27 08:27:37','2022-07-27 08:27:37',0),(360,205,'8c32656cd52d6d01020b59b8eac1bef7.jpeg','image/jpeg',0,'2022-07-27 08:27:42','2022-07-27 08:27:42',0);
/*!40000 ALTER TABLE `ListPhotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListSettings`
--

DROP TABLE IF EXISTS `ListSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeId` int NOT NULL,
  `itemName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otherItemName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maximum` int DEFAULT NULL,
  `minimum` int DEFAULT NULL,
  `startValue` int DEFAULT NULL,
  `endValue` int DEFAULT NULL,
  `step` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isEnable` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `itemDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `ListSettings_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `ListSettingsTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListSettings`
--

LOCK TABLES `ListSettings` WRITE;
/*!40000 ALTER TABLE `ListSettings` DISABLE KEYS */;
INSERT INTO `ListSettings` VALUES (5,3,'House',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:35','2018-04-11 15:19:10',NULL,NULL),(6,3,'Apartment',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:42','2017-01-09 07:46:42',NULL,NULL),(7,3,'Bed & Breakfast',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:49','2017-01-09 07:46:49',NULL,NULL),(8,3,'Boutique hotel',NULL,NULL,NULL,NULL,NULL,NULL,'0','2017-01-09 07:46:57','2018-05-05 11:23:23',NULL,NULL),(10,4,'1-5 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:23','2017-01-09 07:49:23',NULL,NULL),(11,4,'6-25 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:35','2017-01-09 07:49:35',NULL,NULL),(14,5,'bedroom  ','bedrooms ',NULL,NULL,1,10,NULL,'1','2017-01-09 07:53:04','2018-05-02 04:54:59',NULL,NULL),(15,6,'bed','beds',NULL,NULL,1,16,NULL,'1','2017-01-09 07:53:48','2018-04-28 04:50:39',NULL,NULL),(16,7,'Single',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:59:47','2017-01-09 07:59:47',NULL,NULL),(17,7,'Double',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:59:57','2017-01-09 07:59:57',NULL,NULL),(18,7,'Queen',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:05','2017-01-09 08:00:05',NULL,NULL),(19,7,'King',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:13','2017-01-09 08:00:13',NULL,NULL),(20,7,'Bunk bed',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:20','2017-01-09 08:00:20',NULL,NULL),(21,8,'bathroom','bathrooms',NULL,NULL,1,8,NULL,'1','2017-01-09 08:12:24','2018-04-10 07:04:01',NULL,NULL),(22,9,'Private Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:16','2017-01-09 08:31:16',NULL,NULL),(23,9,'Shared Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:28','2017-01-09 08:31:28',NULL,NULL),(24,9,'Other',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:32','2017-01-09 08:31:32',NULL,NULL),(25,10,'Towels, bed sheets, soap, and toilet paper',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:32','2017-01-09 08:43:32',NULL,NULL),(26,10,'Wifi',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:42','2017-01-09 08:43:42',NULL,NULL),(27,10,'Shampoo ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:51','2017-01-09 08:43:51',NULL,NULL),(28,10,'Closet/drawers',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:00','2017-01-09 08:44:00',NULL,NULL),(29,11,'Smoke detector',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:17','2017-01-09 08:44:17',NULL,NULL),(30,11,'Carbon monoxide detector',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:25','2017-01-09 08:44:25',NULL,NULL),(31,11,'First aid kit ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:33','2017-01-09 08:44:33',NULL,NULL),(32,11,'Safety card',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:41','2017-01-09 08:44:41',NULL,NULL),(33,12,'Kitchen',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:19','2017-01-09 09:05:19',NULL,NULL),(34,12,'Laundry – washer ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:26','2017-01-09 09:05:26',NULL,NULL),(35,12,'Laundry – dryer',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:33','2017-01-09 09:05:33',NULL,NULL),(36,12,'Parking',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:40','2017-01-09 09:05:40',NULL,NULL),(39,2,'guest','guests',NULL,NULL,1,20,NULL,'1','2017-01-09 10:51:56','2022-05-16 10:22:01',NULL,NULL),(45,13,'Payment information',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 07:48:16','2017-01-18 07:48:16',NULL,NULL),(46,13,'Agree to your House Rules',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 08:02:20','2018-04-12 08:08:01',NULL,NULL),(47,13,'Tell you their trip purpose',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 08:02:29','2017-01-18 08:02:29',NULL,NULL),(48,14,'Suitable for children (2-14 years) ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:20','2018-03-15 18:16:04',NULL,NULL),(49,14,'Suitable for infants (Under 2 years)',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:28','2017-01-18 10:00:28',NULL,NULL),(50,14,'Suitable for pets',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:35','2017-01-18 10:00:35',NULL,NULL),(51,14,'Smoking Not allowed ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:41','2018-04-25 01:16:08',NULL,NULL),(52,14,'Events or parties allowed',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:56','2017-01-18 10:00:56',NULL,NULL),(53,15,'Meet RentAll’s guest requirements',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:08','2017-01-18 11:01:08',NULL,NULL),(54,15,'Agree to your house rules',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:16','2017-01-18 11:01:16',NULL,NULL),(55,15,'Tell you their trip purpose',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:25','2017-01-18 11:01:25',NULL,NULL),(56,15,'Let you know how many people are coming on the trip',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:03:00','2018-05-02 04:57:56',NULL,NULL),(58,16,'1 day',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:43','2017-01-18 15:19:43',NULL,NULL),(59,16,'2 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:48','2017-01-18 15:19:48',NULL,NULL),(60,16,'3 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:58','2017-01-18 15:19:58',NULL,NULL),(61,16,'7 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:20:03','2017-01-18 15:20:03',NULL,NULL),(62,17,'Dates unavailable by default',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:01','2017-01-18 18:01:01',NULL,NULL),(63,17,'Any time',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:16','2017-01-18 18:01:16',NULL,NULL),(64,17,'3 months',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:22','2017-01-18 18:01:22',NULL,NULL),(65,17,'6 months',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:29','2017-01-18 18:01:29',NULL,NULL),(66,17,'1 year',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:42','2017-01-18 18:01:42',NULL,NULL),(67,18,'night min','nights min',NULL,NULL,0,100,NULL,'1','2017-01-18 18:18:28','2018-04-28 04:56:03',NULL,NULL),(68,19,'night max','nights max',NULL,NULL,0,100,NULL,'1','2017-01-18 18:19:00','2018-05-02 04:59:10',NULL,NULL),(73,10,'Hair dryer',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-28 11:36:34','2017-07-28 14:45:50',NULL,NULL),(74,1,'Guest Room',NULL,NULL,NULL,NULL,NULL,NULL,'0','2017-07-28 14:21:14','2018-04-27 14:15:42',NULL,NULL),(76,1,'Private Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-30 04:24:13','2017-07-30 04:24:13',NULL,NULL),(77,1,'Entire Place',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-30 04:24:18','2018-04-27 13:10:06',NULL,NULL),(87,10,'LED TV',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-10 05:13:44','2018-04-28 04:52:14',NULL,NULL),(97,10,'TV',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-10 07:29:11','2018-04-10 07:29:32',NULL,NULL),(100,3,'Cottage ',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-10 08:56:22','2018-04-28 04:47:07',NULL,NULL),(102,4,'25-50 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-10 08:57:40','2018-04-28 04:48:13',NULL,NULL),(103,14,'Loud Music Not Allowed',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-10 09:00:48','2018-05-02 04:57:29',NULL,NULL),(105,4,'50-100 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-12 08:08:55','2018-04-28 04:48:27',NULL,NULL),(106,10,'item',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-12 08:09:22','2018-04-23 15:27:14',NULL,NULL),(110,1,'Landscape Trailer',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-24 00:24:06','2018-04-27 14:15:50',NULL,NULL),(112,1,'Tent',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-24 02:28:25','2018-05-02 04:53:56',NULL,NULL),(113,1,'Shared Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:28:41','2018-04-24 02:28:41',NULL,NULL),(118,10,'Parking',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:33:13','2018-04-24 02:33:13',NULL,NULL),(119,10,'Swimming Pool',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:33:23','2020-04-13 13:09:35','d8e103a2e500b56205bd28147fccae88.png',NULL),(123,3,'House with garden',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-25 14:56:34','2018-04-28 04:47:28',NULL,NULL),(125,14,'Loud People are not allowed',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-25 14:59:40','2018-04-28 04:27:21',NULL,NULL),(126,4,'100+ Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:49:12','2018-04-28 04:49:12',NULL,NULL),(127,13,'Confirmed Email',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:53:50','2018-04-28 04:53:50',NULL,NULL),(128,16,'Same day',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:55:21','2018-04-30 21:33:25',NULL,NULL);
/*!40000 ALTER TABLE `ListSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListSettingsTypes`
--

DROP TABLE IF EXISTS `ListSettingsTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListSettingsTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) NOT NULL,
  `fieldType` enum('stringType','numberType') DEFAULT 'stringType',
  `step` int DEFAULT '1',
  `isEnable` varchar(255) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `typeLabel` varchar(255) DEFAULT NULL,
  `isMultiValue` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListSettingsTypes`
--

LOCK TABLES `ListSettingsTypes` WRITE;
/*!40000 ALTER TABLE `ListSettingsTypes` DISABLE KEYS */;
INSERT INTO `ListSettingsTypes` VALUES (1,'roomType','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Room Type',0),(2,'personCapacity','numberType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Person Capacity',0),(3,'houseType','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','House Type',0),(4,'buildingSize','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Building Size',0),(5,'bedrooms','numberType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Bed Rooms',0),(6,'beds','numberType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Beds',0),(7,'bedType','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Bed Type',0),(8,'bathrooms','numberType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Bathrooms',0),(9,'bathroomType','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Bathroom Type',0),(10,'essentialsAmenities','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Essential Amenities',1),(11,'safetyAmenities','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Safety Amenities',1),(12,'spaces','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Spaces',1),(13,'guestRequirements','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Guest Requirements',0),(14,'houseRules','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','House Rules',1),(15,'reviewGuestBook','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Review How Guests Book',0),(16,'bookingNoticeTime','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Booking Notice Time',0),(17,'maxDaysNotice','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Maximum Days Notice',0),(18,'minNight','numberType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Minimum Nights',0),(19,'maxNight','numberType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Maximum Nights',0);
/*!40000 ALTER TABLE `ListSettingsTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListViews`
--

DROP TABLE IF EXISTS `ListViews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListViews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=246 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListViews`
--

LOCK TABLES `ListViews` WRITE;
/*!40000 ALTER TABLE `ListViews` DISABLE KEYS */;
INSERT INTO `ListViews` VALUES (236,205,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','2022-06-23 07:20:16','2022-06-23 07:20:16'),(237,205,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','2022-06-30 10:13:04','2022-06-30 10:13:04'),(238,205,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','2022-07-08 02:25:12','2022-07-08 02:25:12'),(239,207,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','2022-07-11 13:11:56','2022-07-11 13:11:56'),(240,205,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','2022-07-15 10:49:35','2022-07-15 10:49:35'),(241,207,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','2022-07-19 03:38:58','2022-07-19 03:38:58'),(242,207,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','2022-07-26 03:39:12','2022-07-26 03:39:12'),(243,205,'d2716a40-0bf3-11ed-8935-9de63631d3af','2022-07-27 07:24:03','2022-07-27 07:24:03'),(244,207,'d2716a40-0bf3-11ed-8935-9de63631d3af','2022-07-29 02:44:51','2022-07-29 02:44:51'),(245,205,'d2716a40-0bf3-11ed-8935-9de63631d3af','2022-08-03 07:59:31','2022-08-03 07:59:31');
/*!40000 ALTER TABLE `ListViews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NFT`
--

DROP TABLE IF EXISTS `NFT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NFT` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int DEFAULT NULL,
  `hostId` varchar(255) DEFAULT NULL,
  `state` enum('expired','active','cancelled') DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `roomType` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `country` varchar(255) NOT NULL,
  `guestNumber` int NOT NULL,
  `beds` int NOT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `houseType` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `uri` varchar(255) DEFAULT NULL,
  `isSelling` tinyint(1) DEFAULT '0',
  `canBooking` tinyint(1) DEFAULT '0',
  `nftState` varchar(255) DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `mintingPrice` int DEFAULT NULL,
  `lastPrice` int DEFAULT NULL,
  `currentPrice` int DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `originalOwner` varchar(255) DEFAULT NULL,
  `tokenId` int DEFAULT NULL,
  `reservationId` int DEFAULT NULL,
  `requestUser` varchar(255) DEFAULT NULL,
  `claimWallet` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `isOnMarketplace` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NFT`
--

LOCK TABLES `NFT` WRITE;
/*!40000 ALTER TABLE `NFT` DISABLE KEYS */;
INSERT INTO `NFT` VALUES (207,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','active','157 Hồ Hán Thương Sơn Trà','2022-08-25','2022-08-27','https://bizverse-rentall-storage.s3.ap-southeast-1.amazonaws.com/images/upload/x_large_bbc34805d78524412c62c8a166782852.jpeg','Private Room','test','VN',1,1,'http://localhost:3000/rooms/205','Sơn Trà','House','2022-08-08 07:40:13','2022-08-08 07:40:13',NULL,0,0,NULL,'admin',NULL,NULL,NULL,0,'0x1c134d615a096cdc3764faa034162edff1433501',116,1194,'d2716a40-0bf3-11ed-8935-9de63631d3af',NULL,NULL,0),(208,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','active','157 Hồ Hán Thương Sơn Trà','2022-08-11','2022-08-13','https://bizverse-rentall-storage.s3.ap-southeast-1.amazonaws.com/images/upload/x_large_bbc34805d78524412c62c8a166782852.jpeg','Private Room','test','VN',1,1,'http://localhost:3000/rooms/205','Sơn Trà','House','2022-08-08 07:56:48','2022-08-08 07:56:48',NULL,0,0,NULL,'admin',NULL,NULL,NULL,0,'0x1c134d615a096cdc3764faa034162edff1433501',117,1195,'d2716a40-0bf3-11ed-8935-9de63631d3af',NULL,NULL,0),(209,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','active','157 Hồ Hán Thương Sơn Trà','2022-08-13','2022-08-14','https://bizverse-rentall-storage.s3.ap-southeast-1.amazonaws.com/images/upload/x_large_bbc34805d78524412c62c8a166782852.jpeg','Private Room','test','VN',1,1,'http://localhost:3000/rooms/205','Sơn Trà','House','2022-08-08 08:07:56','2022-08-08 08:07:56',NULL,0,0,NULL,'admin',NULL,NULL,NULL,0,'0x1c134d615a096cdc3764faa034162edff1433501',118,1196,'d2716a40-0bf3-11ed-8935-9de63631d3af',NULL,NULL,0),(210,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','active','157 Hồ Hán Thương Sơn Trà','2022-08-10','2022-08-11','https://bizverse-rentall-storage.s3.ap-southeast-1.amazonaws.com/images/upload/x_large_bbc34805d78524412c62c8a166782852.jpeg','Private Room','test','VN',1,1,'http://localhost:3000/rooms/205','Sơn Trà','House','2022-08-08 09:24:53','2022-08-08 09:25:24',NULL,0,0,NULL,'admin',NULL,NULL,NULL,1,'0x1c134d615a096cdc3764faa034162edff1433501',119,1197,'d2716a40-0bf3-11ed-8935-9de63631d3af',NULL,NULL,0);
/*!40000 ALTER TABLE `NFT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NFTTransaction`
--

DROP TABLE IF EXISTS `NFTTransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NFTTransaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transactionId` varchar(255) NOT NULL,
  `nftId` int NOT NULL,
  `status` enum('created','closed','cancelled','replaced') NOT NULL,
  `seller` varchar(255) NOT NULL,
  `price` float DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `transactionCreatedAt` varchar(255) DEFAULT NULL,
  `buyer` varchar(255) DEFAULT NULL,
  `blockNumber` varchar(255) DEFAULT NULL,
  `blockTimestamp` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nftId` (`nftId`),
  CONSTRAINT `nfttransaction_ibfk_1` FOREIGN KEY (`nftId`) REFERENCES `NFT` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NFTTransaction`
--

LOCK TABLES `NFTTransaction` WRITE;
/*!40000 ALTER TABLE `NFTTransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `NFTTransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentMethodDetail`
--

DROP TABLE IF EXISTS `PaymentMethodDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentMethodDetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `methodName` varchar(255) NOT NULL,
  `paymentDetailType` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentMethodDetail`
--

LOCK TABLES `PaymentMethodDetail` WRITE;
/*!40000 ALTER TABLE `PaymentMethodDetail` DISABLE KEYS */;
INSERT INTO `PaymentMethodDetail` VALUES (1,'3','OneFin E-wallet','11'),(2,'3','ATM card (Napas)','10'),(3,'3','Visa/Master/JCD/Amex/Discover/Diners','5');
/*!40000 ALTER TABLE `PaymentMethodDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentMethods`
--

DROP TABLE IF EXISTS `PaymentMethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentMethods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `processedIn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fees` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentType` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentMethods`
--

LOCK TABLES `PaymentMethods` WRITE;
/*!40000 ALTER TABLE `PaymentMethods` DISABLE KEYS */;
INSERT INTO `PaymentMethods` VALUES (1,'Paypal','3–4 hours','PayPal withdrawal fees','USD','Connect your existing PayPal account.',1,'2017-04-18 20:13:25','2017-04-18 20:13:25',1),(2,'Bank Account','5–7 business days','No fees','USD','Add your bank details',1,'2018-01-04 17:26:45','2018-01-04 17:26:45',2),(3,'OneFin','5-10 seconds','5-10 seconds','VND','Add your OneFin account',1,'2017-04-18 20:13:25','2017-04-18 20:13:25',3),(4,'Pay Later','0 seconds','No fees','VND','Payment when you check in',1,'2017-04-18 20:13:25','2017-04-18 20:13:25',4);
/*!40000 ALTER TABLE `PaymentMethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentSettings`
--

DROP TABLE IF EXISTS `PaymentSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentStatus` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'false',
  `paymentMode` enum('live','sandbox') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'sandbox',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APIUserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APIPassword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APISecret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AppId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentSettings`
--

LOCK TABLES `PaymentSettings` WRITE;
/*!40000 ALTER TABLE `PaymentSettings` DISABLE KEYS */;
INSERT INTO `PaymentSettings` VALUES (1,'paypal','false','sandbox','admin@gmail.com','Hello User Id','Hello password','Hello Secret','Hello Id','2019-03-27 11:53:47','2017-02-24 11:29:31');
/*!40000 ALTER TABLE `PaymentSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payout`
--

DROP TABLE IF EXISTS `Payout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `methodId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address1` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `address2` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `default` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `last4Digits` int DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Payout_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payout`
--

LOCK TABLES `Payout` WRITE;
/*!40000 ALTER TABLE `Payout` DISABLE KEYS */;
INSERT INTO `Payout` VALUES (28,1,'d2716a40-0bf3-11ed-8935-9de63631d3af','sb-h7yvd16395191@personal.example.com','157 Hồ Hán Thương',NULL,'Sơn Trà','550000','Đà Nẵng','VN','USD',1,'2022-08-03 08:36:18','2022-08-03 08:36:18',NULL,1);
/*!40000 ALTER TABLE `Payout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PopularLocation`
--

DROP TABLE IF EXISTS `PopularLocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PopularLocation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(255) NOT NULL,
  `locationAddress` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PopularLocation`
--

LOCK TABLES `PopularLocation` WRITE;
/*!40000 ALTER TABLE `PopularLocation` DISABLE KEYS */;
INSERT INTO `PopularLocation` VALUES (15,'Ha Long','H? Long Bay, Thành ph? H? Long, Qu?ng Ninh, Vietnam','9b4de640f3aca42476c0574bef1a076a.jpeg',1,'2022-06-02 09:03:27','2022-06-03 04:49:45'),(16,'Ho Chi Minh City','Ho Chi Minh, Ho Chi Minh City, Vietnam','fa5f27047c54939762b68f84ff9155c8.png',1,'2022-06-02 09:08:10','2022-06-03 04:49:54'),(17,'Da Nang','Da Nang, Vietnam','b5c66d137f07ee60f0e780719fea32b3.jpeg',1,'2022-06-02 09:09:29','2022-06-03 04:50:03'),(18,'Hue','Hue, Thua Thien Hue, Vietnam','34016fc3ffc2a58088509094b5d3fd06.jpeg',1,'2022-06-02 09:10:09','2022-06-03 04:50:12'),(19,'Phong Nha','Phong Nha - Ke Bang National Park Headquarter, Phong Natural Heritage Area, S?n Tr?ch, B? Tr?ch District, Quang Binh Province, Vietnam','8be08e1434c6f7c1b3dc26096341161e.jpeg',1,'2022-06-02 09:11:09','2022-06-03 04:50:21'),(20,'My Son','My Son Sanctuary, Duy Phú, Duy Xuyên District, Qu?ng Nam, Vietnam','a41ac968504268aeb2f6f9e828a0ab5f.png',1,'2022-06-02 09:12:37','2022-06-03 04:50:31'),(21,'Hoi An','H?i An, Qu?ng Nam, Vietnam','0a201f2c38d3282b501a4d1d43aad9f7.jpeg',1,'2022-06-02 09:13:21','2022-06-03 04:50:44'),(22,'Sapa Countryside','Sapa, Sa Pa, Lao Cai, Vietnam','7e063431fc134602a0254219bb5b824d.jpeg',1,'2022-06-02 09:13:54','2022-06-03 04:50:52'),(23,'Ha Noi','Hà N?i, Hoàn Ki?m, Hanoi, Vietnam','7188d89d6e3673e4137714c1c963769a.jpeg',1,'2022-06-02 09:14:30','2022-06-03 04:51:01'),(24,'Nha Trang','Nha Trang, Khánh Hòa, Vietnam','a23e1fa67b352de897d18adda9d5d460.jpeg',1,'2022-06-02 09:15:14','2022-06-03 04:51:11'),(25,'Cu Chi Tunnels','Cu Chi Tunnels Tours, ?? Quang ??u, Pham Ngu Lao, District 1, Ho Chi Minh City, Vietnam','3972839cd768ec621d6c1601577260c0.jpeg',1,'2022-06-02 09:15:49','2022-06-03 04:51:22'),(26,'Ba Be National Park','Ba Be National Park, B? Lù, Ba B? District, B?c K?n Province, Vietnam','b59822c507be0eee091052ea1df8a66a.jpeg',1,'2022-06-02 09:16:34','2022-06-03 04:51:36'),(27,'Mekong Delta','Mekong-delta, Vietnam','4217b34d464706e744c810856190324e.jpeg',1,'2022-06-02 09:17:10','2022-06-03 04:51:43');
/*!40000 ALTER TABLE `PopularLocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QRCode`
--

DROP TABLE IF EXISTS `QRCode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QRCode` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nftId` int DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `isAvailable` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QRCode`
--

LOCK TABLES `QRCode` WRITE;
/*!40000 ALTER TABLE `QRCode` DISABLE KEYS */;
INSERT INTO `QRCode` VALUES (1,104,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','0x1C134D615a096cdC3764FAa034162eDFf1433501','31f79d61417a41efa5bc5d7b9d089dc5',1,'2022-07-13 09:50:02','2022-07-13 09:50:02'),(2,108,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','0x3ad5449a936d2a8b57e14ad97482401631e2f259','ca95542faf8245ca8a7900ce329baea8',1,'2022-07-15 11:35:49','2022-07-15 11:35:49'),(3,112,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','0x3ad5449a936d2a8b57e14ad97482401631e2f259','91305cbe93d44a11a4e546ca7ca26697',1,'2022-07-18 07:32:00','2022-07-18 07:32:00'),(4,113,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','0x3ad5449a936d2a8b57e14ad97482401631e2f259','4750d98b45aa4bb998ad57b963623269',1,'2022-07-18 07:37:37','2022-07-18 07:37:37'),(5,96,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','0x1c134d615a096cdc3764faa034162edff1433501','3e1c6e55c1304402b992f94cc7dbed4f',1,'2022-07-19 01:55:32','2022-07-19 01:55:32'),(6,110,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','admin','6174b608beda46d2936c17c23ee3b5e2',1,'2022-07-19 03:26:32','2022-07-19 03:26:32'),(7,106,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','admin','ec29114d67d8412d95925863fb4cdf25',1,'2022-07-19 03:26:36','2022-07-19 03:26:36'),(8,105,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','0x1c134d615a096cdc3764faa034162edff1433501','c17d5e47a92e4b029bbb18921d254466',1,'2022-07-19 03:30:05','2022-07-19 03:30:05'),(9,114,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','admin','da396ca75cc843f0ba8425c68322c348',1,'2022-07-19 04:00:49','2022-07-19 04:00:49'),(10,115,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','admin','1b20a1b38fcd4a70877c3af300b44bb2',1,'2022-07-19 04:07:52','2022-07-19 04:07:52'),(11,117,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','admin','f2bf2fb64ef04b6d94bcaf7395e42419',1,'2022-07-19 04:29:13','2022-07-19 04:29:13'),(12,118,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','admin','eb0edada0ddf47a5b3d4d8b512c347d6',1,'2022-07-19 04:32:11','2022-07-19 04:32:11'),(13,119,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','0x1c134d615a096cdc3764faa034162edff1433501','0e20be7c33494fd19b582d10fc6108bf',1,'2022-07-19 08:31:06','2022-07-19 08:31:06'),(14,121,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','0x1c134d615a096cdc3764faa034162edff1433501','44f718c12b9b48a79ac23a8d8eeb9450',1,'2022-07-19 08:36:17','2022-07-19 08:36:17'),(15,122,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','0x1c134d615a096cdc3764faa034162edff1433501','fde687f5e68a4b2487e65923879c056a',1,'2022-07-19 08:46:03','2022-07-19 08:46:03'),(16,123,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','0x1c134d615a096cdc3764faa034162edff1433501','7f45ddc115a947aea9c7cbdc172ee90c',1,'2022-07-19 08:51:00','2022-07-19 08:51:00'),(17,124,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','0x1c134d615a096cdc3764faa034162edff1433501','e404d12f2a594174929ff693d11f5b07',1,'2022-07-19 08:59:13','2022-07-19 08:59:13'),(18,125,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','0x1c134d615a096cdc3764faa034162edff1433501','57a6488eaacf4999a24ee2607eb22fa1',1,'2022-07-19 09:38:43','2022-07-19 09:38:43'),(19,126,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','admin','e8703140afd34cd1a85263d25d28b1fb',1,'2022-07-20 11:05:55','2022-07-20 11:05:55'),(20,127,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','admin','641ede75f85a480a8416fb5feb86511a',1,'2022-07-20 11:05:58','2022-07-20 11:05:58'),(21,118,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','0x1c134d615a096cdc3764faa034162edff1433501','f00058a2e8e447bfb3ee29a3b332aa17',1,'2022-07-21 02:32:13','2022-07-21 02:32:13'),(22,144,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','0x1c134d615a096cdc3764faa034162edff1433501','0a7031f6eac84cc59830454ad941ed89',1,'2022-07-22 10:02:32','2022-07-22 10:02:32'),(23,145,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','0x1c134d615a096cdc3764faa034162edff1433501','769bcb9c7cb843bcba9c9470c87cf2fc',1,'2022-07-22 10:10:38','2022-07-22 10:10:38');
/*!40000 ALTER TABLE `QRCode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recommend`
--

DROP TABLE IF EXISTS `Recommend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recommend` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recommend`
--

LOCK TABLES `Recommend` WRITE;
/*!40000 ALTER TABLE `Recommend` DISABLE KEYS */;
/*!40000 ALTER TABLE `Recommend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReportUser`
--

DROP TABLE IF EXISTS `ReportUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReportUser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reporterId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `reportType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReportUser`
--

LOCK TABLES `ReportUser` WRITE;
/*!40000 ALTER TABLE `ReportUser` DISABLE KEYS */;
INSERT INTO `ReportUser` VALUES (2,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','e3e88120-f2c4-11ec-a230-e7eb96f6f196','Spam','2022-07-20 04:21:47','2022-07-20 04:21:47');
/*!40000 ALTER TABLE `ReportUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservation`
--

DROP TABLE IF EXISTS `Reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `hostId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `guests` int DEFAULT '1',
  `message` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `basePrice` float NOT NULL,
  `cleaningPrice` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` float DEFAULT NULL,
  `discountType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guestServiceFee` float DEFAULT NULL,
  `hostServiceFee` float DEFAULT NULL,
  `total` float(9,2) DEFAULT NULL,
  `confirmationCode` int DEFAULT NULL,
  `paymentState` enum('pending','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `payoutId` int DEFAULT NULL,
  `reservationState` enum('pending','expired','approved','declined','completed','cancelled','draft','blocked') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `paymentMethodId` tinyint(1) DEFAULT NULL,
  `cancellationPolicy` int DEFAULT NULL,
  `isSpecialPriceAverage` float DEFAULT NULL,
  `dayDifference` float DEFAULT NULL,
  `paymentIntentId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxRate` float DEFAULT '0',
  `isHold` tinyint(1) NOT NULL DEFAULT '0',
  `paymentAttempt` int NOT NULL DEFAULT '0',
  `checkInStart` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checkInEnd` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bookingType` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hostServiceFeeType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hostServiceFeeValue` float NOT NULL,
  `isPayLater` tinyint(1) DEFAULT '0',
  `isPayout` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservation`
--

LOCK TABLES `Reservation` WRITE;
/*!40000 ALTER TABLE `Reservation` DISABLE KEYS */;
INSERT INTO `Reservation` VALUES (1194,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','d2716a40-0bf3-11ed-8935-9de63631d3af','2022-08-25','2022-08-27',1,'test',50,2,'USD',0,NULL,3.06,3.06,102.00,120476,'completed','2022-08-08 07:40:10','2022-08-08 07:40:13',NULL,'approved',NULL,3,50,2,NULL,0,0,0,'Flexible','Flexible','instant','percentage',3,0,0),(1195,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','d2716a40-0bf3-11ed-8935-9de63631d3af','2022-08-11','2022-08-13',1,'sdfds',50,2,'USD',0,NULL,3.06,3.06,102.00,331469,'completed','2022-08-08 07:56:09','2022-08-08 07:56:48',NULL,'approved',NULL,3,50,2,NULL,0,0,0,'Flexible','Flexible','request','percentage',3,0,0),(1196,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','d2716a40-0bf3-11ed-8935-9de63631d3af','2022-08-13','2022-08-14',1,'fdsf',50,2,'USD',0,NULL,1.56,1.56,52.00,336617,'completed','2022-08-08 08:07:53','2022-08-08 08:07:56',NULL,'approved',NULL,3,50,1,NULL,0,0,0,'Flexible','Flexible','instant','percentage',3,0,0),(1197,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','d2716a40-0bf3-11ed-8935-9de63631d3af','2022-08-10','2022-08-11',1,'424242424242',50,2,'USD',0,NULL,1.56,1.56,52.00,775650,'completed','2022-08-08 09:24:51','2022-08-08 09:25:24',NULL,'cancelled',NULL,3,50,1,NULL,0,0,0,'Flexible','Flexible','instant','percentage',3,0,0);
/*!40000 ALTER TABLE `Reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReservationPreApproved`
--

DROP TABLE IF EXISTS `ReservationPreApproved`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReservationPreApproved` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `hostId` varchar(255) NOT NULL,
  `guestId` varchar(255) NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `status` enum('pending','expired','completed') NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ReservationPreApproved_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReservationPreApproved`
--

LOCK TABLES `ReservationPreApproved` WRITE;
/*!40000 ALTER TABLE `ReservationPreApproved` DISABLE KEYS */;
INSERT INTO `ReservationPreApproved` VALUES (41,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','e3e88120-f2c4-11ec-a230-e7eb96f6f196','2022-07-15','2022-07-16','pending','2022-06-30 10:13:29','2022-06-30 10:13:29'),(42,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','e3e88120-f2c4-11ec-a230-e7eb96f6f196','2022-07-15','2022-07-16','pending','2022-06-30 10:15:09','2022-06-30 10:15:09'),(43,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','d2716a40-0bf3-11ed-8935-9de63631d3af','2022-07-29','2022-07-30','pending','2022-07-29 09:11:37','2022-07-29 09:11:37');
/*!40000 ALTER TABLE `ReservationPreApproved` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReservationSpecialPricing`
--

DROP TABLE IF EXISTS `ReservationSpecialPricing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReservationSpecialPricing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int DEFAULT NULL,
  `reservationId` int DEFAULT NULL,
  `blockedDates` date NOT NULL,
  `isSpecialPrice` float DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReservationSpecialPricing`
--

LOCK TABLES `ReservationSpecialPricing` WRITE;
/*!40000 ALTER TABLE `ReservationSpecialPricing` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReservationSpecialPricing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `listId` int NOT NULL,
  `authorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewContent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rating` float NOT NULL,
  `privateFeedback` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `parentId` int DEFAULT '0',
  `automated` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `isAdminEnable` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SearchSettings`
--

DROP TABLE IF EXISTS `SearchSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SearchSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `minPrice` float NOT NULL,
  `maxPrice` float NOT NULL,
  `PriceRangecurrency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SearchSettings`
--

LOCK TABLES `SearchSettings` WRITE;
/*!40000 ALTER TABLE `SearchSettings` DISABLE KEYS */;
INSERT INTO `SearchSettings` VALUES (1,10,10000,'USD','2019-03-27 11:53:47','2018-05-02 04:53:20');
/*!40000 ALTER TABLE `SearchSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20180804061511-addUserBanStatus.js'),('20180804062523-addIsReadColumnInThreads.js'),('20180809095644-createBedTypeTable.js'),('20180919114144-addBanUserDefault.js'),('20180924105437-updateUserLoginTable.js'),('20180924130941-addNewUserLoginTable.js'),('20180929101729-updateNulledBanUserStatus.js'),('20180929110523-addColumnsForSmsVerification.js'),('20180929112313-updateCountyListWithDialCodes.js'),('20190105123130-addHomePageTypeSiteSettings.js'),('20190202071052-addIsListActiveField.js'),('20190202103305-updatePaymentMethods.js'),('20190206111430-createReportUser.js'),('20190223073145-addIsDeleteAtField.js'),('20190225042333-addReviewsCountInListing.js'),('20190322050510-addSiteSettingsField.js'),('20190325035946-addListBlockedDates.js'),('20190429092459-addColumNewThread.js'),('20190430110742-changeListingDataCloum.js'),('20190503052141-addColumnItemDescriptionListSettingsTable.js'),('20190513044345-addMetaFields.js'),('20190513070310-insertStaticpage.js'),('20190514121558-addCancellationPolicyReservation.js'),('20190525050311-changeDataTypeForItemDescription.js'),('20190527125405-addIsAdminEnableReviews.js'),('20190531062204-addReservationSpecialPricing.js'),('20190603083234-modifyBlogAndStaticPage.js'),('20190603102231-deleteInboxItem.js'),('20190604051522-addReservationFields.js'),('20190614110520-addPhoneStatus.js'),('20190615092318-addCountryNameInUserProfile.js'),('20190622051622-changeColumnLocationUserProfile.js'),('20190701041011-changeColumnTypeInSiteSettingsValue.js'),('20190712094239-deleteCoverPhotoRecordsFromListingTable.js'),('20190824052016-addHomePageLogoSiteSettings.js'),('20190827080301-addHomeBannerImage.js'),('20190828122142-addEmailPageLogoSiteSettings.js'),('20190830111259-addHomeLogoHeightSettings.js'),('20190902042250-addStaticBlockInfo.js'),('20190903093907-addStatusFieldInBlock.js'),('20190910043026-addPaymentIntentIdInReservation.js'),('20191008110026-testMigration.js'),('20191020041756-addUserListing.js'),('20191108043353-updateSteps.js'),('20200110151340-addRoleIdToAdminUser.js'),('20200217052735-addIsVerifiedToPayoutTable.js'),('20200225061630-addIsVerifiedToPayoutTable.js'),('20200323101255-addAppAvailableStatus.js'),('20200323102340-addPlayStoreUrl.js'),('20200323102456-addAppStoreUrl.js'),('20200324122956-contactPageManage.js'),('20200325110911-addWhyHostInfoBlocks.js'),('20200326043522-addHelpStaticPageManage.js'),('20200413120822-changeColumnValueAtWhyHostInfoBlock.js'),('20200413133533-changeColumnValueWhyHostInfoBlock.js'),('20200609101516-addTaxRateinListing.js'),('20200609104246-addColumnInReservation.js'),('20200702125214-addNewColumnsInReservation.js'),('20200706135325-changeDialCodeForCyprus.js'),('20200707112614-updateCancellationContent.js'),('20200716101918-addNewColumnsInReservation.js'),('20200717064917-addBookingTypeColumninReservation.js'),('20200720134623-addBookingTypeColumnInReservation.js'),('20200721095812-AddServiceFeeInReservation.js'),('20200721095829-AddNonRefundableNightInCancellation.js'),('20200722081721-changeDefaultValueinCancellation.js'),('20200727121337-changeColumnvalueInReservation.js'),('20200826050109-addCookiePolicyStaticContent.js'),('20201015082101-addListSettingsImage.js'),('20201015114723-addSideMenuContent.js'),('20210107121042-updateProcessedInPaymentMethod.js'),('20210111061758-changeDateTypeToDateOnlyType.js'),('20210415133041-addStripeKeySiteSettings.js'),('20210422134359-addApprovalListing.js'),('20210423130614-addApproveListingSiteAdmin.js'),('20210508123922-addDefaultFaviconImageInSiteSetttingTable.js'),('20210608121826-approvalChanges.js'),('20210720102227-updateCancellationTable.js'),('20211004131331-removeDefaultValueCountry.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServiceFees`
--

DROP TABLE IF EXISTS `ServiceFees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ServiceFees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `guestType` enum('fixed','percentage') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestValue` float NOT NULL,
  `hostType` enum('fixed','percentage') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hostValue` float NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceFees`
--

LOCK TABLES `ServiceFees` WRITE;
/*!40000 ALTER TABLE `ServiceFees` DISABLE KEYS */;
INSERT INTO `ServiceFees` VALUES (1,'percentage',3,'percentage',3,'USD','2022-05-31 08:58:26','2022-05-31 08:58:26');
/*!40000 ALTER TABLE `ServiceFees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SideMenu`
--

DROP TABLE IF EXISTS `SideMenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SideMenu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `step` int DEFAULT NULL,
  `page` varchar(255) DEFAULT NULL,
  `isEnable` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SideMenu`
--

LOCK TABLES `SideMenu` WRITE;
/*!40000 ALTER TABLE `SideMenu` DISABLE KEYS */;
INSERT INTO `SideMenu` VALUES (1,'Flexible','Cancel up to 1 day prior to arrival and get a 100% refund.','block1',NULL,NULL,1,'2021-02-03 13:14:58','2021-02-03 13:14:58'),(2,'Moderate','Cancel up to 5 days prior to arrival and get a 50% refund.','block2',NULL,NULL,1,'2021-02-03 13:14:58','2021-02-03 13:14:58'),(3,'Strict','Cancel up to 7 days prior to arrival and get a 50% refund.','block3',NULL,NULL,1,'2021-02-03 13:14:58','2021-02-03 13:14:58');
/*!40000 ALTER TABLE `SideMenu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SiteForm`
--

DROP TABLE IF EXISTS `SiteForm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SiteForm` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` datetime NOT NULL,
  `phone` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SiteForm`
--

LOCK TABLES `SiteForm` WRITE;
/*!40000 ALTER TABLE `SiteForm` DISABLE KEYS */;
/*!40000 ALTER TABLE `SiteForm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SiteSettings`
--

DROP TABLE IF EXISTS `SiteSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SiteSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SiteSettings`
--

LOCK TABLES `SiteSettings` WRITE;
/*!40000 ALTER TABLE `SiteSettings` DISABLE KEYS */;
INSERT INTO `SiteSettings` VALUES (1,'Site Name','siteName','Bizverse Rental','site_settings','2019-03-27 11:53:47','2022-07-27 08:24:21'),(2,'Site Title','siteTitle','Rental All with Bizverse World','site_settings','2019-03-27 11:53:47','2022-07-27 08:24:21'),(3,'Meta Keyword','metaKeyword','Rental Rentall Bizverse','site_settings','2019-03-27 11:53:47','2022-07-27 08:24:21'),(4,'Meta Discription','metaDescription','Rental All with Bizverse World','site_settings','2019-03-27 11:53:47','2022-07-27 08:24:21'),(10,'Facebook Link','facebookLink','https://www.facebook.com/bizverse.world','site_settings','2019-03-27 11:53:47','2022-07-27 08:24:21'),(11,'Twitter Link','twitterLink','https://twitter.com/BizverseWorld','site_settings','2019-03-27 11:53:47','2022-07-27 08:24:21'),(12,'Instagram Link','instagramLink','https://telegram.me/bizverseworld','site_settings','2019-03-27 11:53:47','2022-07-27 08:24:21'),(64,'Logo Height','logoHeight','65','site_settings','2019-03-27 11:53:47','2022-07-27 08:24:21'),(65,'Logo Width','logoWidth','80','site_settings','2019-03-27 11:53:47','2022-07-27 08:24:21'),(66,'Home Page Banner Layout','homePageType','3','site_settings','2019-03-27 11:53:47','2022-07-27 08:24:21'),(67,'Video URL','videoLink','https://www.youtube.com/watch?v=5y2P4z7DM88','site_settings','2019-07-04 06:09:18','2022-07-27 08:24:21'),(68,'Phone Number Status','phoneNumberStatus','2','site_settings','2019-07-04 06:47:57','2022-07-27 08:24:21'),(72,'Home Logo Height','homeLogoHeight','65','site_settings','2019-09-06 06:41:03','2022-07-27 08:24:21'),(73,'Home Logo Width','homeLogoWidth','80','site_settings','2019-09-06 06:41:03','2022-07-27 08:24:21'),(77,'App Available Status','appAvailableStatus','1','site_settings','2020-04-13 11:33:08','2022-07-27 08:24:21'),(78,'PlayStore URL','playStoreUrl','https://play.google.com/store','site_settings','2020-04-13 11:33:08','2022-07-27 08:24:21'),(79,'AppStore URL','appStoreUrl','https://www.apple.com/ios/app-store/','site_settings','2020-04-13 11:33:09','2022-07-27 08:24:21'),(80,'email','email','support@rentall.world','site_settings','2020-04-13 11:33:09','2022-07-27 08:24:21'),(81,'Phone Number','phoneNumber','+0 000 0000','site_settings','2020-04-13 11:33:09','2022-07-27 08:24:21'),(82,'Address','address','Bizverse City, Bizverse World','site_settings','2020-04-13 11:33:09','2022-07-27 08:24:21'),(83,'Stripe Publishable Key','stripePublishableKey','pk_test_C5ukBJM7qr5P1F8dY4XKhdyp','site_settings','2021-10-27 16:42:06','2022-07-27 08:24:21'),(84,'Listing Approval','listingApproval','0','site_settings','2021-10-27 16:42:07','2022-07-27 08:24:21'),(85,'Favicon Logo','faviconLogo','cd78f4c42b3bbe764751f8a20e69595d.png','site_settings','2021-10-27 16:42:07','2022-06-03 04:47:59'),(121,'Email Logo','emailLogo','cb36a670c4b6fb33b53fc62d36708bca.png','site_settings','2022-06-03 04:48:29','2022-07-27 08:24:21'),(129,'Home Page Logo','homeLogo','5813214a503a98eb81954e08f5232c3b.png','site_settings','2022-07-27 08:24:11','2022-07-27 08:24:21'),(130,'Logo','Logo','0c181f32ba02d4a2d2f06866ab43fe2a.png','site_settings','2022-07-27 08:24:17','2022-07-27 08:24:21');
/*!40000 ALTER TABLE `SiteSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StaticInfoBlock`
--

DROP TABLE IF EXISTS `StaticInfoBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StaticInfoBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `isEnable` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StaticInfoBlock`
--

LOCK TABLES `StaticInfoBlock` WRITE;
/*!40000 ALTER TABLE `StaticInfoBlock` DISABLE KEYS */;
INSERT INTO `StaticInfoBlock` VALUES (1,'Rent amazing homes for your trip','Homes with high standards and better facilities',NULL,'header',1,'2019-09-06 06:41:03','2022-06-02 09:39:09'),(2,'Enjoy your trip!','Rent the home that\'s suitable for you & your family and enjoy your trip!','aa4e33a1271e0ce4ad1007b53ce128f0.jpeg','block1',1,'2019-09-06 06:41:03','2022-06-03 04:59:58'),(3,'Trusted community!','Our community is completely driven by trust and your family safety is assured','59cf6234b6bf2b769ce83a474e55428b.jpeg','block2',1,'2019-09-06 06:41:03','2022-06-03 05:00:01');
/*!40000 ALTER TABLE `StaticInfoBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StaticPage`
--

DROP TABLE IF EXISTS `StaticPage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StaticPage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaDescription` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StaticPage`
--

LOCK TABLES `StaticPage` WRITE;
/*!40000 ALTER TABLE `StaticPage` DISABLE KEYS */;
INSERT INTO `StaticPage` VALUES (1,'About Us','<p>lorum ispum test</p>','About Us','About Us','2019-07-12 07:58:42','2022-03-28 05:12:16'),(2,'Trust & Safety','<p></p>','Trust & Safety','Trust & Safety','2019-07-12 07:58:42','2019-07-12 07:58:42'),(3,'Travel Credit','<p></p>','Travel Credit','Travel Credit','2019-07-12 07:58:42','2019-07-12 07:58:42'),(4,'Terms & Privacy','<p></p>','Terms & Privacy','Terms & Privacy','2019-07-12 07:58:42','2019-07-12 07:58:42'),(5,'Help','<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen books. </p>','Help','Help page description','2020-04-13 11:33:10','2020-04-13 13:07:55'),(6,'Cookie Policy','<p></p>','Cookie Policy','Cookie Policy','2021-02-03 13:01:43','2021-02-03 13:01:43');
/*!40000 ALTER TABLE `StaticPage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ThreadItems`
--

DROP TABLE IF EXISTS `ThreadItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ThreadItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `threadId` int NOT NULL,
  `sentBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isRead` tinyint(1) DEFAULT NULL,
  `type` enum('message','inquiry','preApproved','declined','approved','pending','cancelledByHost','cancelledByGuest','intantBooking','requestToBook','confirmed','expired','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'message',
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `personCapacity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reservationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `threadId` (`threadId`),
  CONSTRAINT `ThreadItems_ibfk_1` FOREIGN KEY (`threadId`) REFERENCES `Threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1749 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ThreadItems`
--

LOCK TABLES `ThreadItems` WRITE;
/*!40000 ALTER TABLE `ThreadItems` DISABLE KEYS */;
INSERT INTO `ThreadItems` VALUES (1735,223,'d2716a40-0bf3-11ed-8935-9de63631d3af','dsfds',1,'intantBooking','2022-08-25','2022-08-26',1,'2022-08-08 03:40:11','2022-08-08 04:23:00',1190),(1736,223,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f',NULL,1,'approved','2022-08-25','2022-08-26',1,'2022-08-08 03:40:11','2022-08-08 06:46:16',1190),(1737,223,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','dfdsf',1,'message','2022-08-08','2022-08-08',0,'2022-08-08 06:46:03','2022-08-08 06:46:16',NULL),(1738,223,'d2716a40-0bf3-11ed-8935-9de63631d3af','dsf',1,'message','2022-08-08','2022-08-08',0,'2022-08-08 06:46:23','2022-08-08 06:46:32',NULL),(1739,223,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','fsd',1,'message','2022-08-08','2022-08-08',0,'2022-08-08 06:46:39','2022-08-08 07:56:59',NULL),(1740,223,'d2716a40-0bf3-11ed-8935-9de63631d3af','test',1,'intantBooking','2022-08-25','2022-08-27',1,'2022-08-08 07:40:13','2022-08-08 07:42:26',1194),(1741,223,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f',NULL,1,'approved','2022-08-25','2022-08-27',1,'2022-08-08 07:40:13','2022-08-08 07:56:59',1194),(1742,223,'d2716a40-0bf3-11ed-8935-9de63631d3af','sdfds',1,'requestToBook','2022-08-11','2022-08-13',1,'2022-08-08 07:56:25','2022-08-08 07:56:45',1195),(1743,223,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f',NULL,1,'approved','2022-08-11','2022-08-13',1,'2022-08-08 07:56:48','2022-08-08 07:56:59',1195),(1744,223,'d2716a40-0bf3-11ed-8935-9de63631d3af','fdsf',0,'intantBooking','2022-08-13','2022-08-14',1,'2022-08-08 08:07:56','2022-08-08 08:07:56',1196),(1745,223,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f',NULL,1,'approved','2022-08-13','2022-08-14',1,'2022-08-08 08:07:56','2022-08-08 08:24:35',1196),(1746,223,'d2716a40-0bf3-11ed-8935-9de63631d3af','424242424242',0,'intantBooking','2022-08-10','2022-08-11',1,'2022-08-08 09:24:54','2022-08-08 09:24:54',1197),(1747,223,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f',NULL,0,'approved','2022-08-10','2022-08-11',1,'2022-08-08 09:24:54','2022-08-08 09:24:54',1197),(1748,223,'d2716a40-0bf3-11ed-8935-9de63631d3af','dsfdsf',0,'cancelledByGuest','2022-08-10','2022-08-11',1,'2022-08-08 09:25:24','2022-08-08 09:25:24',1197);
/*!40000 ALTER TABLE `ThreadItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Threads`
--

DROP TABLE IF EXISTS `Threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Threads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `host` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guest` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isRead` tinyint(1) DEFAULT NULL,
  `messageUpdatedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `Threads_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Threads`
--

LOCK TABLES `Threads` WRITE;
/*!40000 ALTER TABLE `Threads` DISABLE KEYS */;
INSERT INTO `Threads` VALUES (223,205,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','d2716a40-0bf3-11ed-8935-9de63631d3af','2022-08-08 03:40:11','2022-08-08 09:25:24',0,'2022-08-08 08:24:35');
/*!40000 ALTER TABLE `Threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transaction`
--

DROP TABLE IF EXISTS `Transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `payerEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payerId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiverEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiverId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `total` float NOT NULL,
  `transactionFee` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ipn_track_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentType` enum('booking','cancellation','host') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'booking',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentMethodId` tinyint(1) DEFAULT '1',
  `status` enum('APPROVED','OPENED','DECLINED','SETTLED','CANCELLED','VOIDED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethodDetailId` int DEFAULT '2',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `Transaction_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=891 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transaction`
--

LOCK TABLES `Transaction` WRITE;
/*!40000 ALTER TABLE `Transaction` DISABLE KEYS */;
INSERT INTO `Transaction` VALUES (887,1194,'linhtn@bizverse.world','cus_M91DVf0D9lgUv5',NULL,NULL,'pi_3LUQZLEsUiLM5Mi30tGagaYr',105,NULL,'USD',NULL,'booking','2022-08-08 07:40:13','2022-08-08 07:40:13',2,NULL,2),(888,1195,'sb-h7yvd16395191@personal.example.com','ENM6RFWYQLWW6','redhoodcool-business@gmail.com','BQ855PSHABRPY','7C671354UF3917305',105.06,4.16,'USD',NULL,'booking','2022-08-08 07:56:25','2022-08-08 07:56:25',1,NULL,2),(889,1196,'linhtn@bizverse.world','cus_M91DVf0D9lgUv5',NULL,NULL,'pi_3LUR0AEsUiLM5Mi30M76D3ok',54,NULL,'USD',NULL,'booking','2022-08-08 08:07:56','2022-08-08 08:07:56',2,NULL,2),(890,1197,'linhtn@bizverse.world','cus_M91DVf0D9lgUv5',NULL,NULL,'pi_3LUSCeEsUiLM5Mi30saV2IMA',54,NULL,'USD',NULL,'booking','2022-08-08 09:24:54','2022-08-08 09:24:54',2,NULL,2);
/*!40000 ALTER TABLE `Transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransactionHistory`
--

DROP TABLE IF EXISTS `TransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TransactionHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payoutId` int NOT NULL,
  `payoutEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `fees` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `transactionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethodId` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `TransactionHistory_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionHistory`
--

LOCK TABLES `TransactionHistory` WRITE;
/*!40000 ALTER TABLE `TransactionHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `TransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userBanStatus` tinyint(1) DEFAULT '0',
  `userDeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('7e0b2040-f1d1-11ec-a364-3f717c87aa1f','tranngoclinh2411@gmail.com','$2b$08$nvQfeFijjs0AL6vsPWjeFeirqcYgK6CGsaKSkdDuMtMq4HlvVRbkO',1,'email','2022-06-22 02:17:40','2022-06-22 02:17:40',0,NULL),('d2716a40-0bf3-11ed-8935-9de63631d3af','linhtn@bizverse.world','$2b$08$DIPbzRqrm3PGo9t11mykCOnimXiHH5dyCRoXM4IixpXtrxUVvmWMG',1,'email','2022-07-25 08:28:55','2022-08-04 13:13:28',0,NULL),('e3e88120-f2c4-11ec-a230-e7eb96f6f196','khanhdangbmt@gmail.com','$2b$08$QYhBW8/yfga6GfIGeOjQ0epaSYb6R9kErNT8Qr0sZouScRYrlmg0m',1,'email','2022-06-23 07:19:59','2022-06-23 07:19:59',0,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAmenities`
--

DROP TABLE IF EXISTS `UserAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAmenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `amenitiesId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserAmenities_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=638 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAmenities`
--

LOCK TABLES `UserAmenities` WRITE;
/*!40000 ALTER TABLE `UserAmenities` DISABLE KEYS */;
INSERT INTO `UserAmenities` VALUES (622,207,73,'2022-07-11 13:08:59','2022-07-11 13:08:59'),(634,205,118,'2022-08-03 07:58:58','2022-08-03 07:58:58'),(635,205,73,'2022-08-03 07:58:58','2022-08-03 07:58:58'),(636,205,28,'2022-08-03 07:58:58','2022-08-03 07:58:58'),(637,206,118,'2022-08-08 08:37:20','2022-08-08 08:37:20');
/*!40000 ALTER TABLE `UserAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserClaim`
--

DROP TABLE IF EXISTS `UserClaim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserClaim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserClaim_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserClaim`
--

LOCK TABLES `UserClaim` WRITE;
/*!40000 ALTER TABLE `UserClaim` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserClaim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserHouseRules`
--

DROP TABLE IF EXISTS `UserHouseRules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserHouseRules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `houseRulesId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `houseRulesId` (`houseRulesId`),
  CONSTRAINT `UserHouseRules_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserHouseRules_ibfk_2` FOREIGN KEY (`houseRulesId`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=413 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserHouseRules`
--

LOCK TABLES `UserHouseRules` WRITE;
/*!40000 ALTER TABLE `UserHouseRules` DISABLE KEYS */;
INSERT INTO `UserHouseRules` VALUES (393,207,'2022-07-11 13:10:14','2022-07-11 13:10:14',50),(394,207,'2022-07-11 13:10:14','2022-07-11 13:10:14',51),(411,205,'2022-08-08 08:07:05','2022-08-08 08:07:05',51),(412,205,'2022-08-08 08:07:05','2022-08-08 08:07:05',50);
/*!40000 ALTER TABLE `UserHouseRules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserListingData`
--

DROP TABLE IF EXISTS `UserListingData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserListingData` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `settingsId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserListingData_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1793 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserListingData`
--

LOCK TABLES `UserListingData` WRITE;
/*!40000 ALTER TABLE `UserListingData` DISABLE KEYS */;
INSERT INTO `UserListingData` VALUES (1761,207,76,'2022-07-11 13:08:59','2022-07-11 13:08:59'),(1762,207,5,'2022-07-11 13:08:59','2022-07-11 13:08:59'),(1763,207,10,'2022-07-11 13:08:59','2022-07-11 13:08:59'),(1764,207,22,'2022-07-11 13:08:59','2022-07-11 13:08:59'),(1785,205,76,'2022-08-03 07:58:58','2022-08-03 07:58:58'),(1786,205,5,'2022-08-03 07:58:58','2022-08-03 07:58:58'),(1787,205,10,'2022-08-03 07:58:58','2022-08-03 07:58:58'),(1788,205,22,'2022-08-03 07:58:58','2022-08-03 07:58:58'),(1789,206,76,'2022-08-08 08:37:20','2022-08-08 08:37:20'),(1790,206,5,'2022-08-08 08:37:20','2022-08-08 08:37:20'),(1791,206,10,'2022-08-08 08:37:20','2022-08-08 08:37:20'),(1792,206,22,'2022-08-08 08:37:20','2022-08-08 08:37:20');
/*!40000 ALTER TABLE `UserListingData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserListingSteps`
--

DROP TABLE IF EXISTS `UserListingSteps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserListingSteps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `step1` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `step2` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `step3` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `step4` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserListingSteps_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserListingSteps`
--

LOCK TABLES `UserListingSteps` WRITE;
/*!40000 ALTER TABLE `UserListingSteps` DISABLE KEYS */;
INSERT INTO `UserListingSteps` VALUES (192,205,'completed','completed','completed','2022-06-22 02:34:51','2022-06-22 02:36:20','completed'),(193,206,'completed','active','inactive','2022-07-04 07:46:58','2022-07-04 07:47:12','active'),(194,207,'completed','completed','completed','2022-07-11 13:08:35','2022-07-11 13:10:14','completed');
/*!40000 ALTER TABLE `UserListingSteps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserLogin`
--

DROP TABLE IF EXISTS `UserLogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserLogin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceDetail` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=734 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserLogin`
--

LOCK TABLES `UserLogin` WRITE;
/*!40000 ALTER TABLE `UserLogin` DISABLE KEYS */;
INSERT INTO `UserLogin` VALUES (619,'LinhTran24','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJDblR6akw0bWtocVEzN2dnUjZFNTk4Yktod3lkYnlJdk5XcWR2QTNPYzNCVlpIT0hra0xmdnY1OGdtblU4UE5rRVoya2xPeU1KZlNjakxYeng4bnlvQkRtVnk0Mml3eW9NbzF0IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NTg2NDI2MCwiZXhwIjoxNjU1OTUwNjYwfQ.lgngU1owsMRdotoGX_JxFb3zU4Pe3HnrBWco-8CwAOQ',NULL,NULL,NULL,NULL,'2022-06-22 02:17:40','2022-06-22 02:17:40'),(620,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJwNG1KTzI4VDgxbWRDY0VwMkNvd3FQTlBtYTdMRFRNd29kVWVqallwQnZwUFBKSmhJT3RvUFlidU5JNXpEWkdJU2NXVkdMckttWjloTW81Rk40cUE4emJPQnlOVjl0OTFxbG5QIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NTk1MjI1NSwiZXhwIjoxNjU2MDM4NjU1fQ.dCWmksZVundthcWdj2xTuFeku5J4ZhiIay-NHoHnc4w',NULL,NULL,NULL,NULL,'2022-06-23 02:44:15','2022-06-23 02:44:15'),(621,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJpTTFTYmlzTmthWkRCY2lkZ3pIZDN0NkNISm03ZzJVVTY3QkRoaEdrcnpNdWhNMlplb0wyRWtnNlhMTmdydFFoYXdWcUhQNk1GWXZGeElMMjVIR1E2aGp2bjluRmV3VmsxZklCIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NTk1MjI4NywiZXhwIjoxNjU2MDM4Njg3fQ.Wh0W6KVw1cR4dwyrkkQfBYUXeaSYQHKnJaZRUEPK3u4',NULL,NULL,NULL,NULL,'2022-06-23 02:44:47','2022-06-23 02:44:47'),(622,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJCeWVONmxsTEpweFRmcW9YOTFmN085YVZ0Ym5IaU93RVZkY3IxRVFicDNWd0ZQUUpQSjZvcThqVlYxSlNtc09GUWhTTTdNUlJkNEFRdWppbTZXYWVWUTZnZDlwcUV0b1Q5bVM2IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NTk1MjI5NiwiZXhwIjoxNjU2MDM4Njk2fQ.Kk9yKL7ti3XGJgZLVzRLjytdj7ECdlDiIRPLp7HX0Pk',NULL,NULL,NULL,NULL,'2022-06-23 02:44:56','2022-06-23 02:44:56'),(623,'khanhdangbmt','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6ImJGQWFmdUVvdmFwWHhaNWV2V0UxREpNdkVWREJUbm5ScTlseVZCQWlUNUE5SDhuelBROVA4T2dwTmpJbEI2cXNaUnlZQ0xxRXR2YTM5bWFrNElBdllqNTF5OFBrVDFyd2ZYM00iLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTU5Njg3OTksImV4cCI6MTY1NjA1NTE5OX0.ESPlFlrbCMbQp9m-4d18anP_S720Grpx1b_eG-xtx0A',NULL,NULL,NULL,NULL,'2022-06-23 07:19:59','2022-06-23 07:19:59'),(624,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJQV2ZOYlc1ZXZ6N0dlRzJTc202aDFyREtaUlVSQmhXU21JRWlhbFk1V2wzNk85OXJEODFQVjZzUHV2V1R6ZWw4QzRoZExwYkZ6RFF2UnRjakxyVTFUZElITmhxeTFvdnVyTjRsIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjAzOTIxMywiZXhwIjoxNjU2MTI1NjEzfQ.LMRzdhr07WykD_QSM0z_pAZYC6anM-kso_tX7sNFwKo',NULL,NULL,NULL,NULL,'2022-06-24 02:53:33','2022-06-24 02:53:33'),(625,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6IjVIbWR0TXJFVnlXdzl2SXE1aXRHeXB0VzZvYWZPM2ljVUdlc25ha1E5c1IxbDk5NzZlYTJUT0dDQm5IYXJ2OXhCUmI4WUE3RDN0TUlTa055aDdKNnR6NjVuVTE2clRtTW1FRzYiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTYwNTYxMzMsImV4cCI6MTY1NjE0MjUzM30.JE7cvkZDZ7SMjq-pzvZo3nMUb-uSxK1Au7YxnEc83YQ',NULL,NULL,NULL,NULL,'2022-06-24 07:35:33','2022-06-24 07:35:33'),(626,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiIzaGJ3UTRBS0ZCWTc4ZlIyYnZ6NUZSSGYzSlF4d2lYcklqeUdRbVoxeW5CelQ4QWJPcUZtZmpnSWFJQ3VaRWZ6bndDdmZXWEdoNnN3dGFMNnNwZ0pYWm5ZQzVUSTRlTFZndFdNIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjMxNTI5MCwiZXhwIjoxNjU2NDAxNjkwfQ.NgrHkv7eeiAfw0DwJQzcfXhXA_fYi30o9skzE7iVYiM',NULL,NULL,NULL,NULL,'2022-06-27 07:34:50','2022-06-27 07:34:50'),(627,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJCMnRQcDlyZzdXS2cycmlzOFhySnNDVjc2UXpGZzNtV2NGN2FSbmRuRjZ1VlJYb29zbW92SHl2bm03d2Q0TDE5d2tKdmhxMnFHMlRiNEtBV2UyY2h4SFRmWlBEcFRBQ0xNTDdVIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjMxOTk4MywiZXhwIjoxNjU2NDA2MzgzfQ.7n2tOsGMtFX3_NaCrQdPcStNo-muY3qdeC7QIg0MR8c',NULL,NULL,NULL,NULL,'2022-06-27 08:53:03','2022-06-27 08:53:03'),(628,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJtcUVpeWhaaU5DbHE0Sk8xUEpkYUJ5MTF3dEpRNFhOWGFpa1N3RGJEZnEzNHRIbkp0RXVtMUhzam9oejY2cVBYS2tZTVRKYU9YR2doSkxYMkRKNHdnRmdOazN6c3h4RWtoODRMIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjMyMDAwMiwiZXhwIjoxNjU2NDA2NDAyfQ.PaqHK4mV3TGvQFHP11X8NyTpcq0GHIEJxQfJdQuszEs',NULL,NULL,NULL,NULL,'2022-06-27 08:53:22','2022-06-27 08:53:22'),(629,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6IlFYZzJxTk5vU2paUjFNV2JQWGg3Wk9zQUo5RFpQYnVRdnphZzFEYlBYVW9zUEZ0cWdib0Zkc2dLNXo5U2FRQXQzVDd0dEFrUDMyY2x5QzlSeW12anFKR0M5emVzRmFCMzNYdVMiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTYzMjAwMTAsImV4cCI6MTY1NjQwNjQxMH0.e1vJKH7QfkTZ6QE90DvsfXvRtCUjpQ0_jcjnVtcka-Y',NULL,NULL,NULL,NULL,'2022-06-27 08:53:30','2022-06-27 08:53:30'),(630,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiI1a0RSeFJueXNySHRSTExYaTZ0Rm03YzFkOW5KekF0Q2VTOGdDdmxGN0lYd0dJbFBsajlUNmUxbGlhaTlETk1ZUkt6Q05VVERhdEJkOU1iOEpjWWJ6OUpnakN2eUVBUGpLYVNhIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjQwNjQ0OSwiZXhwIjoxNjU2NDkyODQ5fQ.7fMV5BAUa2pa6Q36oVsYifI6R-UIHf9TRCJRojOrG0Q',NULL,NULL,NULL,NULL,'2022-06-28 08:54:09','2022-06-28 08:54:09'),(631,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6InZtRVJQalV4VWE4eHZ3SmN2QkdraDNkV1l5bUtMaXYyU3M3clJtRktYVTFiU0RVVU5Zc1FoWmdJMVdlVU1wYUQ4NkhqTDI4VHFtOUdnUlVlYUtJcm1Ya0laQWN6SGVpSFg0VkgiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTY0ODc1MTEsImV4cCI6MTY1NjU3MzkxMX0.NFFX4bYhiEHT8AiB8Rsypn1k7QNj3abj6ah2J6voF2g',NULL,NULL,NULL,NULL,'2022-06-29 07:25:11','2022-06-29 07:25:11'),(632,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJzSm5Hb1V4VkhWSmlvWk53VWFUdGw1eGdTd0dQaUIyREV6T29WQkloY1c0bmg2TlRQY29FT2ttUEY4ZWxOMWRvem9nakRSZHZtOVFkZHo2Z3Bud2NWdnRMalZXNUVSOTJJRVp0IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjQ5Mjg3MiwiZXhwIjoxNjU2NTc5MjcyfQ.B3TGZUiX_FMODbqqhchQFm8WeoXfDdlj0Hlrqy6EZ5k',NULL,NULL,NULL,NULL,'2022-06-29 08:54:32','2022-06-29 08:54:32'),(633,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJCemFQNUpxZEoxcm13QVMyRktNMnIxekdtNUNJOGhBREpDdmVtRWZJRHBaSVZQT0dKeExKM1dqS1FsZWM5V1FYaEZGMmJ0emRGRXZjZU9tUlNGazF5WUc2c2pYN0haTjkxdFpOIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjU4MDIzNCwiZXhwIjoxNjU2NjY2NjM0fQ.EImP7FJIpjBBT_2gIcoHvDtiufcGqId-g6ivyAgyG-M',NULL,NULL,NULL,NULL,'2022-06-30 09:10:34','2022-06-30 09:10:34'),(634,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJlWmM5VTU3MUpLek9UVmFGd3dsN3ZIRFRndk1Xbll3VmJYWDVYSlVaRWdzZ2FmbHE0WVhFUkt4N0VoSk5Ea0JOZWJNM1FTUm5WVlRUY3lFYUlrYnh5aXBQRnhmMjlicGlSZ0RFIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjU4MzkzOSwiZXhwIjoxNjU2NjcwMzM5fQ.41LuKZ4QF_aBEF9uOcJk8Afg41Ayhj69KwZdcd98rc8',NULL,NULL,NULL,NULL,'2022-06-30 10:12:19','2022-06-30 10:12:19'),(635,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6IlZLSGw5MndKMnl6TXNURUgzYmx5b1d5UkhaNUVGbExpanZVazJIdjRBQk1pbldibEJUSGRIQ3pmNWZxZGZBNk8xUVlwNGdWQzVkUmNOWmFxNXRUNmVId09qVlBpZTZFSGlUSVMiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTY1ODM5ODAsImV4cCI6MTY1NjY3MDM4MH0.j_f16sFgL2visXIbzTzZN6jzkN-lc3gRUunooqLLGBI',NULL,NULL,NULL,NULL,'2022-06-30 10:13:00','2022-06-30 10:13:00'),(636,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJ5aGI0NnJqVDJ0bHpiR09zZmFKakJZWUd4M0N3dHg0ZlVNcEo3QURuWFhzM3U0U2VuWUxpSXlldmppSUJRVXVzYlFhbFZ0aHJVR0pONWpoUjhkajdYNkE1d3Q0N2lhQXdaa2FnIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0MzI2OCwiZXhwIjoxNjU2NzI5NjY4fQ.hVlBbJhPLKs0p1gnDuu_IULY2jp6Vx0D-5Ix9ZJv8iU',NULL,NULL,NULL,NULL,'2022-07-01 02:41:08','2022-07-01 02:41:08'),(637,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJQckhTQ0RiMTVCSWxhUnM5YktpcXNRZEVjVFdkUkFoUDh0aTlOQ2d0NHJ1OEM3TGJaRlhZNERybGljdGhKdDlOb2VLY1hqaGdMZXdrR1ZKeGlXbUtLSzZDMURvQmxId0xleUpiIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0NjEwMiwiZXhwIjoxNjU2NzMyNTAyfQ.Li2r5ubdR_Kh8y3srUY5r6BZfapfY_sdCuTtMkPBzcQ',NULL,NULL,NULL,NULL,'2022-07-01 03:28:22','2022-07-01 03:28:22'),(638,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJnSWRDNzM5R2VFaHlUakJnZ2pUV2g2a2M5WGRsNXA2OTdZSE5yTWZOeUk5RGJ5dHRiZDZXd0xEQTJGSE10NE1DQzFRVFBNdVR6ek9kSmJNRkQ5cnBzQnZSMTJ6OUZsdzQ2WVg3IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0NjE5MSwiZXhwIjoxNjU2NzMyNTkxfQ.XS2efMP9-BgXueC6bQg971B2-L4B2oQNFMWE1w0NjGg',NULL,NULL,NULL,NULL,'2022-07-01 03:29:51','2022-07-01 03:29:51'),(639,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJxOXdFem56VUlvTTY1dmJxV1hiaVJmaENKeUNWQTJHTUUxRUs4QVRDV0ttTEU3V0dlNnJ4bDFWdmRpbXFWOVVGV291ODFxRExNTzJSbjVSVjFaeGRzUFFKbUpTeFBZOVpsUWt3IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0NjIwNCwiZXhwIjoxNjU2NzMyNjA0fQ.NZKxdCm11N479xH3mtcG7W1tTIgAUh8ZvdFoKOK2qlE',NULL,NULL,NULL,NULL,'2022-07-01 03:30:04','2022-07-01 03:30:04'),(640,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJlbVVFQTFSclhSWFM5cXpMVGxFQ3VmRlFmVElhYWZERXVMWmR1VEN2SXVxRXBBRGtYd1phR0JOZnZ2bVhiSktjcEtTR3hHWk55dXdvM2t2OGExY2NiWXNGWktSVGx2dVIyb3RkIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0NjYwNywiZXhwIjoxNjU2NzMzMDA3fQ.FX8FfSTzKTbP6LT2IvZAz7qLrQ4BjWtoHEBVJArKOxY',NULL,NULL,NULL,NULL,'2022-07-01 03:36:47','2022-07-01 03:36:47'),(641,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJONDZmSExycEJDRjhFYXlJUFJ1TFF3c2ZNckRUOGRvMWlNYm1rMlVNa3dadDR0dE5TdXlhcHJ3Z2hnRGRlUXBxWDFaY2JTeXVjc2FxbG9hRDJqNkVYUEt1bUw1alZxbWM1cjF5IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0Njc4NSwiZXhwIjoxNjU2NzMzMTg1fQ.HguAoThBo_tUz8Ifgkv4pQalkpRJoE8N-1peZxK3QLA',NULL,NULL,NULL,NULL,'2022-07-01 03:39:45','2022-07-01 03:39:45'),(642,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiI1M2t3dzVJVk1SU0dwNVZKOHFXbDRnb2ZKTEJWTWoxT3d1NllDY0djWDNoVEpjQnBLUDdoWmdDeXJrOTl0OENKbVNKUHFVeGs2VEJDVmxyQmtXWXlyRkplSGR1ZFZzeEVjVk1RIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0NjgyOCwiZXhwIjoxNjU2NzMzMjI4fQ.ME5Ke3Xn1DNJL_7x6jERn-dAwOR9B0xv7LNWtFkRQyc',NULL,NULL,NULL,NULL,'2022-07-01 03:40:28','2022-07-01 03:40:28'),(643,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJZNm5zdkd6bkNJNm9ZWnhWekJTVDVLdDRKY0lnSDR0SlVjNnlYc2hwejdNbnRTQmwxbFpmNmo3QTJCZlFzZXhxY0VhZHRmNXJvUE5jd2NSWUo0NjRJaGVBd08yM2V4UDRNT1lIIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0Njg0MCwiZXhwIjoxNjU2NzMzMjQwfQ.jcTBTKKMgF_WhIEeMt7j1ZQal93m0P5KoL5X1zD2ZOE',NULL,NULL,NULL,NULL,'2022-07-01 03:40:40','2022-07-01 03:40:40'),(644,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJKREo2bzdyOEQzdmRGUHVIaEVReGxHUXc4V0E1bkVCc0pTYVdNQ2hrOHJFSjdYQW5GMkdid25DdE1sWE5RR1BXYzhuWTE3b2xlWkRPdUhpRklDVmpwT2h5SXNoU3F3Vlpxa05HIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0Njg0NywiZXhwIjoxNjU2NzMzMjQ3fQ.aMhE6HORxG1hhZ7yDrZ9z4ujrqxPWd3ha-nGH8x9Pvs',NULL,NULL,NULL,NULL,'2022-07-01 03:40:47','2022-07-01 03:40:47'),(645,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJud1Q2ZFdCMU83SHFiREFSVkpObGppSFRDMWNWcEpIWTU5cTloWnZwTmk2ZVhzaWh3WnhHVHFpbUtveHhtZlF2dmdzUzkxWDJQZUlQN2pzOVdFd2xKeno2UGkyNjJhNEtuUGJPIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0NzM5NiwiZXhwIjoxNjU2NzMzNzk2fQ.htZz21ZogMQ5_fZmEjPxNqM0GsOKrkvfWmY_Xfhex4U',NULL,NULL,NULL,NULL,'2022-07-01 03:49:56','2022-07-01 03:49:56'),(646,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiI5MktTd2c5ZXRrQnNZdWQ0UHVIdFRkNWk3WGhORnQ1azJXU2ZJWGNJSUNybkc0ODVSeGdhM2VjMnppeEw4eXVWNnNYeXpOSkI4YWp3QTM4YkNKNHlXb2FvZXZjcmlaNWRIbjlIIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0NzQ2NCwiZXhwIjoxNjU2NzMzODY0fQ.UnZ2JqKsg_JNsNjJvXVi2QrrnbiUj5wic7HAmES3zEI',NULL,NULL,NULL,NULL,'2022-07-01 03:51:04','2022-07-01 03:51:04'),(647,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJmNXVreDJhaEJUdFRsS01XNzdRRXNMdmNzc3ZRQXRUZXUya1pHQVY4RHRzU2ZRUDZRdDJMNlE2ZmxJUThJUjZ3SEZXTnhqZUZqeUE0VTlMZFh1SU9rREFNMXp4MWtid1dEbVJJIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0ODQ4OSwiZXhwIjoxNjU2NzM0ODg5fQ.jUoRbNHeNOr5pLVRqR1ietwMTLRXc4IgP93buuvDD9w',NULL,NULL,NULL,NULL,'2022-07-01 04:08:09','2022-07-01 04:08:09'),(648,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiIzMlNZa3NKVWs3NmZSVEZxVUJjdThkdzlPM2IycmxvZUNFaTVDdFFJaVBiZks3MVVUYnp0MnhmbU5RVjZQalFzQU95b2tIeHVVUGROd2o3WWNiaFFyQWJWNXBHdjM4Mlo3RFZPIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0OTIyMSwiZXhwIjoxNjU2NzM1NjIxfQ.XeElBUBugg0dUjzlzfE-lFP8ZL0hF5PrkuehPrZOSk0',NULL,NULL,NULL,NULL,'2022-07-01 04:20:21','2022-07-01 04:20:21'),(649,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJlcWxYWG5XQm5McWIxOHdaVFZ6R010ZUsxQ1d1cnRXQnJHTkZxSnBNcW9iTE1ZYXdWUXN3aGZNRzRGWkxFMkRVWlZxT29lYUxBb0ZLcUszcjFPWWRtQ2xNZ2IxSWF6eUNvNUdLIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0OTQwNCwiZXhwIjoxNjU2NzM1ODA0fQ.IcwsXBu8YUQzcrxsmNXHlfSkaV3qKt69x0b42iRveJk',NULL,NULL,NULL,NULL,'2022-07-01 04:23:24','2022-07-01 04:23:24'),(650,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJiZlBkMmI3dW9nQ2Q2N0NLaGNWVzdyTlJmNnZuNXBaQjk5aFRYTk9XdTIzSE1mVllWbWFETnRWdkJ6dFhqTHhJbVNtQ3Z1OHBrelZIbE1jUkdRbDl2UDVqeUkxU2hLY0pIdDdxIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0OTQ1OSwiZXhwIjoxNjU2NzM1ODU5fQ.UvlrjvuVj8zvx7odeS7Ar_fChhw5SKsc8oG68cyxWxU',NULL,NULL,NULL,NULL,'2022-07-01 04:24:19','2022-07-01 04:24:19'),(651,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJOS1hoSFRUc0FwbmVCWUt3akxudnJ0NWRaaXIzR1NENGt0c1JGdm9KVXFrS2c0Z1lCTlZ6OTVFeXR5a3V0eUx1YlRWTVk1OHNrb0IzaHhrS3M3ZVNSTzFrc0dPUW9nNWt2TGZHIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NjY0OTQ4MSwiZXhwIjoxNjU2NzM1ODgxfQ.sxbVMhSOET2JVMBOTDLSlmYFIPM07NEP8kBRARsHFLE',NULL,NULL,NULL,NULL,'2022-07-01 04:24:41','2022-07-01 04:24:41'),(652,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiIyeTZjakZEWHlCZFdYeGN5ZkJ6YThzZENaVEZBM0NuV3RVZVc3V0hiYlY1Q2RVa1Y0bmVvRWJ1MWlNcGU5R3hhVjY3VERmOVJ5clhpb00xWXc0VkdISG5CeVdqdndWUFozdkIxIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1Njg5ODQxNCwiZXhwIjoxNjU2OTg0ODE0fQ.et7mqIGIE7EaBvz8U0MBKg4n42l8EX0N6Gyfq4YBbsQ',NULL,NULL,NULL,NULL,'2022-07-04 01:33:34','2022-07-04 01:33:34'),(653,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6InpSekdzR3lGT094dHFSSDNMT0NvTWpYUTJMOXZnbEdWdDFDaDZpelI4cjczUkhXeEo2RHFqdWQ0cjJET1BvZVFNdlZoRUpmRkZQRkt4WVF6aDl5ZFpUM0V1c0ZKNUlxdUZoMlkiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTY5MTkzNzYsImV4cCI6MTY1NzAwNTc3Nn0.JPia-69j2z0CnkywXS1fEGi2gwR2OnIQLuMumkg-0dA',NULL,NULL,NULL,NULL,'2022-07-04 07:22:56','2022-07-04 07:22:56'),(654,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJTRG45dk9KdGNkcTVHakNMN2JPRDU3T1B3dTgxMVJnT3V0a0V1WEp4MnJjeUZ6N0RxYmNHNXgzQjlacHA2RjlKNXFYOGlvSDUzVHY4dk9SREc3TEpUdm96N3JGNWF4dFFlT1MyIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1Njk4NjQwNywiZXhwIjoxNjU3MDcyODA3fQ.0VamOUmUCBjekkG55JiO_7VffNqHqvWU1BaSJhlJCGo',NULL,NULL,NULL,NULL,'2022-07-05 02:00:07','2022-07-05 02:00:07'),(655,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6InBCWkpGSzNVc0g2TlVRSGZFc3pRVVRLMmFoRWw0YXRqaWt4MXdQb2xZV1VWRU5JTFFMMzRDN3VHdGd6ZldYd1pPQ2p1dkFUQzRWSDFkS3ZDMU1kOTR1QXRDZkpteUpWWW9YOTgiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTY5OTA5NDAsImV4cCI6MTY1NzA3NzM0MH0.dCPV0vUg_J-HTS85SPEJGffixk_RLSAYj1OL0qiHDx4',NULL,NULL,NULL,NULL,'2022-07-05 03:15:40','2022-07-05 03:15:40'),(656,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJEUHh1cll5dVJ2ZjJtajhjRXh5MnRrcmg2aU5oWnd3Y2JNYVBQV1FIaHU0RnhzSGw1a3NScU5OUEJpbjQ4RnpBRmVxYlNYRW92YmNGNlVqaFBJdkFROVpjVnhaMXVEZ2hlVFFLIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NzA3NTI3MywiZXhwIjoxNjU3MTYxNjczfQ.8q8NaIe-e2LMWjQb5aliC3ZY7EDDZxNxOnemCnlVKik',NULL,NULL,NULL,NULL,'2022-07-06 02:41:13','2022-07-06 02:41:13'),(657,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6IlQxMUR4NVhvUjduZ0FrWWlacm1MWlJsTmlRdmJwWnR5UURmN1RuODNCdVBWOGZCOXppQlVOVEdkckVrUVdqVTYxYjk5dU1wSVVFUjVLWkFGMnpYOG1tWXZRWW9lcWxlSGFnWTIiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTcxMDQyOTMsImV4cCI6MTY1NzE5MDY5M30.ezcXLtVAFncLE1_Oc5D47r0tM-oiWfSpddQ51pNCE4U',NULL,NULL,NULL,NULL,'2022-07-06 10:44:53','2022-07-06 10:44:53'),(658,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiI3Q0RNSlp5OUFHNHdkUnFxR0djejFMNjhiaHl6NnhXcDUxSVI0cFRFRVQ5Zk05bElXaElWZGVPSlZDV21Qb1FTdWVLd2VBUlUzT1BIdk1USkdubTF6cGNRaUxOb1JyVlpnWDNtIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NzE4MjA1MywiZXhwIjoxNjU3MjY4NDUzfQ.mVhxKKPpVQ4qFwieirixi_iocZ35KZ40v67zafgZgE4',NULL,NULL,NULL,NULL,'2022-07-07 08:20:53','2022-07-07 08:20:53'),(659,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJBVm9xeFlzckZwQWJleEhNWG1hNkRaRXE0eWE1VHBxWDRrUnVISWZER000emZ3YzhFaVVnZWY3QUpsSlZxWGZDQm1Kc3RHeE5ndHNyYzl0dnF2eklETGpURWhReElObGU3dWZrIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NzI0NjQ2MSwiZXhwIjoxNjU3MzMyODYxfQ.gNx0p9tYH9iw7VIycxkiJW68tLoDI77PsQv7vn_4osg',NULL,NULL,NULL,NULL,'2022-07-08 02:14:21','2022-07-08 02:14:21'),(660,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6IlJFb0lnV3piem1XV0kzZml0OFRGYzJiWnI5VmdyU1FCc0hFRE1zS2xWMm1HQngzTHlDVDhZWjZlR1pFMmNMaUxWbmFVNDN3R2lZSHE1ckxNNzN0WEszVjlINmt6SFBsVGdwamMiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTcyNDcxMDQsImV4cCI6MTY1NzMzMzUwNH0.4PpDlT548GnAGfq-DRia_M-fYtyzmq69BGHn-eq4OfQ',NULL,NULL,NULL,NULL,'2022-07-08 02:25:04','2022-07-08 02:25:04'),(661,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJPcDZ2dFlaNFg5MzJodnFpUFVzZnd6NmpoU25XVUtLTmRCSXI1NDlKNnlLdGlZalFWald0a3dYNWJSR3hrbEM1UGlHYzlTQ2lJTGtCSlhLWjZ4SmR0cXNCQ1JTeURzVWpOTlo2IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NzUwNDYzMCwiZXhwIjoxNjU3NTkxMDMwfQ.yuSTfBRzru70bV6QAWMvxvidRxNlBV5wVAKKidKRoSk',NULL,NULL,NULL,NULL,'2022-07-11 01:57:10','2022-07-11 01:57:10'),(662,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6IlZocnhIOTJ3d0l0cGltZERvS3g5QmJQR041TTloMnZTVGFQclhzZEZSRlRVVUxLV0NUT3JWVUJwdzdsVUJYelNFQjdCNVFXYTd2bFZvb25XN1ZncTVMTU5tN3AzVWpjSEFVdmoiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTc1MTQzOTEsImV4cCI6MTY1NzYwMDc5MX0.RTCp90dE9sQqhCwEybt432nJXOejHgD3XiZNS2WRjCw',NULL,NULL,NULL,NULL,'2022-07-11 04:39:51','2022-07-11 04:39:51'),(663,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJDa0hUTEc1UjlONmRZYmc3N2xoNVp5SW01NkVVbjJDRWJQYVM1VlZTVFdpd2lrWE5nclZTa2pZSkx2Sm5zUU9uR0hGVmZiUzVoV3E2UzNWRWZXQTFrclBWWHZZc2J0cE1XaDJiIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NzUyMjg2MCwiZXhwIjoxNjU3NjA5MjYwfQ.t2YMNk2emNQBSowRSnDwouHoFdb8QnYzKuMcSfzY9Dg',NULL,NULL,NULL,NULL,'2022-07-11 07:01:00','2022-07-11 07:01:00'),(664,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJnc24xbnFNWGU1ZGdCNU5XRVZFcXAzUUo0ejMzZHl0TWVFcDYzYUFEbUlTZVoxbFQ5bHZnQnBDSkV5SW1BM2IzeDhuZ1VWYm1pYmVQdjltUHFlUHRjSXZLbVhkdHVJVERsNXJiIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NzU0NDgzMCwiZXhwIjoxNjU3NjMxMjMwfQ.l7Fa0OzhWKhpPkhAQoQ8LIgL07wZxuoU-k7trEovEQo',NULL,NULL,NULL,NULL,'2022-07-11 13:07:10','2022-07-11 13:07:10'),(665,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6InNFdWU4V2dqMkVpZUp2OXpTb0ZtUXVkYzV5TWh2VlZzbUFwTEFhbWtsb3ZlYXlzR1pGVkVsWXVYZmdhUHBYOFc5OENkSWpVOGFwOG9ER3R6WjJUOWRHNGVnenp3QnRqV1hYSVMiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTc1NDQ4NDMsImV4cCI6MTY1NzYzMTI0M30.0n3UG6-6rL0R9-AsydnF1sPtWlX3LGvO80IwalrVWmY',NULL,NULL,NULL,NULL,'2022-07-11 13:07:23','2022-07-11 13:07:23'),(666,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJjOTZIb2RVSDM0WFZQRnFRWXBBZGdpUkRwTldva3paYjdaSUFLcGlibWU1cjhLWnhBVTRJc05wbnc5aUFpUTR1aGJtOEVuc3J4YmlzOG5lUkFBbWoxb25xZm16VzFDUUtyVjlJIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1NzY3NTY1NiwiZXhwIjoxNjU3NzYyMDU2fQ.nkrHc-96qq0nGfD4nEHqpb8rz6n2SxrNC62d9zsa7ZU',NULL,NULL,NULL,NULL,'2022-07-13 01:27:36','2022-07-13 01:27:36'),(667,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6ImE5QXlWMkxtVUZ5Y3dyc0RQQ3VXNmZJaHB1SGREUG1UcXpQWmoyZmVlQmlvaUdiVWNvR2poM0s1cFZBeHZDMTlEcEs5ZnZPSmdGdUlaT1RqOERyRzhabEthSlNuZXl2OXlJV0giLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTc2ODAwNjIsImV4cCI6MTY1Nzc2NjQ2Mn0.18tNqxlRhcMyIppQXAMOHZZI4SJgrSvdqM8tp7evzQU',NULL,NULL,NULL,NULL,'2022-07-13 02:41:02','2022-07-13 02:41:02'),(668,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJha205NzF3YjRITmFsWEJqTnlBYW1FRThQSnByVUM1M1VHMlRhSXFKbnNCTDdHN09QSFQ5blczVjRMdkJFSVhrblV4OFVTdU9xM1prM1N1WnE2cGJTR2FaeE1ZYTdjRkh0eW5yIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1Nzc2MjUwMCwiZXhwIjoxNjU3ODQ4OTAwfQ.Z6Q2Ai28L0UlP9jTDGzRXyPInkSsAV8kGJY7iMphMUY',NULL,NULL,NULL,NULL,'2022-07-14 01:35:00','2022-07-14 01:35:00'),(669,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJyb3pkOUU0Mk90OUxYRzlsSldXQmVLanpKN0xkeU9RaVp4YmI2d0JocExqZVpVc09zY3FHSDFyZTc1T0FVaDZ5OWVqVWdQY2U0WGJldjlKQlFUR01mMTVMaHhKa3R1SXkzd2pTIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1Nzg0OTYwNSwiZXhwIjoxNjU3OTM2MDA1fQ.ci08LENNXmgbe9h4hYHrRKFnRXp_-CYPM90jCZPAMVw',NULL,NULL,NULL,NULL,'2022-07-15 01:46:45','2022-07-15 01:46:45'),(670,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6Iko2S1QybUNUeXBSUjI1RFlEZ1laeVhWNXJ6M1BEVHhleEhSSG95ajR6Y2FpaTJOVk43ZzdUNm1DbGVLWUtaejFtZjl1Nm05SlROTURUN2VsbzkxQlR2TGxra3RSYzlGQ1lLV1UiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTc4ODIxNjUsImV4cCI6MTY1Nzk2ODU2NX0.dPo4wu1pj3DVomIvuE1zFBjBC51galbZWBxyDTAdDFw',NULL,NULL,NULL,NULL,'2022-07-15 10:49:25','2022-07-15 10:49:25'),(671,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJtQnZGSzhRUXVnZEJQclNCQXdrYmc0N3BPNDhhVHM4RFBvUnVVRThGUXJIbFlPa2tMVEs3Z2NMQmNSOVh3UE9CbFpkc3ZBaldmR3pXVnpmamlvSzZDTmdkMTd0enAzY3FnTFZrIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1Nzk0MTQ1NCwiZXhwIjoxNjU4MDI3ODU0fQ.nUEyz8G6VcT2QGrpadO4sCSMHyiGYv6AyPs3gvauPjA',NULL,NULL,NULL,NULL,'2022-07-16 03:17:34','2022-07-16 03:17:34'),(672,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJFSXVEVkNPQjllZWRWUHhnVm5ISWZOdEZvR3V1ZHpDVjJubll0ZHRLMkI3cm54R2c3UWtDeE40S1ozOGxZRk1OYmJXeHhYOXBmOXAzOXhreU1wNW5sV241dlBZZVhjdG9KSWZLIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODEwODMxOSwiZXhwIjoxNjU4MTk0NzE5fQ.ZZNSbmjG6g1NL6pVOMmu5mrGjQo3XiZRj1OzOiMQGms',NULL,NULL,NULL,NULL,'2022-07-18 01:38:39','2022-07-18 01:38:39'),(673,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6Inp2Mm5Ka2FpSWV6N2JIcnM3bWdBeEdZOUpJelp0V01IUno4NEJjbXViTVRNTkk4NmdVUE9MeTN1OXpQa2FZRklUdkJ4VWt5NWZoNFNnQURXeHdzdzRFdlVjUlViOU9pVVVXOG4iLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTgxMTY5NDQsImV4cCI6MTY1ODIwMzM0NH0.T-zv2CRTUik2aczzpNMLkBlVIdVq-aAb2OOZOLaC8Is',NULL,NULL,NULL,NULL,'2022-07-18 04:02:24','2022-07-18 04:02:24'),(674,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJXRU5ISHF1M3k2MWdGdzM4NHdBdTV3cUE0dmFuVVhmaThzM3pWb09BVkZ6bUhIUkJDTEhuS2dwQ0RaSjZNdU1xaU1VOVdNU2xjZ0kxajZmbEtGZDRIWXpEYVh5UTdhcDc2clpzIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODE5NTUxMiwiZXhwIjoxNjU4MjgxOTEyfQ.Xq-FSk0sK0dzsfbSvMXCsSkZkK4tpsp9FoLaOaJQhDo',NULL,NULL,NULL,NULL,'2022-07-19 01:51:52','2022-07-19 01:51:52'),(675,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJUbUt2TjFwQkVReHFSOUZXSWQxM1dQWnIzWWpyS0p0REZXTzhPTzYxamFUNUpBand3aDd4Vm1OZXFXczRueTZEZzJqODRMU3BLeDhkZzZjNHp5T3ViallVNFpsTE1NdE8yRTJwIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODE5NTcyOCwiZXhwIjoxNjU4MjgyMTI4fQ.iJK_MbzATf6C7dc3m_tsfJic_wSP7Z3hSTLdYOnh4SU',NULL,NULL,NULL,NULL,'2022-07-19 01:55:28','2022-07-19 01:55:28'),(676,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6InZ3eEJka1pOREh5NUVPb3RPRkJTWlE2MWVRTUNFU0ROUjR4cHp6VlJ6VGNOenBqbkhqcWxXdmhLSTk3Zm56WmZ0eFJ6VUF3RlNXSjNLRXlDaTJ3SnVWNmNYUmd4TENiaXFvZkMiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTgxOTU3MjgsImV4cCI6MTY1ODI4MjEyOH0.Cn_4_DMRTbi7fKlxWNvx0NRvgvCxu2YGLKy8GX4_85U',NULL,NULL,NULL,NULL,'2022-07-19 01:55:28','2022-07-19 01:55:28'),(677,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJ3Z3l0NTFCcUdaRlZUVHAzZFB4OFFxSk5PeXNmdElxVHVxM2tBRlFpbHN2aWQxN0pUdjJmY0wyRG9SM2QxWTVnbzd0bVVoaXc4dDNCTU9vNnVHdno3ZGhDYzhQNlBaQTFLSWQ2IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODIwNDY3NCwiZXhwIjoxNjU4MjkxMDc0fQ.Y3kRyfk8m62_ALwlvdiVC3ufkuaSgJTQFZoms2OkWGU',NULL,NULL,NULL,NULL,'2022-07-19 04:24:34','2022-07-19 04:24:34'),(678,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6IkZPeUNZOEJqVnlQVjFJSng0RkpJSkZtZDZuRVJ5dEtpbkd3ZHZxejRJeFpLNWtma2pmc2N6azhzY2V2clZndHlNS3ZMWFlndFVlOWxyUXo5eEZMU3VITXBvdlBIQXoyRkZjQ1YiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTgyODY1MzgsImV4cCI6MTY1ODM3MjkzOH0.8oUnWT1OQSHDxw3gCtKptJ6eKRZzTZUbscEQPP9t0hM',NULL,NULL,NULL,NULL,'2022-07-20 03:08:58','2022-07-20 03:08:58'),(679,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJ1V2w1NUN4S2pGZktjdmdmdEFjRkMzZElVVVV4T2RsWnk0U042aDUxNGZKQmhDcFI4NkJzQVhUUkRZUWdFeEhGWXVoeWNIVzdqa0NBSklHckpCc0drSUtqMjNtTzFFWkhnc3ZwIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODMxMTc4MywiZXhwIjoxNjU4Mzk4MTgzfQ.RqrThzAxR1aOYB16kSevEJLEJtRLuLlz2mJf38CK_24',NULL,NULL,NULL,NULL,'2022-07-20 10:09:43','2022-07-20 10:09:43'),(680,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiIyOWp3VUtNT2E5Q2NoOHhwMnRMOURyWmM0Uk5LUzdmM1hrUTJqZW5ScDIzczM5S1l3ZkQ3OUMyVGxmTjNBc3dOTGs2UVZPTktkaktsdnFlM0Q5U3VwVjZrNlRlaVl1R1NwVlMyIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODM5NzMwOSwiZXhwIjoxNjU4NDgzNzA5fQ.W-Br-KI7HJ7Pmn-48okQBnd85NZNJK5GIdHJQR8WnXw',NULL,NULL,NULL,NULL,'2022-07-21 09:55:09','2022-07-21 09:55:09'),(681,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg4MTIwLWYyYzQtMTFlYy1hMjMwLWU3ZWI5NmY2ZjE5NiIsImVtYWlsIjoia2hhbmhkYW5nYm10QGdtYWlsLmNvbSIsImFjY2Vzc190b2tlbiI6IjRqVXpYdk9iRlVLRjZjcFZhRWFaQ1JNaWM4VE1USmNOdDdrb0JDZTZSZHh5RmQ0dzN1d1pvSU8zM25tYU9oR01HSDIxMWhDeFV6TUVNaElxNmExRHZwSUhrWkJJczdUclZnRWMiLCJ1c2VybmFtZSI6ImtoYW5oZGFuZ2JtdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTg0NTU5MDksImV4cCI6MTY1ODU0MjMwOX0.GWaljMjvnweg99WRmVsC6jLhWXN412UDyIrq-uOKWjI',NULL,NULL,NULL,NULL,'2022-07-22 02:11:49','2022-07-22 02:11:49'),(682,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJvTlhKSzRnS0JCTEUxU3pVeUt1eTgzOTlKeXNVR1ZWbnp5WUczWWxYRWxtV2tSaDVidG10c0NKZGlYbW5GdFc5VWhINFdkTVdjeVVjdVMybDUzclhkblR6bTRFTEc5QjhKdW1sIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODQ4Mzc3OSwiZXhwIjoxNjU4NTcwMTc5fQ.eLCGGYgNGzaKREN14OqDe6GxS6A4ZU72LE3eCpLdGQ0',NULL,NULL,NULL,NULL,'2022-07-22 09:56:19','2022-07-22 09:56:19'),(683,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJzT2pwNlo3bFcxaHU2SllJa1JINGNFbWVQenNpdnZ3Mm9RV3J3MUdjZFZoaGQxeEhjMllneVpoYm50V3VOaGFydmlxWnJhUTk3OHZJdWVPNFNvSFZlM1hZYjFyQmF1dDV0MWNhIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODY1MDIxOSwiZXhwIjoxNjU4NzM2NjE5fQ.0gWgVz9qUgjH9K3Orr3Vy_rXIl8R32ylxH93-VwsPCE',NULL,NULL,NULL,NULL,'2022-07-24 08:10:19','2022-07-24 08:10:19'),(684,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJkNXNwa3I0N3ozelFBYW45Y0JQdHh5WEFNZHFveFpNVU1jcUhneWdmNzczQXI4Z25Ca0gyMjVQRTMybnhKYTNXRjd2ejRUcGxidXV6RVFJb0FuV0tqY1VCOXR0WWtRRkJEOVVqIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODY1MjA1MiwiZXhwIjoxNjU4NzM4NDUyfQ.r7bJLWLcMzZ7-8nDTPoug-zZEE7OUu51pup4OkvG4vY',NULL,NULL,NULL,NULL,'2022-07-24 08:40:52','2022-07-24 08:40:52'),(685,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiI2NzlzaFc4YktzdWtleEZYNDJrWWd0VmQyRDZKOGw5dHY3eFNqUVVSdktEZks2YmFjUW9vaG5GbzJjQnBXZnJ2T0FmRDRtakZ3WWtGU3gyRnF0RXJ2S2R3TmE1b2pzbk9nTVM0IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODY1MzA0MiwiZXhwIjoxNjU4NzM5NDQyfQ.BMReChbtpqPTUNepCSvh6AguAYiLKgXXRVgcJbG5om8',NULL,NULL,NULL,NULL,'2022-07-24 08:57:22','2022-07-24 08:57:22'),(686,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJ2RHpBaEc1SVRRYzI3MlBudjlWcVIxZUpyMlJmNGN3UkR6Qjdjb0k2OWhobWtnSnJJdlhMTjFsakFXZVYyclBBa2l5ZjRCTW50QVh5NGxwWVhzaTlIZ3lqYzhXWWpjQUtxN0NrIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODczNzcyNCwiZXhwIjoxNjU4ODI0MTI0fQ.zzZq0DZP9GxHaLTt4jp-5jMLfIVG1_n214fp3E4WdRA',NULL,NULL,NULL,NULL,'2022-07-25 08:28:44','2022-07-25 08:28:44'),(687,'LinhTran_24','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiVXhiUThrS3pOTEVhUUM2T0VPTDNOY0ZDbFh3SlpJeVVST0tPOWtxNHJXOFJCaEpjY2tIWVlWZ25CTzJWeHg5ZEZBUnh5dEphQ0Mzc0FkVDk5TWN4ZjU0eGM1MWhTdUxVVllOVyIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU4NzM3NzM1LCJleHAiOjE2NTg4MjQxMzV9.puTCMD4pEZ_-A_S0evSzyo_evHVd8dxKxIpIAZT0ruk',NULL,NULL,NULL,NULL,'2022-07-25 08:28:55','2022-07-25 08:28:55'),(688,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJZekw5UW9wREw3amZJNkhXcmI5cHRZN0RydHhrMURueEhPZTZQajhJT29kMnFpWFNWTVM5QlZ0eHBKQkVta3d0bUV6emVQYUk2ZmhTamZiWk1sc0dDcjNFNFpOTUtVaUJtUXp4IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODc5OTY2OSwiZXhwIjoxNjU4ODg2MDY5fQ.hQWpHg0-LHD8hIj9p52Cb5QndBrxeQr0RZwp5OxJpxo',NULL,NULL,NULL,NULL,'2022-07-26 01:41:09','2022-07-26 01:41:09'),(689,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJhUHhxVm9QYks3czQ4NHY1MXpob3VNRkd3bnc3RFNmV1FGYUJCQ1h1RW5DT2paQ2xHNjMxNnQxdmtEQW16YVpoa3JsZUE1TnF0VHBZUTU5eTNxZWw5Qmg5dzlFS2pra1Y5M2tyIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODg4NzY5MywiZXhwIjoxNjU4OTc0MDkzfQ.jkeK1O8Y1elFEbHyB9GbKkf9asDyiD08a4W0e50KcDc',NULL,NULL,NULL,NULL,'2022-07-27 02:08:13','2022-07-27 02:08:13'),(690,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiI4cG93NHF5TzRweTc4R2w5cW81Umd2YjZHSXZWN0RLSEVFTUVTeTRVQlBEWVpOQ3RNcUtBV2IzVWg5YkxDZWtCbDR0RVdqYWdNZUo4c1lGcXlpWTgxTEx3M0phWE9MWDkzNFdwIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODg4ODg2MCwiZXhwIjoxNjU4OTc1MjYwfQ.Tl2naw42Ild_zVX8gLpGRO_-a1NPtl8Oj6HAW_0wmEU',NULL,NULL,NULL,NULL,'2022-07-27 02:27:40','2022-07-27 02:27:40'),(691,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoibTRzUlRGa3VNc3hHVVlRVGdiOUNTdTlrRlU2b3RnejJJazVkdjg5MU5wZlY0NHhnbWM5RzdDd2UyZFpaYmtPMWZta0VDZjUzM3h0OTZLN3NGeFVQemRrRm5pQ1dUbzM2dFhCeiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU4OTA2MTg2LCJleHAiOjE2NTg5OTI1ODZ9.9LZaJcmXmiF9LSdTJXaRXw7lSMyg2gNV1v_8YoWsm6g',NULL,NULL,NULL,NULL,'2022-07-27 07:16:26','2022-07-27 07:16:26'),(692,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiIyblA0WWN3c2U4N0c4TGY3czM1Q3h4VEV1bVZtS2NWdW1UenBhQlNwWnhnckdOWUdCNnlGVnR2QlVXZlVqSEM0U1NiUGR5WGtwY3NwcnZWem1qVHVzbWY0eG5yZlo5UVg0Nm1FIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODkxMDI5MCwiZXhwIjoxNjU4OTk2NjkwfQ.lwwsRq-romjlB1k1mJZ30CS6bmOaeW4ai_paIB2yTuw',NULL,NULL,NULL,NULL,'2022-07-27 08:24:50','2022-07-27 08:24:50'),(693,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJmQ0w4eDN6NEFWd29idVhtZ2EyY00ydXpKODRrT3BtSk5ka1JQZG9DdjUzc2x3YlFqS1NIRnJsd2poZUNNWThUS3lHYzdGQVJWUVhWU2drSUVvN3RwdzZ1ZEQxV3BTNm9YU1NrIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1OTA2MTI2NSwiZXhwIjoxNjU5MTQ3NjY1fQ.356VbYq_ltA8py5IfO0hzSBxxwekcFpXwT8QZYZqRA4',NULL,NULL,NULL,NULL,'2022-07-29 02:21:05','2022-07-29 02:21:05'),(694,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoibnpyZTV6NW1aWWhOMmx4endYbGNkVU9PVVhSdFZ6Z3RpcXJxb1dNR3Y2MXJhb0paQmptWGlKMjhLVTI5NWVKT3NVR0dqV3VIbUEyS2Q5cFZzMjJqNlZsWGh3OVRWZ3hCR2YxUiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5MDYyNTAyLCJleHAiOjE2NTkxNDg5MDJ9.Nic0UaBFruV9_Mac3cQf0tu6QClqBXjMFAERnwxRD6U',NULL,NULL,NULL,NULL,'2022-07-29 02:41:42','2022-07-29 02:41:42'),(695,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJ2RDVaN2Y5Z2EyYVZOdkpHNHpWNVZsdXJkR094emZ0Zzg3WGFWQ2dGT1NoSXpHaGxqbkxzUzJXaEhMeWU1TFhEMUtnaDFkVVI5RFpRSElOWHhQN2pzd3VFQ2dZd3lON2JPcEtCIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1OTMyMDk0MiwiZXhwIjoxNjU5NDA3MzQyfQ.fR0kOdtrLrc-nH_kqvmzJJWSEjd2UyVyZYOOJ40xaBc',NULL,NULL,NULL,NULL,'2022-08-01 02:29:03','2022-08-01 02:29:03'),(696,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiTlprTlhoMTJhS0RDRjRFM1Rja0t0Uzg3eHRhSFlZREJWT0hxUDI3T1A0UWZVd0lodTlQb3R4Y0VsbnVzWmdEUnh5QzlZZ0dxR1VHQUdqcHc2dUR5OVE0YjNkRU9vWkoxQVVheCIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5MzIzOTI0LCJleHAiOjE2NTk0MTAzMjR9.ldj04AiS-5DUPYwMOOoH5UU7crczZ9Zv3QEr94huJVg',NULL,NULL,NULL,NULL,'2022-08-01 03:18:44','2022-08-01 03:18:44'),(697,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoib2tDQ0lESjJjeVBiQ3c3NWhuaDFOVklhcXJiUGdMcVJ0Nk9ES3ptVmtZOWNrbUNtM0dWUVA3UG54b25ZNDVOTE1UUG1mbmJLSmthbG5pc3VrVUhlZGpMMUVQeWlWWXR1UjNiVyIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5MzQxNTQzLCJleHAiOjE2NTk0Mjc5NDN9.sR7waxzgL-kXopk9zzeRuPQ1pe8BMEm_yjTsxlYbN4o',NULL,NULL,NULL,NULL,'2022-08-01 08:12:23','2022-08-01 08:12:23'),(698,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiaWpqcFY5TmZnbU1oZVlRR3pGVGdQS2tqTDF2aDd5a1E5YnBheW5TNldPWWZaR25YM0h5TDRRaDc3dlJsWnQ2OFlGUjlndnN2ZVhuc01ocm1OWXVOaFZZOU5nQkxzUW9TblU5VCIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5MzQxNTY1LCJleHAiOjE2NTk0Mjc5NjV9.ssMOAi-8c9m1ZHhNA5FKEL2eAc9CyHE6ntsqYw9-rGw',NULL,NULL,NULL,NULL,'2022-08-01 08:12:45','2022-08-01 08:12:45'),(699,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJxQ3p2QzZqYTFaNXhqMWttUGQ5MUg3NmhMOEJVT3pudDFEdnBtSHBTN1hhdmh5M0tQTW1GSzVkczlEZDN1d0RZNFdDYU1WeG90b0NEelBodHVQS3BVNnc5Q3lwSTVuNllYOVdVIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1OTM0MTU2NiwiZXhwIjoxNjU5NDI3OTY2fQ.-MREYTOwrOqL5SpQBKeB1cbX0x67R9aHkYEoIGrVSyw',NULL,NULL,NULL,NULL,'2022-08-01 08:12:46','2022-08-01 08:12:46'),(700,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJvc1FMRjVESW1hMzFmTVM5VExXaHF6UnRlTThGeFdVUHpaY1hjUUUyU09mVWxoWTZnRkNoYTZHQVllMWJBem1hMXJ5bGZVOGVnV1RuVWFZWThLOTZyRkFPcEdyVGZtS0VDZnFLIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1OTQ5NzYxNiwiZXhwIjoxNjU5NTg0MDE2fQ.SgEjxXAwXZn_jQNQF1BhX27nnUYK1wMck2G7A0nHOyE',NULL,NULL,NULL,NULL,'2022-08-03 03:33:36','2022-08-03 03:33:36'),(701,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiQlViMzFpZjFWTmt3YUFwcFZEQm9wUzlRb1NYb2I5YnhSSWo2OW1GQUVnY3NZNmVtMjRzVVZHNjVwOHVxUTE2NEJIWG1nSWdUc29YNndJckZwRmh2Y0c0WGMzNXk3Zm0zSGl4RSIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NDk3NjIzLCJleHAiOjE2NTk1ODQwMjN9.nJvbrWgkEHvFR04S8rWzQEdHeEi3nc7Gl0Ppzy6zjhE',NULL,NULL,NULL,NULL,'2022-08-03 03:33:43','2022-08-03 03:33:43'),(702,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiVlJXZEdvYTdJZklwYk5veG56a3hvZXJpVzRobGV1dDR1ZFBQWXlGdm1lSVFuUTlDUjJJalJvaXhmUk5xVWd5SGtXcjVhSmZ6RVlMdFJ0TW16MjV0Q0VocU9VV3RDOGo1OEplbyIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NTE1Njk2LCJleHAiOjE2NTk2MDIwOTZ9.jxnKNAcPNDkmGT9dXFx9fxEZ1JbvSoDDH9mrpHeh1Zk',NULL,NULL,NULL,NULL,'2022-08-03 08:34:56','2022-08-03 08:34:56'),(703,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJSQ0dERlA3aXNmWTVRQkpXVGFDSENhZGtQZXE3NFF3Z0xtYUxOUWRQQWxHSTZ3bHloN09rZGxJSFpDOXBmY0ViWUNpWExOck5wTUdsQmNLOWlxR3J3bVVPV3U2ZzJGZXIxY0U5IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1OTUxNjIxNiwiZXhwIjoxNjU5NjAyNjE2fQ.0ctR0IVxFc1cl4l-ngP0BcnnRMxkyoZD0y6ZJ7XkiWs',NULL,NULL,NULL,NULL,'2022-08-03 08:43:36','2022-08-03 08:43:36'),(704,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJXOWZmdVhSa2h4WjRqcG9tc3lSVDNad1lWTnhRVEdQVTNpaFJyaVRXZWpEQkNSR2Nkb2NPUUs4Nk1uRHZEbTdiNURnTEU0dzluQVBPUHdRTjMxMlBUdmJWRmtGNlRNUGx5U2JaIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1OTU5ODgyNiwiZXhwIjoxNjU5Njg1MjI2fQ.HrK-SiIbDb7T2mNMMiU4aLbnjJqDT0Wcf4S3Ud5E9DU',NULL,NULL,NULL,NULL,'2022-08-04 07:40:26','2022-08-04 07:40:26'),(705,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiQ2M4dUY1UXAzc1EyM0l4NkV4OVptTTcxTUVhOUZqYUFqZXFMRW5GTENjREVDYkRSdHdEQW1ocjV0MktvZzVmdVQ5bGhWVExnWTlFcUp1RGpqNDV2NERhbzFubVJYTHNwMk5RQSIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NTk4ODI2LCJleHAiOjE2NTk2ODUyMjZ9.9IxOWoKjxj-LxEwAawgOQr9n4aL-UIsFcK-p5WVxEi0',NULL,NULL,NULL,NULL,'2022-08-04 07:40:26','2022-08-04 07:40:26'),(706,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJQdWRJZkFBWVRCd29CeFFkR0M4enBOd2RERlRxWkI3RDJ2R01qVWdtdElsQmdDdXhaNlhLN2VtZnNPNUFDanl6VllzUHlmdVNOZUZNdFo3NG5WTURvN05TWDl5dG9qUGgydW92IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1OTU5ODgzMiwiZXhwIjoxNjU5Njg1MjMyfQ.pKBlmzvNNJ_BI0rDo4p-aSid2rs3yNMWoioPGovkbKU',NULL,NULL,NULL,NULL,'2022-08-04 07:40:32','2022-08-04 07:40:32'),(707,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoid1pZM3dtWGhMU1pLT3hSMXJkZmJHVFpZWUxOeTNxdmdXVGphRkhHdU1KZFlMbTFkTWVpR3k5ZktmSFFsOGViYTdNTUhONXhPNWFCbUYxTWJBZFRBdk5wUkJEZ21zWTRaTUZVbyIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NTk4ODMyLCJleHAiOjE2NTk2ODUyMzJ9.1KkCQXL9WBgErArKUFHT4CL6d_85WzU6hSBDByPyZdo',NULL,NULL,NULL,NULL,'2022-08-04 07:40:32','2022-08-04 07:40:32'),(708,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiUDZGSjJQckI0TnREcDl5SmtTb29pWE1ZQ2NWUGhEcjlycHZsaG1QN3ppaTlpTzQ2aFE1SEtiUlVqUE1EVnNSR1JwQTZzeENVY1lUUGNSSVlOSlhiVWpFVXhPRmpXeHdJd0hXRSIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjA5NTMwLCJleHAiOjE2NTk2OTU5MzB9.py-nscgFL4sKuuG699tDqz_pSZ4SQGt6hNh_wNr4e6Y',NULL,NULL,NULL,NULL,'2022-08-04 10:38:50','2022-08-04 10:38:50'),(709,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiNkdUdFBOT0xib2FscTJ6Y1ZjckxsYm1XYjhTZ1JOUDlPWXdTcDg1QmNPOWVkWWVTOXViMW1LUm5Tb2tMRU56SnN4bXFQek1YVE41Z3g2NXJlSmU1d1l5Z014Smw2MkgyaHFNaCIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjEwMTMyLCJleHAiOjE2NTk2OTY1MzJ9.wuKvvgTWnXcNN2FJx7KFI_kMmk8E3GgCxkNZEUJJZQ8',NULL,NULL,NULL,NULL,'2022-08-04 10:48:52','2022-08-04 10:48:52'),(710,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoidm5hdUtXY0E5RTlmdWZXQTNvSjVaRlZsMlU1M0FmRDlHUFBFNXdEOWlWQ0FmZlFqNjdoMnFHaFR6SjZtdFdkeVNEZlRGUTdweW5QNnJVY0pyY0Z6cndPOHp4SzlFcHdKTHVIQyIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjEwMjkwLCJleHAiOjE2NTk2OTY2OTB9._dql9qnkDK6IBhd6SSyXiJbFftT1OfZA-NRoXezVvAs',NULL,NULL,NULL,NULL,'2022-08-04 10:51:30','2022-08-04 10:51:30'),(711,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiVnlFc0xpczY2OVBoWVRHWFBzNHhqdUpDUGdMamxYWHhwRld5cmRnaXFZNnJDd0RVcTY3Rm91UnIybllrMXJmVGtBajlvV3BlY2ladFdBdk9DSER0d0JuREhzZjNDV3NCS1VLViIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjEwMzQxLCJleHAiOjE2NTk2OTY3NDF9.6wuo9My3_Mz5yh6jeQcD0qtcqdg4Ed1X9EwyD-2eGm0',NULL,NULL,NULL,NULL,'2022-08-04 10:52:21','2022-08-04 10:52:21'),(712,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoidkpjVXp5Z1RjRmhBNTRmNmdKdU1XY2xiM3QyYXZrQlhGd1hXSTNIMldKcHdSVDRubUdiUFp5dTlHcE1xNHpzbnRaUFNJUkxZUldCdHlZTEpncXdldTZuYW05VUV1TzVGeVVFTCIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjEwNTk2LCJleHAiOjE2NTk2OTY5OTZ9.B6peRXiqEc0PnW0p0kOwnQEYZ-MSkuY8_yInVcWhTLw',NULL,NULL,NULL,NULL,'2022-08-04 10:56:36','2022-08-04 10:56:36'),(713,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiOFVCTkZiTk1Xck5KRHNwV2M5a0Y0bkxsc2t4VzJsRjhGTXJTTG1OZmxtWDhCTzhMTUxJSUFGZHJvald0dXJWb29nalU2aGg5dWRYc0FSYTkycnA4U294QnJYWTRzREtWR2o5NiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjEwODYxLCJleHAiOjE2NTk2OTcyNjF9.AU2-14YciWKpzA64MenHZzQHvTjGceXTf62dr0xhSdQ',NULL,NULL,NULL,NULL,'2022-08-04 11:01:01','2022-08-04 11:01:01'),(714,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoicEszZmZ6UFA5anFIYVdwcXFEY3pqdHpuUmdRaGVnV0dld1l2OThia29rY1RLYnN0bThQbm5TSFZ4ZFd1d1cyTmthQkpkNVpKSkt3dWJjalRWcndOTjhnZHo4dWZ3ZWVsSVJsWCIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjExMDk4LCJleHAiOjE2NTk2OTc0OTh9.WTP5Qx6sItiuAW6INiOcPFktDaRooN06OScWv0OdSB0',NULL,NULL,NULL,NULL,'2022-08-04 11:04:58','2022-08-04 11:04:58'),(715,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiRmhJTjFjUjFkdmY4ZnozMkZOZTFaVURQd20xUlBYbDUzaE9YRlNGd21vbzdiRVpMQWsxWTFZdmd5V1BPdHJuWnVsZnpVRk1rU3QzVk5kRmpDcldxb3FTQmMyNTVkbWNHVFZ6ciIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjExMzg3LCJleHAiOjE2NTk2OTc3ODd9.EumwEfCRzo6maGwgUD_Dy5z-h3DFmS5gB9WRn-9D4UU',NULL,NULL,NULL,NULL,'2022-08-04 11:09:47','2022-08-04 11:09:47'),(716,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiS3JzSHJ3T3QyZkVndGpITllLN0NzZlNZNVZTVzVWSFVsbTR1d21DM2E5SUVyNDNFOVI1SEhzZmFoQ1VyM3RjQnNmRllTUnlHV2lpdkNxTWg0N0pvNGtjZ0dINGZxWmlXdFZubiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjExNTY2LCJleHAiOjE2NTk2OTc5NjZ9.q2JgORLQkInMNadRf-JJwwvtGHaRng-NpSOXhZXzBec',NULL,NULL,NULL,NULL,'2022-08-04 11:12:47','2022-08-04 11:12:47'),(717,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiS1RGSjJ3ZWVNVXRKczVLdk5XRXZicFdoUnNGQTRWdUxOM1FNS2RuT0ZYcHJIejczYm9wNnB5dGU2dnh6WWtXZlFhUEljeEhXdjJEb3ppY2xqcDU5dkozWHptT1hWR0RHWHNLbiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjExODQ0LCJleHAiOjE2NTk2OTgyNDR9.TgEbez-6deWKLiWoU6ykTP10GIPxUOnrFZMWa4DvCGU',NULL,NULL,NULL,NULL,'2022-08-04 11:17:24','2022-08-04 11:17:24'),(718,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiVEFrM1pZRTNPNzZBVUxlV2Y2eG5nczZPb05ldWtvQ1djalZJc01IemhvclQ5UDFGUkRLY2VueXRyT29oMlQ1dkdmNzJnbjVkRGZJdDFLNlhZRXdJbEVlUjZTaTdpbHZqTWVnSiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjEyMzMyLCJleHAiOjE2NTk2OTg3MzJ9.uA43PdUAECMVgfJmnyV-owABHvD-CS1c7WNteWso-9s',NULL,NULL,NULL,NULL,'2022-08-04 11:25:32','2022-08-04 11:25:32'),(719,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoicFgyYTNXRXBGYXVTRjVpNnZGMnRvc0F6Q05UNTU1dnNzNkFaMUtJbVRYdGlkZGd4UWJtcnQ5WEw5NWg0bjFMczkyZmZ1T1E4V0piTGw4NTNTSzRxOU52SXlGSUNDSUk1NHBkSiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjE0MzIyLCJleHAiOjE2NTk3MDA3MjJ9.voiRAaAL73tHkKKL3gN_c0cax4nFx_C97Vg8Z_T20FE',NULL,NULL,NULL,NULL,'2022-08-04 11:58:42','2022-08-04 11:58:42'),(720,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiUHN4bjRBelgxelk5U2hueEZlcngxN2E1UzJuYWREbFZ2YjhVaWpHaUEzVHl5Wm1PUEdjcU1ZU2c0VTMxRkhLeEluY3U3RXczZkJpb0tFQ3QyQnZIaDdBanR4M0p2SUdCTnZvZCIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjE0NDc3LCJleHAiOjE2NTk3MDA4Nzd9.aOmPe8gnioEJJL5VzrAfRctUQmsCB5sxN1_VLaNNPf0',NULL,NULL,NULL,NULL,'2022-08-04 12:01:17','2022-08-04 12:01:17'),(721,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiTlR2MjdyU0U2S0pQUlVZTWFqRU5mcllVdmF4OXdORzZEWG51ajR2SmNnRUdSbVNZMnh6WWdxMUNzcGE4dHFBSFFpYkFJUVNPTWRlYUhJS2lhR1B5QTMzRWllVUdPbERxc2FKWiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjE0NzEzLCJleHAiOjE2NTk3MDExMTN9.obslxIAw6RHuZpL5LWkiATojplNMD-sz__OEIbRvgJc',NULL,NULL,NULL,NULL,'2022-08-04 12:05:13','2022-08-04 12:05:13'),(722,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiZ2VOMzRlV0IxTDNEczcxTTRxTjJyQ3A4QXFjajd5N1Z2MXh2Qmt0TGk3UDlsUHU5Y1h5NDdjclFzVDFkbUQ5dWhmcmM0YlRzQm9MU2lpUW9WU0RFTzJWQmpqREpoOVJqQTF0biIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjE0OTIxLCJleHAiOjE2NTk3MDEzMjF9.weghj2IQ46DkcjG3T9xYlCcK5x6q5BK4rPU2E4OQqMQ',NULL,NULL,NULL,NULL,'2022-08-04 12:08:41','2022-08-04 12:08:41'),(723,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiM1p0YW54VGVWRmdQb0lnbEpkZTZVVFhjZjU0RXg5cVFYUkFYM25pU3ZwNVk1YXVsSXdwZGRBeXBYM2xVRng3MkZjMWFNR0FZRGxpUTIxRFpZOEtuV1FHUUxRcmRWdkVEUG5DUiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjE0OTg5LCJleHAiOjE2NTk3MDEzODl9.SjNWco0ydpzLPqgWSvfphglixR6HkCAaNlklicmq_dg',NULL,NULL,NULL,NULL,'2022-08-04 12:09:49','2022-08-04 12:09:49'),(724,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiZ1l0T1psTldBZVJta1g1YzJkQ3BCb0VMaGlyVXVpcHY5cFpmR0lwMTJiQkIxWUhwSlkzbTVZWWJrSHVZekhUZGZ2QVI4WVoxdWtmbWZiUTlaQ2g2WVI1N1dUUjVwbnlNSzFLUCIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjE1MDkwLCJleHAiOjE2NTk3MDE0OTB9.FV-8tfYhWp0mztJ3KT3hZ-WQDbRVizTq-lx0WY0yfjE',NULL,NULL,NULL,NULL,'2022-08-04 12:11:30','2022-08-04 12:11:30'),(725,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiSE14d0NMRm5NYU8yVkZIdmNDR3V1amJmSU5MajJwWjRkUzNWY0RHbldFejZTWkcyTDJZeFlaaklwYnpMTnVzWU5QcktWd3JNakJpMmdmZkJpN1BXdWR4YmhQWm50S1phVndYZiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjE1MzM4LCJleHAiOjE2NTk3MDE3Mzh9.OkqhANMt13iuW8F9VjAs39X8AUJkhFkBGi4Ca9RrIkw',NULL,NULL,NULL,NULL,'2022-08-04 12:15:38','2022-08-04 12:15:38'),(726,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiTnd1RU1NcUNIQkVvZVBDd3Iyb3ZtNHEyaWhnWXJSc3NkdWl1UkJkR3ZMM3JTVHFhNm5RdUs1SFo1WVpWdE5QZmZrWEVVN1pDbjZVM25LRWJWem1aVERYYmV3YnRBM2w4bHJvZiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjE1MzU4LCJleHAiOjE2NTk3MDE3NTh9.aKk36vFAHUWkaVhB1YVPHcTZbF_OE7m8BdzbtzJjzkc',NULL,NULL,NULL,NULL,'2022-08-04 12:15:58','2022-08-04 12:15:58'),(727,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiZWs0a0dIZm1Xa3BlWGlrWDlrcWtKNERJYldWbWNxWXdtN2pJRXBLdFJYY1puVTNyUE9vT082WDRVY2pralFxRHJUdU9yeDJvbnRFZWpLT2xOZldRN2ZmOHE1d3hDS1FYY0xWcyIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjE1NTI5LCJleHAiOjE2NTk3MDE5Mjl9.gyvVcvEtOdVfzEhLT-AFzJ6qTcFREvkNhlFcss-6MTA',NULL,NULL,NULL,NULL,'2022-08-04 12:18:49','2022-08-04 12:18:49'),(728,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiS2haNWliWXQ5ZEFBQzhLdHdJQlFPVmhuYUdXZ3BmR1hmQTFwc0dmWHpPUURqSVhaTndwUjZvSVlVa04xUGkzcTZscmxQTTNLZDF4Rng3MUFhMXBBUVFPTnZjeHNpM0Q0UlZzWiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjE2MTI2LCJleHAiOjE2NTk3MDI1MjZ9.pFFpdYuIIqIb1d1gPtfZP8tbEKSkT1FpEpJWmMVWOqY',NULL,NULL,NULL,NULL,'2022-08-04 12:28:46','2022-08-04 12:28:46'),(729,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJnVmN2dmR5dEd3SkZObThWdHFjbDNORjF3Z29ZbGxBQmdUSUcxQnhoR1FIMWZjS21BTEFvaDR3V3V0eGhmNmplS01ZSEdiTUJQWHplN3JqcFdWRVN0ZnR3UjVSdER6eHM3Z1p5IiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1OTYxODk4MywiZXhwIjoxNjU5NzA1MzgzfQ.2ZJzGpI1I4z5I0Hy6jJ57gFsKcUqaivN6qpqbnAlldI',NULL,NULL,NULL,NULL,'2022-08-04 13:16:23','2022-08-04 13:16:23'),(730,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoiNndCTFZNeFhWSWxKcng2T3J1VzJ4Q3ZaYVJLNWZmR2ZhTHlhcU5TM2ZENHJtQkk5bUJJbk9hRFcxQzFNN1E4REphdkFqMWVsYXo5bFlheldmZjFheEQ0MklNYUZRSVFjSE9FTSIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5NjE4OTg0LCJleHAiOjE2NTk3MDUzODR9.x3cmwnfODTw4dnVzXUHDx2btU_B5nDN7IKfDAFM61cU',NULL,NULL,NULL,NULL,'2022-08-04 13:16:24','2022-08-04 13:16:24'),(731,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlMGIyMDQwLWYxZDEtMTFlYy1hMzY0LTNmNzE3Yzg3YWExZiIsImVtYWlsIjoidHJhbm5nb2NsaW5oMjQxMUBnbWFpbC5jb20iLCJhY2Nlc3NfdG9rZW4iOiJrSVA2Yk54VzVtYVF0ZmltdnBLZHk0SXI0cDZOVXNwZVN4akd6cE1leG14VGFpY1VCaGhWOEMxZU1LSGtTZDhIWlZKUGhKbUNSTTV5dXRtVjV6dG9SOFVXZGVzQTNxTVdVU3lrIiwidXNlcm5hbWUiOiJMaW5oVHJhbjI0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1OTkyMzM1MiwiZXhwIjoxNjYwMDA5NzUyfQ.cEbFhbO_ppIoV45IQtm6OkfGjIUkJm3JdUgsVODcmJA',NULL,NULL,NULL,NULL,'2022-08-08 01:49:12','2022-08-08 01:49:12'),(732,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoid1daZ255eXFjTjM2NkM0V0lKaVQ4YXd2SURSZXhoMjZwMU5kdlVlWjFQWk5mbUs0ZVJMTWlKaFhENUFnWmdIWVhUbnhUZUw1TW1CeHI5YkNOSkdTTjlkeGlTNnd2azJSR3czZiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5OTIzMzYwLCJleHAiOjE2NjAwMDk3NjB9.WzU5RIUuGtSBRCKvsP8sJrhiIBAnNbXu4tkaNcVI97c',NULL,NULL,NULL,NULL,'2022-08-08 01:49:20','2022-08-08 01:49:20'),(733,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyNzE2YTQwLTBiZjMtMTFlZC04OTM1LTlkZTYzNjMxZDNhZiIsImVtYWlsIjoibGluaHRuQGJpenZlcnNlLndvcmxkIiwiYWNjZXNzX3Rva2VuIjoid3NMelduR1lSMzY3ZHBTVm1jenM2NkRCVGhrdVpqdGtWMWx1NWJKVFJ4RzRLdkk2aENvcWxhTFdCVUkzdzhxeVl2d1ZDYnhiMU84dEFocmY4bFd0cXVURlZyZnR4TTM0OUJRaiIsInVzZXJuYW1lIjoiTGluaFRyYW5fMjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU5OTUwNjU4LCJleHAiOjE2NjAwMzcwNTh9.jIJADwm8A8IDHeKVTYbwunhnhggT37vggQJ4D2dPGM0',NULL,NULL,NULL,NULL,'2022-08-08 09:24:18','2022-08-08 09:24:18');
/*!40000 ALTER TABLE `UserLogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserProfile`
--

DROP TABLE IF EXISTS `UserProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserProfile` (
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `profileId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `displayName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateOfBirth` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferredLanguage` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferredCurrency` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `location` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `stripeCusId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` int DEFAULT NULL,
  `verificationCode` int DEFAULT NULL,
  `countryCode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `countryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wallet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `profileId` (`profileId`),
  UNIQUE KEY `UserProfile_profileId_unique` (`profileId`),
  CONSTRAINT `UserProfile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserProfile`
--

LOCK TABLES `UserProfile` WRITE;
/*!40000 ALTER TABLE `UserProfile` DISABLE KEYS */;
INSERT INTO `UserProfile` VALUES ('7e0b2040-f1d1-11ec-a364-3f717c87aa1f',82,'Ngọc Linh','Trần','Ngọc Linh Trần','2007-12-19','81b7315d7c1f-4438-8d45-45716807a06d','male','',NULL,NULL,NULL,NULL,'2022-06-22 02:17:40','2022-07-15 08:33:08','cus_M2RIM2f5TpqiOm',NULL,NULL,NULL,NULL,'0x1c134d615a096cdc3764faa034162edff1433501'),('d2716a40-0bf3-11ed-8935-9de63631d3af',84,'LinhTran Bizverse','KT','LinhTran Bizverse KT','11-1995-24','648384a50a1f42799f92896c96f5898d','male','0383510205','en','USD','web developer','Da Nang','2022-07-25 08:28:55','2022-07-29 09:03:38','cus_M91DVf0D9lgUv5',NULL,NULL,'+84','VN','0x821ff0eadff716f0e7738719b754c46916baf66c'),('e3e88120-f2c4-11ec-a230-e7eb96f6f196',83,'Khanhdangbmt','','Khanhdangbmt ','00-00-0000','93dfba6d260d-4252-9791-44483c6f577f','male','',NULL,NULL,NULL,NULL,'2022-06-23 07:19:59','2022-06-27 10:19:32','cus_Lx9LAvifEzbnxP',NULL,NULL,NULL,NULL,'0x3ad5449a936d2a8b57e14ad97482401631e2f259');
/*!40000 ALTER TABLE `UserProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSafetyAmenities`
--

DROP TABLE IF EXISTS `UserSafetyAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserSafetyAmenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `safetyAmenitiesId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserSafetyAmenities_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=327 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSafetyAmenities`
--

LOCK TABLES `UserSafetyAmenities` WRITE;
/*!40000 ALTER TABLE `UserSafetyAmenities` DISABLE KEYS */;
INSERT INTO `UserSafetyAmenities` VALUES (323,207,29,'2022-07-11 13:08:59','2022-07-11 13:08:59'),(326,206,30,'2022-08-08 08:37:20','2022-08-08 08:37:20');
/*!40000 ALTER TABLE `UserSafetyAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSpaces`
--

DROP TABLE IF EXISTS `UserSpaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserSpaces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `spacesId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `spacesId` (`spacesId`),
  CONSTRAINT `UserSpaces_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserSpaces_ibfk_2` FOREIGN KEY (`spacesId`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=407 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSpaces`
--

LOCK TABLES `UserSpaces` WRITE;
/*!40000 ALTER TABLE `UserSpaces` DISABLE KEYS */;
INSERT INTO `UserSpaces` VALUES (403,207,36,'2022-07-11 13:08:59','2022-07-11 13:08:59'),(406,206,36,'2022-08-08 08:37:20','2022-08-08 08:37:20');
/*!40000 ALTER TABLE `UserSpaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserToken`
--

DROP TABLE IF EXISTS `UserToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserToken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `accessToken` varchar(255) NOT NULL,
  `tokenSavedAt` datetime NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserToken`
--

LOCK TABLES `UserToken` WRITE;
/*!40000 ALTER TABLE `UserToken` DISABLE KEYS */;
INSERT INTO `UserToken` VALUES (36,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f','CnTzjL4mkhqQ37ggR6E598bKhwydbyIvNWqdvA3Oc3BVZHOHkkLfvv58gmnU8PNkEZ2klOyMJfScjLXzx8nyoBDmVy42iwyoMo1t','2022-06-22 02:17:40','2022-06-22 02:17:40','2022-06-22 02:17:40','tranngoclinh2411@gmail.com'),(37,'e3e88120-f2c4-11ec-a230-e7eb96f6f196','bFAafuEovapXxZ5evWE1DJMvEVDBTnnRq9lyVBAiT5A9H8nzPQ9P8OgpNjIlB6qsZRyYCLqEtva39mak4IAvYj51y8PkT1rwfX3M','2022-06-23 07:19:59','2022-06-23 07:19:59','2022-06-23 07:19:59','khanhdangbmt@gmail.com'),(38,'d2716a40-0bf3-11ed-8935-9de63631d3af','UxbQ8kKzNLEaQC6OEOL3NcFClXwJZIyUROKO9kq4rW8RBhJcckHYYVgnBO2Vxx9dFARxytJaCC3sAdT99Mcxf54xc51hSuLUVYNW','2022-07-25 08:28:55','2022-07-25 08:28:55','2022-07-25 08:28:55','linhtn@bizverse.world');
/*!40000 ALTER TABLE `UserToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserVerifiedInfo`
--

DROP TABLE IF EXISTS `UserVerifiedInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserVerifiedInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEmailConfirmed` tinyint(1) DEFAULT '0',
  `isFacebookConnected` tinyint(1) DEFAULT '0',
  `isGoogleConnected` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isIdVerification` tinyint(1) DEFAULT '0',
  `isPhoneVerified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserVerifiedInfo_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserVerifiedInfo`
--

LOCK TABLES `UserVerifiedInfo` WRITE;
/*!40000 ALTER TABLE `UserVerifiedInfo` DISABLE KEYS */;
INSERT INTO `UserVerifiedInfo` VALUES (82,'7e0b2040-f1d1-11ec-a364-3f717c87aa1f',0,0,0,'2022-06-22 02:17:40','2022-06-22 02:17:40',0,0),(83,'e3e88120-f2c4-11ec-a230-e7eb96f6f196',0,0,0,'2022-06-23 07:19:59','2022-06-23 07:19:59',0,0),(84,'d2716a40-0bf3-11ed-8935-9de63631d3af',0,0,0,'2022-07-25 08:28:55','2022-07-25 08:28:55',0,0);
/*!40000 ALTER TABLE `UserVerifiedInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WhyHostInfoBlock`
--

DROP TABLE IF EXISTS `WhyHostInfoBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WhyHostInfoBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WhyHostInfoBlock`
--

LOCK TABLES `WhyHostInfoBlock` WRITE;
/*!40000 ALTER TABLE `WhyHostInfoBlock` DISABLE KEYS */;
INSERT INTO `WhyHostInfoBlock` VALUES (1,'Host Banner Title 1','hostBannerTitle1','It\'s simple to become a YourSite host','2020-04-13 11:33:10','2022-06-02 10:13:08'),(2,'Host Banner Image 1','hostBannerImage1','d8ebaa0a996f47894a95179f3b7b02b0.jpeg','2020-04-13 11:33:10','2022-06-02 10:13:08'),(3,'Why Block Title 1','whyBlockTitle1','What is Lorem Ipsum?','2020-04-13 11:33:10','2020-04-13 12:14:24'),(4,'Why Block Title 2','whyBlockTitle2','This tool for our day to day work and our clients?','2020-04-13 11:33:10','2020-04-13 12:14:24'),(5,'Why Block Content 1','whyBlockContent1','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  \n','2020-04-13 11:33:10','2020-04-13 12:14:24'),(6,'Why Block Content 2','whyBlockContent2','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.','2020-04-13 11:33:10','2020-04-13 12:14:25'),(7,'Hosting Block Title Heading','hostingBlockTitleHeading','There are 3 Lorem Ipsum generators','2020-04-13 11:33:10','2020-04-13 12:15:58'),(8,'Hosting Block Title 1','hostingBlockTitle1','Lorem Ipsum','2020-04-13 11:33:10','2020-04-13 12:15:58'),(9,'Hosting Block Title 2','hostingBlockTitle2','Lorem Ipsum','2020-04-13 11:33:10','2020-04-13 12:15:59'),(10,'Hosting Block Title 3','hostingBlockTitle3','Lorem Ipsum','2020-04-13 11:33:10','2020-04-13 12:15:59'),(11,'Hosting Block Content 1','hostingBlockContent1','Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n','2020-04-13 11:33:10','2020-04-13 12:15:59'),(12,'Hosting Block Content 2','hostingBlockContent2','Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n','2020-04-13 11:33:10','2020-04-13 12:15:59'),(13,'Hosting Block Content 3','hostingBlockContent3','Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n','2020-04-13 11:33:10','2020-04-13 12:15:59'),(14,'Cover Section Title 1','coverSectionTitle1','Use our generator to get your own','2020-04-13 11:33:10','2022-06-02 10:15:06'),(15,'Cover Section Image 1','coverSectionImage1','bffd9355f849f26db28b24407a9eae06.jpeg','2020-04-13 11:33:10','2022-06-02 10:15:06'),(16,'Cover Section Content 1','coverSectionContent1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2020-04-13 11:33:10','2022-06-02 10:15:06'),(17,'Cover Section Content 2','coverSectionContent2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n','2020-04-13 11:33:10','2022-06-02 10:15:06'),(18,'Cover Section Feature 1','coverSectionFeature1','Excepteur sint occaecat cupidatat non proident','2020-04-13 11:33:10','2022-06-02 10:15:06'),(19,'Cover Section Feature 2','coverSectionFeature2','quis nostrud exercitation ullamco laboris nisi','2020-04-13 11:33:10','2022-06-02 10:15:06'),(20,'Cover Section Feature 3','coverSectionFeature3','Sed ut perspiciatis unde omnis iste natus error sit','2020-04-13 11:33:10','2022-06-02 10:15:07'),(21,'Cover Section Feature 4','coverSectionFeature4','Nemo enim ipsam voluptatem quia voluptas sit aspernatur','2020-04-13 11:33:10','2022-06-02 10:15:07'),(22,'Cover Section Feature 5','coverSectionFeature5','Ut enim ad minima veniam, quis nostrum exercitationem','2020-04-13 11:33:10','2022-06-02 10:15:07'),(23,'Cover Section Feature 6','coverSectionFeature6','Excepteur sint occaecat cupidatat non proident','2020-04-13 11:33:10','2022-06-02 10:15:07'),(24,'Payment Title Heading','paymentTitleHeading','It to make a type specimen book','2020-04-13 11:33:10','2020-04-13 12:17:56'),(25,'Payment Title 1','paymentTitle1','Sed ut perspiciatis','2020-04-13 11:33:10','2020-04-13 12:17:56'),(26,'Payment Title 2','paymentTitle2','Nemo enim ipsam','2020-04-13 11:33:10','2020-04-13 12:17:57'),(27,'Payment Title 3','paymentTitle3','Neque porro','2020-04-13 11:33:10','2020-04-13 12:17:57'),(28,'Payment Content 1','paymentContent1','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur\n\n','2020-04-13 11:33:10','2020-04-13 12:17:57'),(29,'Payment Content 2','paymentContent2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt\n\n','2020-04-13 11:33:10','2020-04-13 12:17:57'),(30,'Payment Content 3','paymentContent3','Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n\n','2020-04-13 11:33:10','2020-04-13 12:17:57'),(31,'Quote Section Title 1','quoteSectionTitle1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore','2020-04-13 11:33:10','2020-04-13 12:19:07'),(32,'Quote Section Title 2','quoteSectionTitle2','It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages','2020-04-13 11:33:10','2020-04-13 12:19:08'),(33,'Quote Section Content 1','quoteSectionContent1','software like Aldus PageMaker including versions of Lorem Ipsum.\n','2020-04-13 11:33:10','2020-04-13 12:19:08'),(34,'Quote Section Content 2','quoteSectionContent2','software like Aldus PageMaker including versions of Lorem Ipsum.\n','2020-04-13 11:33:10','2020-04-13 12:19:08'),(35,'Quote Section Image 1','quoteSectionImage1','0a584ba173af81174be5eb6a657667ad.jpeg','2020-04-13 11:33:10','2020-04-13 12:19:08'),(36,'Quote Section Image 2','quoteSectionImage2','083eb3e69d9eaca28ec8e2ca2cd8e350.jpeg','2020-04-13 11:33:10','2020-04-13 12:19:08'),(37,'Quote Section Button 1','quoteSectionButton1','Lorem Ipsum Text','2020-04-13 11:33:10','2020-04-13 12:19:09'),(38,'Quote Section Button 2','quoteSectionButton2','Lorem Ipsum Text','2020-04-13 11:33:10','2020-04-13 12:19:09'),(39,'FAQ Title 1','faqTitle1','Lorem ipsum dolor sit amet, consecteturt','2020-04-13 11:33:10','2020-04-13 12:19:40'),(40,'FAQ Title 2','faqTitle2','Lorem ipsum dolor sit amet, consecteturt','2020-04-13 11:33:10','2020-04-13 12:19:40'),(41,'FAQ Title 3','faqTitle3','Lorem ipsum dolor sit amet, consecteturt','2020-04-13 11:33:10','2020-04-13 12:19:40'),(42,'FAQ Title 4','faqTitle4','Lorem ipsum dolor sit amet, consecteturt','2020-04-13 11:33:10','2020-04-13 12:19:40'),(43,'FAQ Title 5','faqTitle5','','2020-04-13 11:33:10','2020-04-13 12:19:40'),(44,'FAQ Title 6','faqTitle6','','2020-04-13 11:33:10','2020-04-13 12:19:41'),(45,'FAQ Title 7','faqTitle7','','2020-04-13 11:33:10','2020-04-13 12:19:41'),(46,'FAQ Title 8','faqTitle8','','2020-04-13 11:33:10','2020-04-13 12:19:41'),(47,'FAQ Content 1','faqContent1','Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.\n\n','2020-04-13 11:33:10','2020-04-13 12:19:41'),(48,'FAQ Content 2','faqContent2','Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.\n\n','2020-04-13 11:33:10','2020-04-13 12:19:41'),(49,'FAQ Content 3','faqContent3','Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.\n\n','2020-04-13 11:33:10','2020-04-13 12:19:41'),(50,'FAQ Content 4','faqContent4','Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.\n\n','2020-04-13 11:33:10','2020-04-13 12:19:42'),(51,'FAQ Content 5','faqContent5','','2020-04-13 11:33:10','2020-04-13 12:19:42'),(52,'FAQ Content 6','faqContent6','','2020-04-13 11:33:10','2020-04-13 12:19:42'),(53,'FAQ Content 7','faqContent7','','2020-04-13 11:33:10','2020-04-13 12:19:42'),(54,'FAQ Content 8','faqContent8','','2020-04-13 11:33:10','2020-04-13 12:19:42');
/*!40000 ALTER TABLE `WhyHostInfoBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishList`
--

DROP TABLE IF EXISTS `WishList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WishList` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wishListGroupId` int NOT NULL,
  `listId` int NOT NULL,
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isListActive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wishListGroupId` (`wishListGroupId`),
  KEY `listId` (`listId`),
  CONSTRAINT `WishList_ibfk_1` FOREIGN KEY (`wishListGroupId`) REFERENCES `WishListGroup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WishList_ibfk_2` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishList`
--

LOCK TABLES `WishList` WRITE;
/*!40000 ALTER TABLE `WishList` DISABLE KEYS */;
INSERT INTO `WishList` VALUES (174,123,205,'d2716a40-0bf3-11ed-8935-9de63631d3af','2022-07-27 07:16:33','2022-08-08 10:00:00',1);
/*!40000 ALTER TABLE `WishList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishListGroup`
--

DROP TABLE IF EXISTS `WishListGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WishListGroup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `isPublic` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishListGroup`
--

LOCK TABLES `WishListGroup` WRITE;
/*!40000 ALTER TABLE `WishListGroup` DISABLE KEYS */;
INSERT INTO `WishListGroup` VALUES (121,'test','7e0b2040-f1d1-11ec-a364-3f717c87aa1f',1,'2022-07-01 03:49:16','2022-07-01 03:49:16'),(122,'dsfd','7e0b2040-f1d1-11ec-a364-3f717c87aa1f',1,'2022-07-21 04:54:53','2022-07-21 04:54:53'),(123,'tst','d2716a40-0bf3-11ed-8935-9de63631d3af',1,'2022-07-27 07:16:33','2022-07-27 07:16:33');
/*!40000 ALTER TABLE `WishListGroup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-08 17:06:02
