-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2025 at 08:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zelora`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(38,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_image`) VALUES
(1, 'Men\'s Clothing', 'no-image.jpg'),
(2, 'Women\'s Clothing', 'no-image.jpg'),
(3, 'Shoes', 'no-image.jpg'),
(4, 'Accessories', 'no-image.jpg'),
(5, 'T-Shirts', 'no-image.jpg'),
(6, 'Jeans', 'no-image.jpg'),
(7, 'Dresses', 'no-image.jpg'),
(8, 'Jackets', 'no-image.jpg'),
(9, 'Sneakers', 'no-image.jpg'),
(10, 'Hats', 'no-image.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` tinytext DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `payment_info` varchar(255) DEFAULT NULL,
  `size_preferences` tinytext DEFAULT NULL,
  `vip_status` varchar(255) DEFAULT NULL,
  `communication_preferences` tinytext DEFAULT NULL,
  `date_joined` date DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `first_name`, `last_name`, `email`, `password`, `address`, `phone_number`, `date_of_birth`, `payment_info`, `size_preferences`, `vip_status`, `communication_preferences`, `date_joined`, `city`, `role`) VALUES
(1, 'Eoin', 'Murphy', 'eoin.murphy@hotmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '13 Talbot Street', '+353 1 234 5678', '1985-03-12', 'Paypal', 'Large', 'Silver', 'SMS', '2023-03-03', 'Dublin', 'USER'),
(2, 'Barry', 'Smith', 'barry.s@hotmail.com', '$2a$10$e0MYzXyjpJS7Pd0RVvHwHe1NoNknz0aVwqz5JhfJ2jGNanECGH/Ty', '13 Talbot Street', '+353 1 234 5678', '1985-03-12', 'Paypal', 'Large', 'Silver', 'SMS', '2023-03-18', 'Dublin', 'USER'),
(3, 'Cillian', 'O\'Sullivan', 'cillian.osullivan@gmail.com', 'Ua^qJ!&6e', '9 Abbey Street', '+353 61 876 5432', '1980-11-05', 'Paypal', 'Small', 'Gold', 'Email', '2023-09-26', 'Limerick', 'USER'),
(4, 'Saoirse', 'Walsh', 'swalsh@microsoft.com', 'ehGC$dYJb7', '8 Thomas Street', '+353 91 765 4321', '1992-02-17', 'Credit Card', 'Medium', 'Bronze', 'Email', '2023-04-04', 'Galway', 'USER'),
(5, 'Darragh', 'Ryan', 'darraghryano@esb.ie', 'H0XfQ6cW', '77 Pearse Street', '+44 28 7654 3210', '1988-07-30', 'Stripe', 'XL', 'Gold', 'Email', '2023-04-11', 'Belfast', 'USER'),
(6, 'Fionnuala', 'Doherty', 'fiodoh@bt.com', 'y6(eNw3O', '14 Clanbrassil Street', '+353 1 111 2222', '1995-04-15', 'Credit Card', 'Small', 'Bronze', 'SMS', '2022-10-20', 'Dublin', 'USER'),
(7, 'Cormac', 'McCarthy', 'cormac@ireland.com', 'XRPaL0J%R', '87 Francis Street', '+353 21 333 4444', '1987-10-03', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-05-22', 'Cork', 'USER'),
(8, 'Aisling', 'Ní Chonaill', 'aislingn@gmail.com', '7PqY#hu3', '3 Teeling Street', '+353 61 444 5555', '1990-06-28', 'Credit Card', 'Large', 'Platinum', 'Email', '2023-09-23', 'Balina Mayo', 'USER'),
(9, 'Tadhg', 'O\'Connor', 'tadhgoconnor@microsoft.com', 'mgrwp7cU%', '81 Kevin Street', '+353 91 555 6666', '1982-12-10', 'Credit Card', 'Medium', 'Silver', 'SMS', '2023-09-04', 'Galway', 'USER'),
(10, 'Róisín', 'Ó Sé', 'roisino@gmail.com', 'piv8QrZ', '45 Wine Street', '+44 28 6666 7777', '1986-09-21', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-05-24', 'Sligo', 'USER'),
(11, 'Padraig', 'Fitzgerald', 'paddyfitz@gmail.com', 'NOcc52d', '117 Baggot Street', '+353 1 777 8888', '1993-05-27', 'Credit Card', 'Large', 'Bronze', 'Email', '2023-02-20', 'Dublin', 'USER'),
(12, 'Mairead', 'Ó Murchú', 'mairead.omurchu@gmail.com', 'PtjpcSHI', '4 Grattan Street', '+353 21 888 9999', '1989-08-19', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-09-17', 'Sligo', 'USER'),
(13, 'Seán', 'O\'Neill', 'sean.oneill@microsoft.com', 'G^dQ^)I', '4 O\'Gorman Street', '+353 61 999 0000', '1996-01-14', 'Credit Card', 'Medium', 'Platinum', 'Email', '2023-05-05', 'Kilrush, Co Clare', 'USER'),
(14, 'Eilis', 'Ní Bhraonáin', 'eilis.nibhraonain@gmail.com', '@^-PCov5', '7 Thomas Street', '+353 91 101 1212', '1984-11-30', 'Debit Card', 'Medium', 'Silver', 'Email', '2023-10-11', 'Galway', 'USER'),
(15, 'Pádraig', 'Mac Suibhne', 'padraig_macsuibhne@gmail.com', 'LWDWeJdLe', 'John 15 Broderick Street', '+44 28 1111 1212', '1987-07-05', 'Credit Card', 'Medium', 'Gold', 'Telegram', '2023-01-23', 'Athlone', 'USER'),
(16, 'Máire', 'Ní Ghríofa', 'maire.nighriofa@gmail.com', 'c2qvkqbq', '1212 Oak Avenue', '+353 1 1212 1313', '1994-06-14', 'Credit Card', 'Medium', 'Gold', 'Email', '2023-03-04', 'Dublin', 'USER'),
(17, 'Ciarán', 'Ó Conaire', 'ciaranDOR@hotmail.com', 'BM3Ya5#uUn', '45 Carmody Street', '+353 21 1313 1414', '1988-09-25', 'Debit Card', 'Large', 'Silver', 'SMS', '2022-11-15', 'Ennis, Co Clare', 'USER'),
(18, 'Siobhán', 'Mac an Bhaird', 'siobhan.macanbhaird@gmail.com', 'XRQec0f2M$', 'Sean Costello Street', '+353 61 1414 1515', '1997-02-03', 'Credit Card', 'Small', 'Bronze', 'Email', '2023-01-18', 'Athlone', 'USER'),
(19, 'Niall', 'Ó Ceallaigh', 'niall.oceallaigh@gmail.com', 'n)VjoZCn$', '34 Castletown Road', '+353 91 1515 1616', '1993-10-07', 'Debit Card', 'Medium', 'Platinum', 'SMS', '2022-10-30', 'Galway', 'USER'),
(20, 'Bríd', 'Ní Dhonnchadha', 'brid.nidhonnchad@gmail.com', '^1#OZJs', '1616 Cedar Avenue', '+44 28 1616 1717', '1985-12-18', 'Credit Card', 'Large', 'Gold', 'Email', '2023-03-14', 'Belfast', 'USER'),
(21, 'Caoimhe', 'Ní Mhurchú', 'canimhurchu@yahoo.com', '&7Quo8l2', '1717 Birch Lane', '+353 1 1717 1818', '1990-07-22', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-09-14', 'Dublin', 'USER'),
(22, 'Dónal', 'Ó Céilleachair', 'donal.oceilleacha@gmail.com', 'Qz8G#Qe6', '24 Long Walk', '+353 21 1818 1919', '1982-03-12', 'Debit Card', 'Large', 'Gold', 'SMS', '2023-02-12', 'Cork', 'USER'),
(23, 'Síle', 'Mac Aodha', 'silemac@gmail.com', 'NKMerz3N', '34 Barrett Street', '+353 61 1919 2020', '1995-10-15', 'Credit Card', 'Small', 'Bronze', 'Email', '2023-09-03', 'Ballina, Mayo', 'USER'),
(24, 'Mícheál', 'Ó Cearbhaill', 'micheal.ocearbhaill@gmail.com', 'Q%&(DSM7', '20 Oak Lane', '+353 91 2020 2121', '1987-05-28', 'Credit Card', 'Medium', 'Platinum', 'Carrier Pigeon', '2023-03-22', 'Galway', 'USER'),
(25, 'Ailbhe', 'Ní Dhálaigh', 'ailbhe.nidhalaigh@gmail.com', 'DhalaighPaSS', 'Jocelyn Street', '+44 28 2121 2222', '1993-12-03', 'Debit Card', 'Medium', 'Silver', 'SMS', '2023-04-12', 'Dundalk', 'USER'),
(26, 'John', 'Murphy', 'jmrphy@gmail.com', 'Iu#k@9rle', '333 Main Street', '+353 1 333 4444', '1980-02-15', 'Credit Card', 'Medium', 'Gold', 'Email', '2022-12-05', 'Dublin', 'USER'),
(27, 'Mary', 'Walsh', 'mwalsh@gmail.com', 'Mj^PPfl&j', '444 Elm Avenue', '+353 21 444 5555', '1992-09-08', 'Debit Card', 'Small', 'Silver', 'SMS', '2023-01-01', 'Cork', 'USER'),
(28, 'Michael', 'O\'Connor', 'michael.oconnor@tus.ie', 'mikeyopassword', '555 Oak Road', '+353 61 555 6666', '1985-05-20', 'Credit Card', 'Large', 'Platinum', 'Email', '2023-06-06', 'Limerick', 'USER'),
(29, 'Anne', 'Ryan', 'anne.ryan@ucg.ie', 'IJT*)Fdg)', '666 Pine Lane', '+353 91 666 7777', '1990-12-12', 'Credit Card', 'Medium', 'Gold', 'Email', '2023-05-05', 'Galway', 'USER'),
(30, 'James', 'Smith', 'jimmys@gmail.com', '38!7kG@IT', '777 Birch Lane', '+44 28 7777 8888', '1988-07-28', 'Debit Card', 'Medium', 'Silver', 'SMS', '2023-08-15', 'Belfast', 'USER'),
(31, 'Sarah', 'Johnson', 'sj91@gmail.com', 'bFR&BUV', '888 Cedar Avenue', '+353 1 888 9999', '1991-04-18', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-04-14', 'Dublin', 'USER'),
(32, 'Peter', 'Brown', 'peterbbb84@gmail.com', 'o$!rcMyq', '999 Elm Road', '+353 21 999 1010', '1984-10-07', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-10-01', 'Cork', 'USER'),
(33, 'Laura', 'Davis', 'laura.davis@gmail.com', 'eXY1vDUk', '1010 Oak Lane', '+353 61 1010 1111', '1993-01-25', 'Credit Card', 'Large', 'Platinum', 'Email', '2023-02-06', 'Limerick', 'USER'),
(34, 'Andrew', 'Wilson', 'andywil@gmail.com', 'L^K*Y8Jb', '1111 Pine Avenue', '+353 91 1111 1212', '1989-08-13', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-06-15', 'Galway', 'USER'),
(35, 'Emma', 'Taylor', 'emtay97@gmail.com', 'OejOmDsk', '1212 Birch Road', '+44 28 1212 1313', '1997-03-29', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-03-01', 'Belfast', 'USER'),
(36, 'Daniel', 'Roberts', 'daniel_roberts23@gmail.com', '0UScN2Qu0', '1313 Oak Road', '+353 1 1313 1414', '1983-09-12', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-08-27', 'Dublin', 'USER'),
(37, 'Olivia', 'Wilson', 'olivia_wilson@gmail.com', '6i*Y7G&kF!', '1414 Cedar Lane', '+353 21 1414 1515', '1985-04-28', 'Debit Card', 'Small', 'Gold', 'SMS', '2022-12-25', 'Cork', 'USER'),
(38, 'Liam', 'Smith', 'smithlisa@gmail.com', '$X!YFbv0&j', '1515 Pine Avenue', '+353 61 1515 1616', '1990-01-03', 'Credit Card', 'Large', 'Platinum', 'Email', '2023-02-23', 'Limerick', 'USER'),
(39, 'Ava', 'Davis', 'ava_davis@gmail.com', 'YQG3ppK(t', '1616 Elm Road', '+353 91 1616 1717', '1988-07-15', 'Credit Card', 'Medium', 'Gold', 'Email', '2022-12-27', 'Galway', 'USER'),
(40, 'Noah', 'Miller', 'noaaahmiller@gmail.com', 'Mbc8-id', '1717 Birch Avenue', '+44 28 1717 1818', '1986-03-29', 'Debit Card', 'Medium', 'Bronze', 'SMS', '2023-09-13', 'Belfast', 'USER'),
(41, 'Mia', 'Brown', 'mia.brown@gmail.com', 'u#m&K!@f*', '1818 Oak Lane', '+353 1 1818 1919', '1991-06-14', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-09-25', 'Dublin', 'USER'),
(42, 'Lucas', 'Jones', 'lucas.jones@gmail.com', 'be-znsgoM', '1919 Cedar Road', '+353 21 1919 2020', '1989-04-22', 'Debit Card', 'Large', 'Gold', 'SMS', '2023-10-09', 'Cork', 'USER'),
(43, 'Sophia', 'Anderson', 'sophia.anderson@gmail.com', '7spDiU^!o', '2020 Pine Avenue', '+353 61 2020 2121', '1994-02-03', 'Credit Card', 'Medium', 'Platinum', 'Email', '2022-11-07', 'Limerick', 'USER'),
(44, 'Tommy', 'Jones', 'eoin.murphy@hotmail.com', 'bjpass', '13 Talbot Street', '+353 1 234 5678', '1985-03-12', 'Paypal', 'Large', 'Silver', 'SMS', '2023-02-23', 'Dublin', 'USER'),
(45, 'Isabella', 'White', 'isabella_white@trump.co.uk', 'g0TME3xY%', '2222 Cedar Avenue', '+44 28 2222 2323', '1990-05-11', 'Debit Card', 'Medium', 'Bronze', 'SMS', '2023-05-17', 'Belfast', 'USER'),
(46, 'Siobhán', 'O\'Connor', 'siobhanoc@gmail.com', 'lZQCli6', '2323 Oak Road', '+353 1 2323 2424', '1981-03-18', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-08-19', 'Dublin', 'USER'),
(47, 'Ciarán', 'Murphy', 'ciarmurphy@gmail.com', 'XxiUBQG@3', '2424 Cedar Lane', '+353 21 2424 2525', '1983-11-27', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-03-29', 'Cork', 'USER'),
(48, 'Aoife', 'Ní Mhurchú', 'aoife.nimhurchu@yahoo.com', 's18)gS#w', '2525 Pine Avenue', '+353 61 2525 2626', '1984-08-14', 'Credit Card', 'Large', 'Platinum', 'Email', '2023-07-01', 'Limerick', 'USER'),
(49, 'Pádraig', 'Ó Súilleabháin', 'paddysuilleabha@bt.com', 'cXfP1EF6F', '2626 Elm Road', '+353 91 2626 2727', '1992-06-05', 'Debit Card', 'Medium', 'Gold', 'Email', '2022-12-19', 'Galway', 'USER'),
(50, 'Róisín', 'Ní Bhraonáin', 'roisin.nibhraonain@gmail.com', 'q!lBllE!', '2727 Cedar Road', '+44 28 2727 2828', '1991-12-22', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-07-17', 'Belfast', 'USER'),
(51, 'Elena', 'Ivanova', 'elena.ivanova@gmail.com', '^Dc6990*@w', '2828 Elm Lane', '+353 1 2828 2929', '1986-05-10', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-01-02', 'Dublin', 'USER'),
(52, 'Mikhail', 'Kuznetsov', 'mikhail.kuze@gmail.com', 'M8u0yXl', '2929 Cedar Avenue', '+353 21 2929 3030', '1980-09-03', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-08-09', 'Cork', 'USER'),
(53, 'Katarzyna', 'Nowak', 'katarzyna.nowak11@tcd.ie', 'dSEleoniG', '3030 Pine Avenue', '+353 61 3030 3131', '1993-02-14', 'Credit Card', 'Large', 'Platinum', 'Email', '2023-03-16', 'Limerick', 'USER'),
(54, 'Andrei', 'Popescu', 'andrei.popescu@gmail.com', 'rPV6Ni8og', '3131 Oak Road', '+353 91 3131 3232', '1985-08-26', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-05-28', 'Galway', 'USER'),
(55, 'Anastasia', 'Zyablikova', 'anastasia.zyablikova@gmail.com', 'NOendg)Z', '3232 Cedar Road', '+44 28 3232 3333', '1988-04-07', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-08-11', 'Belfast', 'USER'),
(56, 'Lukasz', 'Novak', 'lukasz.novak@hotmail.com', 'U8WCRJ!aF', '3333 Pine Lane', '+353 1 3333 3434', '1984-03-17', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-01-15', 'Dublin', 'USER'),
(57, 'Caoimhe', 'Smith', 'caoimhe.smith@ireland.com', 'M$CgIR84S0', '3434 Oak Road', '+353 21 3434 3535', '1991-12-08', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-07-26', 'Cork', 'USER'),
(58, 'Viktor', 'Ivanov', 'viktor.ivanov@ucd.ie', 'ar%7XL4%dR', '3535 Cedar Avenue', '+353 61 3535 3636', '1982-07-25', 'Credit Card', 'Large', 'Platinum', 'Email', '2022-11-30', 'Limerick', 'USER'),
(59, 'Aisling', 'Ní Mhurchú', 'aisling.nimhurchu@gmail.com', '#z%eZkj4', '3636 Elm Lane', '+353 91 3636 3737', '1987-09-19', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-01-27', 'Galway', 'USER'),
(60, 'Pavel', 'Kuznetsov', 'pavel.kuznetsov@gmail.com', 'HJZc#SrafuZ', '3737 Pine Avenue', '+44 28 3737 3838', '1990-06-01', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2022-10-29', 'Belfast', 'USER'),
(61, 'Síle', 'Walsh', 'sile.walsh@gmail.com', 'p7clZRI', '3838 Oak Road', '+353 1 3838 3939', '1989-04-12', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-02-08', 'Dublin', 'USER'),
(62, 'Dominik', 'Nowak', 'do#nowak@gmail.com', 'hu7MchJ(Y', '3939 Cedar Lane', '+353 21 3939 4040', '1985-11-29', 'Debit Card', 'Large', 'Gold', 'SMS', '2023-04-02', 'Cork', 'USER'),
(63, 'Máire', 'Zyablikova', 'maire.zyablikova@gmail.com', 'g)q(GkRz', '4040 Pine Avenue', '+353 61 4040 4141', '1992-03-07', 'Credit Card', 'Small', 'Platinum', 'Email', '2023-02-19', 'Limerick', 'USER'),
(64, 'Nikolay', 'O\'Connor', 'nikolay.oconnor@hotmail.com', 'vVm0EJf', '4141 Elm Road', '+353 91 4141 4242', '1983-08-13', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-02-18', 'Galway', 'USER'),
(65, 'Eva', 'Murphy', 'eva.murphy@gmail.com', '5rsTkzEcU', '4242 Cedar Road', '+44 28 4242 4343', '1984-12-05', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-06-14', 'Belfast', 'USER'),
(66, 'Daria', 'Ivanova', 'daria.ivanova@tcd.ie', 'nX&5HLgb', '4343 Elm Lane', '+353 1 4343 4444', '1987-02-18', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-01-23', 'Dublin', 'USER'),
(67, 'Dylan', 'Walsh', 'dylan.walsh@gmail.com', 's&#saA^s', '4444 Oak Road', '+353 21 4444 4545', '1994-11-08', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-02-23', 'Cork', 'USER'),
(68, 'Kamila', 'Nowak', 'kamila.nowak@gmail.com', '7g1as)F!w(', '4545 Cedar Avenue', '+353 61 4545 4646', '1990-07-25', 'Credit Card', 'Large', 'Platinum', 'Email', '2023-10-03', 'Limerick', 'USER'),
(69, 'Fionn', 'Mac Suibhne', 'fionn.macsuibhne@gmail.com', 'x$gmW&5M-', '4646 Pine Avenue', '+353 91 4646 4747', '1989-05-19', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-07-12', 'Galway', 'USER'),
(70, 'Elena', 'Kuznetsova', 'elena.kuznetsova@gmail.com', 'fXXvVkt(b', '4747 Birch Road', '+44 28 4747 4848', '1985-08-11', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-07-30', 'Belfast', 'USER'),
(71, 'Cillian', 'Ó Murchú', 'cillian.omurchu@gmail.com', 'oJAuN-ff2', '4848 Oak Lane', '+353 1 4848 4949', '1983-04-02', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-07-04', 'Dublin', 'USER'),
(72, 'Andrii', 'Kovalenko', 'andrii.kovalenko@gmail.com', 'Ku4(p#2Ft-', '4949 Cedar Lane', '+353 21 4949 5050', '1991-12-29', 'Debit Card', 'Large', 'Gold', 'SMS', '2022-12-30', 'Cork', 'USER'),
(73, 'Maeve', 'Ní Bhraonáin', 'maeve.nibhraonain@gmail.com', 'i$H4t2$jlWT', '5050 Pine Avenue', '+353 61 5050 5151', '1982-09-07', 'Credit Card', 'Small', 'Platinum', 'Email', '2023-08-31', 'Limerick', 'USER'),
(74, 'Piotr', 'Kowalski', 'piotr.kowalski@gmail.com', 'PTxsBPC7', '5151 Elm Road', '+353 91 5151 5252', '1993-06-14', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-07-15', 'Galway', 'USER'),
(75, 'Clodagh', 'Kearney', 'clodagh.kearney@gmail.com', 'CCFR)OEq', '5252 Cedar Road', '+44 28 5252 5353', '1987-08-05', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2022-11-19', 'Belfast', 'USER'),
(76, 'Anastasija', 'Petrova', 'anastasija.petrov@hotmail.com', 'iqjy-$nk', '5353 Birch Lane', '+353 1 5353 5454', '1984-06-25', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-01-06', 'Dublin', 'USER'),
(77, 'Seán', 'Byrne', 'sean.byrne@gmail.com', 'OV7T9gyt!', '5454 Cedar Road', '+353 21 5454 5555', '1992-12-18', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-08-15', 'Cork', 'USER'),
(78, 'Aleksandr', 'Smirnov', 'aleksandr.smirnov@rte.ie', 'i%ME7&RKg', '5555 Oak Avenue', '+353 61 5555 5656', '1987-02-14', 'Credit Card', 'Large', 'Platinum', 'Email', '2023-04-04', 'Limerick', 'USER'),
(79, 'Sorcha', 'Mac Conmara', 'sorcha.macconmara@gmail.com', 'h7zHZiWv', '5656 Elm Road', '+353 91 5656 5757', '1985-09-19', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-08-16', 'Galway', 'USER'),
(80, 'Tomasz', 'Kowalczyk', 'tomasz.kowalczyk@eir.ie', 'K84duAHIQn', '5757 Pine Lane', '+44 28 5757 5858', '1990-07-01', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-07-19', 'Belfast', 'USER'),
(81, 'Gráinne', 'O\'Leary', 'grainne.oleary@gmail.com', 'YHkQsaA', '5858 Cedar Avenue', '+353 1 5858 5959', '1981-03-12', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-01-25', 'Dublin', 'USER'),
(82, 'Ivan', 'Dimitrov', 'ivan.dimitrov@microsoft.com', 'zFP7lIB', '5959 Oak Road', '+353 21 5959 6060', '1983-10-29', 'Debit Card', 'Large', 'Gold', 'SMS', '2022-11-23', 'Cork', 'USER'),
(83, 'Aoibheann', 'Ní Bhraonáin', 'aoibheann.nibhraonain@gmail.com', 'QZGczYoRL', '4 Evergreen Terrace', '+353 61 6060 6161', '1989-08-07', 'Credit Card', 'Small', 'Platinum', 'Email', '2023-06-20', 'Limerick', 'USER'),
(84, 'Marek', 'Novotný', 'marek.novotny@gmail.com', 'kCwROV8Amo', '21 Whispering Pines Drive', '+353 91 6161 6262', '1987-06-14', 'Debit Card', 'Medium', 'Gold', 'Email', '2022-11-07', 'Galway', 'USER'),
(85, 'Svetlana', 'Ivanova', 'svetlana.ivanova@yahoo.com', 'Znx33mbZw', '6262 Cedar Road', '+44 28 6262 6363', '1992-09-05', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-01-22', 'Belfast', 'USER'),
(86, 'Mohammed', 'Abdullah', 'mohammed.abdullah@finite.com', 'L4e3pnA&', '6363 Cedar Lane', '+353 1 6363 6464', '1986-04-12', 'Credit Card', 'Medium', 'Silver', 'Email', '2022-12-09', 'Dublin', 'USER'),
(87, 'Niamh', 'Doherty', 'dohertyniamh@larksky.com', 'Ipk5kG$2Ya', '6464 Pine Avenue', '+353 21 6464 6565', '1993-11-28', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-09-17', 'Cork', 'USER'),
(88, 'Aleksandra', 'Kowalczyk', 'aleksandra.kowalczyke@gmail.com', '0&o&Fmd9tR*', '6565 Oak Road', '+353 61 6565 6666', '1982-07-19', 'Credit Card', 'Large', 'Platinum', 'Email', '2022-12-13', 'Limerick', 'USER'),
(89, 'Conor', 'Ó Cionnaith', 'conor.ocionnaith@gmail.com', 'DDGXXuS*3', '6666 Elm Lane', '+353 91 6666 6767', '1985-10-04', 'Debit Card', 'Medium', 'Gold', 'Email', '2022-10-22', 'Galway', 'USER'),
(90, 'Dmitri', 'Volkov', 'dmitri.volkov@gmail.com', '6MchJS#', '6767 Cedar Avenue', '+44 28 6767 6868', '1990-06-15', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-05-21', 'Belfast', 'USER'),
(91, 'Sinead', 'Ní Dhomhnaill', 'sinead.nidhomhnail@gmail.com', 'oaJpjx*d', '6868 Pine Lane', '+353 1 6868 6969', '1983-02-28', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-09-17', 'Dublin', 'USER'),
(92, 'Józef', 'Kowalski', 'jozef.kowalski@gmail.com', 'WcDCCDJF2', '6969 Oak Road', '+353 21 6969 7070', '1988-12-29', 'Debit Card', 'Large', 'Gold', 'SMS', '2023-08-08', 'Cork', 'USER'),
(93, 'Aoibhinn', 'Mac Conmara', 'aoibhinn.macconmara@gmail.com', '$PZGd4u', '7070 Elm Avenue', '+353 61 7070 7171', '1991-09-07', 'Credit Card', 'Small', 'Platinum', 'Email', '2023-01-26', 'Limerick', 'USER'),
(94, 'Irina', 'Ivanova', 'irina.ivanova@gmail.com', '5S$3JXRS', '7171 Cedar Lane', '+353 91 7171 7272', '1987-08-14', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-09-28', 'Galway', 'USER'),
(95, 'Szymon', 'Nowak', 'szymon.nowak@firstactive.ie', 'cMx$hpj1e', '7272 Pine Road', '+44 28 7272 7373', '1993-11-01', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-09-11', 'Belfast', 'USER'),
(96, 'Karolina', 'Jankowska', 'karolina.jankowsk@aviva.ie', 'VuWq-SRu', '7373 Elm Lane', '+353 1 7373 7474', '1985-07-15', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-06-16', 'Dublin', 'USER'),
(97, 'Colm', 'Ó Coileáin', 'colm.ocoileain@nolans.ie', '6VEc683QYZ', '7474 Cedar Avenue', '+353 21 7474 7575', '1990-03-22', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-05-27', 'Cork', 'USER'),
(98, 'Vladimir', 'Sokolov', 'vladimir.sokolov@gmail.com', 'Y^vkj(cA', '7575 Oak Road', '+353 61 7575 7676', '1988-12-11', 'Credit Card', 'Large', 'Platinum', 'Email', '2022-10-30', 'Limerick', 'USER'),
(99, 'Maeve', 'Ní Ghallchóir', 'maeve.nighallchoi@gmail.com', 'lE3u%xsaK0', '7676 Pine Avenue', '+353 91 7676 7777', '1984-06-28', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-02-23', 'Galway', 'USER'),
(100, 'Dmitry', 'Kovalenko', 'dmitry.kovalenko@fishamble.com', 'fs3)tL^D', '7777 Cedar Lane', '+44 28 7777 7878', '1991-05-03', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-06-11', 'Belfast', 'USER'),
(101, 'Róisín', 'O\'Neill', 'reill@gmail.com', 'tgYZ2xN', '16 Swanston Street', '+353 1 7878 7979', '1986-09-09', 'Credit Card', 'Medium', 'Silver', 'Email', '2022-12-23', 'Dublin', 'USER'),
(102, 'Bartosz', 'Nowak', 'bartosz.nowak@gmail.com', '(CRFvFcvG', '12 Stephanie Drive', '+353 21 7979 8080', '1989-11-26', 'Debit Card', 'Large', 'Gold', 'SMS', '2023-10-03', 'Cork', 'USER'),
(103, 'Siobhán', 'Ní Chonaill', 'siobhan.nichonaill@microsoft.com', 'kJIQ1C$w', '10 Oakhaven Drive', '+353 61 8080 8181', '1987-04-30', 'Credit Card', 'Small', 'Platinum', 'Email', '2023-01-17', 'Limerick', 'USER'),
(104, 'Andrey', 'Petrov', 'andrey.petrov@gmail.com', '-*8U#rZ', '100 Spruce Drive', '+353 91 8181 8282', '1985-02-08', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-02-27', 'Galway', 'USER'),
(105, 'Sofia', 'Ivanova', 'sofia_ivanova@forbes.co.uk', 'fS&(DWaq', '9 Birch Avenue', '+44 28 8282 8383', '1992-11-14', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2022-11-09', 'Belfast', 'USER'),
(106, 'Ivan', 'Petrov', 'ivan.petrov@twitter.com', 'mz$fh)n5C', '53 Poplar Way', '+353 1 8383 8484', '1984-08-10', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-01-02', 'Dublin', 'USER'),
(107, 'Eimear', 'O\'Sullivan', 'eimearosull88@gmail.com', '3MpV6JO', '8 Bourke Street', '+353 21 8484 8585', '1988-03-25', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-08-27', 'Cork', 'USER'),
(108, 'Paweł', 'Kowalski', 'pawel.kowalski@tus.ie', 'SaCEN4YyuT', '8585 Oak Avenue', '+353 61 8585 8686', '1993-06-16', 'Credit Card', 'Large', 'Platinum', 'Email', '2023-06-17', 'Limerick', 'USER'),
(109, 'Síofra', 'Ní Dhonnabháin', 'siofra.nidhonnabha@gmail.com', 'Y#dbuGmM', '7 Flinders Lane', '+353 91 8686 8787', '1986-11-02', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-07-12', 'Galway', 'USER'),
(110, 'Grzegorz', 'Nowak', 'grzegorz.nowak@examp@gmail.com', 'yFTI1ZmL', '34 Russell Street', '+44 28 8787 8888', '1990-09-24', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-06-19', 'Belfast', 'USER'),
(111, 'Caitríona', 'Ní Ghallchóir', 'caitriona.nighallchoi@gmail.com', 'Qk90HXVlIl#', '18 Spencer Street', '+353 1 8888 8989', '1989-04-11', 'Credit Card', 'Medium', 'Silver', 'Email', '2022-12-09', 'Dublin', 'USER'),
(112, 'Andrzej', 'Kaczmarek', 'andrzej.kaczmarek@e@gmail.com', 'G*n9tqC8y', '9 Pitt Street', '+353 21 8989 9090', '1984-12-02', 'Debit Card', 'Large', 'Gold', 'SMS', '2023-07-04', 'Cork', 'USER'),
(113, 'Aoife', 'Ní Mhurchú', 'aoife.nimhurchu@e@gmail.com', ')c)24t6i', '9090 Pine Avenue', '+353 61 9090 9191', '1982-07-18', 'Credit Card', 'Small', 'Platinum', 'Email', '2022-11-26', 'Limerick', 'USER'),
(114, 'Pavel', 'Pavlov', 'pavel.pavlov@exam@gmail.com', '5jE696nt(', '17 Park Street', '+353 91 9191 9292', '1987-03-26', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-03-17', 'Galway', 'USER'),
(115, 'Oksana', 'Semenova', 'oksana.semenova@ex@gmail.com', '-)&3A0rc', '9292 Elm Road', '+44 28 9292 9393', '1989-05-09', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-07-08', 'Belfast', 'USER'),
(116, 'Kateryna', 'Ivanenko', 'kateryna.ivanenko@ex@gmail.com', 'o&BUY7G', '9393 Cedar Lane', '+353 1 9393 9494', '1986-01-30', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-03-02', 'Dublin', 'USER'),
(117, 'Niall', 'Clarke', 'niall.clarke@exam@gmail.com', 'HhBwXrC1&', '9494 Elm Road', '+353 21 9494 9595', '1993-02-14', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-06-24', 'Cork', 'USER'),
(118, 'Mateusz', 'Kowalski', 'mateusz.kowalski@ex@gmail.com', ')!XCLx(j', '9595 Oak Avenue', '+353 61 9595 9696', '1981-10-19', 'Credit Card', 'Large', 'Platinum', 'Email', '2023-02-02', 'Limerick', 'USER'),
(119, 'Róisín', 'Ní Dhonnabháin', 'roisin.nidhonnabha@gmail.com', 'BRH4rvhXl', '9696 Pine Lane', '+353 91 9696 9797', '1985-04-27', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-03-20', 'Galway', 'USER'),
(120, 'Mariusz', 'Nowak', 'mariusz.nowak@examp@gmail.com', 'dKh@Ac^r5', '9797 Cedar Road', '+44 28 9797 9898', '1990-06-08', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-01-03', 'Belfast', 'USER'),
(121, 'Eilis', 'Ní Mhurchú', 'eilis.nimhurchu@e@gmail.com', 'yYr-O)Y', '9898 Elm Lane', '+353 1 9898 9999', '1988-08-13', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-08-02', 'Dublin', 'USER'),
(122, 'Michał', 'Kaczmarek', 'michal.kaczmarek@e@gmail.com', 'j)idt#oC', '9999 Oak Lane', '+353 21 9999 0000', '1983-12-01', 'Debit Card', 'Large', 'Gold', 'SMS', '2023-02-10', 'Cork', 'USER'),
(123, 'Sorcha', 'Ní Chonaill', 'sorcha.nichonaill@@gmail.com', 'HlT3C#XT', '0000 Pine Avenue', '+353 61 0000 0101', '1982-06-04', 'Credit Card', 'Small', 'Platinum', 'Email', '2022-12-30', 'Limerick', 'USER'),
(124, 'Sergei', 'Ivanov', 'sergei.ivanov@exam@gmail.com', 'n@5WN*Utl', '0101 Cedar Road', '+353 91 0101 0202', '1987-09-22', 'Debit Card', 'Medium', 'Gold', 'Email', '2022-11-05', 'Galway', 'USER'),
(125, 'Anastasiia', 'Semenova', 'anastasiia.semenova@ex@gmail.com', 'oPbTQW8z7', '0202 Elm Road', '+44 28 0202 0303', '1991-11-15', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-06-09', 'Belfast', 'USER'),
(126, 'Hanna', 'Mazur', 'hanna.mazur@microsoft.com', 'g#J(if0o!', '0303 Cedar Lane', '+353 1 0303 0404', '1986-05-21', 'Credit Card', 'Medium', 'Silver', 'Email', '2022-11-07', 'Dublin', 'USER'),
(127, 'Trevor', 'Murphy', 'trevmurphy@yahoo.com', 'rAPEs%1E', '0404 Elm Road', '+353 21 0404 0505', '1992-02-28', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-02-23', 'Cork', 'USER'),
(128, 'Iryna', 'Kovalenko', 'iryna.kovalenko@eir.ie', 'pfh*hex0lf', '0505 Oak Avenue', '+353 61 0505 0606', '1987-11-15', 'Credit Card', 'Large', 'Platinum', 'Email', '2023-05-21', 'Limerick', 'USER'),
(129, 'Caoimhe', 'Ní Mhurchú', 'caoimhe.nimhurchu@hotmail.com', 'hF)ynrZ', '0606 Pine Lane', '+353 91 0606 0707', '1985-09-02', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-09-04', 'Galway', 'USER'),
(130, 'Dariusz', 'Nowak', 'dariusz_nowak@aol.com', '7v9U!guV7', '0707 Cedar Road', '+44 28 0707 0808', '1990-03-24', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-06-06', 'Belfast', 'USER'),
(131, 'Ciara', 'Ní Chonaill', 'ciara.nichonaill@gmail.com', '^QV7PpRv@', '0808 Elm Road', '+353 1 0808 0909', '1984-07-11', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-04-26', 'Dublin', 'USER'),
(132, 'Piotr', 'Kaczmarek', 'piotr.kaczmarek@microsoft.com', 'MCs-L2WaH', '0909 Oak Lane', '+353 21 0909 1010', '1982-12-19', 'Debit Card', 'Large', 'Gold', 'SMS', '2023-06-30', 'Cork', 'USER'),
(133, 'Méabh', 'Ní Dhonnabháin', 'meabhnidhonnabha@eir.ie', 'BKv@bTOV', '1010 Pine Avenue', '+353 61 1010 1111', '1989-03-15', 'Credit Card', 'Small', 'Platinum', 'Email', '2023-09-22', 'Limerick', 'USER'),
(134, 'Viktor', 'Ivanov', 'viktor.ivanov@gmit.ie', 's052cxSarp', '1111 Cedar Road', '+353 91 1111 1212', '1987-04-27', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-05-05', 'Galway', 'USER'),
(135, 'Alina', 'Sokolova', 'alina.sokolova@gmail.com', 'ygIS#x4', '1212 Elm Lane', '+44 28 1212 1313', '1991-06-29', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-09-26', 'Belfast', 'USER'),
(136, 'Anatoliy', 'Kovalev', 'anatoliy.kovalev@hotmail.com', 'FYhVHprn', '1313 Cedar Lane', '+353 1 1313 1414', '1985-03-17', 'Credit Card', 'Medium', 'Silver', 'Email', '2022-11-06', 'Dublin', 'USER'),
(137, 'Aoibheann', 'O\'Donnell', 'aoibheann.odonnell@aol.com', 'sJ2ap5Rv', '1414 Elm Road', '+353 21 1414 1515', '1992-09-13', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-03-26', 'Cork', 'USER'),
(138, 'Ilya', 'Petrov', 'ilya.petrov@ul.ie', 'BO&J4mYUc8', '1515 Oak Avenue', '+353 61 1515 1616', '1987-07-25', 'Credit Card', 'Large', 'Platinum', 'Email', '2022-10-27', 'Limerick', 'USER'),
(139, 'Clíodhna', 'Ní Mhurchú', 'cliodhna.nimhurchu@hotmail.com', '8R0$X#l', '1616 Pine Lane', '+353 91 1616 1717', '1984-10-08', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-08-11', 'Galway', 'USER'),
(140, 'Rafal', 'Kowalczyk', 'rafalyk@gmail.com', 'DQ(OF3r3', '1717 Cedar Road', '+44 28 1717 1818', '1990-05-22', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-10-12', 'Belfast', 'USER'),
(141, 'Aisling', 'Creed', 'aisling.creed@turnpike.com', '80FP6evRx#', '1818 Elm Road', '+353 1 1818 1919', '1986-02-19', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-04-09', 'Dublin', 'USER'),
(142, 'Arkadiy', 'Sokolov', 'arkadiy_sokolov@gmail.com', 'cMzB&yv7', '1919 Oak Lane', '+353 21 1919 2020', '1983-05-06', 'Debit Card', 'Large', 'Gold', 'SMS', '2023-03-21', 'Cork', 'USER'),
(143, 'Eilish', 'Ní Dhonnabháin', 'eilish.nidhonnabha@gmail.com', 'YfMlF8*p5', '2020 Pine Avenue', '+353 61 2020 2121', '1989-08-01', 'Credit Card', 'Small', 'Platinum', 'Email', '2023-06-22', 'Limerick', 'USER'),
(144, 'Pavel', 'Ivanov', 'pavel.ivanov@gmail.com', 'jLT!mCpTQt', '2121 Cedar Road', '+353 91 2121 2222', '1985-12-12', 'Debit Card', 'Medium', 'Gold', 'Email', '2022-11-28', 'Galway', 'USER'),
(145, 'Olga', 'Semenova', 'olgasem2023@gmail.com', '%2(uTcKz', '2222 Elm Lane', '+44 28 2222 2323', '1991-07-07', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2023-04-28', 'Belfast', 'USER'),
(146, 'Katarzyna', 'Wójcik', 'katarzyna.wojcik@gmail.com', 'fSASRebO', '2323 Cedar Lane', '+353 1 2323 2424', '1987-03-14', 'Credit Card', 'Medium', 'Silver', 'Email', '2023-02-02', 'Dublin', 'USER'),
(147, 'Padraig', 'Ó Súilleabháin', 'padraig.osuilleabha@gmail.com', 'dr2A1yTb9', '2424 Elm Road', '+353 21 2424 2525', '1990-08-18', 'Debit Card', 'Small', 'Gold', 'SMS', '2023-09-04', 'Cork', 'USER'),
(148, 'Nina', 'Sokolova', 'nina.sokolova@tus.ie', '^I1ar#vhS', '2525 Oak Avenue', '+353 61 2525 2626', '1986-01-23', 'Credit Card', 'Large', 'Platinum', 'Email', '2023-04-25', 'Limerick', 'USER'),
(149, 'Séan', 'Ó Raghallaigh', 'sean.oraghallaig@gmit.ie', '0r5OpVz4', '2626 Pine Lane', '+353 91 2626 2727', '1983-11-11', 'Debit Card', 'Medium', 'Gold', 'Email', '2023-09-29', 'Galway', 'USER'),
(150, 'Natalia', 'Kowalczyk', 'natalia.kowalczyk@qub.co.uk', 'w&z0kV-dY', '2727 Cedar Road', '+44 28 2727 2828', '1989-07-26', 'Credit Card', 'Medium', 'Bronze', 'SMS', '2022-12-24', 'Belfast', 'USER'),
(151, 'Ciarán', 'Ó Néill', 'coneill88@gmail.com', 'c*rH0VU', '2828 Elm Road', '+353 1 2828 2929', '1988-06-05', 'Credit Card', 'Medium', 'Silver', 'Email', '2022-11-12', 'Dublin', 'USER'),
(152, 'Svitlana', 'Ivanenko', 'sviivan@gmail.com', 'fLh!$(J6', '2929 Oak Lane', '+353 21 2929 3030', '1985-02-20', 'Debit Card', 'Large', 'Gold', 'SMS', '2023-08-01', 'Cork', 'USER'),
(153, 'marius', 'constantin', 'marius.c49@yahoo.com', '$2a$10$dBB8JnyxvvVL5SRbNZnGOOJE70ZbT.OxZS2Qd/BjSVhjsohXvcXD6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-20', NULL, 'USER');

-- --------------------------------------------------------

--
-- Table structure for table `db_metadata`
--

CREATE TABLE `db_metadata` (
  `id` int(11) NOT NULL,
  `notice` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_metadata`
--

INSERT INTO `db_metadata` (`id`, `notice`, `created_at`) VALUES
(1, 'This database is proprietary. Do not use or distribute without permission from alan.ryan@tus.ie', '2025-10-18 09:08:23'),
(2, 'This database is intended solely for use by students enrolled in the B.Sc. in Software Development (Year 3) and the B.Sc. In Mobile and Web Development (Year 3) for the purpose of coursework related to Applications Programming and Concurrent Programming.', '2025-10-18 12:51:19');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity_in_stock` int(11) DEFAULT NULL,
  `quantity_reserved` int(11) DEFAULT NULL,
  `reorder_point` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `product_id`, `quantity_in_stock`, `quantity_reserved`, `reorder_point`, `supplier_id`) VALUES
(1, 1, 5, 10, 20, 1),
(2, 2, 75, 5, 15, 2),
(3, 3, 50, 5, 10, 3),
(4, 4, 120, 15, 25, 4),
(5, 5, 80, 10, 20, 5),
(6, 6, 9, 10, 15, 6),
(7, 7, 2, 5, 10, 7),
(8, 8, 110, 10, 20, 8),
(9, 9, 60, 5, 15, 9),
(10, 10, 100, 10, 20, 10),
(11, 11, 75, 5, 15, 11),
(12, 12, 6, 5, 10, 12),
(13, 13, 120, 15, 25, 13),
(14, 14, 80, 10, 20, 14),
(15, 15, 90, 10, 15, 15),
(16, 16, 70, 5, 10, 16),
(17, 17, 110, 10, 20, 17),
(18, 18, 60, 5, 15, 18),
(19, 19, 100, 10, 20, 19),
(20, 20, 75, 5, 15, 20),
(21, 21, 100, 10, 20, 1),
(22, 22, 75, 5, 15, 2),
(23, 23, 50, 5, 10, 3),
(24, 24, 120, 15, 25, 4),
(25, 25, 80, 10, 20, 5),
(26, 26, 90, 10, 15, 6),
(27, 27, 70, 5, 10, 7),
(28, 28, 110, 10, 20, 8),
(29, 29, 60, 5, 15, 9),
(30, 30, 100, 10, 20, 10),
(31, 31, 75, 5, 15, 11),
(32, 32, 50, 5, 10, 12),
(33, 33, 120, 15, 25, 13),
(34, 34, 80, 10, 20, 14),
(35, 35, 90, 10, 15, 15),
(36, 36, 70, 5, 10, 16),
(37, 37, 110, 10, 20, 17),
(38, 38, 60, 5, 15, 18),
(39, 39, 100, 10, 20, 19),
(40, 40, 75, 5, 15, 20),
(41, 41, 100, 10, 20, 1),
(42, 42, 75, 5, 15, 2),
(43, 43, 50, 5, 10, 3),
(44, 44, 120, 15, 25, 4),
(45, 45, 80, 10, 20, 5),
(46, 46, 90, 10, 15, 6),
(47, 47, 70, 5, 10, 7),
(48, 48, 110, 10, 20, 8),
(49, 49, 60, 5, 15, 9),
(50, 50, 100, 10, 20, 10),
(51, 51, 100, 10, 20, 11),
(52, 52, 75, 5, 15, 12),
(53, 53, 50, 5, 10, 13),
(54, 54, 120, 15, 25, 14),
(55, 55, 80, 10, 20, 15),
(56, 56, 90, 10, 15, 16),
(57, 57, 70, 5, 10, 17),
(58, 58, 110, 10, 20, 18),
(59, 17, 85, 0, 13, 19),
(60, 54, 38, 0, 5, 15),
(61, 45, 24, 0, 16, 13),
(62, 53, 38, 5, 13, 2),
(63, 2, 79, 2, 9, 7),
(64, 5, 93, 6, 10, 18),
(65, 51, 16, 8, 6, 19),
(66, 14, 19, 2, 16, 18),
(67, 50, 90, 3, 5, 8),
(68, 33, 55, 3, 14, 4),
(69, 48, 63, 1, 19, 1),
(70, 1, 24, 8, 8, 13),
(71, 30, 28, 2, 14, 14),
(72, 30, 50, 5, 16, 1),
(73, 58, 16, 1, 18, 4),
(74, 37, 57, 2, 8, 5),
(75, 1, 18, 1, 10, 18),
(76, 18, 57, 0, 9, 12),
(77, 15, 16, 3, 5, 13),
(78, 39, 15, 5, 14, 13),
(79, 51, 92, 1, 19, 2),
(80, 54, 68, 5, 11, 18),
(81, 34, 64, 8, 19, 20),
(82, 32, 73, 9, 8, 16),
(83, 35, 69, 9, 9, 19),
(84, 33, 73, 3, 17, 16),
(85, 28, 37, 8, 7, 11);

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `item_price` decimal(38,2) DEFAULT NULL,
  `subtotal` decimal(38,2) DEFAULT NULL,
  `item_weight` decimal(38,2) DEFAULT NULL,
  `customisation_options` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`order_item_id`, `order_id`, `product_id`, `quantity`, `item_price`, `subtotal`, `item_weight`, `customisation_options`) VALUES
(1, 1, 1, 2, 29.99, 59.98, 1.50, 'Color: Blue, Size: M'),
(2, 1, 3, 1, 49.99, 49.99, 1.00, 'Size: L'),
(3, 2, 5, 3, 19.99, 59.97, 1.20, 'Color: Green, Size: S'),
(4, 3, 2, 1, 39.99, 39.99, 1.00, 'Size: XL'),
(5, 4, 7, 2, 79.99, 159.98, 2.00, 'Size: M'),
(6, 4, 8, 1, 59.99, 59.99, 1.50, 'Color: Red, Size: S'),
(7, 5, 4, 1, 34.99, 34.99, 0.80, 'Color: Black, Size: M'),
(8, 5, 9, 2, 24.99, 49.98, 1.00, 'Size: S'),
(9, 5, 10, 1, 64.99, 64.99, 1.20, 'Color: White, Size: L'),
(10, 6, 6, 2, 44.99, 89.98, 1.50, 'Size: XL'),
(11, 7, 3, 1, 49.99, 49.99, 1.00, 'Color: Blue, Size: S'),
(12, 8, 7, 2, 79.99, 159.98, 1.80, 'Color: Green, Size: M'),
(13, 9, 8, 1, 59.99, 59.99, 1.20, 'Size: L'),
(14, 10, 1, 2, 29.99, 59.98, 1.50, 'Color: Red, Size: M'),
(15, 10, 4, 1, 34.99, 34.99, 0.80, 'Size: S'),
(16, 11, 10, 1, 64.99, 64.99, 1.00, 'Color: Black, Size: XL'),
(17, 12, 5, 3, 19.99, 59.97, 1.20, 'Size: M'),
(18, 13, 2, 1, 39.99, 39.99, 1.00, 'Color: White, Size: S'),
(19, 14, 9, 2, 24.99, 49.98, 1.50, 'Color: Blue, Size: L'),
(20, 14, 6, 1, 44.99, 44.99, 1.20, 'Size: S'),
(21, 15, 8, 1, 59.99, 59.99, 1.50, 'Color: Blue, Size: M'),
(22, 15, 7, 2, 79.99, 159.98, 1.80, 'Size: S'),
(23, 16, 3, 1, 49.99, 49.99, 1.00, 'Color: Red, Size: L'),
(24, 17, 2, 2, 79.98, 159.96, 1.80, 'Color: Green, Size: M'),
(25, 17, 6, 1, 44.99, 44.99, 1.20, 'Size: XL'),
(26, 18, 1, 1, 29.99, 29.99, 1.00, 'Color: White, Size: S'),
(27, 18, 4, 2, 69.98, 139.96, 1.80, 'Size: M'),
(28, 19, 10, 3, 194.97, 584.91, 2.40, 'Color: Blue, Size: L'),
(29, 20, 5, 1, 19.99, 19.99, 1.00, 'Size: S'),
(30, 20, 8, 2, 119.98, 239.96, 2.20, 'Color: Red, Size: XL'),
(31, 21, 7, 1, 59.99, 59.99, 1.50, 'Color: Black, Size: M'),
(32, 21, 6, 2, 89.98, 179.96, 2.00, 'Size: S'),
(33, 21, 9, 1, 24.99, 24.99, 1.00, 'Color: White, Size: L'),
(34, 22, 3, 2, 99.98, 199.96, 2.00, 'Color: Green, Size: S'),
(35, 22, 2, 1, 39.99, 39.99, 1.00, 'Size: M'),
(36, 23, 5, 1, 19.99, 19.99, 1.00, 'Size: L'),
(37, 24, 8, 2, 119.98, 239.96, 2.20, 'Color: Red, Size: M'),
(38, 25, 10, 1, 64.99, 64.99, 1.20, 'Size: S'),
(39, 26, 1, 1, 29.99, 29.99, 1.00, 'Color: Blue, Size: L'),
(40, 27, 2, 2, 79.98, 159.96, 1.80, 'Color: White, Size: S'),
(41, 27, 6, 1, 44.99, 44.99, 1.20, 'Size: XL'),
(42, 28, 7, 1, 59.99, 59.99, 1.50, 'Color: Green, Size: M'),
(43, 29, 3, 2, 99.98, 199.96, 2.00, 'Size: S'),
(44, 30, 2, 1, 39.99, 39.99, 1.00, 'Color: Blue, Size: M'),
(45, 31, 10, 1, 64.99, 64.99, 1.20, 'Color: Red, Size: L'),
(46, 32, 5, 1, 19.99, 19.99, 1.00, 'Size: S'),
(47, 33, 8, 2, 119.98, 239.96, 2.20, 'Color: White, Size: M'),
(48, 34, 7, 1, 59.99, 59.99, 1.50, 'Size: L'),
(49, 35, 3, 2, 99.98, 199.96, 2.00, 'Color: Green, Size: XL'),
(50, 36, 2, 1, 29.99, 29.99, 1.00, 'Size: M'),
(51, 37, 5, 1, 19.99, 19.99, 1.00, 'Size: XL'),
(52, 37, 8, 2, 119.98, 239.96, 2.20, 'Color: Blue, Size: S'),
(53, 38, 3, 2, 99.98, 199.96, 2.00, 'Size: L'),
(54, 39, 2, 1, 39.99, 39.99, 1.00, 'Color: Green, Size: S'),
(55, 40, 7, 1, 59.99, 59.99, 1.50, 'Size: M'),
(56, 41, 6, 2, 89.98, 179.96, 2.00, 'Color: Red, Size: XL'),
(57, 42, 1, 1, 29.99, 29.99, 1.00, 'Size: S'),
(58, 43, 4, 2, 69.98, 139.96, 1.80, 'Color: White, Size: M'),
(59, 44, 10, 3, 194.97, 584.91, 2.40, 'Size: L'),
(60, 45, 5, 1, 19.99, 19.99, 1.00, 'Color: Blue, Size: XL'),
(61, 45, 8, 2, 119.98, 239.96, 2.20, 'Size: S'),
(62, 46, 7, 1, 59.99, 59.99, 1.50, 'Color: Red, Size: M'),
(63, 47, 6, 2, 89.98, 179.96, 2.00, 'Size: L'),
(64, 48, 9, 1, 24.99, 24.99, 1.00, 'Color: Black, Size: XL'),
(65, 49, 3, 2, 99.98, 199.96, 2.00, 'Size: S'),
(66, 50, 2, 1, 39.99, 39.99, 1.00, 'Color: Blue, Size: M'),
(67, 51, 10, 1, 64.99, 64.99, 1.20, 'Size: S'),
(68, 52, 5, 1, 19.99, 19.99, 1.00, 'Color: Red, Size: L'),
(69, 53, 8, 2, 119.98, 239.96, 2.20, 'Size: M'),
(70, 54, 7, 1, 59.99, 59.99, 1.50, 'Color: Green, Size: L'),
(71, 55, 3, 2, 99.98, 199.96, 2.00, 'Size: XL'),
(72, 56, 2, 1, 39.99, 39.99, 1.00, 'Color: White, Size: S'),
(73, 57, 7, 1, 59.99, 59.99, 1.50, 'Size: M'),
(74, 58, 6, 2, 89.98, 179.96, 2.00, 'Color: Blue, Size: L'),
(75, 59, 1, 1, 29.99, 29.99, 1.00, 'Size: S'),
(76, 60, 4, 2, 69.98, 139.96, 1.80, 'Color: Green, Size: M'),
(77, 61, 10, 3, 194.97, 584.91, 2.40, 'Size: L'),
(78, 62, 5, 1, 19.99, 19.99, 1.00, 'Color: Red, Size: XL'),
(79, 63, 8, 2, 119.98, 239.96, 2.20, 'Size: S'),
(80, 64, 7, 1, 59.99, 59.99, 1.50, 'Color: Black, Size: M'),
(81, 65, 6, 2, 89.98, 179.96, 2.00, 'Size: XL'),
(82, 66, 1, 1, 29.99, 29.99, 1.00, 'Size: S'),
(83, 67, 3, 2, 99.98, 199.96, 2.00, 'Color: Blue, Size: M'),
(84, 68, 2, 1, 39.99, 39.99, 1.00, 'Color: Red, Size: S'),
(85, 69, 5, 1, 19.99, 19.99, 1.00, 'Size: L'),
(86, 70, 8, 2, 119.98, 239.96, 2.20, 'Color: Black, Size: XL'),
(87, 71, 7, 1, 59.99, 59.99, 1.50, 'Size: M'),
(88, 72, 6, 2, 89.98, 179.96, 2.00, 'Size: S'),
(89, 73, 9, 1, 24.99, 24.99, 1.00, 'Color: Green, Size: L'),
(90, 74, 3, 2, 99.98, 199.96, 2.00, 'Size: XL'),
(91, 75, 2, 1, 39.99, 39.99, 1.00, 'Size: M'),
(92, 76, 7, 1, 59.99, 59.99, 1.50, 'Color: White, Size: L'),
(93, 77, 6, 2, 89.98, 179.96, 2.00, 'Size: L'),
(94, 78, 1, 1, 29.99, 29.99, 1.00, 'Color: Red, Size: M'),
(95, 79, 3, 2, 99.98, 199.96, 2.00, 'Size: S'),
(96, 80, 8, 2, 119.98, 239.96, 2.20, 'Color: Black, Size: XL'),
(97, 81, 7, 1, 59.99, 59.99, 1.50, 'Size: S'),
(98, 82, 6, 2, 89.98, 179.96, 2.00, 'Color: Blue, Size: L'),
(99, 83, 1, 1, 29.99, 29.99, 1.00, 'Size: S'),
(100, 84, 4, 2, 69.98, 139.96, 1.80, 'Color: Red, Size: XL'),
(101, 85, 5, 1, 19.99, 19.99, 1.00, 'Color: Green, Size: M'),
(102, 86, 8, 2, 119.98, 239.96, 2.20, 'Size: L'),
(103, 87, 7, 1, 59.99, 59.99, 1.50, 'Size: M'),
(104, 88, 6, 2, 89.98, 179.96, 2.00, 'Size: XL'),
(105, 89, 2, 1, 39.99, 39.99, 1.00, 'Color: White, Size: S'),
(106, 90, 10, 3, 194.97, 584.91, 2.40, 'Color: Blue, Size: S'),
(107, 91, 5, 1, 19.99, 19.99, 1.00, 'Size: M'),
(108, 92, 8, 2, 119.98, 239.96, 2.20, 'Size: XL'),
(109, 93, 7, 1, 59.99, 59.99, 1.50, 'Size: L'),
(110, 94, 6, 2, 89.98, 179.96, 2.00, 'Size: S'),
(111, 95, 3, 2, 99.98, 199.96, 2.00, 'Color: Blue, Size: M'),
(112, 96, 2, 1, 39.99, 39.99, 1.00, 'Size: XL'),
(113, 97, 8, 2, 119.98, 239.96, 2.20, 'Color: Green, Size: S'),
(114, 98, 7, 1, 59.99, 59.99, 1.50, 'Size: S'),
(115, 99, 6, 2, 89.98, 179.96, 2.00, 'Color: Red, Size: L'),
(116, 100, 1, 1, 29.99, 29.99, 1.00, 'Size: M'),
(117, 101, 4, 2, 69.98, 139.96, 1.80, 'Color: Blue, Size: S'),
(118, 102, 10, 3, 194.97, 584.91, 2.40, 'Size: XL'),
(119, 103, 5, 1, 19.99, 19.99, 1.00, 'Size: L'),
(120, 104, 8, 2, 119.98, 239.96, 2.20, 'Color: White, Size: M'),
(121, 105, 5, 1, 19.99, 19.99, 1.00, 'Color: Black, Size: S'),
(122, 106, 8, 2, 119.98, 239.96, 2.20, 'Size: M'),
(123, 107, 7, 1, 59.99, 59.99, 1.50, 'Size: XL'),
(124, 108, 6, 2, 89.98, 179.96, 2.00, 'Color: Green, Size: L'),
(125, 109, 1, 1, 29.99, 29.99, 1.00, 'Size: S'),
(126, 110, 4, 2, 69.98, 139.96, 1.80, 'Color: Red, Size: M'),
(127, 111, 10, 3, 194.97, 584.91, 2.40, 'Size: S'),
(128, 112, 5, 1, 19.99, 19.99, 1.00, 'Color: Blue, Size: XL'),
(129, 113, 8, 2, 119.98, 239.96, 2.20, 'Size: L'),
(130, 114, 7, 1, 59.99, 59.99, 1.50, 'Color: White, Size: M'),
(131, 115, 6, 2, 89.98, 179.96, 2.00, 'Size: XL'),
(132, 116, 1, 1, 29.99, 29.99, 1.00, 'Size: M'),
(133, 117, 4, 2, 69.98, 139.96, 1.80, 'Color: Black, Size: S'),
(134, 118, 10, 3, 194.97, 584.91, 2.40, 'Size: L'),
(135, 119, 5, 1, 19.99, 19.99, 1.00, 'Color: Green, Size: S'),
(136, 120, 8, 2, 119.98, 239.96, 2.20, 'Size: S'),
(137, 121, 7, 1, 59.99, 59.99, 1.50, 'Color: Red, Size: XL'),
(138, 122, 6, 2, 89.98, 179.96, 2.00, 'Size: S'),
(139, 123, 1, 1, 29.99, 29.99, 1.00, 'Color: Blue, Size: L'),
(140, 124, 4, 2, 69.98, 139.96, 1.80, 'Size: XL'),
(141, 125, 7, 1, 59.99, 59.99, 1.50, 'Size: M'),
(142, 126, 6, 2, 89.98, 179.96, 2.00, 'Color: Green, Size: L'),
(143, 127, 1, 1, 29.99, 29.99, 1.00, 'Size: S'),
(144, 128, 4, 2, 69.98, 139.96, 1.80, 'Color: Red, Size: M'),
(145, 129, 10, 3, 194.97, 584.91, 2.40, 'Size: S'),
(146, 130, 5, 1, 19.99, 19.99, 1.00, 'Color: Blue, Size: XL'),
(147, 131, 8, 2, 119.98, 239.96, 2.20, 'Size: L'),
(148, 132, 7, 1, 59.99, 59.99, 1.50, 'Color: White, Size: M'),
(149, 133, 6, 2, 89.98, 179.96, 2.00, 'Size: XL'),
(150, 134, 1, 1, 29.99, 29.99, 1.00, 'Size: M'),
(151, 135, 4, 2, 69.98, 139.96, 1.80, 'Color: Black, Size: S'),
(152, 136, 10, 3, 194.97, 584.91, 2.40, 'Size: L'),
(153, 137, 5, 1, 19.99, 19.99, 1.00, 'Color: Green, Size: S'),
(154, 138, 8, 2, 119.98, 239.96, 2.20, 'Size: S'),
(155, 139, 7, 1, 59.99, 59.99, 1.50, 'Color: Red, Size: XL'),
(156, 140, 6, 2, 89.98, 179.96, 2.00, 'Size: S'),
(157, 141, 1, 1, 29.99, 29.99, 1.00, 'Color: Blue, Size: L'),
(158, 142, 4, 2, 69.98, 139.96, 1.80, 'Size: XL'),
(159, 143, 5, 1, 19.99, 19.99, 1.00, 'Color: White, Size: S'),
(160, 144, 8, 2, 119.98, 239.96, 2.20, 'Size: M'),
(161, 145, 7, 1, 59.99, 59.99, 1.50, 'Size: XL'),
(162, 146, 6, 2, 89.98, 179.96, 2.00, 'Color: Blue, Size: S'),
(163, 147, 1, 1, 29.99, 29.99, 1.00, 'Size: M'),
(164, 148, 4, 2, 69.98, 139.96, 1.80, 'Color: Green, Size: L'),
(165, 149, 10, 3, 194.97, 584.91, 2.40, 'Size: S'),
(166, 150, 5, 1, 19.99, 19.99, 1.00, 'Color: Red, Size: XL'),
(167, 151, 8, 2, 119.98, 239.96, 2.20, 'Size: S'),
(168, 152, 7, 1, 59.99, 59.99, 1.50, 'Color: Black, Size: M'),
(169, 153, 6, 2, 89.98, 179.96, 2.00, 'Size: XL'),
(170, 154, 1, 1, 29.99, 29.99, 1.00, 'Size: S'),
(171, 155, 4, 2, 69.98, 139.96, 1.80, 'Color: White, Size: L'),
(172, 156, 10, 3, 194.97, 584.91, 2.40, 'Size: L'),
(173, 157, 5, 1, 19.99, 19.99, 1.00, 'Color: Blue, Size: M'),
(174, 158, 8, 2, 119.98, 239.96, 2.20, 'Size: XL'),
(175, 159, 7, 1, 59.99, 59.99, 1.50, 'Size: S'),
(176, 160, 6, 2, 89.98, 179.96, 2.00, 'Color: Green, Size: S'),
(177, 161, 1, 1, 29.99, 29.99, 1.00, 'Size: L'),
(178, 162, 4, 2, 69.98, 139.96, 1.80, 'Color: Red, Size: XL'),
(179, 163, 5, 1, 19.99, 19.99, 1.00, 'Color: Black, Size: XL'),
(180, 164, 8, 2, 119.98, 239.96, 2.20, 'Size: S'),
(181, 165, 7, 1, 59.99, 59.99, 1.50, 'Color: White, Size: M'),
(182, 166, 6, 2, 89.98, 179.96, 2.00, 'Size: S'),
(183, 167, 1, 1, 29.99, 29.99, 1.00, 'Color: Blue, Size: L');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `total_amount` decimal(38,2) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `shipping_method` varchar(255) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `order_date`, `total_amount`, `order_status`, `payment_method`, `shipping_method`, `delivery_date`) VALUES
(1, 1, '2023-06-01', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-06-10'),
(2, 3, '2023-06-02', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-06-09'),
(3, 5, '2023-06-03', 54.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(4, 2, '2023-06-04', 99.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-06-11'),
(5, 4, '2023-06-05', 39.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-06-08'),
(6, 7, '2023-06-06', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(7, 6, '2023-06-07', 149.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-06-12'),
(8, 8, '2023-06-08', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-06-07'),
(9, 10, '2023-06-09', 64.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(10, 9, '2023-06-10', 119.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-06-13'),
(11, 12, '2023-06-11', 69.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-06-18'),
(12, 14, '2023-06-12', 129.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-06-17'),
(13, 15, '2023-06-13', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(14, 11, '2023-06-14', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-06-19'),
(15, 13, '2023-06-15', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-06-16'),
(16, 16, '2023-06-16', 64.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(17, 19, '2023-06-17', 119.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-06-20'),
(18, 20, '2023-06-18', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-06-15'),
(19, 17, '2023-06-19', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(20, 18, '2023-06-20', 94.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-06-21'),
(21, 6, '2023-06-21', 59.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-06-28'),
(22, 10, '2023-06-22', 144.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-06-27'),
(23, 9, '2023-06-23', 44.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(24, 7, '2023-06-24', 84.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-06-29'),
(25, 11, '2023-06-25', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-06-26'),
(26, 13, '2023-06-26', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(27, 15, '2023-06-27', 139.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-06-30'),
(28, 8, '2023-06-28', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-06-25'),
(29, 12, '2023-06-29', 69.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(30, 16, '2023-06-30', 104.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-07-01'),
(31, 19, '2023-07-01', 54.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-07-08'),
(32, 17, '2023-07-02', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-07-07'),
(33, 20, '2023-07-03', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(34, 6, '2023-07-04', 79.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-07-09'),
(35, 8, '2023-07-05', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-07-06'),
(36, 9, '2023-07-06', 69.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(37, 12, '2023-07-07', 129.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-07-10'),
(38, 10, '2023-07-08', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-07-05'),
(39, 15, '2023-07-09', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(40, 11, '2023-07-10', 99.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-07-11'),
(41, 3, '2023-07-11', 59.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-07-18'),
(42, 5, '2023-07-12', 134.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-07-17'),
(43, 12, '2023-07-13', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(44, 7, '2023-07-14', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-07-19'),
(45, 9, '2023-07-15', 39.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-07-16'),
(46, 11, '2023-07-16', 79.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(47, 6, '2023-07-17', 119.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-07-20'),
(48, 10, '2023-07-18', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-07-15'),
(49, 8, '2023-07-19', 64.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(50, 13, '2023-07-20', 99.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-07-21'),
(51, 14, '2023-07-21', 54.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-07-28'),
(52, 19, '2023-07-22', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-07-27'),
(53, 20, '2023-07-23', 59.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(54, 2, '2023-07-24', 69.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-07-29'),
(55, 4, '2023-07-25', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-07-26'),
(56, 16, '2023-07-26', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(57, 18, '2023-07-27', 134.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-07-30'),
(58, 1, '2023-07-28', 59.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-04'),
(59, 3, '2023-07-29', 129.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-08-03'),
(60, 5, '2023-07-30', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(61, 130, '2023-08-01', 69.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-08'),
(62, 70, '2023-08-02', 144.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-08-07'),
(63, 44, '2023-08-03', 44.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(64, 87, '2023-08-04', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-09'),
(65, 52, '2023-08-05', 39.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-08-06'),
(66, 111, '2023-08-06', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(67, 99, '2023-08-07', 129.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-10'),
(68, 22, '2023-08-08', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-08-05'),
(69, 125, '2023-08-09', 64.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(70, 88, '2023-08-10', 94.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-11'),
(71, 33, '2023-08-11', 54.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-18'),
(72, 67, '2023-08-12', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-08-17'),
(73, 45, '2023-08-13', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(74, 21, '2023-08-14', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-19'),
(75, 31, '2023-08-15', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-08-16'),
(76, 41, '2023-08-16', 64.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(77, 132, '2023-08-17', 139.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-20'),
(78, 142, '2023-08-18', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-08-15'),
(79, 68, '2023-08-19', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(80, 86, '2023-08-20', 99.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-21'),
(81, 2, '2023-08-21', 54.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-28'),
(82, 59, '2023-08-22', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-08-27'),
(83, 87, '2023-08-23', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(84, 99, '2023-08-24', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-29'),
(85, 104, '2023-08-25', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-08-26'),
(86, 123, '2023-08-26', 64.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(87, 46, '2023-08-27', 139.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-30'),
(88, 57, '2023-08-28', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-08-25'),
(89, 76, '2023-08-29', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(90, 54, '2023-08-30', 99.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-08-31'),
(91, 14, '2023-09-01', 59.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-09-08'),
(92, 25, '2023-09-02', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-09-07'),
(93, 34, '2023-09-03', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(94, 48, '2023-09-04', 84.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-09-09'),
(95, 49, '2023-09-05', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-09-06'),
(96, 50, '2023-09-06', 64.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(97, 82, '2023-09-07', 129.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-09-10'),
(98, 36, '2023-09-08', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-09-05'),
(99, 29, '2023-09-09', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(100, 65, '2023-09-10', 99.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-09-11'),
(101, 73, '2023-09-11', 54.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-09-18'),
(102, 85, '2023-09-12', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-09-17'),
(103, 38, '2023-09-13', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(104, 78, '2023-09-14', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-09-19'),
(105, 110, '2023-09-15', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-09-16'),
(106, 137, '2023-09-16', 64.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(107, 91, '2023-09-17', 139.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-09-20'),
(108, 102, '2023-09-18', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-09-15'),
(109, 49, '2023-09-19', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(110, 61, '2023-09-20', 104.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-09-21'),
(111, 37, '2023-10-01', 54.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-10-08'),
(112, 40, '2023-10-02', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-10-07'),
(113, 69, '2023-10-03', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(114, 111, '2023-10-04', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-10-09'),
(115, 135, '2023-10-05', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-10-06'),
(116, 116, '2023-10-06', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(117, 119, '2023-10-07', 129.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-10-10'),
(118, 129, '2023-10-08', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-10-05'),
(119, 134, '2023-10-09', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(120, 98, '2023-10-10', 99.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-10-11'),
(121, 56, '2023-10-11', 54.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-10-18'),
(122, 91, '2023-10-12', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-10-17'),
(123, 48, '2023-10-13', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(124, 81, '2023-10-14', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-10-19'),
(125, 100, '2023-10-15', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-10-16'),
(126, 102, '2023-10-16', 64.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(127, 76, '2023-10-17', 139.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-10-20'),
(128, 58, '2023-10-18', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-10-15'),
(129, 118, '2023-10-19', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(130, 84, '2023-10-20', 104.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-10-21'),
(131, 51, '2023-11-01', 54.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-11-08'),
(132, 115, '2023-11-02', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-11-07'),
(133, 39, '2023-11-03', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(134, 100, '2023-11-04', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-11-09'),
(135, 138, '2023-11-05', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-11-06'),
(136, 132, '2023-11-06', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(137, 127, '2023-11-07', 129.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-11-10'),
(138, 90, '2023-11-08', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-11-05'),
(139, 64, '2023-11-09', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(140, 139, '2023-11-10', 99.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-11-11'),
(141, 59, '2023-11-11', 54.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-11-18'),
(142, 128, '2023-11-12', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-11-17'),
(143, 111, '2023-11-13', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(144, 76, '2023-11-14', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-11-19'),
(145, 114, '2023-11-15', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-11-16'),
(146, 125, '2023-11-16', 64.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(147, 109, '2023-11-17', 139.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-11-20'),
(148, 137, '2023-11-18', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-11-15'),
(149, 117, '2023-11-19', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(150, 125, '2023-11-20', 104.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-11-21'),
(151, 3, '2023-12-01', 54.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-12-08'),
(152, 76, '2023-12-02', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-12-07'),
(153, 112, '2023-12-03', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(154, 20, '2023-12-04', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-12-09'),
(155, 98, '2023-12-05', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-12-06'),
(156, 7, '2023-12-06', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(157, 145, '2023-12-07', 129.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-12-10'),
(158, 6, '2023-12-08', 34.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-12-05'),
(159, 122, '2023-12-09', 74.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(160, 105, '2023-12-10', 99.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-12-11'),
(161, 135, '2023-12-11', 54.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-12-18'),
(162, 50, '2023-12-12', 124.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-12-17'),
(163, 95, '2023-12-13', 49.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(164, 75, '2023-12-14', 89.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-12-19'),
(165, 150, '2023-12-15', 29.99, 'Delivered', 'PayPal', 'Express Shipping', '2023-12-16'),
(166, 139, '2023-12-16', 64.99, 'Processing', 'Credit Card', 'Standard Shipping', NULL),
(167, 58, '2023-12-17', 139.99, 'Shipped', 'Credit Card', 'Standard Shipping', '2023-12-20');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `description` tinytext DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `colour` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `sustainability_rating` int(11) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `discounted_price` decimal(38,2) DEFAULT NULL,
  `feature_image` varchar(255) NOT NULL,
  `supplier_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `description`, `category_id`, `price`, `size`, `colour`, `material`, `sustainability_rating`, `manufacturer`, `release_date`, `discounted_price`, `feature_image`, `supplier_Id`) VALUES
(1, 'Organic Cotton Men\'s T-Shirt', 'A comfortable and sustainable organic cotton t-shirt for men.', 5, 28.99, 'M', 'White', 'Organic Cotton', 4, 'EcoWear', '2025-11-01', 25.99, '1_1.png', 11),
(2, 'Recycled Denim Jeans', 'Stylish jeans made from recycled denim material.', 6, 79.99, '32x34', 'Blue', 'Recycled Denim', 5, 'GreenFashion', '2025-09-15', 69.99, '2_1.png', 14),
(3, 'Women\'s Eco-Friendly Dress', 'A beautiful and eco-friendly dress for women made from sustainable materials.', 7, 59.99, 'S', 'Green', 'Sustainable Fabric', 4, 'SustainStyle', '2025-11-10', 49.99, '3_1.png', 14),
(4, 'Organic Men\'s Jacket', 'A warm and sustainable jacket for men made from organic materials.', 8, 99.99, 'L', 'Black', 'Organic Cotton', 4, 'EcoWear', '2025-10-20', 89.99, '4_1.png', 6),
(5, 'Recycled Sneakers', 'Stylish sneakers made from recycled materials.', 9, 49.99, 'US 9', 'Gray', 'Recycled Fabric', 5, 'GreenFashion', '2024-02-28', 44.99, '5_1.png', 9),
(6, 'Sustainable Sun Hat', 'A sustainable sun hat made from eco-friendly materials.', 10, 19.99, 'One Size', 'Beige', 'Sustainable Straw', 4, 'SustainStyle', '2023-04-05', 16.99, '6_1.png', 8),
(7, 'Organic Cotton Women\'s T-Shirt', 'A comfortable and sustainable organic cotton t-shirt for women.', 5, 27.99, 'S', 'Pink', 'Organic Cotton', 4, 'EcoWear', '2023-03-03', 22.99, '7_1.png', 12),
(8, 'Recycled Men\'s Jeans', 'Eco-friendly jeans made from recycled denim material.', 6, 55.00, '34x36', 'Dark Blue', 'Recycled Denim', 5, 'GreenFashion', '2025-07-10', 59.99, '8_1.png', 15),
(9, 'Sustainable Women\'s Blouse', 'A stylish and sustainable blouse for women made from eco-friendly materials.', 2, 49.99, 'M', 'White', 'Sustainable Fabric', 4, 'SustainStyle', '2023-03-15', 42.99, '9_1.png', 19),
(10, 'Recycled Men\'s Jacket', 'Warm and eco-friendly jacket made from recycled materials.', 8, 89.99, 'XL', 'Navy', 'Recycled Fabric', 5, 'GreenFashion', '2023-01-25', 79.99, '10_1.png', 11),
(11, 'Bamboo Fiber Men\'s Polo Shirt', 'A comfortable and eco-friendly polo shirt for men made from bamboo fiber.', 1, 39.99, 'L', 'Green', 'Bamboo Fiber', 5, 'EcoStyle', '2023-04-10', 34.99, '11_1.png', 18),
(12, 'Recycled Women\'s Skirt', 'Stylish skirt for women made from recycled materials.', 2, 49.99, 'M', 'Purple', 'Recycled Fabric', 4, 'GreenFashion', '2025-08-20', 44.99, '12_1.png', 14),
(13, 'Organic Hemp Shoes', 'Eco-conscious shoes made from organic hemp material.', 3, 59.99, 'US 8', 'Natural', 'Organic Hemp', 5, 'EcoFootwear', '2023-03-05', 54.99, '13_1.png', 17),
(14, 'Sustainable Men\'s Cardigan', 'A sustainable cardigan for men made from eco-friendly materials.', 1, 69.99, 'XL', 'Navy', 'Sustainable Fabric', 4, 'EcoWear', '2023-02-25', 64.99, '14_1.png', 2),
(15, 'Recycled PET Backpack', 'Eco-conscious backpack made from recycled PET bottles.', 4, 29.99, 'One Size', 'Gray', 'Recycled PET', 5, 'GreenFashion', '2023-04-01', 24.99, '15_1.png', 17),
(16, 'Sustainable Linen Women\'s Pants', 'Comfortable and eco-friendly linen pants for women.', 2, 44.99, 'S', 'Beige', 'Organic Linen', 4, 'EcoStyle', '2023-03-15', 39.99, '16_1.png', 1),
(17, 'Recycled Men\'s Hoodie', 'Stylish hoodie for men made from recycled materials.', 1, 59.99, 'M', 'Gray', 'Recycled Fabric', 5, 'GreenFashion', '2023-03-08', 54.99, '17_1.png', 11),
(18, 'Organic Cotton Women\'s Sweater', 'A cozy and eco-friendly sweater for women made from organic cotton.', 2, 54.99, 'L', 'Blue', 'Organic Cotton', 4, 'EcoWear', '2023-02-28', 49.99, '18_1.png', 11),
(19, 'Bamboo Fiber Men\'s Shorts', 'Comfortable and eco-friendly shorts for men made from bamboo fiber.', 1, 34.99, 'S', 'Black', 'Bamboo Fiber', 5, 'EcoStyle', '2023-03-12', 29.99, 'no-image.png', 2),
(20, 'Recycled Women\'s Sweater', 'Stylish sweater for women made from recycled materials.', 2, 54.99, 'M', 'Gray', 'Recycled Fabric', 4, 'GreenFashion', '2023-03-03', 49.99, 'no-image.png', 19),
(21, 'Recycled PET Women\'s Jacket', 'Stylish jacket for women made from recycled PET bottles.', 8, 79.99, 'S', 'Black', 'Recycled PET', 5, 'GreenFashion', '2023-04-18', 74.99, 'no-image.png', 5),
(22, 'Organic Linen Men\'s Shirt', 'Comfortable and eco-friendly linen shirt for men.', 1, 44.99, 'M', 'White', 'Organic Linen', 4, 'EcoStyle', '2023-04-05', 39.99, 'no-image.png', 11),
(23, 'Sustainable Women\'s Sandals', 'Eco-conscious sandals made from sustainable materials.', 3, 39.99, 'US 7', 'Brown', 'Sustainable Fabric', 4, 'EcoFootwear', '2023-04-25', 34.99, 'no-image.png', 18),
(24, 'Recycled Men\'s Belt', 'Stylish belt for men made from recycled materials.', 4, 19.99, 'One Size', 'Black', 'Recycled Leather', 4, 'GreenFashion', '2023-04-14', 14.99, 'no-image.png', 15),
(25, 'Organic Cotton Women\'s Blouse', 'A sustainable blouse for women made from organic cotton.', 2, 49.99, 'L', 'Red', 'Organic Cotton', 4, 'EcoWear', '2023-04-08', 44.99, 'no-image.png', 3),
(26, 'Recycled Denim Women\'s Jacket', 'Stylish jacket for women made from recycled denim material.', 8, 69.99, 'S', 'Denim Blue', 'Recycled Denim', 5, 'GreenFashion', '2023-04-21', 64.99, 'no-image.png', 8),
(27, 'Sustainable Men\'s Beanie', 'A cozy and eco-friendly beanie for men made from sustainable materials.', 10, 24.99, 'One Size', 'Gray', 'Sustainable Fabric', 4, 'EcoStyle', '2023-04-30', 19.99, 'no-image.png', 9),
(28, 'Organic Linen Women\'s Pants', 'Comfortable and eco-friendly linen pants for women.', 2, 44.99, 'M', 'Beige', 'Organic Linen', 4, 'EcoWear', '2023-04-16', 39.99, 'no-image.png', 1),
(29, 'Bamboo Fiber Women\'s T-Shirt', 'A comfortable and eco-friendly t-shirt for women made from bamboo fiber.', 2, 29.99, 'S', 'Green', 'Bamboo Fiber', 5, 'EcoStyle', '2023-04-11', 24.99, 'no-image.png', 17),
(30, 'Recycled PET Men\'s Backpack', 'Eco-conscious backpack made from recycled PET bottles.', 4, 34.99, 'One Size', 'Gray', 'Recycled PET', 5, 'GreenFashion', '2023-04-09', 29.99, 'no-image.png', 3),
(31, 'Organic Hemp Women\'s Sandals', 'Eco-conscious sandals made from organic hemp material for women.', 3, 39.99, 'US 7', 'Natural', 'Organic Hemp', 5, 'EcoFootwear', '2023-05-10', 34.99, 'no-image.png', 4),
(32, 'Sustainable Men\'s Swim Shorts', 'Comfortable and eco-friendly swim shorts for men.', 1, 29.99, 'M', 'Blue', 'Sustainable Fabric', 4, 'EcoStyle', '2023-05-15', 24.99, 'no-image.png', 10),
(33, 'Recycled PET Women\'s Bag', 'Stylish bag for women made from recycled PET bottles.', 4, 49.99, 'One Size', 'Gray', 'Recycled PET', 5, 'GreenFashion', '2023-05-05', 44.99, 'no-image.png', 17),
(34, 'Organic Linen Men\'s Shorts', 'Comfortable and eco-friendly linen shorts for men.', 1, 34.99, 'L', 'Khaki', 'Organic Linen', 4, 'EcoStyle', '2023-05-18', 29.99, 'no-image.png', 15),
(35, 'Sustainable Women\'s Scarf', 'A cozy and eco-friendly scarf for women made from sustainable materials.', 2, 19.99, 'One Size', 'Green', 'Sustainable Fabric', 4, 'EcoWear', '2023-05-08', 14.99, 'no-image.png', 2),
(36, 'Recycled Men\'s Backpack', 'Eco-conscious backpack made from recycled materials for men.', 4, 39.99, 'One Size', 'Black', 'Recycled Fabric', 5, 'GreenFashion', '2023-05-20', 34.99, 'no-image.png', 7),
(37, 'Bamboo Fiber Women\'s Leggings', 'Comfortable and eco-friendly leggings for women made from bamboo fiber.', 2, 34.99, 'S', 'Gray', 'Bamboo Fiber', 5, 'EcoStyle', '2023-05-10', 29.99, 'no-image.png', 9),
(38, 'Recycled PET Men\'s Hat', 'Eco-conscious hat made from recycled PET bottles for men.', 10, 24.99, 'One Size', 'Navy', 'Recycled PET', 5, 'GreenFashion', '2023-05-25', 19.99, 'no-image.png', 2),
(39, 'Organic Hemp Women\'s T-Shirt', 'A comfortable and eco-friendly t-shirt for women made from organic hemp.', 5, 29.99, 'M', 'Blue', 'Organic Hemp', 5, 'EcoStyle', '2023-05-12', 24.99, 'no-image.png', 3),
(40, 'Sustainable Men\'s Sunglasses', 'Eco-conscious sunglasses made from sustainable materials for men.', 4, 39.99, 'One Size', 'Brown', 'Sustainable Plastic', 5, 'GreenFashion', '2023-05-30', 34.99, 'no-image.png', 8),
(41, 'Organic Cotton Men\'s Chinos', 'Stylish and eco-friendly chinos for men made from organic cotton.', 1, 49.99, '32x32', 'Olive', 'Organic Cotton', 4, 'EcoStyle', '2023-06-05', 44.99, 'no-image.png', 9),
(42, 'Recycled PET Women\'s Backpack', 'Eco-conscious backpack made from recycled PET bottles for women.', 4, 44.99, 'One Size', 'Teal', 'Recycled PET', 5, 'GreenFashion', '2023-06-10', 39.99, 'no-image.png', 4),
(43, 'Sustainable Men\'s Button-Up Shirt', 'A comfortable and eco-friendly button-up shirt for men made from sustainable materials.', 1, 39.99, 'M', 'Navy', 'Sustainable Fabric', 4, 'EcoStyle', '2023-06-15', 34.99, 'no-image.png', 9),
(44, 'Recycled Women\'s Backpack', 'Eco-conscious backpack made from recycled materials for women.', 4, 44.99, 'One Size', 'Gray', 'Recycled Fabric', 5, 'GreenFashion', '2023-06-20', 39.99, 'no-image.png', 15),
(45, 'Organic Hemp Men\'s Shorts', 'Comfortable and eco-friendly shorts for men made from organic hemp.', 1, 34.99, 'L', 'Navy', 'Organic Hemp', 4, 'EcoStyle', '2023-06-25', 29.99, 'no-image.png', 6),
(46, 'Sustainable Women\'s Belt', 'Stylish and eco-friendly belt for women made from sustainable materials.', 4, 24.99, 'One Size', 'Brown', 'Sustainable Fabric', 4, 'EcoWear', '2023-06-30', 19.99, 'no-image.png', 4),
(47, 'Recycled Men\'s Trousers', 'Eco-conscious trousers for men made from recycled materials.', 1, 49.99, '34x34', 'Black', 'Recycled Fabric', 5, 'GreenFashion', '2023-07-05', 44.99, 'no-image.png', 2),
(48, 'Bamboo Fiber Women\'s Tank Top', 'A comfortable and eco-friendly tank top for women made from bamboo fiber.', 2, 29.99, 'S', 'Green', 'Bamboo Fiber', 5, 'EcoStyle', '2023-07-10', 24.99, 'no-image.png', 18),
(49, 'Recycled PET Men\'s Sandals', 'Eco-conscious sandals made from recycled PET bottles for men.', 3, 39.99, 'US 10', 'Black', 'Recycled PET', 5, 'EcoFootwear', '2023-07-15', 34.99, 'no-image.png', 3),
(50, 'Organic Linen Women\'s Jumpsuit', 'Stylish and eco-friendly jumpsuit for women made from organic linen.', 2, 59.99, 'M', 'Beige', 'Organic Linen', 4, 'EcoStyle', '2023-07-20', 54.99, 'no-image.png', 20),
(51, 'Recycled Men\'s Blazer', 'Eco-conscious blazer for men made from recycled materials.', 1, 69.99, 'XL', 'Charcoal', 'Recycled Fabric', 5, 'GreenFashion', '2023-07-25', 64.99, 'no-image.png', 12),
(52, 'Sustainable Women\'s Sunglasses', 'Eco-conscious sunglasses made from sustainable materials for women.', 4, 34.99, 'One Size', 'Brown', 'Sustainable Plastic', 5, 'EcoWear', '2023-08-01', 29.99, 'no-image.png', 18),
(53, 'Organic Cotton Men\'s Polo Shirt', 'Stylish and eco-friendly polo shirt for men made from organic cotton.', 1, 39.99, 'L', 'Navy', 'Organic Cotton', 4, 'EcoStyle', '2023-08-05', 34.99, 'no-image.png', 13),
(54, 'Recycled PET Women\'s Hat', 'Eco-conscious hat made from recycled PET bottles for women.', 4, 24.99, 'One Size', 'Pink', 'Recycled PET', 5, 'GreenFashion', '2023-08-10', 19.99, 'no-image.png', 12),
(55, 'Sustainable Men\'s Chinos', 'Comfortable and eco-friendly chinos for men made from sustainable materials.', 1, 49.99, '32x34', 'Olive', 'Sustainable Fabric', 4, 'EcoStyle', '2023-08-15', 44.99, 'no-image.png', 18),
(56, 'Recycled Women\'s Jumpsuit', 'Eco-conscious jumpsuit for women made from recycled materials.', 2, 59.99, 'S', 'Black', 'Recycled Fabric', 5, 'GreenFashion', '2023-08-20', 54.99, 'no-image.png', 16),
(57, 'Organic Cotton Women\'s Leggings', 'Eco-friendly leggings for women made from organic cotton.', 2, 34.99, 'M', 'Black', 'Organic Cotton', 4, 'EcoStyle', '2023-08-25', 29.99, 'no-image.png', 6),
(58, 'Sustainable Men\'s Sneakers', 'Comfortable and eco-friendly sneakers for men made from sustainable materials.', 3, 59.99, 'US 9', 'Gray', 'Sustainable Fabric', 4, 'EcoFootwear', '2023-08-30', 54.99, 'no-image.png', 20);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `review_text` tinytext DEFAULT NULL,
  `review_date` date DEFAULT NULL,
  `flagged_as_spam` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `customer_id`, `product_id`, `rating`, `review_text`, `review_date`, `flagged_as_spam`) VALUES
(1, 1, 23, 5, 'Great product! Excellent quality and eco-friendly materials.', '2023-05-15', 0),
(2, 34, 2, 4, 'I love the sustainability of this clothing. Very comfortable.', '2023-05-16', 0),
(3, 16, 45, 4, 'Good product, but I expected more color choices.', '2023-05-17', 0),
(4, 78, 4, 5, 'Amazing sustainable fashion. I\'m impressed!', '2023-05-18', 0),
(5, 152, 5, 3, 'Decent product, but it could be more affordable.', '2023-05-19', 0),
(6, 152, 41, 5, 'Exceptional quality and eco-friendly. I highly recommend it!', '2023-05-20', 0),
(7, 152, 31, 4, 'Sustainable fashion is the future, and this product shows it.', '2023-05-21', 0),
(8, 2, 8, 4, 'I\'m pleased with my purchase. Great for the environment.', '2023-05-22', 0),
(9, 14, 9, 3, 'Nice product, but the fit is a bit off for me.', '2023-05-23', 0),
(10, 32, 12, 5, 'Top-notch sustainable clothing. Will buy more!', '2023-05-24', 0),
(11, 18, 18, 4, 'Quality materials and a positive eco-impact.', '2023-05-25', 0),
(12, 131, 15, 5, 'Impressive design and commitment to sustainability.', '2023-05-26', 0),
(13, 100, 13, 4, 'Sustainable fashion at its best! Truly comfortable.', '2023-05-27', 0),
(14, 133, 7, 3, 'Good product, but the color isn\'t what I expected.', '2023-05-28', 0),
(15, 12, 15, 5, 'Affordable and eco-friendly. Can\'t ask for more!', '2023-05-29', 0),
(16, 15, 32, 5, 'Sustainable fashion with a great style. Love it!', '2023-05-30', 0),
(17, 12, 17, 4, 'Pleasantly surprised by the quality and sustainability.', '2023-05-31', 0),
(18, 56, 2, 3, 'Good product overall, but sizing can be tricky.', '2023-06-01', 0),
(19, 86, 5, 5, 'Outstanding commitment to the environment. Impressed.', '2023-06-02', 0),
(20, 45, 20, 4, 'Nice product, but could offer more color options.', '2023-06-03', 0),
(21, 116, 45, 5, 'Eco-friendly fashion at its finest. Highly recommended!', '2023-06-04', 0),
(22, 98, 32, 4, 'I appreciate the sustainable choices made in this product.', '2023-06-05', 0),
(23, 1, 34, 5, 'Very comfortable and supports a great cause. Love it!', '2023-06-06', 0),
(24, 4, 34, 3, 'Good, but sizing could be more accurate.', '2023-06-07', 0),
(25, 12, 4, 5, 'Eco-conscious and budget-friendly. Can\'t go wrong!', '2023-06-08', 0),
(26, 26, 26, 4, 'Sustainable materials and a stylish look. Satisfied.', '2023-06-09', 0),
(27, 7, 27, 5, 'Impressive design and eco-friendly. Highly satisfied!', '2023-06-10', 0),
(28, 7, 28, 3, 'Decent product, but the fit isn\'t perfect for me.', '2023-06-11', 0),
(29, 15, 29, 4, 'Great quality and affordable for sustainable fashion.', '2023-06-12', 0),
(30, 19, 30, 5, 'Top-notch eco-conscious fashion. Will buy again!', '2023-06-13', 0),
(31, 1, 31, 5, 'Great product! Excellent quality and eco-friendly materials.', '2023-06-14', 0),
(32, 19, 32, 4, 'I love the sustainability of this clothing. Very comfortable.', '2023-06-15', 0),
(33, 77, 33, 4, 'Good product, but I expected more color choices.', '2023-06-16', 0),
(34, 89, 34, 5, 'Amazing sustainable fashion. I\'m impressed!, And it takes a lot to impress me', '2023-06-17', 0),
(35, 52, 35, 3, 'Decent product, but it could be more affordable. Think of us poor people!!', '2023-06-18', 1),
(36, 123, 36, 5, 'Exceptional quality and eco-friendly. I highly recommend it!', '2023-06-19', 0),
(37, 145, 37, 4, 'Sustainable fashion is the future, and this product shows it.', '2023-06-20', 0),
(38, 8, 38, 3, 'Nice product, but the fit is a bit off for me.', '2023-06-21', 0),
(39, 95, 39, 5, 'Top-notch sustainable clothing. Will buy more!', '2023-06-22', 0),
(40, 110, 40, 4, 'Quality materials and a positive eco-impact.', '2023-06-23', 0),
(41, 32, 41, 5, 'Outstanding commitment to the environment. Impressed.', '2023-06-24', 0),
(42, 125, 42, 4, 'Nice product, but could offer more colour options.', '2023-06-25', 0),
(43, 72, 43, 5, 'Eco-friendly fashion at its finest. Highly recommended!', '2023-06-26', 0),
(44, 15, 44, 4, 'I appreciate the sustainable choices made in this product.', '2023-06-27', 0),
(45, 103, 45, 5, 'Very comfortable and supports a great cause. Love it!', '2023-06-28', 0),
(46, 41, 46, 3, 'Good, but sizing could be more accurate.', '2023-06-29', 0),
(47, 67, 47, 5, 'Eco-conscious and budget-friendly. Can\'t go wrong!', '2023-06-30', 0),
(48, 137, 48, 4, 'Sustainable materials and a stylish look. Satisfied.', '2023-07-01', 0),
(49, 85, 49, 5, 'Impressive design and eco-friendly. Highly satisfied!', '2023-07-02', 0),
(50, 28, 50, 3, 'Decent product, but the fit isn\'t perfect for me.', '2023-07-03', 0),
(51, 47, 51, 5, 'Sustainable fashion with a great style. Love it!', '2023-07-04', 0),
(52, 121, 52, 4, 'Pleasantly surprised by the quality and sustainability and looked good against my pale Irish skin.', '2023-07-05', 0),
(53, 18, 53, 3, 'Good product overall, but sizing can be tricky.', '2023-07-06', 0),
(54, 75, 54, 5, 'Outstanding commitment to the environment.', '2023-07-07', 0),
(55, 82, 55, 4, 'Nice product.', '2023-07-08', 0),
(56, 33, 56, 5, 'Eco-friendly fashion at its finest. Highly recommended!', '2023-07-09', 0),
(57, 94, 57, 4, 'I appreciate the sustainable choices made in this product.', '2023-07-10', 0),
(58, 66, 58, 5, 'Very comfortable and supports a great cause. Love it!', '2023-07-11', 0),
(59, 12, 1, 3, 'Good, but sizing could be more accurate.', '2023-07-12', 0),
(60, 12, 6, 5, 'Eco-conscious and budget-friendly. Whats not to like?', '2023-07-13', 0),
(61, 48, 58, 2, 'Not satisfied with the quality. Expected better.', '2023-07-14', 0),
(62, 136, 12, 2, 'Disappointed with the product. Poor quality materials.', '2023-07-15', 0),
(63, 14, 1, 2, 'Product doesn\'t meet my expectations. Unsatisfactory.', '2023-07-16', 0),
(64, 95, 5, 1, 'Huge letdown. I expected better quality. About as useful as a pair of sunglasses to a man with one ear!', '2023-07-17', 1),
(65, 64, 6, 3, 'Average product. Nothing special.', '2023-07-18', 0),
(66, 87, 19, 2, 'Overpriced for the quality provided.', '2023-07-19', 0),
(67, 74, 36, 1, 'Joke shop of a place', '2023-07-20', 1),
(68, 57, 23, 1, 'Worst purchase ever. Avoid at all costs. Same old Zelora, always out to rip off their customers.', '2023-07-21', 1),
(69, 150, 16, 2, 'Subpar product. Not worth the money.', '2023-07-22', 0),
(70, 41, 22, 2, 'Extremely dissatisfied with the product.', '2023-07-23', 0),
(71, 108, 23, 1, 'Regret buying this. Poor quality and high price.', '2023-07-24', 1),
(72, 49, 45, 2, 'Not what I expected. Product falls short.', '2023-07-25', 0),
(73, 6, 3, 2, 'Highly disappointed. Don\'t recommend it.', '2023-07-26', 0),
(74, 144, 7, 1, 'I bought this for my mother. She hated it and now hates me. Thanks for nothing Zelora', '2023-07-27', 1),
(75, 70, 17, 2, 'Product quality is disappointing. Overpriced.', '2023-07-28', 0),
(76, 45, 6, 1, 'Wasted my money. Poor-quality product.', '2023-07-29', 0),
(77, 101, 19, 2, 'Not worth the price. Very dissatisfied.', '2023-07-30', 0),
(78, 88, 8, 2, 'Very disappointed. Quality is below par.', '2023-07-31', 0),
(79, 131, 39, 1, 'Awful product. Don\'t make the same mistake I did.', '2023-08-01', 0),
(80, 3, 1, 2, 'Extremely unsatisfied with the purchase.', '2023-08-02', 0),
(81, 12, 7, 4, 'I love the colour options for this product. Great!', '2023-08-03', 0),
(82, 35, 15, 2, 'Disappointed with the quality. Not worth it.', '2023-08-04', 0),
(83, 99, 23, 3, 'Average product. Decent quality for the price.', '2023-08-05', 0),
(84, 53, 31, 5, 'Exceptional quality and eco-friendly. Highly recommended!', '2023-08-06', 0),
(85, 41, 8, 1, 'Terrible product. Avoid it at all costs.', '2023-08-07', 0),
(86, 5, 16, 4, 'Sustainable fashion with a stylish look. Satisfied.', '2023-08-08', 0),
(87, 38, 3, 3, 'Product quality is okay, but could be better.', '2023-08-09', 0),
(88, 14, 50, 2, 'Not what I expected. A letdown in terms of quality.', '2023-08-10', 0),
(89, 8, 47, 4, 'Sustainable choices made in this product are appreciated.', '2023-08-11', 0),
(90, 1, 33, 5, 'Outstanding commitment to the environment. Impressed.', '2023-08-12', 0),
(91, 19, 55, 2, 'Product doesn\'t meet my expectations', '2023-08-12', 0),
(101, 17, 17, 4, 'Nice product, but could offer more color options.', '2023-08-23', 0),
(102, 36, 36, 3, 'Good, but sizing could be more accurate.', '2023-08-24', 0),
(103, 55, 55, 5, 'Eco-conscious and budget-friendly. Can\'t go wrong!', '2023-08-25', 0),
(104, 25, 25, 2, 'Subpar product. Not worth the money. Insert sad face emoji', '2023-08-26', 0),
(105, 42, 42, 2, 'Extremely dissatisfied with the product.', '2023-08-27', 0),
(106, 32, 32, 1, 'Regret buying this. Poor quality and high price.', '2023-08-28', 0),
(107, 10, 10, 2, 'Not what I expected. Product falls short.', '2023-08-29', 0),
(108, 46, 46, 1, 'Worst purchase ever. Avoid at all costs.', '2023-08-30', 0),
(109, 24, 24, 4, 'Decent product, but the fit isn\'t perfect for me.', '2023-08-31', 0),
(110, 52, 52, 2, 'Ah here, leave it out. Highly disappointed. Don\'t recommend it.', '2023-09-01', 1),
(111, 26, 22, 5, 'Impressive design and eco-friendly. Highly satisfied!', '2023-09-02', 0),
(112, 3, 19, 2, 'Not worth the price. Very dissatisfied.', '2023-09-03', 0),
(113, 50, 50, 4, 'Sustainable fashion with a great style. Love it!', '2023-09-04', 0),
(114, 52, 5, 2, 'Some shower of chancers. I hope ye all die', '2023-09-05', 1),
(115, 8, 16, 3, 'Product quality is okay, but could be better.', '2023-09-06', 0),
(116, 11, 11, 5, 'Great product! Excellent quality and eco-friendly materials.', '2023-09-07', 0),
(117, 29, 7, 1, 'Terrible product. Don\'t waste your money.', '2023-09-08', 0),
(118, 41, 38, 4, 'Sustainable fashion with a stylish look. Satisfied.', '2023-09-09', 0),
(119, 45, 52, 3, 'Product quality is okay, but could be better.', '2023-09-10', 0),
(120, 55, 11, 2, 'Overpriced for the quality provided.', '2023-09-11', 0),
(121, 16, 41, 5, 'Exceptional quality and eco-friendly. Highly recommended!', '2023-09-12', 0),
(122, 27, 6, 1, 'Wasted my money. Poor-quality product.', '2023-09-13', 0),
(123, 33, 29, 4, 'Impressive design and eco-friendly. Satisfied.', '2023-09-14', 0),
(124, 20, 18, 2, 'Huge letdown. I expected better quality.', '2023-09-15', 0),
(125, 47, 54, 5, 'Sustainable fashion is the future, and this product shows it.', '2023-09-16', 0),
(126, 18, 44, 2, 'Not as eco-friendly as claimed. Disappointed.', '2023-09-17', 0),
(127, 44, 56, 4, 'I appreciate the sustainable choices made in this product.', '2023-09-18', 0),
(128, 24, 49, 1, 'Awful awful product. Don\'t make the same mistake I did.', '2023-09-19', 0),
(129, 13, 21, 4, 'Nice product, but could offer more color options.', '2023-09-20', 0),
(130, 22, 30, 3, 'Good, but sizing could be more accurate.', '2023-09-21', 0);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplier_id` int(11) NOT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `address` tinytext DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `description` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplier_id`, `supplier_name`, `contact_name`, `contact_email`, `contact_phone`, `address`, `website`, `description`) VALUES
(1, 'EcoFabrics Inc', 'John Bradbury', 'john@ecofabrics.com', '087 6654321', 'Raheen Industrial Estate, Limerick', 'www.ecofabrics.com', 'Supplier of eco-friendly textile materials.'),
(2, 'GreenThreads Ltd', 'Orna Johnson', 'ornaj@greenthreads.com', '086 8765654', '45 Murroe Drive, Annacotty, Limerick', 'www.greenthreads.com', 'Specializing in sustainable fabric materials.'),
(3, 'OrganicWear Corp', 'Michael Brown', 'michael@organicwear.com', '(555) 123-4567', '45 Longmile Road, Dublin', 'www.organicwear.com', 'Provider of organic clothing materials.'),
(4, 'EcoStitch Co', 'Samantha Lee', 'samanthalee@ecostitch.com', '(089) 0988765', 'Athenry Rd, Loughrea, Galway', 'www.ecostitch.com', 'Supplier of eco-conscious clothing materials.'),
(5, 'GreenLeaf Textiles', 'David Wilson', 'david@greenleaf.com', '085 6767876', 'O\'Curry St, Kilkee', 'www.greenleaf.com', 'Quality textiles for sustainable fashion.'),
(6, 'SustainaFab Supplies', 'Mary Jackson', 'mary.jackson@sustainafab.com', '(222) 777-5555', '222 Maple St, Riverside Park, NV, USA', 'www.sustainafab.com', 'Providing ethical fashion materials.'),
(7, 'EcoFiber Solutions', 'Chris Turner', 'chris.turner@ecofiber.com', '(333) 444-9999', '45 Gatwick Rd, Three Bridges, West Sussex, UK', 'www.ecofiber.com', 'Sustainable clothing solutions.'),
(8, 'EarthTex Imports', 'Karen Miller', 'karen@earthtex.com', '087 2345665', '87 Tramore Rd, Middleton, Cork', 'www.earthtex.com', 'Importing eco-friendly fabrics.'),
(9, 'OrganicThread Trading', 'Robert Harris', 'robert@organicthread.com', '087 6548979', 'Dublin Rd, Marshes Upper, Dundalk, Co. Louth', 'www.organicthread.com', 'Trading in organic materials.'),
(10, 'SustainableText Logistics', 'Laura King', 'laura@sustainabletext.com', '089 9988743', 'Port Rd, Gortlee, Letterkenny, Co. Donega', 'www.sustainabletext.com', 'Logistics for sustainable fashion materials.'),
(11, 'EcoDye Distributors', 'Mark Turner', 'mark@ecodye.com', '087 6544231', 'Ash Ln, Ballytivnan, Sligo,', 'www.ecodye.com', 'Distributors of eco-conscious products.'),
(12, 'GreenFibers Merchants', 'Jennifer Hall', 'jennifer@greenfibers.com', '089 6234354', '4 Old  Dublin Rd, Galway\r\n\r\n', 'www.greenfibers.com', 'Sustainable fashion materials.'),
(13, 'EcoBlend Trading', 'William Davis', 'william@ecoblend.com', '086 5656432', '56 Dromtacker, Tralee, Co. Kerry', 'www.ecoblend.com', 'Trading in environmentally friendly textiles.'),
(14, 'EcoWare Imports', 'Elizabeth Clark', 'elizabeth@ecoware.com', '085 6769098', 'Rossa Ave, Bishopstown, Cork', 'www.ecoware.com', 'Importer of Eco-conscious materials.'),
(15, 'PureFab Inc', 'Daniel Turner', 'daniel@purefab.com', '087 622 3453', 'Cork Rd, Kilbarry, Waterford', 'www.purefab.com', 'Incorporating sustainable materials.'),
(16, 'GreenTech Solutions', 'Patricia Scott', 'patricia@greentech.com', '097 7873421', '18 Kilkenny Rd, Carlow', 'www.greentech.com', 'Solutions for sustainable clothing materials.'),
(17, 'EcoTrend Enterprises', 'George Baker', 'george@ecotrend.com', '01 997 4549', 'Blanchardstown Rd N, Blanchardstown, Dublin', 'www.ecotrend.com', 'Enterprising sustainable fashion.'),
(18, 'EnviroFab Co', 'Jessica White', 'jessica@envirofab.com', '+44 28 7012 3422', 'Northland Rd, Derry, Northern Ireland', 'www.envirofab.com', 'Leading in eco-friendly materials.'),
(19, 'SustainaLogistics', 'Thomas Turner', 'thomas@sustainalog.com', '01 888 9865', 'Blessington Rd, Tallaght, Dublin 24,', 'www.sustainalog.com', 'Clothing for the Eco-conscious Irish person'),
(20, 'GreenStyle Distributors', 'Sarah Lewis', 'sarah@greenstyle.co.uk', '+44 28 9024 5167', 'University Rd, Belfast Northern Ireland', 'www.greenstyle.com', 'Distributors of sustainable fashion materials.');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `wishlist_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `added_date` date DEFAULT NULL,
  `wishlist_name` varchar(255) DEFAULT NULL,
  `notes` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`wishlist_id`, `customer_id`, `product_id`, `added_date`, `wishlist_name`, `notes`) VALUES
(1, 33, 12, '2023-10-11', 'Lauras Xmas Present List', 'Make sure to check the sizes for Dad'),
(2, 67, 28, '2023-10-12', 'Dylans List', NULL),
(3, 102, 41, '2023-10-13', NULL, NULL),
(4, 9, 1, '2023-10-14', NULL, NULL),
(5, 79, 17, '2023-10-15', 'Sorchas', NULL),
(6, 44, 45, '2023-10-16', NULL, NULL),
(7, 125, 2, '2023-10-17', NULL, NULL),
(8, 28, 53, '2023-10-18', 'Michaels', NULL),
(9, 147, 37, '2023-10-19', NULL, NULL),
(10, 57, 7, '2023-10-20', NULL, NULL),
(11, 33, 23, '2023-10-21', NULL, NULL),
(12, 84, 34, '2023-10-22', NULL, NULL),
(13, 139, 16, '2023-10-23', NULL, NULL),
(14, 8, 49, '2023-10-24', NULL, NULL),
(15, 101, 42, '2023-10-25', NULL, NULL),
(16, 150, 20, '2023-10-26', NULL, NULL),
(17, 33, 30, '2023-10-27', 'Lauras Xmas List', NULL),
(18, 23, 11, '2023-10-28', 'Sile\'s List', NULL),
(19, 76, 8, '2023-10-29', NULL, NULL),
(20, 68, 3, '2023-10-30', NULL, NULL),
(21, 10, 26, '2023-11-01', NULL, NULL),
(22, 119, 56, '2023-11-02', NULL, NULL),
(23, 17, 14, '2023-11-03', NULL, NULL),
(24, 87, 31, '2023-11-04', NULL, NULL),
(25, 51, 35, '2023-11-05', NULL, NULL),
(26, 73, 9, '2023-11-06', NULL, NULL),
(27, 25, 19, '2023-11-07', NULL, NULL),
(28, 132, 24, '2023-11-08', NULL, NULL),
(29, 45, 46, '2023-11-09', NULL, NULL),
(30, 94, 4, '2023-11-10', NULL, NULL),
(31, 39, 18, '2023-11-11', NULL, NULL),
(32, 61, 43, '2023-11-12', NULL, NULL),
(33, 3, 2, '2023-11-13', NULL, NULL),
(34, 129, 38, '2023-11-14', NULL, NULL),
(35, 65, 21, '2023-11-15', NULL, NULL),
(36, 13, 51, '2023-11-16', NULL, NULL),
(37, 146, 29, '2023-11-17', NULL, NULL),
(38, 19, 37, '2023-11-18', NULL, NULL),
(39, 2, 53, '2024-02-27', 'Aoifes Christmas List 2024', 'Need to start putting money away for Christmas!!');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD UNIQUE KEY `unique_cart_item` (`user_id`,`product_id`),
  ADD KEY `idx_cart_user_id` (`user_id`),
  ADD KEY `idx_cart_product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `idx_customer_id` (`customer_id`);

--
-- Indexes for table `db_metadata`
--
ALTER TABLE `db_metadata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `idx_supplier_id` (`supplier_id`),
  ADD KEY `idx_product_supplier` (`product_id`,`supplier_id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `idx_order_id` (`order_id`),
  ADD KEY `idx_product_id` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `idx_customer_id_orders` (`customer_id`),
  ADD KEY `idx_order_status` (`order_status`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `idx_category_id` (`category_id`),
  ADD KEY `idx_sustainability_rating` (`sustainability_rating`),
  ADD KEY `fk_supplier` (`supplier_Id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `idx_customer_id_reviews` (`customer_id`),
  ADD KEY `idx_product_id_reviews` (`product_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`wishlist_id`),
  ADD KEY `idx_customer_id_wishlist` (`customer_id`),
  ADD KEY `idx_product_id_wishlist` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `db_metadata`
--
ALTER TABLE `db_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_cart_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE;

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`);

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKpxtb8awmi0dk6smoh2vp1litg` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_supplier` FOREIGN KEY (`supplier_Id`) REFERENCES `suppliers` (`supplier_id`),
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
