import React, { useEffect, useState } from 'react';
import { getCourses } from '../../actions/courseActions';

import { useDispatch } from 'react-redux';

const CourseListScreen = ({ match }) => {
  const keyword = match.params.keyword || '';
  const pageNumber = match.params.pageNumber || 1;
  const averageCost = match.params.averageCost || 150000;
  const [budget, setBudget] = useState(15000);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses(keyword, budget, pageNumber));
  }, [dispatch, budget, pageNumber]);
  return <div></div>;
};

export default CourseListScreen;
