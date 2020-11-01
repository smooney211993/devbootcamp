import { combineReducers } from 'redux';
import bootcampList from './bootcampList';
import bootcamp from './bootcamp';
import bootcampReviews from './bootcampReviews';

export default combineReducers({ bootcampList, bootcamp, bootcampReviews });
