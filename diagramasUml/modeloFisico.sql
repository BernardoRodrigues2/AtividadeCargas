-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: db_logistica
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cargas`
--

DROP TABLE IF EXISTS `cargas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargas` (
  `codCarga` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(70) NOT NULL,
  `peso` decimal(10,2) NOT NULL,
  `volume` decimal(10,2) NOT NULL,
  `codRastreio` int NOT NULL,
  `idMotorista` int NOT NULL,
  PRIMARY KEY (`codCarga`),
  KEY `idMotorista` (`idMotorista`),
  CONSTRAINT `cargas_ibfk_1` FOREIGN KEY (`idMotorista`) REFERENCES `motoristas` (`codMotorista`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargas`
--

LOCK TABLES `cargas` WRITE;
/*!40000 ALTER TABLE `cargas` DISABLE KEYS */;
INSERT INTO `cargas` VALUES (1,'Carga de produtos',150.50,20.00,1001,1),(2,'Carga de eletrônicos',80.00,12.50,1002,2),(3,'Carga de produtos',150.50,20.00,1001,1);
/*!40000 ALTER TABLE `cargas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entregas`
--

DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `codEntrega` int NOT NULL AUTO_INCREMENT,
  `cidade` varchar(70) NOT NULL,
  `status` enum('ENTREGUE','TRANSITO') NOT NULL,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `idCarga` int NOT NULL,
  PRIMARY KEY (`codEntrega`),
  KEY `idCarga` (`idCarga`),
  CONSTRAINT `entregas_ibfk_1` FOREIGN KEY (`idCarga`) REFERENCES `cargas` (`codCarga`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregas`
--

LOCK TABLES `entregas` WRITE;
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
INSERT INTO `entregas` VALUES (1,'Florianópolis','TRANSITO','2026-10-27','14:00:00',1),(2,'Tijucas','ENTREGUE','2026-10-28','10:30:00',2),(3,'Itapema','ENTREGUE','2026-10-29','10:30:00',3);
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `codFuncionario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`codFuncionario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'Carlos','carlos@gmail.com','U2FsdGVkX1/I5rVasYb/5MspAgNtVkKeniMqdQNC/gA='),(2,'Ana','ana@gmail.com','U2FsdGVkX1/sRKYnkqoDn0lnkpAIpZ+T0NXO4HIKsGA='),(3,'Marcos','marcos@gmail.com','U2FsdGVkX1+qGJbZOdMNEMv846qvoaikEJD//yZ8QoY=');
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motoristas`
--

DROP TABLE IF EXISTS `motoristas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motoristas` (
  `codMotorista` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(40) NOT NULL,
  `cnh` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  PRIMARY KEY (`codMotorista`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motoristas`
--

LOCK TABLES `motoristas` WRITE;
/*!40000 ALTER TABLE `motoristas` DISABLE KEYS */;
INSERT INTO `motoristas` VALUES (1,'Marcos Atualizado','U2FsdGVkX1+oWiC+Zrz+IG9Ogyl0QNeB4tjJy3e6Iik=','U2FsdGVkX18w3t7nkQG6xe/dj6cqp+IeoBuS7XfOqk4=','48999990000'),(2,'Carlos','U2FsdGVkX19UuVu4axILXa4xyvbEBz7f5HoD58YikQo=','U2FsdGVkX19QryZ/JErMQDZI5za8WqVTog0DwQJlCHE=','48999998888'),(3,'Ana','U2FsdGVkX1/WI/IIhYLduYDCZFsI1uLpgKXV4Pu4QIU=','U2FsdGVkX1+8zzOmfj5PfRWX2ewjH9ZzbpV4DTHpTt8=','48999998888');
/*!40000 ALTER TABLE `motoristas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-26  9:41:32
