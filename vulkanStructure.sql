-- MySQL Script generated by MySQL Workbench
-- Sun Mar  7 15:37:09 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema vulkan
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema vulkan
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `vulkan` DEFAULT CHARACTER SET utf8 ;
USE `vulkan` ;

-- -----------------------------------------------------
-- Table `vulkan`.`categorys`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vulkan`.`categorys` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `idCategorysBrand` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idCategorysBrand_idx` (`idCategorysBrand` ASC),
  CONSTRAINT `idCategorysBrand`
    FOREIGN KEY (`idCategorysBrand`)
    REFERENCES `vulkan`.`brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vulkan`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vulkan`.`brands` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `idBrandsCategory` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idBrandsCategory_idx` (`idBrandsCategory` ASC),
  CONSTRAINT `idBrandsCategory`
    FOREIGN KEY (`idBrandsCategory`)
    REFERENCES `vulkan`.`categorys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vulkan`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vulkan`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(5000) NULL DEFAULT NULL,
  `price` INT(10) UNSIGNED NOT NULL,
  `idCategory` INT(11) NULL DEFAULT NULL,
  `idBrand` INT(11) NULL DEFAULT NULL,
  `image` VARCHAR(200) NULL DEFAULT '""',
  PRIMARY KEY (`id`),
  INDEX `idCategory_idx` (`idCategory` ASC),
  INDEX `idBrand_idx` (`idBrand` ASC),
  CONSTRAINT `idBrand`
    FOREIGN KEY (`idBrand`)
    REFERENCES `vulkan`.`brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idCategory`
    FOREIGN KEY (`idCategory`)
    REFERENCES `vulkan`.`categorys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vulkan`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vulkan`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(200) NULL DEFAULT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `firstName` VARCHAR(100) NULL DEFAULT NULL,
  `lastname` VARCHAR(200) NULL DEFAULT NULL,
  `address` VARCHAR(200) NULL DEFAULT NULL,
  `avatar` VARCHAR(200) NULL DEFAULT NULL,
  `rol` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vulkan`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vulkan`.`carts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idProduct` INT(11) NULL DEFAULT NULL,
  `idUser` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idProduct_idx` (`idProduct` ASC),
  INDEX `idUser_idx` (`idUser` ASC),
  CONSTRAINT `idProduct`
    FOREIGN KEY (`idProduct`)
    REFERENCES `vulkan`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `vulkan`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vulkan`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vulkan`.`messages` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(5000) NOT NULL,
  `idUserMessage` INT(11) NULL DEFAULT NULL,
  `idOtherUSer` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idUserMessage_idx` (`idUserMessage` ASC),
  INDEX `idOtherUser_idx` (`idOtherUSer` ASC),
  CONSTRAINT `idOtherUser`
    FOREIGN KEY (`idOtherUSer`)
    REFERENCES `vulkan`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idUserMessage`
    FOREIGN KEY (`idUserMessage`)
    REFERENCES `vulkan`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vulkan`.`relationsbrandcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vulkan`.`relationsbrandcategory` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idBrandsFromCategory` INT(11) NULL DEFAULT NULL,
  `idCategorysFromBrand` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idBrandsFromCategory_idx` (`idBrandsFromCategory` ASC),
  INDEX `idCategorysFromBrand_idx` (`idCategorysFromBrand` ASC),
  CONSTRAINT `idBrandsFromCategory`
    FOREIGN KEY (`idBrandsFromCategory`)
    REFERENCES `vulkan`.`brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idCategorysFromBrand`
    FOREIGN KEY (`idCategorysFromBrand`)
    REFERENCES `vulkan`.`categorys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
