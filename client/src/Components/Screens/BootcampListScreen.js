import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getBootcamps } from '../../actions/bootcampActions';

const BootcampListScreen = ({ match, history }) => {
  const keyword = match.params.keyword || '';
  const pageNumber = match.params.pageNumber || 1;
  const averageCost = match.params.averageCost || 150000;
  const averageRating = match.params.averageRating || 10;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBootcamps(keyword, averageCost, averageRating, pageNumber));
  }, [dispatch, keyword, pageNumber, averageCost, averageRating]);
  return <div>Bootcamp List</div>;
};

export default BootcampListScreen;
