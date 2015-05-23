import {clearPublicPhotoFeedItem} from 'common/helpers';

class PublicPhotosFeed {
    constructor($http) {
        this.$http = $http;
        this.apiUrl = 'https://api.flickr.com/services/feeds/photos_public.gne';
    }

    getItems(tags = 'potato') {
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

PublicPhotosFeed.inject = ['$http'];

export default PublicPhotosFeed;