import { FC } from 'react';
import { PaginationWrapper } from './Pagination.styled';
import Pagination from 'react-bootstrap/Pagination';

interface PaginationProps {
   perPage: number;
   currentPage: number;
   totalPages: number;
   setPage: Function
}

const CustomPagination: FC<PaginationProps> = (props: PaginationProps) => {
   let items = [];
   for (let number = 1; number <= props.totalPages; number++) {
      items.push(
         <Pagination.Item key={number} active={number === props.currentPage}
            onClick={(ev) => props.setPage(ev, number)}>
            {number}
         </Pagination.Item>,
      );
   }
   return <PaginationWrapper data-testid="Pagination">
      <div>
         <Pagination>
            <Pagination.First onClick={(ev) => props.setPage(ev, 1)} />
            <Pagination.Prev onClick={(ev) => 1 < props.currentPage ? props.setPage(ev, props.currentPage - 1) : null} />
            {items}
            <Pagination.Next onClick={(ev) => props.currentPage < props.totalPages ? props.setPage(ev, props.currentPage + 1) : null} />
            <Pagination.Last onClick={(ev) => props.setPage(ev, props.totalPages)} />
         </Pagination>
      </div>
   </PaginationWrapper>
};

export default CustomPagination;
