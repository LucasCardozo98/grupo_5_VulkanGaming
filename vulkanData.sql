CREATE DATABASE  IF NOT EXISTS `vulkan` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `vulkan`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vulkan
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.16-MariaDB

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
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `idBrandsCategory` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idBrandsCategory_idx` (`idBrandsCategory`),
  CONSTRAINT `idBrandsCategory` FOREIGN KEY (`idBrandsCategory`) REFERENCES `categorys` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'AMD',NULL),(2,'Intel',NULL),(3,'Ryzen',NULL),(4,'EVGA',NULL),(5,'Red Dragon',NULL),(6,'Logitech',NULL),(7,'Gigabyte',NULL),(8,'Nvidia',NULL),(9,'Zotac',NULL),(10,'HyperX',NULL),(11,'NSI',NULL),(12,'Razer',NULL),(13,'Cougar',NULL),(14,'Master Air',NULL),(15,'ID',NULL),(16,'Nisuta',NULL),(17,'T-force',NULL),(18,'Corsair',NULL),(19,'ASUS',NULL),(20,'Havit',NULL),(21,'Aureox',NULL),(22,'Sentey',NULL),(23,'Essenses',NULL),(24,'Generica',NULL);
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idProduct` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idProduct_idx` (`idProduct`),
  KEY `idUser_idx` (`idUser`),
  CONSTRAINT `idProduct` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idUser` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (8,5,3);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorys`
--

DROP TABLE IF EXISTS `categorys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `idCategorysBrand` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idCategorysBrand_idx` (`idCategorysBrand`),
  CONSTRAINT `idCategorysBrand` FOREIGN KEY (`idCategorysBrand`) REFERENCES `brands` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorys`
--

LOCK TABLES `categorys` WRITE;
/*!40000 ALTER TABLE `categorys` DISABLE KEYS */;
INSERT INTO `categorys` VALUES (1,'Motherboards',NULL),(2,'Fuentes',NULL),(3,'Gabinetes',NULL),(4,'Perifericos',NULL),(5,'Procesadores',NULL),(6,'Memorias RAM',NULL),(7,'Disipadores',NULL),(8,'Placas de video',NULL);
/*!40000 ALTER TABLE `categorys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(5000) NOT NULL,
  `idUserMessage` int(11) DEFAULT NULL,
  `idOtherUSer` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUserMessage_idx` (`idUserMessage`),
  KEY `idOtherUser_idx` (`idOtherUSer`),
  CONSTRAINT `idOtherUser` FOREIGN KEY (`idOtherUSer`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idUserMessage` FOREIGN KEY (`idUserMessage`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (5,'hola',3,NULL);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `price` int(10) unsigned NOT NULL,
  `idCategory` int(11) DEFAULT NULL,
  `idBrand` int(11) DEFAULT NULL,
  `image` varchar(200) DEFAULT '""',
  PRIMARY KEY (`id`),
  KEY `idCategory_idx` (`idCategory`),
  KEY `idBrand_idx` (`idBrand`),
  CONSTRAINT `idBrand` FOREIGN KEY (`idBrand`) REFERENCES `brands` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idCategory` FOREIGN KEY (`idCategory`) REFERENCES `categorys` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Procesador I9         ','El mejor de todos los procesadores',50000,5,2,'image-1615131181444.jpg'),(5,'Gabinete Gamer ','El mejor gabinete gamer del mercado',22222,3,23,'image-1614959632908.jpg'),(6,'Disipador cosita linda para ver anime  ','Disipador gamer',22222,7,24,'image-1614984540556.jpg'),(7,'Fuente EVGA 850 wats','tu vieja quiere esta fuente para hacer los tramites de la vacuna',22222,2,4,'image-1614983927910.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationsbrandcategory`
--

DROP TABLE IF EXISTS `relationsbrandcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relationsbrandcategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idBrandsFromCategory` int(11) DEFAULT NULL,
  `idCategorysFromBrand` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idBrandsFromCategory_idx` (`idBrandsFromCategory`),
  KEY `idCategorysFromBrand_idx` (`idCategorysFromBrand`),
  CONSTRAINT `idBrandsFromCategory` FOREIGN KEY (`idBrandsFromCategory`) REFERENCES `brands` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idCategorysFromBrand` FOREIGN KEY (`idCategorysFromBrand`) REFERENCES `categorys` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationsbrandcategory`
--

LOCK TABLES `relationsbrandcategory` WRITE;
/*!40000 ALTER TABLE `relationsbrandcategory` DISABLE KEYS */;
INSERT INTO `relationsbrandcategory` VALUES (1,2,5),(2,7,8),(3,8,8),(4,4,2),(5,18,2),(6,13,2),(7,10,4),(8,5,4);
/*!40000 ALTER TABLE `relationsbrandcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastname` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `rol` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'leitus max el grande a ver','lean4339@gmail.com','$2b$10$vPy0tThJQfULkeAr2t78SuSZEWQR5AotNQwMW7259g1oOpayBjPD.','Leandro','Ayala','Dorrego 3446','avatar-1615133280320.jpg','admin'),(4,'lean43','lean43@gmail.com','$2b$10$aPzYJsDUXGpWAd4vkJ7M9e6Sv4u5BoEbdKwq.dkjZAxNqqbN4/enK','pepe galleta','','',NULL,'admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-07 16:44:43
