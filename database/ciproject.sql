-- phpMyAdmin SQL Dump
-- version 3.4.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 12, 2013 at 04:40 PM
-- Server version: 5.1.53
-- PHP Version: 5.3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ciproject`
--

CREATE DATABASE ciproject;
USE ciproject;

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fields`
--

CREATE TABLE IF NOT EXISTS `fields` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `listid` int(10) unsigned DEFAULT NULL,
  `internaltitle` varchar(50) CHARACTER SET latin1 NOT NULL,
  `title` varchar(250) CHARACTER SET latin1 NOT NULL,
  `type` varchar(3) COLLATE utf8_bin NOT NULL DEFAULT '1.1',
  `attrs` text CHARACTER SET latin1,
  `description` text CHARACTER SET latin1,
  `ispublished` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `listid` (`listid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=13 ;

--
-- Dumping data for table `fields`
--

INSERT INTO `fields` (`id`, `listid`, `internaltitle`, `title`, `type`, `attrs`, `description`, `ispublished`) VALUES
(1, 1, 'product-title', 'Product Title', '1', NULL, 'This is the description', 0),
(3, 2, 'title', 'Title', '1', '0', '0', 0),
(6, 2, 'images', 'Images', '5', '0', '0', 0),
(7, 2, 'description', 'Description', '3', '0', '0', 0),
(8, 2, 'attachements', 'attachements', '5', '0', '0', 0),
(9, 4, 'title', 'Title', '1', '0', '0', 0),
(10, 4, 'price', 'Price', '2', '0', '0', 0),
(11, 4, 'images', 'Images', '5', '0', '0', 0),
(12, 4, 'description', 'Description', '3', '0', '0', 0);

-- --------------------------------------------------------

--
-- Table structure for table `fields_types`
--

CREATE TABLE IF NOT EXISTS `fields_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reference` varchar(3) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `db_type` text,
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `fields_types`
--

INSERT INTO `fields_types` (`id`, `reference`, `type`, `db_type`, `category`) VALUES
(1, '1.1', 'shorttext', '{"type":"VARCHAR","constraint":"255"}', 'plain text'),
(2, '1.2', 'longtext', '{"type":"TEXT"}', 'plain text'),
(3, '2.1', 'full', '{"type":"TEXT"}', 'rich text'),
(4, '2.2', 'medium', '{"type":"TEXT"}', 'rich text'),
(5, '2.3', 'simple', '{"type":"TEXT"}', 'rich text'),
(6, '3.1', 'int', '{"type":"INT"}', 'number'),
(7, '3.2', 'float', '{"type":"FLOAT"}', 'number'),
(8, '4.1', 'select', '{"type":"TEXT"}', 'list'),
(9, '4.2', 'checkbox', '{"type":"TEXT"}', 'list'),
(10, '4.3', 'radio', '{"type":"TEXT"}', 'list'),
(11, '4.4', 'boolean', '{"type":"TINYINT", "constraint":"1"}', 'list'),
(12, '5.1', 'images', '{"type":"TEXT"}', 'media'),
(13, '5.2', 'video', '{"type":"TEXT"}', 'media'),
(14, '5.3', 'audio', '{"type":"TEXT"}', 'media'),
(15, '6.1', 'attachements', '{"type":"TEXT"}', 'files');

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE IF NOT EXISTS `lists` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `internaltitle` varchar(50) NOT NULL,
  `mapped_table` varchar(100) NOT NULL,
  `title` varchar(250) DEFAULT '',
  `description` text,
  `ispublished` tinyint(1) DEFAULT '0',
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `createdby` int(10) unsigned DEFAULT NULL,
  `modifiedby` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`internaltitle`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`id`, `internaltitle`, `mapped_table`, `title`, `description`, `ispublished`, `created`, `modified`, `createdby`, `modifiedby`) VALUES
(4, 'phones', 'lists_phones', 'Phones', 'Phones List', 1, '2013-07-10 00:00:00', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lists_phones`
--

CREATE TABLE IF NOT EXISTS `lists_phones` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` int(10) NOT NULL,
  `images` text NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `lists_phones`
--

INSERT INTO `lists_phones` (`id`, `title`, `price`, `images`, `description`) VALUES
(1, 'Sony Ericsson', 1500, '0', 'Description'),
(2, 'Samsung', 500, '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `description` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `login`, `description`) VALUES
(1, 'superadmin', 'short description of members'),
(2, 'admin', NULL),
(3, 'admin2', 'description'),
(4, 'admin1', 'description 23');

-- --------------------------------------------------------

--
-- Table structure for table `membersinroles`
--

CREATE TABLE IF NOT EXISTS `membersinroles` (
  `memberid` int(10) unsigned NOT NULL DEFAULT '0',
  `roleid` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`memberid`,`roleid`),
  KEY `memberid` (`memberid`),
  KEY `roleid` (`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `membersinroles`
--

INSERT INTO `membersinroles` (`memberid`, `roleid`) VALUES
(1, 2),
(3, 1),
(4, 1),
(4, 2),
(4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET latin1 NOT NULL,
  `urlpath` varchar(200) CHARACTER SET latin1 NOT NULL,
  `body` text CHARACTER SET latin1,
  `meta` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `links` text CHARACTER SET latin1,
  `images` text CHARACTER SET latin1,
  `params` text CHARACTER SET latin1,
  `ispublished` tinyint(1) DEFAULT '1',
  `isdraft` tinyint(1) NOT NULL DEFAULT '0',
  `published` datetime DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `publishedby` int(10) unsigned DEFAULT '0',
  `createdby` int(10) unsigned DEFAULT '0',
  `modifiedby` int(10) unsigned DEFAULT '0',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `title`, `urlpath`, `body`, `meta`, `links`, `images`, `params`, `ispublished`, `isdraft`, `published`, `created`, `modified`, `publishedby`, `createdby`, `modifiedby`) VALUES
(1, 'My New Page', '', '<p>false</p>\n', '0', NULL, NULL, NULL, 0, 1, NULL, '2013-07-07 00:00:00', NULL, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `bitmask` int(11) DEFAULT NULL,
  `description` text CHARACTER SET latin1,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`, `bitmask`, `description`) VALUES
(1, 'administrators', NULL, NULL),
(2, 'super', NULL, NULL),
(3, 'contributors', NULL, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `membersinroles`
--
ALTER TABLE `membersinroles`
  ADD CONSTRAINT `membersinroles_ibfk_1` FOREIGN KEY (`memberid`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `membersinroles_ibfk_2` FOREIGN KEY (`roleid`) REFERENCES `roles` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
