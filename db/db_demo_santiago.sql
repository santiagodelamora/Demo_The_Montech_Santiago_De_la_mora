-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-07-2024 a las 22:15:19
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_demo_santiago`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sign_in`
--

CREATE TABLE `sign_in` (
  `ID` int(11) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `added_at` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sign_in`
--

INSERT INTO `sign_in` (`ID`, `email`, `password`, `added_at`) VALUES
(1, 'hrodriguez@gmail.com', 'herolo25', '2024-07-07 21:14:36.521'),
(2, 'katerogu@gmail.com', 'kateza@!#$', '2024-07-07 21:26:42.639'),
(3, 'katerogu@gmail.com', 'kateza@!#$', '2024-07-07 23:48:47.220'),
(4, 'nncc2809@gmail.con', 'SANTY24q$', '2024-07-08 21:37:23.622');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sign_up`
--

CREATE TABLE `sign_up` (
  `ID` int(11) NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `added_at` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sign_up`
--

INSERT INTO `sign_up` (`ID`, `username`, `email`, `password`, `added_at`) VALUES
(1, 'Santiago De la mora', 'sdelamoranunez@gmail.com', 'nose', '2024-07-07 21:11:09.152'),
(2, 'Héctor Rodríguez', 'hrodriguez@gmail.com', 'herolo25', '2024-07-07 21:13:34.802'),
(3, 'Karen Rodríguez', 'katerogu@gmail.com', 'kateza@!#$', '2024-07-07 21:20:45.368'),
(4, 'cinthia c', 'nncc2809@gmail.con', 'SANTY24q$', '2024-07-08 21:33:43.797');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sign_in`
--
ALTER TABLE `sign_in`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `sign_up`
--
ALTER TABLE `sign_up`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sign_in`
--
ALTER TABLE `sign_in`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sign_up`
--
ALTER TABLE `sign_up`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
