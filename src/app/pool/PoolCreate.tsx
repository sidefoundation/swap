import React from 'react';

export default function PoolCreate() {
  return (
    <div>
      <input type="checkbox" id="modal-create-pool" className="modal-toggle" />
      <label htmlFor="modal-create-pool" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">
            Create New Pool
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </label>
      </label>
    </div>
  );
}
