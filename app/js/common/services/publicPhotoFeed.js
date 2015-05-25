import {clearPublicPhotoFeedItem} from 'common/helpers';

class PublicPhotosFeed {
    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
        this.apiUrl = 'https://api.flickr.com/services/feeds/photos_public.gne';
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
                }
            })
            .then(res => res.data.items.map(clearPublicPhotoFeedItem));
    }
}

export default PublicPhotosFeed;