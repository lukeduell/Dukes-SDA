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

  &:hover {
    box-shadow: 0 8px 20px rgba(255,46,99,0.3);
  }
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border: 2px solid #444;
  border-radius: 50%;
`;

const StatLine = styled.p`
  margin: 0.3rem 0;
  font-size: 1.0rem;
  color: #ccc;
  letter-spacing: 0.5px;
`;

export default function TeamCard({ team }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/teams/${team.id}`);
  };

  // If you have a team logo URL, place it in the data. Otherwise, placeholders:
  const logoUrl = `https://via.placeholder.com/80x80?text=${encodeURIComponent(team.name)}`;

  const confRecord = `${team.confWins}-${team.confLosses}`;
  const overallRecord = `${team.overallWins}-${team.overallLosses}`;

  return (
    <Card
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
    >
      <Logo src={logoUrl} alt={team.name} />
      <h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem', color: '#fff' }}>
        {team.name}
      </h3>
      <StatLine>Rank: {team.rank}</StatLine>
      <StatLine>Conf: {confRecord}</StatLine>
      <StatLine>Overall: {overallRecord}</StatLine>
      <StatLine>Streak: {team.streak}</StatLine>
    </Card>
  );
}
