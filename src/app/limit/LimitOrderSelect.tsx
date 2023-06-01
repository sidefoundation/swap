import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useLimitStore, limitStore } from '@/store/limit';
import { MdRefresh } from 'react-icons/md';

export default function LimitOrderSelect({
  onReFresh,
}: {
  onReFresh: () => void;
}) {
  const { orderForm } = useLimitStore();

  const sideList = [
    {
      name: 'Native',
      key: 'TYPE_NATIVE',
    },
    {
      name: 'Remote',
      key: 'TYPE_REMOTE',
    },
  ];
  return (
    <div className="flex text-right mb-2 items-center justify-end">
      orderSide:
      <ul className="menu menu-horizontal menu-xs px-1 ml-1">
        <li tabIndex={0}>
          <a>
            <span>{orderForm.sideType.name || ''}</span>
            <MdKeyboardArrowDown className="fill-current" />
          </a>
          <ul className="p-2 bg-base-100 z-10">
            {sideList?.map((item, index: number) => {
              return (
                <li key={index}>
                  <a
                    onClick={() => {
                      limitStore.orderForm.sideType = item;
                    }}
                  >
                    {item?.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
      <div
        className="w-[30px] cursor-pointer"
        onClick={() => {
          onReFresh()
        }}
      >
        <MdRefresh />
      </div>
    </div>
  );
}
