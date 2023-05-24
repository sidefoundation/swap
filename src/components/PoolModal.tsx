import React from 'react';
import { MdOutlineClose, MdKeyboardArrowDown } from 'react-icons/md';
import TabItem from './TabItem';

export default function PoolModal() {
  const [tab, setTab] = React.useState('all');
  return (
    <div>
      <input type="checkbox" id="modal-pool-modal" className="modal-toggle" />
      <label htmlFor="modal-pool-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">Add liquidity to pool #1</div>
            <label htmlFor="modal-pool-modal" className="cursor-pointer">
              <MdOutlineClose className="text-2xl text-gray-500 dark:text-gray-400" />
            </label>
          </div>
          <div className="inline-flex items-center bg-gray-100 rounded-full tabs dark:bg-gray-700 mt-4 mb-4">
            <TabItem tab={tab} setTab={setTab} title="All assets" value="all" />
            <TabItem
              tab={tab}
              setTab={setTab}
              title="Single asset"
              value="single"
            />
          </div>

          <div className="flex items-center text-sm mb-4">
            Use autosawp to add liquidity with
            {tab === 'all' ? ' all assets' : ' a single asset'}
          </div>

          <div className="border dark:border-gray-600 rounded-lg pl-4 pr-4 py-3 flex items-center mb-4">
            <div className="text-xl mr-5 font-semibold flex items-center">
              50%
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                {tab === 'all' ? (
                  <div className="text-lg font-semibold">Bside</div>
                ) : (
                  <div className="dropdown">
                    <label
                      tabIndex={0}
                      className="cursor-pointer flex items-center"
                    >
                      <span className="text-lg font-semibold ">Bside</span>
                      <MdKeyboardArrowDown className="text-lg ml-1 text-gray-500" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a>Bside</a>
                      </li>
                      <li>
                        <a>Aside</a>
                      </li>
                    </ul>
                  </div>
                )}
                <input className="text-lg text-right bg-gray-100 dark:bg-gray-700  dark:text-white focus-within:outline-none mb-2 h-8 px-4 rounded" />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">Channel-1</div>
                <div className="text-xs">Available: 0.000000 Bside</div>
              </div>
            </div>
          </div>

          {tab === 'all' ? (
            <div className="border dark:border-gray-600 rounded-lg pl-4 pr-4 py-3 flex items-center">
              <div className="text-xl mr-5 font-semibold flex items-center">
                50%
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Aside</div>
                  <input className="text-lg text-right bg-gray-100  dark:bg-gray-700 dark:text-white focus-within:outline-none mb-2 h-8 px-4 rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">Channel-1</div>
                  <div className="text-xs">Available: 0.000000 Bside</div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-6">
            <button className="btn btn-primary w-full">Confirm</button>
          </div>
        </label>
      </label>
    </div>
  );
}
