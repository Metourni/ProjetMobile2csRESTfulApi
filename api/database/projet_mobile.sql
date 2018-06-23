-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  sam. 23 juin 2018 à 03:00
-- Version du serveur :  5.6.38
-- Version de PHP :  7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `projet_mobile`
--

-- --------------------------------------------------------

--
-- Structure de la table `Categories`
--

CREATE TABLE `Categories` (
  `category_id` int(11) NOT NULL,
  `categoryTxt` text NOT NULL,
  `nb_plat` int(11) DEFAULT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Categories`
--

INSERT INTO `Categories` (`category_id`, `categoryTxt`, `nb_plat`, `image`) VALUES
(1, 'végétarien', 0, ''),
(2, 'diabétique', 0, '');

-- --------------------------------------------------------

--
-- Structure de la table `dishes`
--

CREATE TABLE `dishes` (
  `dish_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `platbinaire_id` int(11) DEFAULT NULL,
  `menujour_id` int(11) DEFAULT NULL,
  `panier_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `dishes`
--

INSERT INTO `dishes` (`dish_id`, `name`, `rating`, `image`, `price`, `restaurant_id`, `category_id`, `platbinaire_id`, `menujour_id`, `panier_id`) VALUES
(1, 'Plat 1', 3, NULL, '20114', 9, 1, NULL, 1, NULL),
(2, 'dish 2', 4, NULL, '121515', 9, 2, NULL, NULL, NULL),
(3, 'plat 3', 5, NULL, '2010', 10, 1, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `fav_category`
--

CREATE TABLE `fav_category` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fav_category`
--

INSERT INTO `fav_category` (`id`, `category_id`, `user_id`, `created_at`) VALUES
(1, 1, 9, '2018-06-21 15:32:12');

-- --------------------------------------------------------

--
-- Structure de la table `menujour`
--

CREATE TABLE `menujour` (
  `menujour_id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `menujour`
--

INSERT INTO `menujour` (`menujour_id`, `nom`, `image`, `restaurant_id`, `category_id`) VALUES
(1, 'Menu N', '', 9, 1);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`order_id`, `restaurant_id`, `user_id`, `date`) VALUES
(1, 9, 1, '2018-06-20 14:43:22'),
(2, 9, 3, '2018-06-20 14:43:22'),
(3, 9, 1, '2018-06-20 15:10:01'),
(4, 9, 2, '2018-06-20 15:11:10'),
(6, 9, 2, '2018-06-20 15:19:02');

-- --------------------------------------------------------

--
-- Structure de la table `order_line`
--

CREATE TABLE `order_line` (
  `order_line_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `qte` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `order_line`
--

INSERT INTO `order_line` (`order_line_id`, `order_id`, `dish_id`, `qte`) VALUES
(1, 1, 2, 2),
(2, 1, 1, 3),
(3, 1, 1, 4),
(4, 1, 1, 4),
(5, 1, 1, 4),
(6, 1, 1, 4);

-- --------------------------------------------------------

--
-- Structure de la table `plat_binaire`
--

CREATE TABLE `plat_binaire` (
  `platbinaire_id` int(11) NOT NULL,
  `nomPlat` varchar(255) NOT NULL,
  `new_price` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `plat_binaire`
--

INSERT INTO `plat_binaire` (`platbinaire_id`, `nomPlat`, `new_price`, `image`, `restaurant_id`, `category_id`) VALUES
(1, 'Mechwiii', '12000', NULL, NULL, NULL),
(2, '3ayletii', '30000', NULL, NULL, NULL),
(3, 'Maklet 3idd', '40000', NULL, NULL, NULL),
(4, 'Maklet Ramdan', '3000', NULL, NULL, NULL),
(5, 'Maklet Bejaya', '30300', NULL, NULL, NULL),
(6, 'Maklet Bejaya', '30300', NULL, NULL, NULL),
(7, 'Maklet Alger', '30300', NULL, NULL, NULL),
(8, 'Maklet Oran', '44210', NULL, NULL, NULL),
(9, 'bata koucha', '232400', NULL, NULL, NULL),
(10, 'cha5chouka', '2324sd', NULL, NULL, NULL),
(11, 'cha5chouka 2', '232413', NULL, NULL, NULL),
(12, 'cha5chouka 3', '232413', NULL, NULL, NULL),
(13, 'cha5chouka 4', '232413', NULL, NULL, NULL),
(15, 'Platsqdq', '1239090', 'http://localhost:3000/public/images/plat_binaire/koopman-google-play-store-badge.png', 9, 1),
(16, 'Platsqdq', '1239090', 'http://localhost:3000/public/images/plat_binaire/user-meto.png', 9, 1),
(17, 'Platooo', '123900', 'http://localhost:3000/public/images/plat_binaire/LogoSample_ByTailorBrands (1).jpeg', 9, 2),
(18, 'Platooo 2', '123900', 'http://localhost:3000/public/images/plat_binaire/1529364586444.jpeg', 9, 2);

-- --------------------------------------------------------

--
-- Structure de la table `restaurants`
--

CREATE TABLE `restaurants` (
  `restaurant_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `nbTable` int(11) DEFAULT NULL,
  `dateOuv` datetime DEFAULT NULL,
  `dateFerm` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `restaurants`
--

INSERT INTO `restaurants` (`restaurant_id`, `name`, `phoneNumber`, `localisation`, `email`, `address`, `description`, `facebook`, `twitter`, `rating`, `nbTable`, `dateOuv`, `dateFerm`, `image`) VALUES
(9, 'Ramdann', '0772828522', '{31.001010 , 0.451165}', 'ramdan@esi.dz', 'Oued samar', 'Best Karentita ever', '0000199999', NULL, 5, 2, '2018-06-18 00:00:00', '2018-06-18 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Metourni', 'en_metourni@esi.dz', '$2y$10$TU9DOC9gRe5Ds6bKWKrCme5YcEVSQA12yBay4u37KBN7Xy.3f8s7C', NULL, '2018-04-03 10:26:42', '2018-04-03 10:26:42'),
(3, 'meto', 'meto@esi.dz', '$2b$10$sGHp26tkaKQUZ6CCU4wgQuuz06sQGhKmmOSVArHGmP10cm5ZNtpDK', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Index pour la table `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`dish_id`);

--
-- Index pour la table `fav_category`
--
ALTER TABLE `fav_category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `menujour`
--
ALTER TABLE `menujour`
  ADD PRIMARY KEY (`menujour_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Index pour la table `order_line`
--
ALTER TABLE `order_line`
  ADD PRIMARY KEY (`order_line_id`);

--
-- Index pour la table `plat_binaire`
--
ALTER TABLE `plat_binaire`
  ADD PRIMARY KEY (`platbinaire_id`);

--
-- Index pour la table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`restaurant_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `dishes`
--
ALTER TABLE `dishes`
  MODIFY `dish_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `fav_category`
--
ALTER TABLE `fav_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `menujour`
--
ALTER TABLE `menujour`
  MODIFY `menujour_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `order_line`
--
ALTER TABLE `order_line`
  MODIFY `order_line_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `plat_binaire`
--
ALTER TABLE `plat_binaire`
  MODIFY `platbinaire_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `restaurant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
