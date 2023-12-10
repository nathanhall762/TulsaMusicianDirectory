import useBearStore from '../../bearStore';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AddButtons = () => {
  const user = useBearStore((state) => state.user);

  const [isAddButtonHovered, setIsAddButtonHovered] = useState(false);
  const [isApproveButtonHovered, setIsApproveButtonHovered] = useState(false);

  return (
    <AddButtonContainer className='add-button'>
      {/* show button link to MusicianApprovePage if user is admin */}
      {user?.isAdmin ? (
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
              <i className='fa-solid fa-check' aria-hidden='true' />
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
          {/* TODO: show text on button when in desktop */}
          {isAddButtonHovered ? (
            'Add Musician'
          ) : (
            <i className='fa-solid fa-plus' aria-hidden='true' />
          )}
        </AddButton>
      </Link>
    </AddButtonContainer>
  );
};

export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  height: 10vh;
  padding: 0.5rem;
`;

export const AddButton = styled.button<{ $backgroundColor: string }>`
  background-color: ${(props) => props.$backgroundColor};
  color: var(--color-text-inverse);
  border: none;
  height: 4rem;
  /* width: 5rem; */
  border-radius: 25px;
  transition: all var(--animation-speed-fast) ease;
  margin: 0.5rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  &:hover {
    background-color: var(--color-background-alt);
    cursor: pointer;
  }
  i {
    margin-right: 1rem;
  }
  @media (max-width: 768px) {
    height: 5rem;
    width: 5rem;
    border-radius: 100%;
    font-size: 2rem;
    padding: 0 1rem;
    span {
      display: none;
    }
    i {
      margin-right: 0;
    }
    &:hover {
    font-size: 1rem;

    }
  }
`;

export default AddButtons;
