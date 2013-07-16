-- phpMyAdmin SQL Dump
-- version 3.4.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 16, 2013 at 01:37 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=33 ;

--
-- Dumping data for table `fields`
--

INSERT INTO `fields` (`id`, `listid`, `internaltitle`, `title`, `type`, `attrs`, `description`, `ispublished`) VALUES
(29, 13, 'title', 'Title', '1.1', '{}', '0', 0),
(30, 13, 'brief', 'Brief', '1.2', '{}', '0', 0),
(31, 13, 'image', 'Image', '5.1', '{"max":2,"thumb":true,"thumb_width":300,"thumb_height":200,"path":"members","thumb_prefix":"thumb_"}', '0', 0),
(32, 14, 'images', 'images', '5.1', '{"max":10,"required":false,"path":"pages","thumb":true,"thumb_path":"pages","thumb_prefix":"thumb_"}', '0', 0);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`id`, `internaltitle`, `mapped_table`, `title`, `description`, `ispublished`, `created`, `modified`, `createdby`, `modifiedby`) VALUES
(13, 'members', 'lists_members', 'Members', '', 1, '2013-07-14 00:00:00', NULL, NULL, NULL),
(14, 'pages', 'lists_pages', 'Pages', '', 1, '2013-07-14 00:00:00', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lists_members`
--

CREATE TABLE IF NOT EXISTS `lists_members` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `brief` text NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `lists_members`
--

INSERT INTO `lists_members` (`id`, `title`, `brief`, `image`) VALUES
(1, 'Nadim Kassar', 'Nadim Kassar Brief', '[[{"name":"3id_el_ad7a_by_ryodambar-d32yk9u.jpg","full_path":"/uploads/members/3id_el_ad7a_by_ryodambar-d32yk9u.jpg","ext":"jpg","mime":"image/jpeg","size":145921},{"name":"thumb_3id_el_ad7a_by_ryodambar-d32yk9u.jpg","full_path":"/uploads/thumbs//thumb_3id_el_ad7a_by_ryodambar-d32yk9u.jpg","ext":"jpg","mime":"image/jpeg","size":145921}]]');

-- --------------------------------------------------------

--
-- Table structure for table `lists_pages`
--

CREATE TABLE IF NOT EXISTS `lists_pages` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `images` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `lists_pages`
--

INSERT INTO `lists_pages` (`id`, `images`) VALUES
(1, '[[{"name":"4_1_3.jpg","full_path":"/uploads/pages/4_1_3.jpg","ext":"jpg","mime":"image/jpeg","size":392830},{"name":"thumb_4_1_3.jpg","full_path":"/uploads/pages/thumb_4_1_3.jpg","ext":"jpg","mime":"image/jpeg","size":392830}],[{"name":"4_4.jpg","full_path":"/uploads/pages/4_4.jpg","ext":"jpg","mime":"image/jpeg","size":602074},{"name":"thumb_4_4.jpg","full_path":"/uploads/pages/thumb_4_4.jpg","ext":"jpg","mime":"image/jpeg","size":602074}],[{"name":"bridge_3.jpg","full_path":"/uploads/pages/bridge_3.jpg","ext":"jpg","mime":"image/jpeg","size":772881},{"name":"thumb_bridge_3.jpg","full_path":"/uploads/pages/thumb_bridge_3.jpg","ext":"jpg","mime":"image/jpeg","size":772881}]]');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `description` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `login`, `password`, `description`) VALUES
(1, 'superadmin', '123456', 'short description of members'),
(2, 'admin', '123456', NULL),
(3, 'admin2', '', 'description'),
(4, 'admin1', '', 'description 23');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `title`, `urlpath`, `body`, `meta`, `links`, `images`, `params`, `ispublished`, `isdraft`, `published`, `created`, `modified`, `publishedby`, `createdby`, `modifiedby`) VALUES
(2, 'About us', 'about-us', '<h1>Vultus madescit obstabatque norant quisque</h1>\n\n<p>Militis duas. Lumina pugnabant deus pondere ante homo. Duris discordia pendebat. Utque locavit fixo. Bracchia frigida tellure regat. Manebat satus quem crescendo colebat eodem postquam. Pronaque aberant arce pace rapidisque caeleste horrifer praebebat frigore ante.</p>\n\n<h2>Peragebant pluvialibus pulsant cepit illi</h2>\n\n<h3>Recens conversa mundi ponderibus nabataeaque</h3>\n', '0', NULL, '[[{"name":"The_Death_of_Imam_Ali_by_rizviGrafiks.jpg","full_path":"/uploads/pages/The_Death_of_Imam_Ali_by_rizviGrafiks.jpg","ext":"jpg","mime":"image/jpeg","size":362227},{"name":"thumb_The_Death_of_Imam_Ali_by_rizviGrafiks.jpg","full_path":"/uploads/pages/thumb_The_Death_of_Imam_Ali_by_rizviGrafiks.jpg","ext":"jpg","mime":"image/jpeg","size":362227}]]', NULL, 1, 0, NULL, '2013-07-14 00:00:00', NULL, 0, 0, 0),
(4, 'History', 'history', '<h1>Vultus madescit obstabatque norant quisque</h1>\n\n<p>Militis duas. Lumina pugnabant deus pondere ante homo. Duris discordia pendebat. Utque locavit fixo. Bracchia frigida tellure regat. Manebat satus quem crescendo colebat eodem postquam. Pronaque aberant arce pace rapidisque caeleste horrifer praebebat frigore ante.</p>\n\n<h2>Peragebant pluvialibus pulsant cepit illi</h2>\n\n<h3>Recens conversa mundi ponderibus nabataeaque</h3>\n', '', NULL, '[[{"name":"Imam_Ali_Wallpaperpack.jpg","full_path":"/uploads/pages/Imam_Ali_Wallpaperpack.jpg","ext":"jpg","mime":"image/jpeg","size":193325},{"name":"thumb_Imam_Ali_Wallpaperpack.jpg","full_path":"/uploads/pages/thumb_Imam_Ali_Wallpaperpack.jpg","ext":"jpg","mime":"image/jpeg","size":193325}]]', NULL, 1, 0, NULL, '2013-07-14 19:58:16', NULL, 0, 0, 0),
(5, 'Our Sectors', 'our-sectors', '<h1>Vultus madescit obstabatque norant quisque</h1>\n\n<p>Militis duas. Lumina pugnabant deus pondere ante homo. Duris discordia pendebat. Utque locavit fixo. Bracchia frigida tellure regat. Manebat satus quem crescendo colebat eodem postquam. Pronaque aberant arce pace rapidisque caeleste horrifer praebebat frigore ante.</p>\n\n<p>&nbsp;</p>\n', '', NULL, '[[{"name":"4_1_2.jpg","full_path":"/uploads/pages/4_1_2.jpg","ext":"jpg","mime":"image/jpeg","size":392830},{"name":"thumb_4_1_2.jpg","full_path":"/uploads/pages/thumb_4_1_2.jpg","ext":"jpg","mime":"image/jpeg","size":392830}],[{"name":"4_3.jpg","full_path":"/uploads/pages/4_3.jpg","ext":"jpg","mime":"image/jpeg","size":602074},{"name":"thumb_4_3.jpg","full_path":"/uploads/pages/thumb_4_3.jpg","ext":"jpg","mime":"image/jpeg","size":602074}],[{"name":"bridge_2.jpg","full_path":"/uploads/pages/bridge_2.jpg","ext":"jpg","mime":"image/jpeg","size":772881},{"name":"thumb_bridge_2.jpg","full_path":"/uploads/pages/thumb_bridge_2.jpg","ext":"jpg","mime":"image/jpeg","size":772881}],[{"name":"Ali_Mawlah_by_rahbar.jpg","full_path":"/uploads/pages/Ali_Mawlah_by_rahbar.jpg","ext":"jpg","mime":"image/jpeg","size":371035},{"name":"thumb_Ali_Mawlah_by_rahbar.jpg","full_path":"/uploads/pages/thumb_Ali_Mawlah_by_rahbar.jpg","ext":"jpg","mime":"image/jpeg","size":371035}]]', NULL, 1, 0, NULL, '2013-07-14 20:01:00', NULL, 0, 0, 0);

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
