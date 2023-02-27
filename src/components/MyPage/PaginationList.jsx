import React, { useEffect } from 'react';
import { PaginationBox } from './styles';
import Pagination from 'react-js-pagination';

const PaginationList = ({
  restaurant,
  data,
  items,
  page,
  setPage,
  setItems,
  setData,
}) => {
  //페이지네이션
  const handlePageChange = (page) => {
    setPage(page);
  };
  const itemChange = (e) => {
    setItems(Number(e.target.value));
  };

  useEffect(() => {
    if (restaurant) {
      setData(restaurant);
    }
  }, [restaurant, items, page]);

  return (
    <>
      <PaginationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={data?.bookmarks?.length}
          onChange={handlePageChange}
          pageRangeDisplayed={5}
          hideDisabled={true}
          hideNavigation={true}
          hideFirstLastPages={true}
        ></Pagination>
      </PaginationBox>
    </>
  );
};

export default PaginationList;
