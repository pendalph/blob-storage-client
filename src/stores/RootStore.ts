import { types, flow } from 'mobx-state-tree';

export default types
    .model({
        storageKey: types.maybe(types.string),
        pending: types.optional(types.boolean, false)
    })
    .views(self => ({
        get isAuthenticated() {
            return undefined !== self.storageKey;
        }
    }))
    .actions(self => ({
        connect: flow(function*(storageKey: string) {
            self.pending = true;
            yield new Promise(resolve => setTimeout(resolve, 3000));
            if (self.storageKey) {
                self.storageKey = undefined;
            } else {
                self.storageKey = storageKey;
            }
            self.pending = false;
        }),

        disconnect() {
            self.storageKey = undefined;
        }
    }));
