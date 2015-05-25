import angular from 'angular';
import 'angular-animate';
import 'angular-route';

import HomeController from 'controllers/homeController';
import DetailController from 'controllers/detailController';
import PublicPhotoFeed from 'common/services/publicPhotoFeed';

var app = angular.module('flickr-app', ['ngAnimate', 'ngRoute'])
    .controller(HomeController.name, HomeController)
    .controller(DetailController.name, DetailController)
    .service(PublicPhotoFeed.name, PublicPhotoFeed);

/*@ngInject*/
app.config(function ($routeProvider) {
    // html5 mode could be set here, but
    $routeProvider
        .when('/home', {
            templateUrl: 'app/templates/home.tpl.html',
            controller: HomeController.name
        })
        .when('/details/:itemId', {
            templateUrl: 'app/templates/detail.tpl.html',
            controller: DetailController.name
        })
        .otherwise({
            redirectTo: '/home'
        });
});

angular.element(document).ready(function () {
    angular.bootstrap(document.body, [app.name], {});
});

export default app;