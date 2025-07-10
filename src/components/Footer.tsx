import type React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Heading,
  useColorModeValue,
  HStack,
  Icon,
  Divider,
} from "@chakra-ui/react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Footer: React.FC = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("gray.700", "gray.200");

  return (
    <Box bg={bg} color={color} mt="auto">
      <Container as={Stack} maxW="7xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          {/* Company Info */}
          <Stack spacing={6}>
            <Box>
              <Heading size="md" color="brand.500" mb={2}>
                SamarthMed
              </Heading>
              <Text fontSize="sm">
                Your trusted medical wholesaler providing quality pharmaceutical
                products with reliable service.
              </Text>
            </Box>
            <Stack direction="row" spacing={6}>
              <Link href="https://facebook.com" isExternal>
                <Icon as={FaFacebook} w={5} h={5} color="blue.500" />
              </Link>
              <Link href="https://twitter.com" isExternal>
                <Icon as={FaTwitter} w={5} h={5} color="blue.400" />
              </Link>
              <Link href="https://instagram.com" isExternal>
                <Icon as={FaInstagram} w={5} h={5} color="pink.500" />
              </Link>
              <Link href="https://linkedin.com" isExternal>
                <Icon as={FaLinkedin} w={5} h={5} color="blue.600" />
              </Link>
            </Stack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={6}>
            <Text fontWeight="500">Quick Links</Text>
            <Stack spacing={3}>
              <Link as={RouterLink} to="/" fontSize="sm">
                Home
              </Link>
              <Link as={RouterLink} to="/about" fontSize="sm">
                About Us
              </Link>
              <Link as={RouterLink} to="/products" fontSize="sm">
                Products
              </Link>
              <Link as={RouterLink} to="/contact" fontSize="sm">
                Contact
              </Link>
            </Stack>
          </Stack>

          {/* Services */}
          <Stack spacing={6}>
            <Text fontWeight="500">Services</Text>
            <Stack spacing={3}>
              <Link as={RouterLink} to="/cart" fontSize="sm">
                Shopping Cart
              </Link>
              <Link as={RouterLink} to="/billing" fontSize="sm">
                Invoice Generator
              </Link>
              <Link href="#" fontSize="sm">
                Bulk Orders
              </Link>
              <Link href="#" fontSize="sm">
                Prescription Services
              </Link>
            </Stack>
          </Stack>

          {/* Contact Info */}
          <Stack spacing={6}>
            <Text fontWeight="500">Contact Info</Text>
            <Stack spacing={3}>
              <HStack>
                <Icon as={FaPhone} color="brand.500" />
                <Text fontSize="sm">+1 (555) 123-4567</Text>
              </HStack>
              <HStack>
                <Icon as={FaEnvelope} color="brand.500" />
                <Text fontSize="sm">info@rotemed.com</Text>
              </HStack>
              <HStack align="start">
                <Icon as={FaMapMarkerAlt} color="brand.500" mt={1} />
                <Text fontSize="sm">
                  123 Medical Plaza
                  <br />
                  Healthcare District, City 12345
                </Text>
              </HStack>
              <Link
                href="https://wa.me/1234567890"
                isExternal
                color="whatsapp.500"
                fontSize="sm"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Icon as={FaWhatsapp} />
                WhatsApp Us
              </Link>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Divider />

      <Container maxW="7xl">
        <HStack
          justify="space-between"
          py={4}
          direction={{ base: "column", md: "row" }}
        >
          <Text fontSize="sm">© 2024 RoteMed. All rights reserved.</Text>
          <HStack spacing={4}>
            <Link href="#" fontSize="sm">
              Privacy Policy
            </Link>
            <Link href="#" fontSize="sm">
              Terms of Service
            </Link>
            <Link href="#" fontSize="sm">
              Cookie Policy
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;
