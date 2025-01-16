import { styled } from '@/stitches.config';
import { NavLink } from 'react-router';
import Box from '@/components/Box/Box';

const Navigation = () => {
  return (
    <Root justifyContent="center">
      <Button to="/">Home</Button>
      <Button to="/team">Team</Button>
      <Button to="/rewards">Rewards</Button>
    </Root>
  );
};

const Root = styled(Box, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '60px',
  background: '$gray800alpha',
  backdropFilter: '$blurs$1',
  borderBottom: '1px solid $gray100alpha',
});

const Button = styled(NavLink, {
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$5',
  transition: '$1',

  '&:hover, &.active': {
    background: '$gray100alpha',
  },
});

export default Navigation;
