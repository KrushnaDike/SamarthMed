"use client";

import type React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  Card,
  CardBody,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  Badge,
  useToast,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import {
  FaTrash,
  FaWhatsapp,
  FaShoppingCart,
  FaArrowRight,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();
  const toast = useToast();

  const handleWhatsAppOrder = () => {
    if (state.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before ordering.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const orderDetails = state.items
      .map(
        (item) =>
          `${item.name} x${item.quantity} - $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    const message = `Hello RoteMed, I would like to place the following order:\n\n${orderDetails}\n\nTotal: $${state.total.toFixed(
      2
    )}\n\nPlease confirm availability and delivery details.`;

    const whatsappUrl = `https://wa.me/9607499567?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  if (state.items.length === 0) {
    return (
      <Container maxW="7xl" py={12}>
        <VStack spacing={8} textAlign="center">
          <FaShoppingCart size={64} color="gray.300" />
          <Heading as="h1" size="xl" color="gray.500">
            Your Cart is Empty
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Browse our products and add items to your cart to get started.
          </Text>
          <Button
            as={RouterLink}
            to="/products"
            colorScheme="brand"
            size="lg"
            rightIcon={<FaArrowRight />}
          >
            Shop Now
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Box>
            <Heading as="h1" size="xl" color="brand.500">
              Shopping Cart
            </Heading>
            <Text color="gray.600">
              {state.items.length} item{state.items.length !== 1 ? "s" : ""} in
              your cart
            </Text>
          </Box>
          <Button variant="outline" colorScheme="red" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
          {/* Cart Items */}
          <Box gridColumn={{ base: "1", lg: "1 / 3" }}>
            <VStack spacing={4} align="stretch">
              {state.items.map((item) => (
                <Card key={item.id}>
                  <CardBody>
                    <Flex gap={4} align="center">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
                      />

                      <Box flex="1">
                        <Heading size="sm" mb={1}>
                          {item.name}
                        </Heading>
                        <Badge colorScheme="blue" variant="subtle" mb={2}>
                          {item.category}
                        </Badge>
                        <Text fontWeight="bold" color="brand.500">
                          ${item.price.toFixed(2)} each
                        </Text>
                      </Box>

                      <VStack spacing={2}>
                        <NumberInput
                          value={item.quantity}
                          onChange={(_, value) =>
                            updateQuantity(item.id, value)
                          }
                          min={1}
                          max={100}
                          size="sm"
                          w="100px"
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <Text fontSize="sm" color="gray.600">
                          Qty: {item.quantity}
                        </Text>
                      </VStack>

                      <VStack spacing={2} align="end">
                        <Text fontWeight="bold" fontSize="lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                        <IconButton
                          aria-label="Remove item"
                          icon={<FaTrash />}
                          colorScheme="red"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        />
                      </VStack>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </Box>

          {/* Order Summary */}
          <Card h="fit-content" position="sticky" top="4">
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Heading size="md" color="brand.500">
                  Order Summary
                </Heading>

                <VStack spacing={2} align="stretch">
                  {state.items.map((item) => (
                    <HStack key={item.id} justify="space-between" fontSize="sm">
                      <Text>
                        {item.name} x{item.quantity}
                      </Text>
                      <Text>${(item.price * item.quantity).toFixed(2)}</Text>
                    </HStack>
                  ))}
                </VStack>

                <Divider />

                <HStack justify="space-between">
                  <Text>Subtotal:</Text>
                  <Text fontWeight="semibold">${state.total.toFixed(2)}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text>Tax (10%):</Text>
                  <Text fontWeight="semibold">
                    ${(state.total * 0.1).toFixed(2)}
                  </Text>
                </HStack>

                <HStack justify="space-between">
                  <Text>Shipping:</Text>
                  <Text fontWeight="semibold" color="green.500">
                    FREE
                  </Text>
                </HStack>

                <Divider />

                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="bold">
                    Total:
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="brand.500">
                    ${(state.total * 1.1).toFixed(2)}
                  </Text>
                </HStack>

                <VStack spacing={3} pt={4}>
                  <Button
                    leftIcon={<FaWhatsapp />}
                    colorScheme="whatsapp"
                    size="lg"
                    w="full"
                    onClick={handleWhatsAppOrder}
                  >
                    Order via WhatsApp
                  </Button>

                  <Button
                    as={RouterLink}
                    to="/billing"
                    colorScheme="brand"
                    variant="outline"
                    size="lg"
                    w="full"
                  >
                    Generate Invoice
                  </Button>

                  <Button
                    as={RouterLink}
                    to="/products"
                    variant="ghost"
                    size="sm"
                    w="full"
                  >
                    Continue Shopping
                  </Button>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Cart;
