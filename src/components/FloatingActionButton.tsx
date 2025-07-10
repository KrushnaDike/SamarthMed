"use client";

import type React from "react";
import { IconButton, useColorModeValue, Tooltip } from "@chakra-ui/react";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const MotionIconButton = motion(IconButton);

const FloatingActionButton: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const bg = useColorModeValue("whatsapp.500", "whatsapp.600");
  const scrollBg = useColorModeValue("brand.500", "brand.600");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const message = "Hello RoteMed! I'm interested in your medical products.";
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* WhatsApp Button */}
      <Tooltip label="Chat on WhatsApp" placement="left">
        <MotionIconButton
          aria-label="WhatsApp"
          icon={<FaWhatsapp />}
          size="lg"
          colorScheme="whatsapp"
          bg={bg}
          position="fixed"
          bottom="6"
          right="6"
          borderRadius="full"
          shadow="lg"
          zIndex={1000}
          onClick={openWhatsApp}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        />
      </Tooltip>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <Tooltip label="Scroll to top" placement="left">
            <MotionIconButton
              aria-label="Scroll to top"
              icon={<FaArrowUp />}
              size="md"
              bg={scrollBg}
              color="white"
              position="fixed"
              bottom="24"
              right="6"
              borderRadius="full"
              shadow="lg"
              zIndex={1000}
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
          </Tooltip>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActionButton;
