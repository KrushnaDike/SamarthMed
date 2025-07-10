import type React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  Image,
  Flex,
} from "@chakra-ui/react"
import { FaAward, FaUsers, FaGlobe, FaClock } from "react-icons/fa"

const stats = [
  { label: "Years of Experience", value: "15+", icon: FaClock },
  { label: "Happy Customers", value: "500+", icon: FaUsers },
  { label: "Products Available", value: "1000+", icon: FaGlobe },
  { label: "Quality Certifications", value: "10+", icon: FaAward },
]

const values = [
  {
    title: "Quality First",
    description: "We ensure all products meet the highest pharmaceutical standards and regulations.",
  },
  {
    title: "Customer Focus",
    description: "Our customers are at the heart of everything we do, providing personalized service.",
  },
  {
    title: "Reliability",
    description: "Consistent supply chain and on-time delivery you can count on.",
  },
  {
    title: "Innovation",
    description: "Continuously improving our processes and expanding our product range.",
  },
]

const About: React.FC = () => {
  return (
    <Container maxW="7xl" py={12}>
      {/* Hero Section */}
      <Flex direction={{ base: "column", lg: "row" }} align="center" gap={12} mb={16}>
        <VStack align="start" flex={1} spacing={6}>
          <Heading as="h1" size="2xl" color="brand.500">
            About RoteMed
          </Heading>
          <Text fontSize="lg" color="gray.600" lineHeight="tall">
            Founded in 2008, RoteMed has been a trusted partner in the healthcare industry, providing high-quality
            pharmaceutical products to hospitals, clinics, and pharmacies across the region. Our commitment to
            excellence and customer satisfaction has made us a leading medical wholesaler.
          </Text>
          <Text fontSize="lg" color="gray.600" lineHeight="tall">
            We specialize in sourcing and distributing a comprehensive range of medicines, medical devices, and
            healthcare products from certified manufacturers worldwide. Our state-of-the-art warehouse and cold chain
            facilities ensure product integrity from storage to delivery.
          </Text>
        </VStack>
        <Box flex={1}>
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
            alt="RoteMed facility"
            borderRadius="lg"
            shadow="xl"
          />
        </Box>
      </Flex>

      {/* Stats Section */}
      <Box bg="brand.50" borderRadius="xl" p={8} mb={16}>
        <Heading as="h2" size="xl" textAlign="center" mb={8} color="brand.500">
          Our Impact
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
          {stats.map((stat, index) => (
            <VStack key={index} textAlign="center">
              <Icon as={stat.icon} w={8} h={8} color="brand.500" mb={2} />
              <Stat>
                <StatNumber fontSize="3xl" color="brand.500">
                  {stat.value}
                </StatNumber>
                <StatLabel fontSize="sm" color="gray.600">
                  {stat.label}
                </StatLabel>
              </Stat>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>

      {/* Mission & Vision */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} mb={16}>
        <Box>
          <Heading as="h3" size="lg" mb={4} color="brand.500">
            Our Mission
          </Heading>
          <Text color="gray.600" lineHeight="tall">
            To provide healthcare professionals with reliable access to high-quality pharmaceutical products and medical
            supplies, enabling them to deliver the best possible care to their patients. We strive to be the most
            trusted partner in the healthcare supply chain.
          </Text>
        </Box>
        <Box>
          <Heading as="h3" size="lg" mb={4} color="brand.500">
            Our Vision
          </Heading>
          <Text color="gray.600" lineHeight="tall">
            To become the leading medical wholesaler in the region, known for our commitment to quality, innovation, and
            customer service. We envision a future where healthcare providers have seamless access to the products they
            need to save lives and improve health outcomes.
          </Text>
        </Box>
      </SimpleGrid>

      {/* Values Section */}
      <Box>
        <Heading as="h2" size="xl" textAlign="center" mb={8} color="brand.500">
          Our Values
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {values.map((value, index) => (
            <Box key={index} p={6} bg="white" borderRadius="lg" shadow="md" border="1px" borderColor="gray.200">
              <Heading as="h4" size="md" mb={3} color="brand.500">
                {value.title}
              </Heading>
              <Text color="gray.600">{value.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  )
}

export default About
