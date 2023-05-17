import Image from 'next/image';

export default function Pool() {
  return (
    <div className="container mx-auto">
      <div className="relative mt-10 h-[138px] flex items-center justify-center rounded-lg overflow-hidden bg-[url(/assets/images/maskbg.png)] bg-cover">
        <div className="text-5xl font-bold text-white">
          Scalable, Bridgeless
        </div>
      </div>
      <div className=" mt-10 overflow-x-auto bg-base-100 p-8 rounded-lg min-h-[400px] mb-10">
        <div>
          <input placeholder="Search token name" />
        </div>
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Pair / Chain</th>
              <th>Liquidity</th>
              <th>Volume (D)</th>
              <th>APR</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <Image
                      className="w-10 h-10"
                      src="/assets/images/atom.png"
                      alt="side"
                      width="48"
                      height="48"
                    />
                    <Image
                      className="w-10 h-10 -ml-4"
                      src="/assets/images/Side.png"
                      alt="side"
                      width="48"
                      height="48"
                    />
                  </div>
                  <div>
                    <div className="font-bold">ATOM / SIDE</div>
                    <div className="text-sm opacity-50">
                      Cosmos Hub / Side Hub
                    </div>
                  </div>
                </div>
              </td>
              <td>$ 999,999,999</td>
              <td>$ 9,999,999</td>
              <td>29%</td>
              <td>
                <button className="btn-ghost border-gray-400 capitalize px-4 hover:bg-gray-100 btn-sm btn">
                  Manage
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-end">
          <div>Rows per page: 10</div>
          <div>1-10 of 299</div>
          <div>PREV</div>
          <div>NEXT</div>
        </div>
      </div>
    </div>
  );
}
