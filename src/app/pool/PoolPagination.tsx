import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
export default function PoolPagination() {
  return (
    <div className="flex items-center justify-end !hidden">
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
      {'1-10'} of {'299'}
    </div>
    <div className="px-1 py-1 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
      <MdKeyboardArrowLeft className="text-2xl" />
    </div>
    <div className="px-1 py-1 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
      <MdKeyboardArrowRight className="text-2xl" />
    </div>
  </div>
  )
}
