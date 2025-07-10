"use client";

import type React from "react";
import { Text, type TextProps } from "@chakra-ui/react";

interface GradientTextProps extends TextProps {
  gradient?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  gradient = "linear(to-r, brand.500, medical.500)",
  ...props
}) => {
  return (
    <Text bgGradient={gradient} bgClip="text" fontWeight="bold" {...props}>
      {children}
    </Text>
  );
};

export default GradientText;
