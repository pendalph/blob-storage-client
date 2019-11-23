import url from 'url';

interface URLParams {
    tokens: string[];
    query?: {
        [name: string]: string;
    };
}

export default function(params: URLParams) {
    const requestUrl = [
        process.env.BLOB_STORAGE_SERVER || '',
        ...params.tokens
    ].reduce((acc, value) => url.resolve(acc, value));

    const query = new URLSearchParams(params.query);
    return requestUrl + (query ? `?${query.toString()}` : '');
}
