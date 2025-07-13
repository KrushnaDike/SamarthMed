"use client";

import type React from "react";
import { useState } from "react";
import {
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Card,
  CardBody,
  CardFooter,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddToCart = () => {
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
      description: `${quantity}x ${product.name} added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello RoteMed, I would like to order: ${quantity}x ${
      product.name
    } - $${(product.price * quantity).toFixed(2)}`;
    const whatsappUrl = `https://wa.me/9607499567?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card
      shadow="md"
      _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
      transition="all 0.2s"
    >
      <CardBody>
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          borderRadius="md"
          mb={4}
          w="full"
          h="200px"
          objectFit="cover"
        />
        <VStack align="start" spacing={2}>
          <HStack justify="space-between" w="full">
            <Badge colorScheme={product.inStock ? "green" : "red"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
            <Badge colorScheme="blue" variant="subtle">
              {product.category}
            </Badge>
          </HStack>
          <Heading as="h3" size="md">
            {product.name}
          </Heading>
          <Text color="gray.600" fontSize="sm" noOfLines={2}>
            {product.description}
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="brand.500">
            ${product.price.toFixed(2)}
          </Text>
        </VStack>
      </CardBody>
      <CardFooter pt={0}>
        <VStack spacing={3} w="full">
          <NumberInput
            value={quantity}
            onChange={(_, value) => setQuantity(value || 1)}
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
            <Button
              leftIcon={<FaShoppingCart />}
              colorScheme="brand"
              size="sm"
              flex={1}
              isDisabled={!product.inStock}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              leftIcon={<FaWhatsapp />}
              colorScheme="whatsapp"
              size="sm"
              flex={1}
              isDisabled={!product.inStock}
              onClick={handleWhatsAppOrder}
            >
              WhatsApp
            </Button>
          </HStack>
        </VStack>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
