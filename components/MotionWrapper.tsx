// components/MotionWrapper.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const variants = {
  up: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 } },
};

export default function MotionWrapper({
  children,
  delay = 0,
  direction = "up",
}: MotionWrapperProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        initial: variants[direction].initial,
        animate: variants[direction].animate,
      }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
