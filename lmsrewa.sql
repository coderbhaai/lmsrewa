-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 22, 2021 at 11:17 AM
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
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coverImg` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` mediumtext COLLATE utf8mb4_unicode_ci,
  `tag` mediumtext COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `url`, `coverImg`, `category`, `tag`, `content`, `created_at`, `updated_at`) VALUES
(1, 'Blog A', 'Blog A', 'hiring-a-digital-marketing-agency.jpg', '[2,1,3,4]', '[5,6,7,8]', '<p>Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>\n', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(2, 'Blog B', 'Blog B', 'how-much-a-website-building-cost-should-be.jpg', '[1,2,3,4]', '[5,6,7,8]', '<p>bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</p>\n', '2021-01-09 00:54:46', '2021-01-09 00:54:46'),
(3, 'Blog C', 'Blog C', 'how-to-improve-google-search-ranking.jpg', '[1,2,3,4]', '[5,6,7,8]', '<p>cccccccccccccccccccccccccccccccccc</p>\n', '2021-01-09 00:54:46', '2021-01-09 00:54:46'),
(4, 'Blog D', 'Blog D', 'how-to-improve-website-conversion-rates.jpg', '[1,2,3,4]', '[5,6,7,8]', '<p>Dddddddddddddddddddddddddddddddddddddddddd</p>\n', '2021-01-09 00:54:46', '2021-01-09 00:54:46'),
(5, 'Blog E', 'Blog E', 'how-to-make-existing-website-mobile-friendly.jpg', '[1,2,3,4]', '[5,6,7,8]', '<p>Eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>\n', '2021-01-09 00:54:46', '2021-01-09 00:54:46');

-- --------------------------------------------------------

--
-- Table structure for table `blog_metas`
--

CREATE TABLE `blog_metas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_metas`
--

INSERT INTO `blog_metas` (`id`, `type`, `name`, `url`, `created_at`, `updated_at`) VALUES
(1, 'category', 'Category A', 'Category-A', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(2, 'category', 'Category B', 'Category-B', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(3, 'category', 'Category C', 'Category-C', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(4, 'category', 'Category D', 'Category-D', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(5, 'tag', 'tag A', 'tag-A', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(6, 'tag', 'tag B', 'tag-B', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(7, 'tag', 'tag Css', 'tag-C', '2021-01-09 00:50:43', '2021-01-21 07:06:02'),
(8, 'tag', 'tag D', 'tag-D', '2021-01-09 00:50:43', '2021-01-21 07:11:16'),
(9, 'Category', 'Category E', 'Category E', '2021-01-21 07:11:16', '2021-01-21 07:11:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(255) NOT NULL,
  `token` mediumtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `password`, `status`, `token`, `created_at`, `updated_at`) VALUES
(10, 'Amit', 'amit.khare588@gmail.com', 'Admin', '$2a$10$5G.ncipvvrPt711poFQeWuzB05puMYMdIyQx6dpyPDJsF0Uk7XN1.', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwibmFtZSI6IkFtaXQiLCJlbWFpbCI6ImFtaXQua2hhcmU1ODhAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIn0sImlhdCI6MTYxMTIxMDgxN30.jb-5awtwRdJGsN6-KCeKJgSXodUYNKaO1Se_ALnUTjQ', '2021-01-12 13:01:24', '2021-01-21 00:54:45'),
(11, 'Amit', 'amit.khare588@gmail.com1', 'Admin', '$2a$10$yBUNgiHKUsySACEiia8GceTfU8JnK/q9ewQmm08xL5b3ME2pfKwdq', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbTEiLCJyb2xlIjoiQWRtaW4ifSwiaWF0IjoxNjEwNDc2NTQ5fQ.aSddL2iNoS8wXq2N8F70kcWJWmAy1O_-8z1DF4SFg54', '2021-01-12 13:04:27', '2021-01-12 13:04:27'),
(12, 'Amit', 'amit.khare588@gmail.com2', 'Admin', '$2a$10$fCt2YGlM3F3k5Q427pKchuS1KXygc6h.7f79LcM4T16m70ra4gEei', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbTIiLCJyb2xlIjoiQWRtaW4ifSwiaWF0IjoxNjEwNTMzMTg2fQ.AmIcUQ_cwrItDbV0U2rLoNwO9Aj_7JlGK0LUU0yftxc', '2021-01-13 04:49:30', '2021-01-13 04:49:30'),
(13, 'Amit', 'amit.khare588@gmail.com11', 'Admin', '$2a$10$xPIL5bX8j7dR1s37n1Yoy.eM1JQhjg3uNNF0hQ6BQ1xAFTy9kaauq', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbTExIiwicm9sZSI6IkFkbWluIn0sImlhdCI6MTYxMDU0MDM3NX0.BGrreueZOCq3C9qxlhM2HMeHTot067ZDInMcJmRGKU4', '2021-01-13 06:49:00', '2021-01-13 06:49:00'),
(14, 'Amit', 'amit.khare588@gmail.com4', 'Admin', '$2a$10$8uRkccHY9vTmKFW6HE/fFuaxyeQ.lyS4wc/8hH1xmEA4OoLRem1Ve', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbTQiLCJyb2xlIjoiQWRtaW4ifSwiaWF0IjoxNjEwNTQwNjQ0fQ.lpXO-lXkV0zzShK4ig0lvqxSF5dac2e5x-Qfmau0sMg', '2021-01-13 06:53:56', '2021-01-13 06:53:56'),
(15, 'Amit', 'amit.khare588@gmail.com5', 'Admin', '$2a$10$6HcUxUTWrDMqS71aHkPvt.xrth1edHlNzO9S8a4Uh.1ylu8qMNuju', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbTUiLCJyb2xlIjoiQWRtaW4ifSwiaWF0IjoxNjEwNTQxMTc1fQ.aDW3wC7MkgCVeJSOR2FgidKUNgYrsPkzKu5c8f4z1FY', '2021-01-13 07:02:51', '2021-01-13 07:02:51'),
(16, 'Amit', 'amit.khare588@gmail.com6', 'Admin', '$2a$10$rb.t2UJ/4PdXsTY11pNJz.ua6oU/aS1l3WfFpDoeS/HAeSNUYKx0G', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbTYiLCJyb2xlIjoiQWRtaW4ifSwiaWF0IjoxNjEwNTQxMTg0fQ.JYUAQN40ldnpwGyDyjaNrqyfcw7fATGsy_AcGUJqmOQ', '2021-01-13 07:02:51', '2021-01-13 07:02:51'),
(17, 'Amit', 'amit.khare588@gmail.com7', 'Admin', '$2a$10$3hxloyIA7m1x3EMRotgBaeQNn3XZiGVb.rjUUxAMH2H5ahG0/Saze', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbTciLCJyb2xlIjoiQWRtaW4ifSwiaWF0IjoxNjEwNTQxNzE0fQ.sOpcv7OWKBmxZtShqGUE4SWKnlAin96TnB50FhVOxV0', '2021-01-13 07:11:30', '2021-01-13 07:11:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blogs_url_unique` (`url`);

--
-- Indexes for table `blog_metas`
--
ALTER TABLE `blog_metas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_metas_url_unique` (`url`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `blog_metas`
--
ALTER TABLE `blog_metas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
