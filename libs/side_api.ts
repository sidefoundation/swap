import { AtomicOrder, InterchainLiquidityPool, PaginatedLiquidityPools } from '~/types/side';
import { BaseRestClient } from './client';
import {
    type Registry,
    adapter,
    withCustomAdapter,
    AbstractRegistry,
    Request,
} from './registry';

export interface SideRequestRegistry extends AbstractRegistry {
    ibc_atomic_orders: Request<{orders: AtomicOrder[]}>
    ibc_atomic_params: Request<{
        params: {
          swap_enabled: boolean,
          max_fee_rate: number
        }
      }>
    ibc_interchain_swap_pools: Request<PaginatedLiquidityPools>
    ibc_interchain_swap_pool_id: Request<{interchainLiquidityPool: InterchainLiquidityPool}>
    ibc_interchain_swap_param: Request<{
        params: {
          swap_enabled: boolean,
          max_fee_rate: number
        }
      }>
}

export const DEFAULT_SIDE_API: SideRequestRegistry = {
    ibc_atomic_orders: {
        url: '/ibc/apps/atomicswap/v1/orders',
        adapter,
    },
    ibc_atomic_params: {
        url: '/ibc/apps/atomicswap/v1/params',
        adapter,
    },
    ibc_interchain_swap_pools: {
        url: '/ibc/apps/interchainswap/v1/interchain_liquidity_pool',
        adapter,
    },
    ibc_interchain_swap_pool_id: {
        url: '/ibc/apps/interchainswap/v1/interchain_liquidity_pool/{pool_id}',
        adapter,
    },
    ibc_interchain_swap_param: {
        url: '/ibc/apps/interchainswap/v1/params',
        adapter,
    }
};

export class SideHubRestClient extends BaseRestClient<SideRequestRegistry> {
    static newDefault(endpoint: string) {
        return new SideHubRestClient(endpoint, DEFAULT_SIDE_API)
    }
    fetchAtomicSwapOrders() {
        return this.request(this.registry.ibc_atomic_orders, {})
    }
    fetchAtomicSwapParams() {
        return this.request(this.registry.ibc_atomic_params, {})
    }
    fetchInterchainSwapPools() {
        return this.request(this.registry.ibc_interchain_swap_param, {})
    }
    fetchInterchainSwapPool(pool_id: string) {
        return this.request(this.registry.ibc_interchain_swap_pool_id, {pool_id})
    }
    fetchInterchainSwapOrders() {
        return this.request(this.registry.ibc_interchain_swap_pools, {})
    }
}