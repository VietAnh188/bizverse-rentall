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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-08 17:03:03
