import React, { useEffect } from 'react';
import { getBootcamps } from './actions/bootcampActions';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBootcamps());
  }, [dispatch]);
  return <div>HEllo</div>;
};
export default App;
