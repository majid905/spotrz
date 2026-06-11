-- =============================================
-- Spotrz.online Database Schema
-- Database: spotrz | User: root | Pass: (empty)
-- Run in phpMyAdmin > SQL tab
-- =============================================

CREATE DATABASE IF NOT EXISTS `spotrz` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `spotrz`;

-- ----------------------------
-- Table: users (admin login)
-- Default: admin@sportz.com / admin123
-- ----------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','editor') DEFAULT 'admin',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Admin user created via: http://localhost:3000/api/setup
-- Visit that URL ONCE after importing this SQL to create:
-- Email: admin@sportz.com | Password: admin123

-- ----------------------------
-- Table: hero_section
-- ----------------------------
CREATE TABLE IF NOT EXISTS `hero_section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(300) NOT NULL,
  `description` text,
  `button_text` varchar(100) DEFAULT 'Learn More',
  `button_link` varchar(500) DEFAULT '#live-scores',
  `image_url` varchar(500) DEFAULT '',
  `is_active` tinyint(1) DEFAULT 1,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `hero_section` (`title`, `description`, `button_text`, `button_link`, `image_url`, `is_active`) VALUES
('Join the Ultimate Football Network', 'Step into a vibrant community of football players from around the world. Share your experiences, find teammates, and compete in challenges that test your skills.', 'Learn More', '#live-scores', '', 1);

-- ----------------------------
-- Table: live_scores
-- ----------------------------
CREATE TABLE IF NOT EXISTS `live_scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sport` enum('FIFA','BOXING','UFC','NFL') NOT NULL DEFAULT 'FIFA',
  `home_team` varchar(200) NOT NULL,
  `away_team` varchar(200) NOT NULL,
  `home_score` int(11) DEFAULT 0,
  `away_score` int(11) DEFAULT 0,
  `home_won` int(11) DEFAULT 0,
  `home_lost` int(11) DEFAULT 0,
  `home_draw` int(11) DEFAULT 0,
  `away_won` int(11) DEFAULT 0,
  `away_lost` int(11) DEFAULT 0,
  `away_draw` int(11) DEFAULT 0,
  `competition` varchar(200) DEFAULT '',
  `match_date` date DEFAULT NULL,
  `match_time` time DEFAULT NULL,
  `status` enum('scheduled','live','finished') DEFAULT 'live',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `live_scores` (`sport`,`home_team`,`away_team`,`home_score`,`away_score`,`home_won`,`home_lost`,`home_draw`,`away_won`,`away_lost`,`away_draw`,`competition`,`match_date`,`match_time`,`status`) VALUES
('FIFA','Royal Thunder FC','Northern Blaze United',2,3,12,4,3,15,5,2,'Premier League','2026-06-07','19:30:00','live'),
('BOXING','Mike Johnson','Carlos Ruiz',5,4,28,2,1,25,4,2,'WBC Heavyweight','2026-06-06','21:00:00','live'),
('UFC','Alex Stone','Marcus Webb',2,1,18,3,0,20,2,1,'UFC 305 Lightweight','2026-06-07','22:00:00','live'),
('NFL','Dallas Cowboys','Green Bay Packers',24,17,8,3,1,7,4,1,'NFL Week 12','2026-06-08','16:25:00','live');

-- ----------------------------
-- Table: matches (schedule)
-- ----------------------------
CREATE TABLE IF NOT EXISTS `matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `home_team` varchar(200) NOT NULL,
  `away_team` varchar(200) NOT NULL,
  `home_score` int(11) DEFAULT NULL,
  `away_score` int(11) DEFAULT NULL,
  `competition_type` enum('CUP','LEAGUE','FRIENDLY') DEFAULT 'LEAGUE',
  `venue` varchar(300) DEFAULT '',
  `match_date` date NOT NULL,
  `match_time` time DEFAULT NULL,
  `status` enum('scheduled','live','finished') DEFAULT 'scheduled',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `matches` (`home_team`,`away_team`,`home_score`,`away_score`,`competition_type`,`venue`,`match_date`,`match_time`,`status`) VALUES
('Sportizai Titans','Royal Lions FC',2,1,'CUP','Central Ford','2026-05-02','18:45:00','finished'),
('Florida Kingdom FC','Summit Wolves',NULL,NULL,'LEAGUE','Florida Kingdom Stadium','2026-06-14','19:40:00','scheduled'),
('Victory Park FC','Sportizai Titans',NULL,NULL,'FRIENDLY','Victory Park','2026-08-13','19:40:00','scheduled');

-- ----------------------------
-- Table: blog_posts
-- ----------------------------
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `excerpt` text,
  `content` longtext,
  `category` varchar(100) DEFAULT '',
  `image_url` varchar(500) DEFAULT '',
  `is_featured` tinyint(1) DEFAULT 0,
  `published_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `blog_posts` (`title`,`excerpt`,`category`,`is_featured`) VALUES
('From Amateur to Pro: The Journey of a Football Player','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero sed cursus ante.','COACHING TIPS',0),
('Top 10 Strategies for Dominating the Field','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.','NEXOY',0),
('Mastering the Basics: Essential Football Skills for Beginners','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero sed cursus ante dapibus diam.','FOOTBALL NEWS',1);

-- ----------------------------
-- Table: faq
-- ----------------------------
CREATE TABLE IF NOT EXISTS `faq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(500) NOT NULL,
  `answer` text NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `faq` (`question`,`answer`,`sort_order`) VALUES
('How can I register my team?','You can register your team through our official registration portal. Fill in your team details, player roster, and pay the registration fee to get started.',1),
('What is the tournament format?','Our tournaments follow a group stage followed by knockout rounds. Each group has 4 teams playing round-robin, with the top 2 advancing to the knockout phase.',2),
('Who is eligible to participate?','Players aged 18 and above are eligible to participate. Amateur and semi-professional players are welcome.',3),
('Where will the matches be held?','Matches will be held at multiple stadiums across the city. The venue for each match will be communicated at least 7 days in advance.',4),
('Are there prizes for winners?','Yes! The winning team receives a cash prize, trophies, and medals.',5),
('Can fans attend the tournament?','Absolutely! Tickets can be purchased online or at the venue on match day.',6);

-- ----------------------------
-- Table: next_match (countdown)
-- ----------------------------
CREATE TABLE IF NOT EXISTS `next_match` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `home_team` varchar(200) NOT NULL,
  `away_team` varchar(200) NOT NULL,
  `competition` varchar(200) DEFAULT '',
  `match_datetime` datetime NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `next_match` (`home_team`,`away_team`,`competition`,`match_datetime`,`is_active`) VALUES
('Sportizai Titans','Royal Lions FC','Liga Premier','2026-09-27 19:30:00',1);
