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
}: {
  restaurant: any;
  data?: any;
  items: number;
  page: number;
  setPage: (page: number) => void;
  setItems: (items: number) => void;
  setData: (data: any) => void;
}) => {
  //페이지네이션
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const itemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
