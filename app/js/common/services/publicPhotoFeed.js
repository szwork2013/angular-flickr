import {clearPublicPhotoFeedItem} from 'common/helpers';

class PublicPhotoFeed {
    /*@ngInject*/
    constructor($http, $q, $cacheFactory) {
        this.$http = $http;
        this.$q = $q;

        // TODO: this could provided by external config
        this.apiUrl = 'https://api.flickr.com/services/feeds/photos_public.gne';
        this.cache = $cacheFactory('photoFeed');
    }

    getItems(tags = 'potato') {
        // multiple tags are separated by commas
        if (Array.isArray(tags) && tags.length > 0) {
            tags = tags.join(',');
        }

        return this.$http
            .jsonp(this.apiUrl, {
                params: {
                    tags: tags,
                    tagmode: 'all',
                    format: 'json',
                    jsoncallback: 'JSON_CALLBACK'
                },
                cache: this.cache
            })
            .then((res) => {
                // transform all items
                let feedItems = res.data.items.map(clearPublicPhotoFeedItem);

                // and add to cache if necessary
                feedItems.forEach((item) => {
                    if (!this.cache.get(item.id)) {
                        this.cache.put(item.id, item);
                    }
                });

                return feedItems;
            });
    }

    getItem(itemId) {
        let deferred = this.$q.defer(),
            cachedItem = this.cache.get(itemId);

        // cached before, resolve asap
        if (cachedItem) {
            deferred.resolve(cachedItem);
        } else {
            // item not in cache, try to refetch and resolve
            this.getItems()
                .then(() => {
                    let item = this.cache.get(itemId);
                    if (item) {
                        deferred.resolve(item)
                    } else {
                        deferred.reject();
                    }
                });
        }

        return deferred.promise;
    }
}

export default PublicPhotoFeed;