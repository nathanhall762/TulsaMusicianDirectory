import useBearStore from '../../bearStore';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const AddButtons = () => {
  const user = useBearStore((state) => state.user);
  const navigate = useNavigate();

  const [isAddButtonHovered, setIsAddButtonHovered] = useState(false);
  const [isApproveButtonHovered, setIsApproveButtonHovered] = useState(false);

  return (
    <AddButtonContainer>
      {/* show button link to MusicianApprovePage if user is admin */}
      {user.isAdmin ? (
        <AddButton
          $backgroundColor='var(--color-primary)'
          onClick={() => navigate('/approvemusician')}
          onMouseEnter={() => setIsApproveButtonHovered(true)}
          onMouseLeave={() => setIsApproveButtonHovered(false)}
        >
          {isApproveButtonHovered ? (
            'Approve Musician'
          ) : (
            <FontAwesomeIcon icon={faCheck} />
          )}
        </AddButton>
      ) : null}
      {/* show add musician button only if logged in */}
      <AddButton
        $backgroundColor='var(--color-accent)'
        onClick={() => navigate('/addmusician')}
        onMouseEnter={() => setIsAddButtonHovered(true)}
        onMouseLeave={() => setIsAddButtonHovered(false)}
      >
        {isAddButtonHovered ? (
          'Add Musician'
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
      </AddButton>
    </AddButtonContainer>
  );
};

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  position: sticky;
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
  &:hover {
    background-color: var(--color-background-alt);
    cursor: pointer;
    font-size: 1rem;
  }
`;

export default AddButtons;
