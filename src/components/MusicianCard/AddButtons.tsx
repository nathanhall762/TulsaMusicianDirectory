import useBearStore from '../../bearStore';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const AddButtons = () => {
  const user = useBearStore((state) => state.user);

  const [isAddButtonHovered, setIsAddButtonHovered] = useState(false);
  const [isApproveButtonHovered, setIsApproveButtonHovered] = useState(false);

  return (
    <AddButtonContainer>
      {/* show button link to MusicianApprovePage if user is admin */}
      {user.isAdmin ? (
        <Link to='/approvemusician' aria-label='approve musician'>
          <AddButton
            $backgroundColor='var(--color-primary)'
            onMouseEnter={() => setIsApproveButtonHovered(true)}
            onMouseLeave={() => setIsApproveButtonHovered(false)}
            aria-label='approve musician'
          >
            {isApproveButtonHovered ? (
              'Approve Musician'
            ) : (
              <FontAwesomeIcon icon={faCheck} aria-hidden='true' />
            )}
          </AddButton>
        </Link>
      ) : null}
      {/* show add musician button only if logged in */}
      <Link to='/addmusician' aria-label='add musician to directory'>
        <AddButton
          $backgroundColor='var(--color-accent)'
          onMouseEnter={() => setIsAddButtonHovered(true)}
          onMouseLeave={() => setIsAddButtonHovered(false)}
          aria-label='add musician to directory'
        >
          {isAddButtonHovered ? (
            'Add Musician'
          ) : (
            <FontAwesomeIcon icon={faPlus} aria-hidden='true' />
          )}
        </AddButton>
      </Link>
    </AddButtonContainer>
  );
};

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  height: 10vh;
  padding: 0.5rem;
`;

const AddButton = styled.button<{ $backgroundColor: string }>`
  background-color: ${(props) => props.$backgroundColor};
  color: var(--color-text-inverse);
  border: none;
  height: 5rem;
  width: 5rem;
  border-radius: 100%;
  transition: all var(--animation-speed-fast) ease;
  margin: 0.5rem;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: var(--color-background-alt);
    cursor: pointer;
    font-size: 1rem;
  }
`;

export default AddButtons;
