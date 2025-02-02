import { styled } from '@/stitches.config';
import Box from '../Box/Box';

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <Root justifyContent="center" alignItems="center">
      {children}
    </Root>
  );
};

const Root = styled(Box, {
  flex: '1 1',
  gap: '$4',
});

export default Page;
