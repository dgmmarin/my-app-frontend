/* eslint-disable */
import Pagination from './Pagination';

export default {
  title: "Pagination",
};

export const Default = () => <Pagination perPage={0} currentPage={0} totalPages={0} setPage={() => { }} />;

Default.story = {
  name: 'default',
};
