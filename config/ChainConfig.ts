export const ChainConfig = {
    site_name: 'Sidchain',
    title: 'IBCSWAP',
    description: 'Implement inter-chain swap functionality',
    locale: 'en',
    chains: [
      {
        chainID: 'sidechain_7070-1',
        name: 'sidechain-1',
        prefix: 'side',
        rpcUrl: 'http://45.63.52.25:26657',
        restUrl: 'http://45.63.52.25:1317',
        denom: 'aside',
      },
      {
        chainID: 'sidechain_7070-2',
        name: 'sidechain-2',
        prefix: 'side',
        rpcUrl: 'http://66.42.41.25:26657',
        restUrl: 'http://66.42.41.25:1317',
        denom: 'bside',
      },
    ],
  };