"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Card,
  CardBody,
  useToast,
} from "@chakra-ui/react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from "react-icons/fa"

const contactInfo = [
  {
    icon: FaPhone,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: FaEnvelope,
    title: "Email",
    details: ["info@rotemed.com", "orders@rotemed.com"],
  },
  {
    icon: FaMapMarkerAlt,
    title: "Address",
    details: ["123 Medical Plaza", "Healthcare District, City 12345"],
  },
  {
    icon: FaClock,
    title: "Business Hours",
    details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
  },
]

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const toast = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you soon.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    })
  }

  const handleWhatsAppContact = () => {
    const message = "Hello RoteMed, I would like to get more information about your products and services."
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Container maxW="7xl" py={12}>
      {/* Header */}
      <VStack spacing={6} mb={12} textAlign="center">
        <Heading as="h1" size="2xl" color="brand.500">
          Contact Us
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="2xl">
          Get in touch with our team for inquiries, orders, or support. We're here to help you with all your medical
          supply needs.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
        {/* Contact Information */}
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h2" size="lg" mb={6} color="brand.500">
              Get in Touch
            </Heading>
            <VStack spacing={6} align="stretch">
              {contactInfo.map((info, index) => (
                <Card key={index} variant="outline">
                  <CardBody>
                    <HStack spacing={4} align="start">
                      <Icon as={info.icon} w={6} h={6} color="brand.500" mt={1} />
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold" color="brand.500">
                          {info.title}
                        </Text>
                        {info.details.map((detail, idx) => (
                          <Text key={idx} color="gray.600" fontSize="sm">
                            {detail}
                          </Text>
                        ))}
                      </VStack>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </Box>

          {/* Quick Contact Buttons */}
          <VStack spacing={4}>
            <Button leftIcon={<FaWhatsapp />} colorScheme="whatsapp" size="lg" w="full" onClick={handleWhatsAppContact}>
              Contact us on WhatsApp
            </Button>
            <Button
              as="a"
              href="tel:+15551234567"
              leftIcon={<FaPhone />}
              colorScheme="brand"
              variant="outline"
              size="lg"
              w="full"
            >
              Call Now
            </Button>
          </VStack>
        </VStack>

        {/* Contact Form */}
        <Card>
          <CardBody>
            <Heading as="h2" size="lg" mb={6} color="brand.500">
              Send us a Message
            </Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Company</FormLabel>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your requirements..."
                    rows={5}
                  />
                </FormControl>

                <Button type="submit" colorScheme="brand" size="lg" w="full">
                  Send Message
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Map Section */}
      <Box mt={12}>
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="brand.500">
          Our Location
        </Heading>
        <Box borderRadius="lg" overflow="hidden" h="400px">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959729807!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="RoteMed Location"
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Contact
