import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { usePoolStore } from '@/store/pool';
export default function PoolPagination() {
  const { poolList, poolPagination } = usePoolStore();
  if (poolList.length <= 10) {
    return null;
  }
  return (
    <div className="flex items-center justify-end">
      <div>
        <span className="mr-2">Rows per page: </span>
        <select
          value="10"
          className="max-w-xs select select-bordered select-sm"
          onChange={() => {}}
        >
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>
      <div className="mx-4">
        {'1-10'} of {poolPagination.total}
      </div>
      <div className="px-1 py-1 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
        <MdKeyboardArrowLeft className="text-2xl" />
      </div>
      <div className="px-1 py-1 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
        <MdKeyboardArrowRight className="text-2xl" />
      </div>
    </div>
  );
}
