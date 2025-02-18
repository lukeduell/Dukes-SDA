// client/src/components/TeamCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Card = styled(motion.div)`
  background: #2a2a2a;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  width: 220px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  font-family: 'Bebas Neue', sans-serif;
  position: relative;
  transition: transform 0.2s ease;

  /* Add a subtle gradient border using pseudo-element */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    padding: 2px; 
    background: linear-gradient(45deg, #ff2e63, #08f7fe);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border: 2px solid #444;
  border-radius: 50%;
`;

export default function TeamCard({ team }) {
  const navigate = useNavigate();

  return (
    <Card
      whileHover={{
        scale: 1.05,
        boxShadow: '0 8px 20px rgba(255,46,99,0.3)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/teams/${team.id}`)}
    >
      <Logo src={team.logo} alt={team.name} />
      <h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem' }}>
        {team.name}
      </h3>
    </Card>
  );
}
