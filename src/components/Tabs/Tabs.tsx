import React from 'react';
import { styled } from '@/stitches.config';
import Box from '@/components/Box/Box';
import Button from '@/components/Button/Button';

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

const Tabs = ({
  items,
  selected,
  onSelect,
  children,
}: {
  items: TabItem[];
  children: (item: TabItem) => React.ReactElement;
  selected: string;
  onSelect: (id: string) => void;
}) => {
  const currentItem = items.find((i) => i.id === selected);

  return (
    <Root flexDirection="column">
      <Navigation>
        {items.map((item) => (
          <Button
            key={item.id}
            selected={item.id === selected}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </Navigation>
      <div>{currentItem ? children(currentItem) : null}</div>
    </Root>
  );
};

const Root = styled(Box, {
  background: '$gray500',
  padding: '$2',
  boxShadow: '$1',
  borderRadius: '$1',
});

const Navigation = styled(Box, {
  borderTopLeftRadius: '$1',
  borderTopRightRadius: '$1',
  gap: '$1',
});

export default Tabs;
