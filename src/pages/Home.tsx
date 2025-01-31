import Box from '@/components/Box/Box';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import { styled } from '@/stitches.config';
import { userChampionsSlice } from '@/store/slices/userChampions.slice';
import { fetchSharedAccount } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Home = () => {
  const [hhLink, setHhLink] = useState(
    localStorage.getItem('sharedLink') || '',
  );
  const [sharedKey, setSharedKey] = useState('');
  const [underscore, setUnderscore] = useState('');
  const fetchEnabled = sharedKey !== '' && underscore !== '';
  const {
    isPending,
    isError: isFetchError,
    data,
    error,
  } = useQuery({
    queryKey: ['sharedAccount'],
    queryFn: fetchSharedAccount({ sharedKey, underscore }),
    enabled: fetchEnabled,
  });
  const isLoading = isPending && fetchEnabled;
  const [isLinked, setIsLinked] = useState(
    !!localStorage.getItem('sharedAccount'),
  );
  const [urlError, setUrlError] = useState<Error | null>();
  const isError = !!urlError || isFetchError;
  const errorMessage = urlError ? urlError?.message : error?.message;
  const dispatch = useDispatch();

  const handleReset = () => {
    setHhLink('');
  };

  const handleSend = () => {
    const parsedUrl = URL.parse(hhLink);
    const newSharedKey = parsedUrl?.searchParams.get('sharedKey');
    const newUnderscore = parsedUrl?.searchParams.get('_');

    if (newSharedKey && newUnderscore) {
      setUrlError(null);
      setSharedKey(newSharedKey);
      setUnderscore(newUnderscore);
    } else {
      setUrlError(new Error('Invalid url'));
    }
  };

  useEffect(() => {
    if (data && hhLink) {
      localStorage.setItem('sharedLink', hhLink);
      localStorage.setItem('sharedAccount', JSON.stringify(data));
      setIsLinked(true);
      dispatch(
        userChampionsSlice.actions.setSharedAccountAction(data),
      );
    }
  }, [dispatch, hhLink, data]);

  return (
    <Root loading={isLoading}>
      <h1>Welcome in the Chimera team builder</h1>
      <p>
        Share your HH Optimiser link, so we can prepare team
        propositions for you
      </p>
      <Box gap={'$2'}>
        <Input
          placeholder="HH optimiser link..."
          value={hhLink}
          onChange={(e) => setHhLink(e.target.value)}
          disabled={isLoading}
        />
        <Button
          primary={false}
          disabled={isLoading}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button disabled={isLoading} onClick={handleSend}>
          Save
        </Button>
        <AnimatePresence initial={false}>
          {isLoading && (
            <MotionLoader
              key="loader"
              initial={{
                opacity: 0,
                top: 'calc(50% - 20px)',
              }}
              animate={{
                opacity: 1,
                top: '50%',
              }}
              exit={{
                opacity: 0,
                top: 'calc(50% + 20px)',
              }}
            />
          )}
        </AnimatePresence>
      </Box>
      <ResultLabel visible={isLinked || isError}>
        {isLinked && '✅ Account successfully linked'}
        {isError && '❌ Error: ' + errorMessage}
      </ResultLabel>
    </Root>
  );
};

const Root = styled(Card, {
  transition: '$1',

  variants: {
    loading: {
      true: {
        color: '$gray300',
      },
    },
  },
});

const ResultLabel = styled('div', {
  boxSizing: 'border-box',
  transition: '$1',
  margin: '$3 0',
  height: 24,

  variants: {
    visible: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
});

const MotionLoader = motion.create(Loader);

export default Home;
