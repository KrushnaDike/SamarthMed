"use client";

import type React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Icon,
  Stack,
  Flex,
  Image,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  FaShieldAlt,
  FaTruck,
  FaUserMd,
  FaWhatsapp,
  FaDownload,
  FaPlay,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedCard from "../components/AnimatedCard";
import GradientText from "../components/GradientText";
import ParallaxSection from "../components/ParallaxSection";
import CountUpAnimation from "../components/CountUpAnimation";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const features = [
  {
    icon: FaShieldAlt,
    title: "Quality Assured",
    description:
      "All products are sourced from certified manufacturers and undergo strict quality checks.",
    color: "blue.500",
  },
  {
    icon: FaTruck,
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery across the region with temperature-controlled transport.",
    color: "green.500",
  },
  {
    icon: FaUserMd,
    title: "Expert Support",
    description:
      "Professional pharmaceutical guidance and customer support from our experienced team.",
    color: "purple.500",
  },
];

const stats = [
  { label: "Happy Customers", value: 500, suffix: "+" },
  { label: "Products Available", value: 1000, suffix: "+" },
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Cities Served", value: 25, suffix: "+" },
];

const Home: React.FC = () => {
  const bgGradient = useColorModeValue(
    "linear(135deg, brand.500 0%, medical.500 50%, brand.600 100%)",
    "linear(135deg, brand.600 0%, medical.600 50%, brand.700 100%)"
  );

  const handleDownloadCatalog = () => {
    const link = document.createElement("a");
    link.href =
      "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKFJvdGVNZWQgUHJvZHVjdCBDYXRhbG9nKQo+PgplbmRvYmoKdHJhaWxlcgo8PAovU2l6ZSAxCi9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo5CiUlRU9G";
    link.download = "rotemed-catalog.pdf";
    link.click();
  };

  return (
    <Box>
      {/* Hero Section with Parallax */}
      <ParallaxSection
        backgroundImage="/images/hero-medical.jpg"
        height="100vh"
      >
        <MotionBox
          bgGradient={bgGradient}
          color="white"
          minH="100vh"
          display="flex"
          alignItems="center"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: "rgba(0,0,0,0.4)",
            zIndex: 1,
          }}
        >
          <Container maxW="7xl" position="relative" zIndex={2}>
            <MotionFlex
              align="center"
              justify="space-between"
              direction={{ base: "column", lg: "row" }}
              gap={12}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <MotionBox
                flex={1}
                textAlign={{ base: "center", lg: "left" }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <GradientText
                  as="h1"
                  fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                  mb={6}
                  lineHeight="shorter"
                  gradient="linear(to-r, white, gray.100)"
                >
                  Your Trusted Medical Wholesaler
                </GradientText>

                <MotionBox
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    mb={8}
                    opacity={0.9}
                    maxW="600px"
                  >
                    RoteMed provides high-quality pharmaceutical products with
                    reliable service and competitive pricing for healthcare
                    providers across the region.
                  </Text>
                </MotionBox>

                <MotionBox
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                    <Button
                      as={RouterLink}
                      to="/products"
                      size="lg"
                      colorScheme="whiteAlpha"
                      variant="solid"
                      leftIcon={<FaPlay />}
                      _hover={{
                        transform: "translateY(-2px)",
                        shadow: "xl",
                      }}
                      transition="all 0.3s ease"
                    >
                      View Products
                    </Button>
                    <Button
                      as="a"
                      href="https://wa.me/1234567890?text=Hello%20RoteMed,%20I%20would%20like%20to%20inquire%20about%20your%20products"
                      target="_blank"
                      size="lg"
                      leftIcon={<FaWhatsapp />}
                      colorScheme="whatsapp"
                      variant="solid"
                      _hover={{
                        transform: "translateY(-2px)",
                        shadow: "xl",
                      }}
                      transition="all 0.3s ease"
                    >
                      Order on WhatsApp
                    </Button>
                  </Stack>
                </MotionBox>
              </MotionBox>

              <MotionBox
                flex={1}
                display={{ base: "none", lg: "block" }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <MotionBox
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/hero-medical.jpg"
                    alt="Medical supplies"
                    borderRadius="2xl"
                    shadow="2xl"
                    border="4px solid"
                    borderColor="whiteAlpha.300"
                  />
                </MotionBox>
              </MotionBox>
            </MotionFlex>
          </Container>
        </MotionBox>
      </ParallaxSection>

      {/* Stats Section */}
      <Box py={16} bg="white" position="relative">
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {stats.map((stat, index) => (
              <AnimatedCard key={index} delay={index * 0.1} hover={false}>
                <VStack p={6} textAlign="center">
                  <CountUpAnimation
                    value={stat.value}
                    suffix={stat.suffix}
                    fontSize="4xl"
                    fontWeight="bold"
                    color="brand.500"
                  />
                  <Text color="gray.600" fontWeight="medium">
                    {stat.label}
                  </Text>
                </VStack>
              </AnimatedCard>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} bg="gray.50">
        <Container maxW="7xl">
          <MotionBox
            textAlign="center"
            mb={16}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GradientText as="h2" fontSize="4xl" mb={4}>
              Why Choose RoteMed?
            </GradientText>
            <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
              We are committed to providing the highest quality medical products
              with exceptional service and competitive pricing.
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {features.map((feature, index) => (
              <AnimatedCard key={index} delay={index * 0.2}>
                <VStack p={8} textAlign="center" spacing={6}>
                  <MotionBox
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Box
                      p={4}
                      borderRadius="full"
                      bg={`${feature.color.split(".")[0]}.50`}
                      display="inline-block"
                    >
                      <Icon
                        as={feature.icon}
                        w={8}
                        h={8}
                        color={feature.color}
                      />
                    </Box>
                  </MotionBox>

                  <Heading as="h3" size="lg" color="gray.800">
                    {feature.title}
                  </Heading>

                  <Text color="gray.600" lineHeight="tall">
                    {feature.description}
                  </Text>
                </VStack>
              </AnimatedCard>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg="white" py={20}>
        <Container maxW="7xl">
          <AnimatedCard hover={false}>
            <Box
              bgGradient="linear(135deg, brand.500, medical.500)"
              color="white"
              p={12}
              textAlign="center"
              borderRadius="2xl"
            >
              <GradientText
                as="h2"
                fontSize="3xl"
                mb={4}
                gradient="linear(to-r, white, gray.100)"
              >
                Ready to Get Started?
              </GradientText>

              <Text fontSize="xl" mb={8} opacity={0.9}>
                Contact us today for competitive pricing and reliable service.
              </Text>

              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={4}
                justify="center"
              >
                <Button
                  as={RouterLink}
                  to="/contact"
                  size="lg"
                  colorScheme="whiteAlpha"
                  variant="solid"
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "xl",
                  }}
                  transition="all 0.3s ease"
                >
                  Contact Us
                </Button>

                <Button
                  as={RouterLink}
                  to="/billing"
                  size="lg"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "xl",
                    bg: "whiteAlpha.200",
                  }}
                  transition="all 0.3s ease"
                >
                  Create Invoice
                </Button>

                <Button
                  leftIcon={<FaDownload />}
                  size="lg"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  onClick={handleDownloadCatalog}
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "xl",
                    bg: "whiteAlpha.200",
                  }}
                  transition="all 0.3s ease"
                >
                  Download Catalog
                </Button>
              </Stack>
            </Box>
          </AnimatedCard>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
