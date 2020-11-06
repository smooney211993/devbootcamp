import React, { useEffect } from 'react';
import { getBootCampReview } from '../../actions/bootcampActions';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../Layout/Message';
import Spinner from '../Layout/Spinner';

const BootcampReviews = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(
    (state) => state.bootcampReviews
  );

  useEffect(() => {
    dispatch(getBootCampReview(id));
  }, [dispatch, id]);
  return error ? (
    <Message>{error.msg}</Message>
  ) : loading ? (
    <Spinner />
  ) : (
    <>Reviews</>
  );
};

export default BootcampReviews;
