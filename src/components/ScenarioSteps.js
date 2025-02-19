// client/src/components/ScenarioSteps.js

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Modal = styled(motion.div)`
  background: #1c1c1c;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  border-radius: 8px;
  text-align: center;
  position: relative;
  color: #fff;
  border: 3px solid transparent;
  background-clip: padding-box;
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    padding: 3px;
    background: linear-gradient(45deg, #ff2e63, #08f7fe);
    z-index: -1;
    mask-composite: exclude;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Round = styled.h3`
  margin: 1rem 0 0.5rem;
  font-size: 1.5rem;
`;

const Opponent = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const ProgressBarContainer = styled.div`
  width: 80%;
  background: #333;
  border-radius: 4px;
  margin: 0.5rem auto;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 20px;
  background: linear-gradient(45deg, #ff2e63, #08f7fe);
`;

const NavigationBar = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

const NavButton = styled.button`
  background: #333;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

export default function ScenarioSteps({ teamId, teamName, onClose }) {
  const [scenario, setScenario] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/scenario/${teamId}`)
      .then((res) => res.json())
      .then((data) => {
        setScenario(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching scenario:', err);
        setLoading(false);
      });
  }, [teamId]);

  if (loading) return null;
  if (!scenario.length) return null;

  const currentStep = scenario[stepIndex];
  const totalSteps = scenario.length;
  const progressPercent = currentStep.probability * 100;

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Modal
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
        >
          <Title>{teamName} Path to the Championship</Title>
          <Round>{currentStep.round}</Round>
          <Opponent>Opponent: {currentStep.opponent}</Opponent>
          <p>Win Probability: {progressPercent.toFixed(1)}%</p>
          <ProgressBarContainer>
            <ProgressBar
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6 }}
            />
          </ProgressBarContainer>

          <NavigationBar>
            <NavButton
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((prev) => prev - 1)}
            >
              Previous
            </NavButton>
            <NavButton onClick={onClose}>Close</NavButton>
            <NavButton
              disabled={stepIndex === totalSteps - 1}
              onClick={() => setStepIndex((prev) => prev + 1)}
            >
              Next
            </NavButton>
          </NavigationBar>
        </Modal>
      </Overlay>
    </AnimatePresence>
  );
}
