import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const CourseCard = ({ course, bootcampId }) => {
  const renderIcon = () => {
    const title = course.title;
    let icons = [];
    if (title.includes('Web Development'))
      icons = [
        <i className='fab fa-js-square p-2' key={1}></i>,
        <i className='fas fa-file-code p-2' key={2}></i>,
        <i className='fab fa-node p-2' key={3}></i>,
        <i className='fab fa-php p-2' key={4}></i>,
        <i className='fab fa-laravel p-2' key={5}></i>,
        <i className='fab fa-css3-alt' key={8}></i>,
      ];
    if (title.includes('Software QA'))
      icons = [...icons, <i className='fab fa-uncharted p-2' key={6}></i>];
    if (title.includes('IOS Development'))
      icons = [...icons, <i className='fab fa-app-store-ios p-2' key={7}></i>];
    if (title.includes('Full Stack Web Dev'))
      icons = [
        <i className='fab fa-js-square p-2' key={1}></i>,
        <i className='fas fa-file-code p-2' key={2}></i>,
        <i className='fab fa-css3-alt' key={8}></i>,
      ];
    if (title.includes('UI/UX'))
      icons = [...icons, <i className='fab fa-uikit p-2' key={10}></i>];
    if (title.includes('Web Design & Development'))
      icons = [
        <i className='fab fa-js-square p-2' key={1}></i>,
        <i className='fas fa-file-code p-2' key={2}></i>,
        <i className='fab fa-css3-alt' key={8}></i>,
        <i className='fab fa-php p-2' key={4}></i>,
      ];
    if (title.includes('Front End Web Development'))
      icons = [
        <i className='fab fa-js-square p-2' key={1}></i>,
        <i className='fas fa-file-code p-2' key={2}></i>,
        <i className='fab fa-css3-alt' key={8}></i>,
        <i className='fab fa-git p-2' key={9}></i>,
      ];

    return icons;
  };
  return (
    <Card className='text-center'>
      <Card.Header>
        <Card.Header className='text-primary'>
          {renderIcon()}
          {course.title}
        </Card.Header>
      </Card.Header>

      <ListGroup>
        <ListGroup.Item>Duration: {`${course.weeks} weeks`}</ListGroup.Item>
        <ListGroup.Item>
          Scholarship Available{' '}
          {course.scholarhipsAvailable ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </ListGroup.Item>
        <ListGroup.Item>
          <em>Cost : ${course.tuition}</em>
        </ListGroup.Item>
        <ListGroup.Item>
          <em>{course.description}</em>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default CourseCard;
