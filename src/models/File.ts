import { types } from 'mobx-state-tree';

export default types.model({
    name: types.string,
    creationTime: types.string,
    lastModified: types.string,
    etag: types.string,
    contentLength: types.number
});
