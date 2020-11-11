import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Paginate = ({
  pages,
  page,
  keyword = '',
  averageCost,
  averageRating,
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              keyword.length > 0
                ? `/search/${keyword}/averageCost/${averageCost}/averageRating/${averageRating}/page/${
                    x + 1
                  }`
                : keyword.length === 0 && averageRating && averageCost
                ? `/averageCost/${averageCost}/averageRating/${averageRating}/page/${
                    x + 1
                  }`
                : `/page/${x + 1}`
            }>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
