import React from 'react';
import { MdOutlineClose } from 'react-icons/md';
import PoolChains from './PoolChains';

export default function PoolCreate() {
  return (
    <div>
      <input type="checkbox" id="modal-create-pool" className="modal-toggle" />
      <label htmlFor="modal-create-pool" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">Create New Pool</h3>
            <label htmlFor="modal-create-pool" className="cursor-pointer">
              <MdOutlineClose className="text-2xl text-gray-500 dark:text-gray-400" />
            </label>
          </div>
          <div>
            <div className="text-sm mb-2 mt-4 flex items-center">
              <div className="font-semibold flex-1">Native Chain</div>
              <div className="bg-base-200 text-gray-700 dark:text-gray-50 px-4 ml-2 py-[2px] rounded-lg">
                weight: 50%
              </div>
            </div>
            <div className="flex items-center">
              <PoolChains />
              <div className="w-4" />
              <PoolChains />
              <div className="w-4" />
              <input className="flex-1 border border-gray-200  dark:border-gray-700 bg-base-200 rounded text-base text-right px-4 h-9 focus-within:outline-gray-300 dark:focus-within:outline-gray-800" />
            </div>
            <div className="text-sm mb-2 mt-4 flex items-center">
              <div className="font-semibold flex-1">Remote Chain</div>
              <div className="bg-base-200 text-gray-700 dark:text-gray-50 px-4 ml-2 py-[2px] rounded-lg">
                weight: 50%
              </div>
            </div>
            <div className="flex items-center">
              <PoolChains />
              <div className="w-4" />
              <PoolChains />
              <div className="w-4" />
              <input className="flex-1 border border-gray-200 dark:border-gray-700 bg-base-200 rounded text-base text-right px-4 h-9 focus-within:outline-gray-300 dark:focus-within:outline-gray-800" />
            </div>
            <div className=" mb-2 mt-4  flex items-center justify-between">
              <div className="font-semibold text-sm">Weight</div>
              <div className="flex items-center text-xs">weight adjustment</div>
            </div>

            <div>
              <input
                type="range"
                min="20"
                max="80"
                value="50"
                className="range range-sm range-primary"
                step="10"
              />
              <div className="w-full flex justify-between text-xs px-2">
                {[20, 30, 40, 50, 60, 70, 80].map((weight) => (
                  <span key={weight}>{weight}</span>
                ))}
              </div>
            </div>

            <div className=" mb-2 mt-4  flex items-center justify-between">
              <div className="text-sm">MEMO</div>
              <div className="flex items-center text-xs">(Option)</div>
            </div>
            <div>
              <input className="w-full h-9 bg-base-200 focus-within:outline-gray-300 px-4 rouned" />
            </div>

            <div className=" mb-2 mt-4  flex items-center justify-between">
              <div className="text-sm">GAS</div>
              <div className="flex items-center text-xs"></div>
            </div>
            <div>
              <input className="w-full h-9 bg-base-200 focus-within:outline-gray-300 px-4 rouned" />
            </div>

            <button className="w-full btn btn-primary mt-8">Confirm</button>
          </div>
        </label>
      </label>
    </div>
  );
}
