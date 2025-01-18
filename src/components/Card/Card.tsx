import { styled } from '@/stitches.config';

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <Root className={className}>{children}</Root>;
};

const Root = styled('div', {
  padding: '$4',
  border: '1px solid $gray100alpha',
  borderRadius: '$1',
  background: '$gray800alpha',
  backdropFilter: '$blurs$1',
});

export default Card;
