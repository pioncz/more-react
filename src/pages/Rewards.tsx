import { Link } from "react-router";
import { styled } from "src/stitches.config";

const Rewards = () => {
  return (
    <>Rewards<Button>Button</Button><Link to="/">Home</Link></>
  )
};

const Button = styled('button', {
  backgroundColor: '$primary',
  borderRadius: '9999px',
  fontSize: '13px',
  padding: '10px 15px',
  border: 'none',
  transition: '$default',
  '&:hover': {
    backgroundColor: '$secondary',
  },
});

export default Rewards;