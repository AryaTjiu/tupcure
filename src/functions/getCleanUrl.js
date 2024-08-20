import normalizeUrl from 'normalize-url';

export function getCleanUrl(url) {
    const cleanedUrl = normalizeUrl(url, { removeQueryParameters: true, stripWWW: false });
    return cleanedUrl;
}