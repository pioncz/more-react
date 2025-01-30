import Box from '@/components/Box/Box';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import { useState } from 'react';

const Home = () => {
  const [hhLink, setHhLink] = useState('');

  return (
    <Card>
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
        />
        <Button primary={false}>Reset</Button>
        <Button>Save</Button>
        <Loader />
      </Box>
    </Card>
  );
};

export default Home;
