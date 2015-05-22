// this could be a filter, but is used only in feed service
function clearPublicPhotoFeedItem(item) {
    item.imageUrl = item.media.m; // hope it's safe to assume it's always there
    item.tags = item.tags.split(/\s+/);

    // delete unnecessary fields
    delete item.media;

    return item;
}

export {clearPublicPhotoFeedItem};