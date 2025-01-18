import { styled } from '@/stitches.config';
import { Difficulty } from './RewardsHelper';
import Tabs from '@/components/Tabs/Tabs';
import { useState } from 'react';
import RewardsTable from './RewardsTable';
import Card from '@/components/Card/Card';

const Rewards = () => {
  const [selectedTab, setSelectedTab] = useState(Difficulty.Easy);

  const tabItems = Object.entries(Difficulty).map(([key, value]) => ({
    id: key,
    label: value,
    content: <p>{value}</p>,
  }));

  return (
    <Card>
      <Tabs
        items={tabItems}
        selected={selectedTab}
        onSelect={setSelectedTab}
      >
        {(item) => (
          <div key={item.id} title={item.label}>
            <RewardsTable difficulty={item.id} />
          </div>
        )}
      </Tabs>
    </Card>
  );
};

export default Rewards;
