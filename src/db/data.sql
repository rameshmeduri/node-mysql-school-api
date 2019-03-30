-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 20, 2018 at 01:43 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `enrolledstudents`
--

DROP TABLE IF EXISTS `enrolledstudents`;
CREATE TABLE IF NOT EXISTS `enrolledstudents` (
  `enrolledid` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  PRIMARY KEY (`enrolledid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `enrolledstudents`
--

INSERT INTO `enrolledstudents` (`enrolledid`, `teacherId`, `studentId`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 2, 1),
(4, 1, 2),
(5, 3, 1),
(6, 4, 1),
(7, 1, 5),
(8, 4, 5),
(9, 5, 1),
(10, 5, 2),
(12, 6, 5),
(13, 6, 3),
(14, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `studentId` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `isSuspended` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`studentId`) USING BTREE,
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`studentId`, `email`, `isSuspended`) VALUES
(1, 's1@student.com', 0),
(2, 's2@student.com', 0),
(3, 's3@student.com', 0),
(4, 's4@student.com', 0),
(5, 's5@student.com', 0),
(6, 's6@student.com', 0),
(7, 's7@student.com', 0),
(8, 's8@student.com', 0),
(9, 's9@student.com', 0),
(10, 's10@student.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers` (
  `teacherId` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`teacherId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacherId`, `email`) VALUES
(1, 't1@teacher.com'),
(2, 't2@teacher.com'),
(3, 't3@teacher.com'),
(4, 't4@teacher.com'),
(5, 't5@teacher.com'),
(6, 't6@teacher.com');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
