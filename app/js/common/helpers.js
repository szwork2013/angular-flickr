import angular from 'angular';

var idCounter = 0;

// TODO: this could probably use some jQuery/angular methods for compatibility
function getTextContent(description) {
    var div = document.createElement('div');
    div.innerHTML = description;
    return div.textContent;
}

// this could be a filter, but is used only in feed service
function clearPublicPhotoFeedItem(item) {
    let isCached = typeof item.imageUrl === 'string';

    // item already processed (passed from cache)
    if (!isCached) {
        item.imageUrl = item.media.m; // hope it's safe to assume it's always there
        item.tags = item.tags.split(/\s+/);
        let itemId,
            authorNickname;

        if (item.link.indexOf('flickr.com/') > -1) {
            // link format: https://www.flickr.com/photos/USER_NAME/POST_ID/
            [,,,,authorNickname,itemId] = item.link.split('/');
        }

        // fallback to simple defaults in case if url changes/matching fails
        item.authorNickname = authorNickname || 'Unknown nickname';
        item.id = itemId || 'item' + (++idCounter);

        item.author = item.author.replace(/^[^(]+\((.+)\)$/gi, "$1");

        item.authorLink = 'https://www.flickr.com/photos/' + item.author_id;
        item.description = getTextContent(item.description);

        // delete unnecessary fields
        delete item.media;
    }

    return item;
}

export {clearPublicPhotoFeedItem};