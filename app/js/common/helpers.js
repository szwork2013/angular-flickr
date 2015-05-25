var idCounter = 0;

// this could be a filter, but is used only in feed service
function clearPublicPhotoFeedItem(item) {
    let isCached = typeof item.imageUrl === 'string';

    // item already processed (passed from cache)
    if (!isCached) {
        item.imageUrl = item.media.m; // hope it's safe to assume it's always there
        item.tags = item.tags.split(/\s+/);
        let itemId,
            authorNickname;

        if (item.link.includes('flickr.com/')) {
            // link format: https://www.flickr.com/photos/USER_NAME/POST_ID/
            [,,,,authorNickname,itemId] = item.link.split('/');
        }

        // fallback to simple defaults in case if url changes/matching fails
        item.authorNickname = authorNickname || 'Unknown nickname';
        item.id = itemId || 'item' + (++idCounter);

        // delete unnecessary fields
        delete item.media;
    }

    return item;
}

export {clearPublicPhotoFeedItem};