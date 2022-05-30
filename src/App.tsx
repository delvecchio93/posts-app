import { Create } from '@mui/icons-material';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import Home from './components/Home/Home';
import ErrorPage from './components/UI/ErrorPage/ErrorPage';
import SpinnerModal from './components/UI/SpinnerModal/SpinnerModal';

function App() {

  const DetailsPage = React.lazy(() => import ('./components/Details/Details'));
  const CreatePage = React.lazy(() => import ('./components/CreatePost/CreatePost'));

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create' element={<Suspense fallback={<SpinnerModal/>}>
          <CreatePage />
        </Suspense>} />
        <Route path='/details/:id' element={<Suspense fallback={<SpinnerModal/>}>
          <DetailsPage />
        </Suspense>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;