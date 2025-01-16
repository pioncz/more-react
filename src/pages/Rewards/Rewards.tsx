import { styled } from '@/stitches.config';
import { Difficulty } from './RewardsHelper';
import Tabs from '@/components/Tabs/Tabs';
import { useState } from 'react';
import RewardsTable from './RewardsTable';

const Rewards = () => {
  const [selectedTab, setSelectedTab] = useState(Difficulty.Easy);

  const tabItems = Object.entries(Difficulty).map(([key, value]) => ({
    id: key,
    label: value,
    content: <p>{value}</p>,
  }));

  return (
    <Root>
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
    </Root>
  );
};

const Root = styled('div', {
  padding: '$3',
  border: '1px solid $gray100alpha',
  borderRadius: '$1',
  background: '$gray800alpha',
  backdropFilter: '$blurs$1',
});

export default Rewards;
