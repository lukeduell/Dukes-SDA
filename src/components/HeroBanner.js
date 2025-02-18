// client/src/components/HeroBanner.js
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #ff2e63, #08f7fe);
  color: #fff;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0 0;
  opacity: 0.9;
`;

const PulseBlob = styled(motion.div)`
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
  top: -50px;
  right: -50px;
  border-radius: 50%;
`;

export default function HeroBanner() {
  return (
    <BannerWrapper>
      <PulseBlob
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      />
      <Title>March Madness Bracketology</Title>
      <Subtitle>The Road to the Championship Starts Here</Subtitle>
    </BannerWrapper>
  );
}
