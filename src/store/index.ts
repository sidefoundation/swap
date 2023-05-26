import { devtools } from 'valtio/utils';
import { proxy } from 'valtio';
import { poolStore } from './pool';
import { chainStore } from './chain';
import { assetsStore } from './assets';

const rootStore = proxy({
  assetsStore,
  chainStore,
  poolStore,
});

devtools(rootStore, { name: 'root', enabled: true });
