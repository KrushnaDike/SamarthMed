"use client"

import type React from "react"
import { Box, useColorModeValue } from "@chakra-ui/react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const MotionBox = motion(Box)

interface ParallaxSectionProps {
  children: React.ReactNode
  offset?: number
  backgroundImage?: string
  height?: string
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  offset = 50,
  backgroundImage,
  height = "100vh",
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, offset])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  const overlayBg = useColorModeValue("rgba(255, 255, 255, 0.9)", "rgba(0, 0, 0, 0.8)")

  return (
    <Box ref={ref} position="relative" height={height} overflow="hidden">
      {backgroundImage && (
        <MotionBox
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundAttachment="fixed"
          style={{ y, opacity }}
        />
      )}
      <Box position="absolute" top={0} left={0} right={0} bottom={0} bg={backgroundImage ? overlayBg : "transparent"} />
      <Box position="relative" zIndex={1} height="100%">
        {children}
      </Box>
    </Box>
  )
}

export default ParallaxSection
