import { types, castToSnapshot } from 'mobx-state-tree';
import File from '../models/File';
import { ResponseType, FileType } from '../types';
import resolveUrl from '../lib/resolveUrl';
import { readBinaryFile } from '../lib/io';

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
                        storageKey
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
        },

        async upload(file: File) {
            const body = await readBinaryFile(file);
            const [, data] = body.split('base64,');

            const response = await fetch(
                resolveUrl({
                    tokens: ['/api/put']
                }),
                {
                    method: 'POST',
                    body: new URLSearchParams({
                        storageKey: self.storageKey!,
                        name: file.name,
                        data
                    })
                }
            );
            const json: ResponseType<FileType> = await response.json();

            if (json.success) {
                self.files.push(json.data);
            }

            return json;
        }
    }));
