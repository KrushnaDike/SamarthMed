"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,
  CardBody,
  CardHeader,
  Divider,
  SimpleGrid,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { FaPlus, FaTrash, FaPrint, FaDownload, FaEye } from "react-icons/fa";

interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
}

const availableProducts = [
  { id: 1, name: "Paracetamol 500mg", price: 25.99 },
  { id: 2, name: "Amoxicillin 250mg", price: 45.5 },
  { id: 3, name: "Insulin Pen", price: 89.99 },
  { id: 4, name: "Blood Pressure Monitor", price: 125.0 },
  { id: 5, name: "Vitamin D3 1000IU", price: 18.75 },
  { id: 6, name: "Surgical Masks (Box of 50)", price: 15.99 },
];

const Billing: React.FC = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
  });

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [invoiceNumber] = useState(`INV-${Date.now()}`);
  const [invoiceDate] = useState(new Date().toLocaleDateString());

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    if (!selectedProduct) {
      toast({
        title: "Please select a product",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const product = availableProducts.find(
      (p) => p.id.toString() === selectedProduct
    );
    if (!product) return;

    const newItem: InvoiceItem = {
      id: Date.now(),
      name: product.name,
      quantity,
      price: product.price,
      total: quantity * product.price,
    };

    setInvoiceItems((prev) => [...prev, newItem]);
    setSelectedProduct("");
    setQuantity(1);
  };

  const removeItem = (id: number) => {
    setInvoiceItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setInvoiceItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      )
    );
  };

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const generateInvoice = () => {
    if (!customerInfo.name || invoiceItems.length === 0) {
      toast({
        title: "Please fill customer information and add items",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Invoice Generated Successfully!",
      description: `Invoice ${invoiceNumber} has been created.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="2xl" color="brand.500" mb={2}>
            Invoice Generator
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Create professional invoices for your customers
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <Heading size="md" color="brand.500">
                Customer Information
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Customer Name</FormLabel>
                  <Input
                    name="name"
                    value={customerInfo.name}
                    onChange={handleCustomerInfoChange}
                    placeholder="Enter customer name"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Company</FormLabel>
                  <Input
                    name="company"
                    value={customerInfo.company}
                    onChange={handleCustomerInfoChange}
                    placeholder="Company name (optional)"
                  />
                </FormControl>

                <SimpleGrid columns={2} spacing={4} w="full">
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={handleCustomerInfoChange}
                      placeholder="customer@email.com"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      placeholder="Phone number"
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    name="address"
                    value={customerInfo.address}
                    onChange={handleCustomerInfoChange}
                    placeholder="Customer address"
                  />
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <Heading size="md" color="brand.500">
                Invoice Details
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <HStack w="full" justify="space-between">
                  <Text fontWeight="semibold">Invoice Number:</Text>
                  <Text color="brand.500" fontWeight="bold">
                    {invoiceNumber}
                  </Text>
                </HStack>

                <HStack w="full" justify="space-between">
                  <Text fontWeight="semibold">Date:</Text>
                  <Text>{invoiceDate}</Text>
                </HStack>

                <Divider />

                <Text fontWeight="semibold" alignSelf="start">
                  Add Items:
                </Text>

                <HStack w="full">
                  <Select
                    placeholder="Select product"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    flex={2}
                  >
                    {availableProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - ${product.price}
                      </option>
                    ))}
                  </Select>

                  <NumberInput
                    value={quantity}
                    onChange={(_, value) => setQuantity(value)}
                    min={1}
                    max={100}
                    w="100px"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>

                  <IconButton
                    aria-label="Add item"
                    icon={<FaPlus />}
                    colorScheme="brand"
                    onClick={addItem}
                  />
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Invoice Items */}
        <Card>
          <CardHeader>
            <Heading size="md" color="brand.500">
              Invoice Items
            </Heading>
          </CardHeader>
          <CardBody>
            {invoiceItems.length === 0 ? (
              <Text textAlign="center" color="gray.500" py={8}>
                No items added yet. Add products to generate invoice.
              </Text>
            ) : (
              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Product</Th>
                      <Th isNumeric>Quantity</Th>
                      <Th isNumeric>Price</Th>
                      <Th isNumeric>Total</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {invoiceItems.map((item) => (
                      <Tr key={item.id}>
                        <Td>{item.name}</Td>
                        <Td isNumeric>
                          <NumberInput
                            value={item.quantity}
                            onChange={(_, value) =>
                              updateQuantity(item.id, value)
                            }
                            min={1}
                            max={100}
                            size="sm"
                            w="80px"
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Td>
                        <Td isNumeric>${item.price.toFixed(2)}</Td>
                        <Td isNumeric fontWeight="semibold">
                          ${item.total.toFixed(2)}
                        </Td>
                        <Td>
                          <IconButton
                            aria-label="Remove item"
                            icon={<FaTrash />}
                            colorScheme="red"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </CardBody>
        </Card>

        {/* Invoice Summary */}
        {invoiceItems.length > 0 && (
          <Card>
            <CardBody>
              <VStack spacing={4} align="end">
                <HStack w="300px" justify="space-between">
                  <Text>Subtotal:</Text>
                  <Text fontWeight="semibold">${subtotal.toFixed(2)}</Text>
                </HStack>

                <HStack w="300px" justify="space-between">
                  <Text>Tax (10%):</Text>
                  <Text fontWeight="semibold">${tax.toFixed(2)}</Text>
                </HStack>

                <Divider w="300px" />

                <HStack w="300px" justify="space-between">
                  <Text fontSize="lg" fontWeight="bold">
                    Total:
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="brand.500">
                    ${total.toFixed(2)}
                  </Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Action Buttons */}
        <HStack spacing={4} justify="center">
          <Button
            leftIcon={<FaEye />}
            colorScheme="brand"
            onClick={onOpen}
            isDisabled={invoiceItems.length === 0}
          >
            Preview Invoice
          </Button>

          <Button
            leftIcon={<FaPrint />}
            colorScheme="blue"
            onClick={printInvoice}
            isDisabled={invoiceItems.length === 0}
          >
            Print Invoice
          </Button>

          <Button
            leftIcon={<FaDownload />}
            colorScheme="green"
            onClick={generateInvoice}
            isDisabled={invoiceItems.length === 0}
          >
            Generate Invoice
          </Button>
        </HStack>
      </VStack>

      {/* Invoice Preview Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invoice Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box p={8} bg="white" border="1px" borderColor="gray.200">
              {/* Invoice Header */}
              <HStack justify="space-between" mb={8}>
                <VStack align="start">
                  <Heading size="lg" color="brand.500">
                    RoteMed
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    Medical Wholesaler
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    123 Medical Plaza
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Healthcare District, City 12345
                  </Text>
                </VStack>
                <VStack align="end">
                  <Text fontSize="2xl" fontWeight="bold">
                    INVOICE
                  </Text>
                  <Text>#{invoiceNumber}</Text>
                  <Text>{invoiceDate}</Text>
                </VStack>
              </HStack>

              {/* Customer Info */}
              <Box mb={8}>
                <Text fontWeight="bold" mb={2}>
                  Bill To:
                </Text>
                <Text>{customerInfo.name}</Text>
                {customerInfo.company && <Text>{customerInfo.company}</Text>}
                <Text>{customerInfo.address}</Text>
                <Text>{customerInfo.email}</Text>
                <Text>{customerInfo.phone}</Text>
              </Box>

              {/* Items Table */}
              <Table variant="simple" mb={8}>
                <Thead>
                  <Tr>
                    <Th>Description</Th>
                    <Th isNumeric>Qty</Th>
                    <Th isNumeric>Price</Th>
                    <Th isNumeric>Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {invoiceItems.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.name}</Td>
                      <Td isNumeric>{item.quantity}</Td>
                      <Td isNumeric>${item.price.toFixed(2)}</Td>
                      <Td isNumeric>${item.total.toFixed(2)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              {/* Totals */}
              <VStack align="end" spacing={2}>
                <HStack w="200px" justify="space-between">
                  <Text>Subtotal:</Text>
                  <Text>${subtotal.toFixed(2)}</Text>
                </HStack>
                <HStack w="200px" justify="space-between">
                  <Text>Tax (10%):</Text>
                  <Text>${tax.toFixed(2)}</Text>
                </HStack>
                <Divider w="200px" />
                <HStack w="200px" justify="space-between">
                  <Text fontWeight="bold">Total:</Text>
                  <Text fontWeight="bold">${total.toFixed(2)}</Text>
                </HStack>
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Billing;
