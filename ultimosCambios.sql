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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'AMD'),(2,'Intel'),(3,'Ryzen'),(4,'EVGA'),(5,'Red Dragon'),(6,'Logitech'),(7,'Gigabyte'),(8,'Nvidia'),(9,'Zotac'),(10,'HyperX'),(11,'NSI'),(12,'Razer'),(13,'Cougar'),(14,'Master Air'),(15,'ID'),(16,'Nisuta'),(17,'T-force'),(18,'Corsair'),(19,'ASUS'),(20,'Havit'),(21,'Aureox'),(22,'Sentey'),(23,'Essenses'),(24,'Generica');
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
  `cantidad` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `idFormaDePago` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idProduct_idx` (`idProduct`),
  KEY `idUser_idx` (`idUser`),
  CONSTRAINT `idProduct` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUser` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (10,13,6,1,40000,1);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorys`
--

LOCK TABLES `categorys` WRITE;
/*!40000 ALTER TABLE `categorys` DISABLE KEYS */;
INSERT INTO `categorys` VALUES (1,'Motherboards'),(2,'Fuentes'),(3,'Gabinetes'),(4,'Perifericos'),(5,'Procesadores'),(6,'Memorias RAM'),(7,'Disipadores'),(8,'Placas de video'),(9,'PC Armadas'),(10,'Almacenamiento');
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
  CONSTRAINT `idUserMessage` FOREIGN KEY (`idUserMessage`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (11,'hola hola usuario lean43 soy el usuario ',6,6),(15,'hola ',6,6);
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
  `stock` int(11) NOT NULL,
  `visible` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idCategory_idx` (`idCategory`),
  KEY `idBrand_idx` (`idBrand`),
  CONSTRAINT `idBrand` FOREIGN KEY (`idBrand`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idCategory` FOREIGN KEY (`idCategory`) REFERENCES `categorys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (10,'Disipador gamer','Disipador gamer de ultima generación. ',15000,7,17,'image-1617220348908.jpg',100,1),(11,'Disipador 3D','Disipador de ultima generacion, muy potente. ',30000,7,1,'image-1617220499331.jpg',50,1),(12,'Fuente EVGA 850 w','Fuente muy copada para disfrutar. ',50000,2,4,'image-1617220592039.jpg',140,1),(13,'Mother Gigabyte H150 ','Mother super linda y potente',40000,1,7,'image-1617220678576.png',100,1),(14,'Mouse Gamer','Mouse para jugar los mejores juegos en linea sin romperte las manos.',9000,4,12,'image-1617220809223.jpeg',250,1),(15,'Gabinete Gamer ','Gabinete gamer para lucir en tus transmisiones y eventos de todo tipo.',15000,3,23,'image-1617220906495.jpg',45,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'lean4339','lean4339@gmail.com','$2b$10$aQDH/eTg1nhPSX6c2JT2Ve7LxfCVeIXStShc9PB/ZcAmGCG/jsYyS','Leandro','Ayala','Dorrego 3446','avatar-1617212642762.jpg','admin');
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

-- Dump completed on 2021-03-31 21:54:32
