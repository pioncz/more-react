import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <h1>Vite + React</h1>
      <Link to="/team">Team</Link>
      <Link to="/rewards">Rewards</Link>
    </>
  )
};

export default Home;