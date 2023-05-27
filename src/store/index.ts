import { devtools } from 'valtio/utils';
import { proxy } from 'valtio';
import { poolStore } from './pool';
import { chainStore } from './chain';
import { assetsStore } from './assets';
import { escrowedStore } from './escrowed';

const rootStore = proxy({
  assetsStore,
  chainStore,
  poolStore,
  escrowedStore,
});

devtools(rootStore, { name: 'root', enabled: true });
