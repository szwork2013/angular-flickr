import angular from 'angular';

import HomeController from 'controllers/homeController';
import PublicPhotoFeed from 'common/services/publicPhotoFeed';

var app = angular.module('flickr-app', [])
    .controller(HomeController.name, HomeController)
    .service(PublicPhotoFeed.name, PublicPhotoFeed);

angular.element(document).ready(function () {
    angular.bootstrap(document.body, [app.name], {});
});

export default app;