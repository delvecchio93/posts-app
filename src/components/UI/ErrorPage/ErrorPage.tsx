import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import './ErrorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  
  return <div className='error_page'>
    <h1>404</h1>
    <span>Page not Found</span>
    <Button variant="contained" onClick={() => navigate('/home')}>Home</Button>
  </div>
}

export default ErrorPage