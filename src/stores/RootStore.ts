import { types, castToSnapshot } from 'mobx-state-tree';
import File from 'models/File';
import { ResponseType } from 'types';
import resolveUrl from 'lib/resolveUrl';

export default types
    .model({
        storageKey: types.maybe(types.string),
        pending: types.optional(types.boolean, false),
        files: types.array(File)
    })
    .views(self => ({
        get isAuthenticated() {
            return undefined !== self.storageKey;
        }
    }))
    .actions(self => ({
        async connect(storageKey: string) {
            self.pending = true;
            const result = await this.refresh(storageKey);

            if (result) {
                self.storageKey = storageKey;
            }

            self.pending = false;
        },

        disconnect() {
            self.files.clear();
            self.storageKey = undefined;
        },

        async refresh(storageKey: string) {
            const response = await fetch(
                resolveUrl({
                    tokens: ['/api/enumerate']
                }),
                {
                    method: 'post',
                    body: new URLSearchParams({
                        storageKey: storageKey
                    })
                }
            );
            const json: ResponseType = await response.json();

            if (json.success) {
                self.files = castToSnapshot(json.data);
                return true;
            } else {
                return false;
            }
        }
    }));
