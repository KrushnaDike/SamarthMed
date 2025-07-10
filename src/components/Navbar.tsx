"use client";

import type React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Badge,
  Collapse,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaPlus, FaShoppingCart } from "react-icons/fa";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
  { name: "Cart", href: "/cart" },
  { name: "Billing", href: "/billing" },
];

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const bg = useColorModeValue("white", "gray.800");
  const scrolledBg = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(26, 32, 44, 0.95)"
  );
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const location = useLocation();

  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MotionBox
      bg={scrolled ? scrolledBg : bg}
      backdropFilter={scrolled ? "blur(10px)" : "none"}
      borderBottom="1px"
      borderColor={scrolled ? "transparent" : borderColor}
      position="sticky"
      top={0}
      zIndex={1000}
      transition="all 0.3s ease"
      shadow={scrolled ? "lg" : "none"}
      animate={{
        backgroundColor: scrolled ? scrolledBg : bg,
      }}
    >
      <MotionFlex
        h={scrolled ? 14 : 16}
        alignItems="center"
        justifyContent="space-between"
        maxW="7xl"
        mx="auto"
        px={4}
        transition={{ duration: 0.3 }}
      >
        <HStack spacing={8} alignItems="center">
          <MotionBox
            as={RouterLink}
            to="/"
            display="flex"
            alignItems="center"
            gap={2}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MotionBox
              w={scrolled ? 7 : 8}
              h={scrolled ? 7 : 8}
              bg="brand.500"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <FaPlus color="white" size={scrolled ? 14 : 16} />
            </MotionBox>
            <Text
              fontSize={scrolled ? "lg" : "xl"}
              fontWeight="bold"
              color="brand.500"
            >
              SamarthMed
            </Text>
          </MotionBox>

          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {navLinks.slice(0, -2).map((link, index) => (
              <MotionBox
                key={link.name}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  as={RouterLink}
                  to={link.href}
                  px={3}
                  py={2}
                  rounded="md"
                  color={
                    location.pathname === link.href ? "brand.500" : "gray.600"
                  }
                  fontWeight={
                    location.pathname === link.href ? "semibold" : "normal"
                  }
                  position="relative"
                  _hover={{
                    textDecoration: "none",
                    bg: hoverBg,
                    color: "brand.500",
                  }}
                  _after={
                    location.pathname === link.href
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: "-2px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "20px",
                          height: "2px",
                          bg: "brand.500",
                          borderRadius: "full",
                        }
                      : {}
                  }
                >
                  {link.name}
                </Link>
              </MotionBox>
            ))}

            <MotionBox position="relative" whileHover={{ y: -2 }}>
              <Link
                as={RouterLink}
                to="/cart"
                px={3}
                py={2}
                rounded="md"
                color={location.pathname === "/cart" ? "brand.500" : "gray.600"}
                fontWeight={
                  location.pathname === "/cart" ? "semibold" : "normal"
                }
                _hover={{
                  textDecoration: "none",
                  bg: hoverBg,
                  color: "brand.500",
                }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <FaShoppingCart />
                Cart
                <AnimatePresence>
                  {cartCount > 0 && (
                    <MotionBox
                      as={Badge}
                      colorScheme="red"
                      borderRadius="full"
                      fontSize="xs"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {cartCount}
                    </MotionBox>
                  )}
                </AnimatePresence>
              </Link>
            </MotionBox>

            <MotionBox whileHover={{ y: -2 }}>
              <Link
                as={RouterLink}
                to="/billing"
                px={3}
                py={2}
                rounded="md"
                color={
                  location.pathname === "/billing" ? "brand.500" : "gray.600"
                }
                fontWeight={
                  location.pathname === "/billing" ? "semibold" : "normal"
                }
                _hover={{
                  textDecoration: "none",
                  bg: hoverBg,
                  color: "brand.500",
                }}
              >
                Billing
              </Link>
            </MotionBox>
          </HStack>
        </HStack>

        <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
          />
        </MotionBox>
      </MotionFlex>

      <Collapse in={isOpen} animateOpacity>
        <Box
          pb={4}
          display={{ md: "none" }}
          bg={bg}
          borderTop="1px"
          borderColor={borderColor}
        >
          <Stack as="nav" spacing={4} px={4}>
            {navLinks.map((link, index) => (
              <MotionBox
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  as={RouterLink}
                  to={link.href}
                  px={2}
                  py={1}
                  rounded="md"
                  color={
                    location.pathname === link.href ? "brand.500" : "gray.600"
                  }
                  fontWeight={
                    location.pathname === link.href ? "semibold" : "normal"
                  }
                  _hover={{
                    textDecoration: "none",
                    bg: hoverBg,
                    color: "brand.500",
                  }}
                  onClick={onClose}
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  {link.name === "Cart" && <FaShoppingCart />}
                  {link.name}
                  {link.name === "Cart" && cartCount > 0 && (
                    <Badge colorScheme="red" borderRadius="full" fontSize="xs">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </MotionBox>
            ))}
          </Stack>
        </Box>
      </Collapse>
    </MotionBox>
  );
};

export default Navbar;
