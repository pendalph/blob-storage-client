import { types } from 'mobx-state-tree';

export default types.model({
    name: types.string,
    creationTime: types.Date,
    lastModified: types.Date,
    etag: types.string,
    contentLength: types.number
});
