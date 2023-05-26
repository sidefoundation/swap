import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function PoolChains() {
  return (
    <div className="dropdown">
      <label
        tabIndex={0}
        className="bg-base-200 px-4 py-2 rounded-full flex items-center"
      >
        <div className="text-sm">Chain 1</div>
        <MdKeyboardArrowDown className="ml-2" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
}
