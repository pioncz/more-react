import { Difficulty } from './RewardsHelper';
import Tabs from '@/components/Tabs/Tabs';
import { useState } from 'react';
import RewardsTable from './RewardsTable';
import Card from '@/components/Card/Card';
import { useQuery } from '@tanstack/react-query';
import { fetchRewards } from '@/utils/api';
import Loader from '@/components/Loader/Loader';
import NetworkError from '@/components/NetworkError/NetworkError';

const Rewards = () => {
  const [selectedTab, setSelectedTab] = useState(Difficulty.Easy);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['rewards'],
    queryFn: fetchRewards,
  });

  const tabItems = Object.entries(Difficulty).map(([key, value]) => ({
    id: key,
    label: value,
    content: <p>{value}</p>,
  }));

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <NetworkError error={error} />;
  }

  return (
    <Card>
      <Tabs
        items={tabItems}
        selected={selectedTab}
        onSelect={setSelectedTab}
      >
        {(item) => (
          <div key={item.id} title={item.label}>
            <RewardsTable difficulty={item.id} rewards={data} />
          </div>
        )}
      </Tabs>
    </Card>
  );
};

export default Rewards;
