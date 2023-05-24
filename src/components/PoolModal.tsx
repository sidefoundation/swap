import React from 'react';
import { MdOutlineClose, MdKeyboardArrowDown } from 'react-icons/md';
import { poolStore, usePoolStore } from '../store/pool';
import TabItem from './TabItem';

export default function PoolModal() {
  const [tab, setTab] = React.useState('all');
  const { poolItem, poolForm } = usePoolStore();
  const poolAsset1 = poolItem?.assets?.[0];
  const poolAsset2 = poolItem?.assets?.[1];

  return (
    <div>
      <input type="checkbox" id="modal-pool-modal" className="modal-toggle" />
      <label htmlFor="modal-pool-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">
              Add liquidity to pool #
              {poolItem?.poolId?.slice(0, 8) +
                '...' +
                poolItem?.poolId?.slice(
                  poolItem?.poolId?.length - 4,
                  poolItem?.poolId?.length
                )}
            </div>
            <label htmlFor="modal-pool-modal" className="cursor-pointer">
              <MdOutlineClose className="text-2xl text-gray-500 dark:text-gray-400" />
            </label>
          </div>
          <div className="inline-flex items-center bg-gray-100 rounded-full tabs dark:bg-gray-700 mt-4 mb-4">
            <TabItem tab={tab} setTab={setTab} title="All assets" value="all" />
            <TabItem
              tab={tab}
              setTab={(val) => {
                setTab(val);
                poolStore.poolForm.single = poolAsset2;
              }}
              title="Single asset"
              value="single"
            />
          </div>

          <div className="flex items-center text-sm mb-4">
            Use autosawp to add liquidity with
            {tab === 'all' ? ' all assets' : ' a single asset'}
          </div>

          {/* all assets */}
          {tab === 'all' ? (
            <div>
              <div className="border dark:border-gray-600 rounded-lg pl-4 pr-4 py-3 flex items-center mb-4">
                <div className="text-xl mr-5 font-semibold flex items-center">
                  {poolAsset1?.weight}%
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold capitalize">
                      {poolAsset1?.balance?.denom}
                    </div>
                    <input
                      value={
                        poolForm[`${poolAsset1?.side?.toLowerCase()}Amount`]
                      }
                      onChange={(e) => {
                        poolStore.poolForm[
                          `${poolAsset1?.side?.toLowerCase()}Amount`
                        ] = e.target.value;
                      }}
                      className="text-lg text-right bg-gray-100 dark:bg-gray-700  dark:text-white focus-within:outline-none mb-2 h-8 px-4 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {poolAsset1?.side}
                    </div>
                    <div className="text-xs">
                      Available: 0.000000{' '}
                      <span className="capitalize">
                        {poolAsset1?.balance?.denom}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border dark:border-gray-600 rounded-lg pl-4 pr-4 py-3 flex items-center">
                <div className="text-xl mr-5 font-semibold flex items-center">
                  {poolAsset2?.weight}%
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold capitalize">
                      {poolAsset2?.balance?.denom}
                    </div>
                    <input
                      value={
                        poolForm[`${poolAsset2?.side?.toLowerCase()}Amount`]
                      }
                      onChange={(e) => {
                        poolStore.poolForm[
                          `${poolAsset2?.side?.toLowerCase()}Amount`
                        ] = e.target.value;
                      }}
                      className="text-lg text-right bg-gray-100  dark:bg-gray-700 dark:text-white focus-within:outline-none mb-2 h-8 px-4 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {poolAsset2?.side}
                    </div>
                    <div className="text-xs">
                      Available: 0.000000{' '}
                      <span className="capitalize">
                        {poolAsset2?.balance?.denom}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* single asset */}
          {tab === 'single' ? (
            <div className="border dark:border-gray-600 rounded-lg pl-4 pr-4 py-3 flex items-center mb-4">
              <div className="text-xl mr-5 font-semibold flex items-center">
                {poolForm?.single?.weight}%
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="dropdown">
                    <label
                      tabIndex={0}
                      className="cursor-pointer flex items-center"
                    >
                      <span className="text-lg font-semibold capitalize">
                        {poolForm?.single?.balance?.denom}
                      </span>
                      <MdKeyboardArrowDown className="text-lg ml-1 text-gray-500" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {poolItem?.assets?.map((item, index) => {
                        return (
                          <li key={index}>
                            <a
                              className=" capitalize"
                              onClick={() => {
                                poolStore.poolForm.single = item;
                              }}
                            >
                              {item?.balance?.denom}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <input
                    value={poolForm.signleAmount}
                    onChange={(e) => {
                      poolStore.poolForm.signleAmount = e.target.value;
                    }}
                    className="text-lg text-right bg-gray-100 dark:bg-gray-700  dark:text-white focus-within:outline-none mb-2 h-8 px-4 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {poolForm?.single?.side}
                  </div>
                  <div className="text-xs">
                    Available: 0.000000{' '}
                    <span className="capitalize">
                      {poolForm?.single?.balance?.denom}
                    </span>
                  </div>
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