-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 08, 2013 at 05:44 PM
-- Server version: 5.5.24-log
-- PHP Version: 5.3.1

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
  `type` int(10) unsigned NOT NULL DEFAULT '1',
  `attrs` text CHARACTER SET latin1,
  `description` text CHARACTER SET latin1,
  `ispublished` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `listid` (`listid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=9 ;

--
-- Dumping data for table `fields`
--

INSERT INTO `fields` (`id`, `listid`, `internaltitle`, `title`, `type`, `attrs`, `description`, `ispublished`) VALUES
(1, 1, 'product-title', 'Product Title', 1, NULL, 'This is the description', 0),
(3, 2, 'title', 'Title', 1, '0', '0', 0),
(6, 2, 'images', 'Images', 5, '0', '0', 0),
(7, 2, 'description', 'Description', 3, '0', '0', 0),
(8, 2, 'attachements', 'attachements', 5, '0', '0', 0);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`id`, `internaltitle`, `mapped_table`, `title`, `description`, `ispublished`, `created`, `modified`, `createdby`, `modifiedby`) VALUES
(1, 'products', 'lists_products', 'Products', 'Description', 1, NULL, NULL, NULL, NULL),
(2, 'categories', 'lists_categories', 'Categories', 'This is the categories', 0, NULL, NULL, NULL, NULL),
(3, 'cars', 'lists_cars', 'Cars', 'Cars Description', 0, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lists_cars`
--

CREATE TABLE IF NOT EXISTS `lists_cars` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `lists_categories`
--

CREATE TABLE IF NOT EXISTS `lists_categories` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `images` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `attachements` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `urlpath` varchar(200) NOT NULL,
  `body` text,
  `meta` varchar(255) DEFAULT NULL,
  `links` text,
  `images` text,
  `params` text,
  `ispublished` tinyint(1) DEFAULT '1',
  `isdraft` tinyint(1) NOT NULL DEFAULT '0',
  `published` datetime DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `publishedby` int(10) unsigned DEFAULT '0',
  `createdby` int(10) unsigned DEFAULT '0',
  `modifiedby` int(10) unsigned DEFAULT '0',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `title`, `urlpath`, `body`, `meta`, `links`, `images`, `params`, `ispublished`, `isdraft`, `published`, `created`, `modified`, `publishedby`, `createdby`, `modifiedby`) VALUES
(1, 'My Home Page new', 'my-home-page-new', '<p>Stagna erat:. <strong>Militis </strong>fluminaque evolvit permisit regna fecit inminet. Mundum innabilis sublime tenent quin iussit innabilis. Hanc conversa figuras ille nulli moderantum iners securae. Regat forma quisquis <strong>cognati </strong>illas nubibus ita animalia triones nubibus.hello world</p>\n\n<p>congratulation</p>\n', 'Militis fluminaque evolvit ', NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0, 0),
(3, 'my page is here', 'my-page-is-here', 'page content is here sdsd', '', NULL, NULL, NULL, 0, 0, NULL, '2013-01-18 14:08:08', NULL, 0, 0, 0),
(4, 'About us', 'about-us', '<h1>Mixtam terra viseret sole sibi</h1>\r\n<p>Rapidisque longo homini modo mundi. Cepit imagine capacius mutatas divino cinxit. Tuti in natus recessit. Semine levitate diverso cinxit quam fratrum tellus. Orba utramque egens tuti finxit fixo terris nova. Montes postquam natus occiduo tonitrua numero tum caligine his.</p>\r\n<h2>Timebat triones corpora onerosior lapidosos</h2>\r\n<h3>Aurea animal diversa fidem utramque</h3>\r\n<h4>Campos sic pugnabant forma pace</h4>\r\n<p>Locis nabataeaque tenent foret. Divino sic tegi tum abscidit capacius mixta. Tumescere homini eurus ripis pace rerum terrarum manebat. Umor mixta lacusque formaeque aere unus. Diffundi aeris mixtam posset: numero magni crescendo tanta norant. Caeca secrevit.</p>\r\n<ul>\r\n<li>Coeperunt altae montes chaos: caeleste terram unda altae moderantum cognati magni deerat iuga aurea astra natura fulgura</li>\r\n<li>Flexi conversa lanient amphitrite iners mixta scythiam his inclusum lapidosos fuit</li>\r\n<li>Vultus ventis undae cornua terrenae meis foret limitibus norant rectumque orbem duas bracchia tenent glomeravit congestaque postquam tanto</li>\r\n<li>Flexi levius effervescere praeter sidera terrae innabilis nam arce modo fulgura regio</li>\r\n<li>Igni circumdare illas metusque certis eurus secant rectumque matutinis undis sibi recepta locis oppida obstabatque perpetuum motura umor figuras descenderat</li>\r\n</ul>\r\n<p>Moles onerosior convexi cuncta. Frigida mundum regna viseret diverso volucres ora fabricator legebantur. Sata poena pluviaque ventis fixo fuerant nubibus ipsa. Nec orbe mutastis. Aera chaos: deus ne. Caelum ventos levius homo fratrum. Cum illic quisquis solidumque tellus contraria rerum est.</p>\r\n<ol>\r\n<li>Terrarum piscibus ensis certis pluviaque sive corpora persidaque ad fluminaque terrarum toto principio premuntur congestaque mortales pinus nabataeaque rectumque volucres quinta vesper inposuit volucres</li>\r\n<li>Quam hanc bene aethere madescit diversa onerosior aliis vos quae mentes dominari</li>\r\n<li>Nova viseret dicere mutastis terras terras moles unda origo retinebat tonitrua sole pendebat pressa proxima boreas ora lege utramque fecit</li>\r\n<li>Aurea indigestaque piscibus caecoque recepta feras sanctius ventos adsiduis obliquis ensis congestaque totidem calidis nitidis</li>\r\n<li>Dedit forma secrevit ultima onus circumfluus metusque nullus margine elementaque diversa nunc terrarum mollia bene scythiam</li>\r\n<li>Divino grandia nabataeaque nabataeaque aurea onus lacusque supplex aethera postquam ad supplex galeae in regat indigestaque pondus limitibus eurus</li>\r\n</ol>\r\n<p>Emicuit nullus tractu induit pressa consistere quam. Silvas pondus cognati neu poena sorbentur. Litem prima. Campos tellus hominum ambitae onus modo sanctius terras adspirate. Discordia utramque volucres mutastis auroram adhuc vis. Sidera hominum sive membra.</p>', '', NULL, NULL, NULL, 0, 0, NULL, '2013-01-18 14:29:52', NULL, 0, 0, 0),
(7, 'Contradictions and navision', 'contradictions-and-navision', '<h1>Vultus madescit obstabatque norant quisque</h1>\n\n<p>Militis duas. Lumina pugnabant deus pondere ante homo. Duris discordia pendebat. Utque locavit fixo. Bracchia frigida tellure regat. Manebat satus quem crescendo colebat eodem postquam. Pronaque aberant arce pace rapidisque caeleste horrifer praebebat frigore ante.</p>\n\n<h2>Peragebant pluvialibus pulsant cepit illi</h2>\n\n<h3>Recens conversa mundi ponderibus nabataeaque</h3>\n\n<p>Timebat otia unda caeleste orbis</p>\n\n<p>Liquidum deerat diffundi non iussit induit. Ventos alta orbem dextra quicquam vesper. Quae securae porrexerat perpetuum obsistitur volucres natura terrae illic. Lucis sui sorbentur pluviaque. Super consistere vix sui lumina fluminaque pace. Reparabat crescendo calidis habentia ardentior figuras spectent usu.</p>\n\n<ul>\n <li>Effigiem recessit addidit freta dominari sine altae alta recepta nullus adsiduis parte quod ensis sed terras sed</li>\n <li>Vis seductaque lumina auroram arce prima valles conversa tractu norant nubes homo flamina densior peragebant norant aer adsiduis glomeravit</li>\n <li>Mentisque fulgura toto quia cingebant omni ventos liquidas forma caeca finxit ignea bracchia mentisque bracchia sine tumescere derecti caecoque sua vix fixo ita</li>\n</ul>\n\n<p>Convexi cura. Stagna dispositam fuit pugnabant. Cornua quoque diffundi auroram mollia. Pondere dissociata quisque ripis. Lumina iapeto hunc caelumque foret aethera liquidas nisi ambitae. Tempora quem poena obsistitur pendebat passim.</p>\n\n<ol>\n <li>Animalibus innabilis forma zonae contraria ubi eodem nunc origine sed dissaepserat bene levius finxit frigore librata utque erectos densior congestaque</li>\n <li>Membra arce scythiam rectumque quicquam tenent super chaos: postquam lacusque unda pontus hunc numero subsidere derecti derecti</li>\n <li>Ambitae ante inminet ita nubes animus mare circumdare omnia animalia erectos circumfluus porrexerat longo speciem lapidosos tractu fontes</li>\n <li>Habitandae totidemque altae ambitae ardentior agitabilis liberioris frigida retinebat cura</li>\n</ol>\n\n<p>Caeca mundum orba homini quam divino sed. Madescit opifex litem fixo habitandae militis est surgere. Frigida aetas sectamque aethera nix principio. Aer horrifer tonitrua ultima utque mea aliis gentes supplex modo.</p>\n', '0', NULL, NULL, NULL, 0, 0, NULL, '2013-07-02 20:55:35', NULL, 0, 0, 0),
(8, 'Test1', '', '<h2>Praecipites exemit porrexerat animalia mollia</h2>\n\n<h3>Ad sinistra spisso membra frigore</h3>\n\n<p>Sua obliquis parte aliud posset:</p>\n\n<p>Lapidosos valles pontus fulminibus lucis legebantur aberant. Sic inter. Fuit media mortales secrevit obliquis extendi. Viseret derec</p>\n', '0', NULL, NULL, NULL, 1, 0, NULL, '2013-07-08 00:00:00', NULL, 0, 0, 0),
(12, 'hello workd dsfkjh', '', '<p>0</p>\n', '0', NULL, NULL, NULL, 1, 0, NULL, '2013-07-08 00:00:00', NULL, 0, 0, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `fields`
--
ALTER TABLE `fields`
  ADD CONSTRAINT `fields_ibfk_1` FOREIGN KEY (`listid`) REFERENCES `lists` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
