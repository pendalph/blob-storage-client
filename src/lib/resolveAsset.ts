export default (fileName: string) =>
    `${process.env.BLOB_STORAGE_DOWNLOAD}/${encodeURIComponent(fileName)}`;
