import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Layout/Rating';

const CourseCard = ({ course, bootcampId }) => {
  return (
    <Card ClassName='text-center'>
      <Card.Header>
        <Link to={`/${bootcampId}/course/${course._id}`}>
          <Card.Header>
            <i class='fab fa-js-square my-2 p-2'></i>
            {course.title}
          </Card.Header>
        </Link>
      </Card.Header>

      <ListGroup>
        <ListGroup.Item>
          <i className='fas fa-dollar-sign'></i> <em>{course.tuition}</em>
        </ListGroup.Item>
        <ListGroup.Item>
          <em>{course.description}</em>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default CourseCard;
