import React, { useEffect } from 'react';

import { updateCourseReset, getCourse } from '../../actions/courseActions';

import { useDispatch } from 'react-redux';

const CourseEditScreen = ({ match }) => {
  const courseId = match.params.courseId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateCourseReset());
    dispatch(getCourse(courseId));
  }, [dispatch, courseId]);
  return <div>Hello</div>;
};

export default CourseEditScreen;
