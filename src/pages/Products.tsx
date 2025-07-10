"use client";

import type React from "react";
import { useState, useMemo } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Input,
  Select,
  HStack,
  VStack,
  Badge,
  Button,
  Image,
  Card,
  CardBody,
  CardFooter,
  InputGroup,
  InputLeftElement,
  Flex,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  FaWhatsapp,
  FaDownload,
  FaShoppingCart,
  FaHeart,
  FaEye,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import GradientText from "../components/GradientText";
import LoadingSpinner from "../components/LoadingSpinner";

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 25.99,
    description:
      "Effective pain relief and fever reducer tablets for adults and children",
    image: "/images/paracetamol.jpg",
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    price: 45.5,
    description: "Broad-spectrum antibiotic capsules for bacterial infections",
    image: "/images/antibiotics.jpg",
    inStock: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Insulin Pen",
    category: "Diabetes Care",
    price: 89.99,
    description:
      "Pre-filled insulin pen for diabetes management and blood sugar control",
    image: "/images/insulin-pen.jpg",
    inStock: false,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Blood Pressure Monitor",
    category: "Medical Devices",
    price: 125.0,
    description:
      "Digital blood pressure monitoring device with large LCD display",
    image: "/images/blood-pressure.jpg",
    inStock: true,
    rating: 4.6,
    reviews: 203,
  },
  {
    id: 5,
    name: "Vitamin D3 1000IU",
    category: "Vitamins",
    price: 18.75,
    description: "Essential vitamin D3 supplement tablets for bone health",
    image: "/images/vitamins.jpg",
    inStock: true,
    rating: 4.5,
    reviews: 78,
  },
  {
    id: 6,
    name: "Surgical Masks (Box of 50)",
    category: "PPE",
    price: 15.99,
    description: "Disposable surgical face masks with 3-layer protection",
    image: "/images/surgical-masks.jpg",
    inStock: true,
    rating: 4.4,
    reviews: 312,
  },
  {
    id: 7,
    name: "Digital Thermometer",
    category: "Medical Devices",
    price: 29.99,
    description: "Fast and accurate digital thermometer with fever alarm",
    image: "/images/thermometer.jpg",
    inStock: true,
    rating: 4.7,
    reviews: 145,
  },
  {
    id: 8,
    name: "Hand Sanitizer 500ml",
    category: "PPE",
    price: 12.5,
    description: "70% alcohol-based hand sanitizer with moisturizing agents",
    image: "/images/hand-sanitizer.jpg",
    inStock: true,
    rating: 4.3,
    reviews: 267,
  },
];

const categories = [
  "All",
  "Pain Relief",
  "Antibiotics",
  "Diabetes Care",
  "Medical Devices",
  "Vitamins",
  "PPE",
];

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const toast = useToast();
  const { addToCart } = useCart();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleWhatsAppOrder = (product: Product) => {
    const message = `Hello RoteMed, I would like to order: ${product.name} - $${product.price}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDownloadPriceList = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Price List Downloaded",
        description:
          "The complete price list has been downloaded successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 2000);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity,
    });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const headerVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const filterVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants: Variants = {
    hover: { y: -1 },
    tap: { scale: 0.95 },
  };

  const heartVariants: Variants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  if (loading) {
    return (
      <Container maxW="7xl" py={12}>
        <LoadingSpinner text="Downloading price list..." />
      </Container>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      {/* Header */}
      <MotionBox
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
      >
        <VStack spacing={6} mb={8} textAlign="center">
          <GradientText as="h1" fontSize="4xl">
            Our Products
          </GradientText>
          <Text fontSize="xl" color="gray.600" maxW="3xl">
            Browse our comprehensive range of pharmaceutical products and
            medical supplies. All products are sourced from certified
            manufacturers and quality assured.
          </Text>
          <Button
            leftIcon={<FaDownload />}
            colorScheme="brand"
            variant="outline"
            size="lg"
            onClick={handleDownloadPriceList}
            _hover={{
              transform: "translateY(-2px)",
              shadow: "lg",
            }}
            transition="all 0.3s ease"
          >
            Download Complete Price List
          </Button>
        </VStack>
      </MotionBox>

      {/* Filters */}
      <MotionBox
        variants={filterVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          mb={8}
          p={6}
          bg="white"
          borderRadius="xl"
          shadow="md"
          border="1px"
          borderColor={borderColor}
        >
          <InputGroup flex={2}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="gray.50"
              border="none"
              _focus={{
                bg: "white",
                shadow: "md",
              }}
            />
          </InputGroup>

          <Select
            flex={1}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            bg="gray.50"
            border="none"
            _focus={{
              bg: "white",
              shadow: "md",
            }}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>

          <Select
            flex={1}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            bg="gray.50"
            border="none"
            _focus={{
              bg: "white",
              shadow: "md",
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </Select>
        </Flex>
      </MotionBox>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        <MotionSimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          spacing={6}
          key={`${searchTerm}-${selectedCategory}-${sortBy}`}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {filteredProducts.map((product, index) => (
            <MotionBox
              key={product.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                bg={cardBg}
                shadow="md"
                border="1px"
                borderColor={borderColor}
                overflow="hidden"
                position="relative"
                h="full"
              >
                <Box position="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    w="full"
                    h="200px"
                    objectFit="cover"
                  />

                  {/* Favorite Button */}
                  <MotionBox
                    as={IconButton}
                    aria-label="Add to favorites"
                    icon={<FaHeart />}
                    size="sm"
                    position="absolute"
                    top={2}
                    right={2}
                    colorScheme={
                      favorites.includes(product.id) ? "red" : "gray"
                    }
                    variant={favorites.includes(product.id) ? "solid" : "ghost"}
                    onClick={() => toggleFavorite(product.id)}
                    variants={heartVariants}
                    whileHover="hover"
                    whileTap="tap"
                  />

                  {/* Stock Badge */}
                  <Badge
                    position="absolute"
                    top={2}
                    left={2}
                    colorScheme={product.inStock ? "green" : "red"}
                    variant="solid"
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </Box>

                <CardBody>
                  <VStack align="start" spacing={3}>
                    <HStack justify="space-between" w="full">
                      <Badge colorScheme="blue" variant="subtle">
                        {product.category}
                      </Badge>
                      <HStack spacing={1}>
                        <Text fontSize="sm" color="yellow.500">
                          ★ {product.rating}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          ({product.reviews})
                        </Text>
                      </HStack>
                    </HStack>

                    <Heading as="h3" size="md" noOfLines={2}>
                      {product.name}
                    </Heading>

                    <Text color="gray.600" fontSize="sm" noOfLines={2}>
                      {product.description}
                    </Text>

                    <HStack justify="space-between" w="full">
                      <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                        ${product.price.toFixed(2)}
                      </Text>
                      <Tooltip label="Quick view">
                        <IconButton
                          aria-label="Quick view"
                          icon={<FaEye />}
                          size="sm"
                          variant="ghost"
                          colorScheme="brand"
                        />
                      </Tooltip>
                    </HStack>
                  </VStack>
                </CardBody>

                <CardFooter pt={0}>
                  <VStack spacing={3} w="full">
                    <NumberInput
                      defaultValue={1}
                      min={1}
                      max={100}
                      size="sm"
                      w="full"
                    >
                      <NumberInputField placeholder="Quantity" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                    <HStack w="full" spacing={2}>
                      <MotionBox
                        as={Button}
                        leftIcon={<FaShoppingCart />}
                        colorScheme="brand"
                        size="sm"
                        flex={1}
                        isDisabled={!product.inStock}
                        onClick={() => handleAddToCart(product)}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Add to Cart
                      </MotionBox>
                      <MotionBox
                        as={Button}
                        leftIcon={<FaWhatsapp />}
                        colorScheme="whatsapp"
                        size="sm"
                        flex={1}
                        isDisabled={!product.inStock}
                        onClick={() => handleWhatsAppOrder(product)}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        WhatsApp
                      </MotionBox>
                    </HStack>
                  </VStack>
                </CardFooter>
              </Card>
            </MotionBox>
          ))}
        </MotionSimpleGrid>
      </AnimatePresence>

      {filteredProducts.length === 0 && (
        <MotionBox
          textAlign="center"
          py={12}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Text fontSize="xl" color="gray.500" mb={4}>
            No products found matching your criteria.
          </Text>
          <Button
            colorScheme="brand"
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
          >
            Clear Filters
          </Button>
        </MotionBox>
      )}
    </Container>
  );
};

export default Products;
