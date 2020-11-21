import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdminCoursePaginate = ({ pages, page, keyword = '', averageCost }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              keyword.length > 0
                ? `/admin/courses/search/${keyword}/averageCost/${averageCost}/page/${
                    x + 1
                  }`
                : keyword.length === 0 && averageCost
                ? `/admin/courses/averageCost/${averageCost}/page/${x + 1}`
                : `/admin/courses/page/${x + 1}`
            }>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default AdminCoursePaginate;
