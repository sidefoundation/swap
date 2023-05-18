import { useState } from 'react';
import { MdOutlineMenu } from 'react-icons/md';

const TabItem = ({
  value,
  title,
  setTab,
  tab,
}: {
  value: string;
  title: string;
  setTab: Function;
  tab: string;
}) => {
  return (
    <div
      className={`tab tab-sm ${tab === value ? 'tab-active' : ''}`}
      onClick={() => setTab(value)}
    >
      {title}
    </div>
  );
};

export default function SwapOrder() {
  const [tab, setTab] = useState('all');
  return (
    <div>
      <div className="tabs">
        <TabItem tab={tab} setTab={setTab} title="All" value="all" />
        <TabItem tab={tab} setTab={setTab} title="Inbound" value="inbound" />
        <TabItem tab={tab} setTab={setTab} title="Outbound" value="outbound" />
        <TabItem
          tab={tab}
          setTab={setTab}
          title="Completed"
          value="completed"
        />
        <TabItem
          tab={tab}
          setTab={setTab}
          title="Cancelled"
          value="cancelled"
        />
      </div>

      <div className="flex items-center justify-center mt-4 mb-4">
        <div className=" items-center inline-flex bg-primary text-white px-4 rounded-full py-1 cursor-pointer">
          <MdOutlineMenu className="mr-2 text-lg" />
          <div className="text-sm">New Order</div>
        </div>
      </div>

      <div className="bg-base-200 p-5 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="capitalize border-primary border px-4 text-sm rounded-full">
            {tab}
          </div>
          <div className="text-sm">TxHash: 3B1A3...26F6A</div>
        </div>
        <div className="mt-4 mb-2">
          <div className="text-base font-semibold">
            ATOM (Cosmos Hub) / SIDE (Side Hub)
          </div>
        </div>
        <div className="flex items-center justify-between mb-1 text-sm">
          <div>You will pay</div>
          <div>125.88 SIDE</div>
        </div>
        <div className="flex items-center justify-between mb-1 text-sm">
          <div>To receive</div>
          <div>12.111 ATOM</div>
        </div>
        <div className="flex items-center justify-between mb-1 text-sm">
          <div>SIDE per ATOM</div>
          <div>10.2123</div>
        </div>
        <div className="flex items-center justify-between mb-1 text-sm">
          <div>Sender(Maker)</div>
          <div>cosmos12s...saxa</div>
        </div>
        <div className="flex items-center justify-between mb-1 text-sm">
          <div>Date</div>
          <div>2023-02-15 9:12:12</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>Expires in</div>
          <div>36 mins</div>
        </div>
      </div>
    </div>
  );
}
