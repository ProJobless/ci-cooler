-- phpMyAdmin SQL Dump
-- version 3.4.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 14, 2013 at 08:51 PM
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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
