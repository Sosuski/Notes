import { useNavigate } from 'react';

const Home = () => {
    const navigate = useNavigate();

  return <div>
    <div >
 <label>Create a Note here:</label>
    <button onClick={navigate("/Add")}></button> 
    </div>
  </div>;
};

export default Home;
