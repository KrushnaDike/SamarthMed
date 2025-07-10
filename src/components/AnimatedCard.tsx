"use client";

import type React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  hover?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  direction = "up",
  hover = true,
}) => {
  const shadow = useColorModeValue("lg", "dark-lg");
  const hoverShadow = useColorModeValue("2xl", "dark-2xl");

  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
  };

  return (
    <MotionBox
      initial={directionVariants[direction]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      whileHover={
        hover
          ? {
              y: -8,
              transition: { duration: 0.3 },
            }
          : {}
      }
      shadow={shadow}
      _hover={{
        shadow: hoverShadow,
        transform: hover ? "translateY(-8px)" : "none",
      }}
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      transition="all 0.3s ease"
    >
      {children}
    </MotionBox>
  );
};

export default AnimatedCard;
