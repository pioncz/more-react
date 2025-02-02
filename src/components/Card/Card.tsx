import { styled } from '@/stitches.config';
import Box from '../Box/Box';

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Root className={className} flexDirection="column">
      {children}
    </Root>
  );
};

const Root = styled(Box, {
  padding: '$4',
  border: '1px solid $gray100alpha',
  borderRadius: '$1',
  background: '$gray800alpha',
  backdropFilter: '$blurs$1',
});

export default Card;
