import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
interface MyPaginationProps {
  pageAmount: number | undefined;
  currentPage: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}
const MyPagination:React.FC<MyPaginationProps> = ({pageAmount,currentPage,onChange}) => {
  return (
    <Pagination count={pageAmount} page={currentPage} onChange={onChange} defaultPage={1}/>
  )
}

export default MyPagination