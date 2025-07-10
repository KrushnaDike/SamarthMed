"use client";

import type React from "react";
import { Box, Spinner, VStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface LoadingSpinnerProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Loading...",
  size = "lg",
}) => {
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <VStack spacing={4} py={12}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size={size}
        />
        <Text color="gray.600" fontSize="lg">
          {text}
        </Text>
      </VStack>
    </MotionBox>
  );
};

export default LoadingSpinner;
