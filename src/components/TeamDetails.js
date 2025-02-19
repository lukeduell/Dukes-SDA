// client/src/components/TeamDetails.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ScenarioSteps from './ScenarioSteps';

const Container = styled.div`
  background: #1c1c1c;
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  font-family: 'Bebas Neue', sans-serif;
`;

const SwirlBackground = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at center, rgba(255,46,99,0.2), transparent 70%);
  pointer-events: none; 
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  margin-bottom: 1rem;
  background: #555;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TeamHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  img {
    width: 120px;
    height: 120px;
    border: 3px solid #ff2e63;
    border-radius: 50%;
    margin-right: 1rem;
    object-fit: cover;
  }

  h2 {
    font-size: 2.5rem;
    margin: 0;
    text-transform: uppercase;
  }
`;

const StatsBox = styled.div`
  background: #2a2a2a;
  border-radius: 8px;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 10px rgba(255,46,99,0.2);
`;

const StatLine = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  letter-spacing: 0.5px;
  color: #ccc;
`;

const BigButton = styled.button`
  background: linear-gradient(135deg, #ff2e63, #08f7fe);
  color: #fff;
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 1rem;
`;

export default function TeamDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScenario, setShowScenario] = useState(false);

  useEffect(() => {
    fetch('/api/teams')
      .then((res) => res.json())
      .then((allTeams) => {
        const found = allTeams.find((t) => t.id === Number(id));
        setTeam(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching team:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container>
        <SwirlBackground />
        <Content>
          <p>Loading team...</p>
        </Content>
      </Container>
    );
  }

  if (!team) {
    return (
      <Container>
        <SwirlBackground />
        <Content>
          <p>Team not found.</p>
          <BackButton onClick={() => navigate('/')}>Back to Home</BackButton>
        </Content>
      </Container>
    );
  }

  const confRecord = `${team.confWins}-${team.confLosses}`;
  const overallRecord = `${team.overallWins}-${team.overallLosses}`;
  const logoUrl = `https://via.placeholder.com/120x120?text=${encodeURIComponent(team.name)}`;

  return (
    <Container>
      <SwirlBackground />
      <Content>
        <BackButton onClick={() => navigate('/')}>⬅ Back</BackButton>

        <TeamHeader>
          <img src={logoUrl} alt={team.name} />
          <h2>{team.name}</h2>
        </TeamHeader>

        <StatsBox>
          <StatLine>Rank: {team.rank}</StatLine>
          <StatLine>Conference Record: {confRecord}</StatLine>
          <StatLine>Overall Record: {overallRecord}</StatLine>
          <StatLine>Home: {team.homeRecord}</StatLine>
          <StatLine>Road: {team.roadRecord}</StatLine>
          <StatLine>Streak: {team.streak}</StatLine>
          <StatLine>Offensive Efficiency: {team.offensiveEfficiency}</StatLine>
          <StatLine>Defensive Efficiency: {team.defensiveEfficiency}</StatLine>
          <StatLine>Strength of Schedule: {team.strengthOfSchedule}</StatLine>
        </StatsBox>

        <BigButton onClick={() => setShowScenario(true)}>
          What does it take to go all the way?
        </BigButton>

        {showScenario && (
          <ScenarioSteps
            teamId={team.id}
            teamName={team.name}
            onClose={() => setShowScenario(false)}
          />
        )}
      </Content>
    </Container>
  );
}
