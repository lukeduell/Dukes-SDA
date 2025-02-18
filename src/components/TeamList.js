// client/src/components/TeamList.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import TeamCard from './TeamCard';
import HeroBanner from './HeroBanner';

const Container = styled.div`
  background: #1c1c1c; /* dark background */
  min-height: 100vh;
  padding: 2rem;
  color: #fff;
  font-family: 'Bebas Neue', sans-serif;
`;

const Grid = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LoadingText = styled.h2`
  text-align: center;
  margin-top: 4rem;
  font-size: 2rem;
`;

export default function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/teams')
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching teams:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container>
        <HeroBanner />
        <LoadingText>Loading Teams...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <HeroBanner />
      <Grid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </Grid>
    </Container>
  );
}
