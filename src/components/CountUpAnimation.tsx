"use client";

import type React from "react";
import { Text, type TextProps } from "@chakra-ui/react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface CountUpAnimationProps extends TextProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const CountUpAnimation: React.FC<CountUpAnimationProps> = ({
  value,
  duration = 2,
  suffix = "",
  prefix = "",
  ...props
}) => {
  const ref = useRef<Element>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.onChange((latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest) + suffix;
      }
    });

    return () => unsubscribe();
  }, [springValue, prefix, suffix]);

  return <Text ref={ref} {...props} />;
};

export default CountUpAnimation;
