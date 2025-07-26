import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin-dashboard'); 
  };

  return <button onClick={handleClick}>Go to Dashboard</button>;
};
