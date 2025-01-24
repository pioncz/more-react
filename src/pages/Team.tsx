import Button from '@/components/Button/Button';
import { styled } from '@/stitches.config';
import { getUserChampionIds } from '@/store/selectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Team = () => {
  const userChampionIds = useSelector(getUserChampionIds);
  const navigate = useNavigate();

  const handleChampionsClick = () => {
    navigate('/champions');
  };

  return (
    <>
      <h1>Team</h1>
      {!userChampionIds.length ? (
        <>
          <div>
            To find a team you need to select what champions you have.
          </div>
          <div>Please navigate to</div>
          <div>
            <StyledButton onClick={handleChampionsClick}>
              Champions
            </StyledButton>
          </div>
        </>
      ) : null}
    </>
  );
};

const StyledButton = styled(Button, {
  margin: '$3',
});

export default Team;
