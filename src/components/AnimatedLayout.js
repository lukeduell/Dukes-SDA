import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function AnimatedLayout() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      style={{ position: 'relative' }}
    >
      {/* Renders whatever route is nested (TeamList or TeamDetails) */}
      <Outlet />
    </motion.div>
  );
}
