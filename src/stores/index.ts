import RootStore from './RootStore';
import { unprotect } from 'mobx-state-tree';

const rootStore = RootStore.create();
unprotect(rootStore);

export default rootStore;
