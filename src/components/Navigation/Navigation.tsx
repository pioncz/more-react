import { styled } from '@/stitches.config';
import { NavLink } from 'react-router';
import Box from '@/components/Box/Box';
import routes from '@/utils/routes';

const Navigation = () => {
  return (
    <Root justifyContent="center">
      {routes.map(({ path, label }) => (
        <Button key={path} to={path}>
          {label}
        </Button>
      ))}
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
