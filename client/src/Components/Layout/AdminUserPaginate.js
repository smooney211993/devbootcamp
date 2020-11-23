import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdminUserPaginate = ({ pages, page, keyword = '', role = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              keyword.length > 0 && role.length === 0
                ? `/admin/users/search/${keyword}/page/${x + 1}`
                : keyword.length > 0 && role.length > 0
                ? `/admin/users/search/${keyword}/roles/${role}`
                : keyword.length === 0 && role.length > 0
                ? `/admin/users/roles/${role}/page/${x + 1}`
                : `/admin/users/page/${x + 1}`
            }>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default AdminUserPaginate;
