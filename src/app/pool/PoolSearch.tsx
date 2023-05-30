import { MdList, MdSearch, MdAddToQueue } from 'react-icons/md';
import { poolStore } from '@/store/pool';
export default function PoolSearch() {
  return (
    <div className="flex w-full mb-5">
      <div className="relative flex-1 w-full">
        <MdSearch className="absolute top-1/2 -translate-y-[50%] left-2 text-2xl text-gray-300 dark:text-gray-400" />
        <input
          className="flex-1 w-full pl-10 input input-bordered"
          placeholder="Search token name"
          onChange={() => {}}
        />
      </div>

      <div className="ml-4">
        <button className="mr-2 text-2xl btn">
          <MdList />
        </button>

        <div
          className="text-2xl btn btn-primary"
          onClick={() => (poolStore.poolFormCreate.modalShow = true)}
        >
          <MdAddToQueue />
        </div>
      </div>
    </div>
  );
}
