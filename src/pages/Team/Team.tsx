import Button from '@/components/Button/Button';
import Loader from '@/components/Loader/Loader';
import NetworkError from '@/components/NetworkError/NetworkError';
import { styled } from '@/stitches.config';
import {
  getIgnoredChampionIds,
  getSharedAccount,
} from '@/store/selectors';
import { fetchRewards, fetchSkills, fetchTrials } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { findChimeraTeams } from './TeamHelpers';
import { Difficulty } from '@/types/types';

const Team = () => {
  const sharedAccount = useSelector(getSharedAccount);
  const ignoredChampionIds = useSelector(getIgnoredChampionIds);
  const navigate = useNavigate();

  const {
    isPending: isPendingTrials,
    isError: isErrorTrials,
    data: dataTrials,
    error: errorTrials,
  } = useQuery({
    queryKey: ['trials'],
    queryFn: fetchTrials,
  });
  const {
    isPending: isPendingSkills,
    isError: isErrorSkills,
    data: dataSkills,
    error: errorSkills,
  } = useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
  });
  const {
    isPending: isPendingRewards,
    isError: isErrorRewards,
    data: dataRewards,
    error: errorRewards,
  } = useQuery({
    queryKey: ['rewards'],
    queryFn: fetchRewards,
  });

  const isPending =
    isPendingTrials || isPendingSkills || isPendingRewards;
  const isError = isErrorTrials || isErrorSkills || isErrorRewards;
  const error = errorTrials || errorSkills || errorRewards;

  const handleChampionsClick = () => {
    navigate('/champions');
  };

  if (isPending) {
    return <Loader />;
  }

  if (isError && error) {
    return <NetworkError error={error} />;
  }

  const teams = findChimeraTeams(
    sharedAccount?.heroTypes || [],
    dataTrials,
    ignoredChampionIds,
    dataSkills,
    dataRewards,
    Difficulty.UltraNightmare,
    { isStoneSkin: false, isIntercept: false },
  );

  return (
    <>
      <h1>Team</h1>
      {!sharedAccount?.heroTypes.length ? (
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
