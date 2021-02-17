-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 17, 2021 at 05:19 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lmsrewa`
--

-- --------------------------------------------------------

--
-- Table structure for table `basics`
--

CREATE TABLE `basics` (
  `id` int(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tab1` int(255) DEFAULT NULL,
  `tab2` varchar(255) DEFAULT NULL,
  `tab3` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `basics`
--

INSERT INTO `basics` (`id`, `type`, `name`, `tab1`, `tab2`, `tab3`, `created_at`, `updated_at`) VALUES
(1, 'Basic', 'Basic', NULL, NULL, NULL, '2021-02-15 16:03:46', '2021-02-15 16:03:46'),
(2, 'Basic', 'Board', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(3, 'Basic', 'Class', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(4, 'Basic', 'Subject', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(5, 'Basic', 'Topic', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(6, 'Basic', 'SubTopic', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(7, 'Basic', 'Difficulty', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(8, 'Basic', 'Type', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(9, 'Board', 'CBSE', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(10, 'Board', 'SSC', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(11, 'Board', 'ICSE', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(12, 'Board', 'IGCSE', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(13, 'Class', 'VI', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(14, 'Class', 'VII', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(15, 'Class', 'VIII', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(16, 'Class', 'IX', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(17, 'Class', 'X', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(18, 'Class', 'XI', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(19, 'Class', 'XII', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(20, 'Class', 'JEE', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(21, 'Class', 'NEET', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(22, 'Difficulty', 'Easy', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(23, 'Difficulty', 'Medium', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(24, 'Difficulty', 'Hard', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(25, 'Type', 'MCQ', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(26, 'Type', 'Subjective', NULL, NULL, NULL, '2021-02-15 10:36:30', '2021-02-15 10:36:30'),
(27, 'Subject', 'Physics', 18, NULL, NULL, '2021-02-15 12:33:06', '2021-02-15 12:33:06'),
(28, 'Subject', 'Physics', 19, NULL, NULL, '2021-02-15 12:33:06', '2021-02-15 12:33:06'),
(29, 'Subject', 'Physics', 20, NULL, NULL, '2021-02-15 12:33:06', '2021-02-15 12:33:06'),
(30, 'Topic', 'Electrostatics', 20, '29', NULL, '2021-02-15 12:50:35', '2021-02-15 12:50:35'),
(31, 'Topic', 'Current electricity', 20, '29', NULL, '2021-02-15 12:50:35', '2021-02-15 12:50:35'),
(32, 'Topic', 'Moving charges and magnetism', 20, '29', NULL, '2021-02-15 12:50:35', '2021-02-15 12:50:35'),
(33, 'Topic', 'Electromagnetic waves', 20, '29', NULL, '2021-02-15 12:50:35', '2021-02-15 12:50:35'),
(34, 'Topic', 'Modern Physics', 20, '29', NULL, '2021-02-15 12:50:35', '2021-02-15 12:50:35'),
(35, 'Topic', 'The Special Theory of Relativity', 20, '29', NULL, '2021-02-15 12:50:35', '2021-02-15 12:50:35'),
(36, 'Topic', 'Mechanics', 20, '29', NULL, '2021-02-15 12:50:35', '2021-02-15 12:50:35'),
(37, 'Topic', 'Electromagnetic Induction', 20, '29', NULL, '2021-02-15 12:50:35', '2021-02-15 12:50:35'),
(38, 'Topic', 'Optics', 20, '29', NULL, '2021-02-15 12:50:35', '2021-02-15 12:50:35'),
(39, 'Topic', 'Electrostatics', 19, '28', NULL, '2021-02-15 13:23:58', '2021-02-15 13:23:58'),
(40, 'Topic', 'Current electricity', 19, '28', NULL, '2021-02-15 13:23:58', '2021-02-15 13:23:58'),
(41, 'Topic', 'Moving charges and magnetism', 19, '28', NULL, '2021-02-15 13:23:58', '2021-02-15 13:23:58'),
(42, 'Topic', 'Electromagnetic waves', 19, '28', NULL, '2021-02-15 13:23:58', '2021-02-15 13:23:58'),
(43, 'Topic', 'Modern Physics', 19, '28', NULL, '2021-02-15 13:23:58', '2021-02-15 13:23:58'),
(44, 'Topic', 'The Special Theory of Relativity', 19, '28', NULL, '2021-02-15 13:23:58', '2021-02-15 13:23:58'),
(45, 'Topic', 'Mechanics', 19, '28', NULL, '2021-02-15 13:23:58', '2021-02-15 13:23:58'),
(46, 'Topic', 'Electromagnetic Induction', 19, '28', NULL, '2021-02-15 13:23:58', '2021-02-15 13:23:58'),
(47, 'Topic', 'Optics', 19, '28', NULL, '2021-02-15 13:23:58', '2021-02-15 13:23:58'),
(48, 'SubTopic', 'Electric  Field and Potential', 20, '29', '30', '2021-02-15 13:29:16', '2021-02-15 13:29:16'),
(49, 'SubTopic', 'Gauss law', 20, '29', '30', '2021-02-15 13:29:16', '2021-02-15 13:29:16'),
(50, 'SubTopic', 'Capacitor', 20, '29', '30', '2021-02-16 01:39:03', '2021-02-16 01:39:03'),
(51, 'SubTopic', 'Light Wavesxxxxxx', 20, '29', '30', '2021-02-16 01:39:03', '2021-02-16 01:39:03'),
(52, 'SubTopic', 'Charge and Coulomb’s Law', 20, '29', '30', '2021-02-16 01:39:03', '2021-02-16 01:39:03'),
(53, 'SubTopic', 'Electric Dipole', 20, '29', '30', '2021-02-16 01:39:03', '2021-02-16 01:39:03'),
(54, 'SubTopic', 'Grouping of Capacitors', 20, '29', '30', '2021-02-16 01:39:03', '2021-02-16 01:39:03'),
(55, 'SubTopic', 'Critical Thinking Questions', 20, '29', '30', '2021-02-16 01:39:03', '2021-02-16 01:39:03'),
(56, 'SubTopic', 'Graphical Questions', 20, '29', '30', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(57, 'SubTopic', 'Assertion & Reason', 20, '29', '30', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(58, 'SubTopic', 'Electric Current in Conductors', 20, '29', '31', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(59, 'SubTopic', 'Alternating Current', 20, '29', '31', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(60, 'SubTopic', 'Thermal and Chemical Effects of Electric Current', 20, '29', '31', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(61, 'SubTopic', 'Grouping of Resistances', 20, '29', '31', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(62, 'SubTopic', 'Kirchhoff\'s Law, Cells', 20, '29', '31', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(63, 'SubTopic', 'Different Measuring Instruments', 20, '29', '31', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(64, 'SubTopic', 'Critical Thinking Objective Question', 20, '29', '31', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(65, 'SubTopic', 'Graphical Questions', 20, '29', '31', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(66, 'SubTopic', 'Assertion & Reason', 20, '29', '31', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(67, 'SubTopic', 'Thermo - Electricity', 20, '29', '31', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(68, 'SubTopic', 'Magnetic Field', 20, '29', '32', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(69, 'SubTopic', 'Magnetic Field due to a Current', 20, '29', '32', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(70, 'SubTopic', 'Permanent Magnets', 20, '29', '32', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(71, 'SubTopic', 'Magnetic Properties of Matter', 20, '29', '32', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(72, 'SubTopic', 'Motion of Charged Particle In Magnetic Field', 20, '29', '32', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(73, 'SubTopic', 'Force and Torque on a Current Carrying Conductor', 20, '29', '32', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(74, 'SubTopic', 'Critical Thinking', 20, '29', '32', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(75, 'SubTopic', 'Electromagnetic waves', 20, '29', '33', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(76, 'SubTopic', 'Electric Current Through Gases', 20, '29', '34', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(77, 'SubTopic', 'Photoelectric Effect and Wave-Particle Duality', 20, '29', '34', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(78, 'SubTopic', 'Bhor\'s Model and Physics of the Atom', 20, '29', '34', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(79, 'SubTopic', 'X-Rays', 20, '29', '34', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(80, 'SubTopic', 'Semiconductors and Semiconductor Devices', 20, '29', '34', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(81, 'SubTopic', 'The Nucleus', 20, '29', '34', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(82, 'SubTopic', 'The Special Theory of Relativity', 20, '29', '35', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(83, 'SubTopic', 'Rest and Motion: Kinematics', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(84, 'SubTopic', 'Laws of motion', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(85, 'SubTopic', 'FRICTION', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(86, 'SubTopic', 'CIRCULAR MOTION', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(87, 'SubTopic', 'Work and Energy', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(88, 'SubTopic', 'Center of Mass Linear Momentum, Collision', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(89, 'SubTopic', 'ROTATIONAL MECHANICS', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(90, 'SubTopic', 'Introduction to Physics', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(91, 'SubTopic', 'Gravitation', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(92, 'SubTopic', 'Simple Harmonic Motion', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(93, 'SubTopic', 'Fluid Mechanics', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(94, 'SubTopic', 'Some Mechanical property of Matter', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(95, 'SubTopic', 'Wave Motion Waves on a String', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(96, 'SubTopic', 'Sound Waves', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(97, 'SubTopic', 'The Special Theory of Relativity', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(98, 'SubTopic', 'Light Wavesxxxx', 20, '29', '36', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(99, 'SubTopic', 'Light Waves', 20, '29', '38', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(100, 'SubTopic', 'Geometrical Optics', 20, '29', '38', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(101, 'SubTopic', 'Optical Instruments', 20, '29', '38', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(102, 'SubTopic', 'Dispersion and Spectra', 20, '29', '38', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(103, 'SubTopic', 'Speed of Light', 20, '29', '38', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(104, 'SubTopic', 'Photometry', 20, '29', '38', '2021-02-16 02:11:32', '2021-02-16 02:11:32'),
(105, 'SubTopic', 'Electric  Field and Potential', 19, '28', '39', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(106, 'SubTopic', 'Gauss law', 19, '28', '39', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(107, 'SubTopic', 'Capacitor', 19, '28', '39', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(108, 'SubTopic', 'Electric Current in Conductors', 19, '28', '40', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(109, 'SubTopic', 'Thermal and Chemical Effects of Electric Current', 19, '28', '40', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(110, 'SubTopic', 'Magnetic Field', 19, '28', '41', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(111, 'SubTopic', 'Magnetic Field due to a Current', 19, '28', '41', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(112, 'SubTopic', 'Permanent Magnets', 19, '28', '41', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(113, 'SubTopic', 'Magnetic Properties of Matter', 19, '28', '41', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(114, 'SubTopic', 'Electromagnetic Induction', 19, '28', '46', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(115, 'SubTopic', 'Alternating Current', 19, '28', '40', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(116, 'SubTopic', 'Electromagnetic waves', 19, '28', '42', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(117, 'SubTopic', 'Electric Current Through Gases', 19, '28', '43', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(118, 'SubTopic', 'Photoelectric Effect and Wave-Particle Duality', 19, '28', '43', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(119, 'SubTopic', 'Bhor\'s Model and Physics of the Atom', 19, '28', '43', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(120, 'SubTopic', 'X-Rays', 19, '28', '43', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(121, 'SubTopic', 'Semiconductors and Semiconductor Devices', 19, '28', '43', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(122, 'SubTopic', 'The Nucleus', 19, '28', '43', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(123, 'SubTopic', 'The Special Theory of Relativity', 19, '28', '44', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(124, 'SubTopic', 'Light Waves', 19, '28', '47', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(125, 'SubTopic', 'Geometrical Optics', 19, '28', '47', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(126, 'SubTopic', 'Optical Instruments', 19, '28', '47', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(127, 'SubTopic', 'Dispersion and Spectra', 19, '28', '47', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(128, 'SubTopic', 'Speed of Light', 19, '28', '47', '2021-02-16 03:23:16', '2021-02-16 03:23:16'),
(129, 'SubTopic', 'Photometry', 19, '28', '47', '2021-02-16 03:23:16', '2021-02-16 03:23:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `basics`
--
ALTER TABLE `basics`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `basics`
--
ALTER TABLE `basics`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
