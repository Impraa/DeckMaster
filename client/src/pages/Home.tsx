import { Link } from "react-router-dom";

const Home = () => {
  return (
  <div>Home <Link to={'/edit-profile/1'}>profil</Link></div>
  );
};

export default Home;
