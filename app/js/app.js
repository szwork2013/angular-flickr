import angular from 'angular';
import 'angular-animate';
import 'angular-ui-router';

import HomeController from 'controllers/homeController';
import DetailController from 'controllers/detailController';
import ItemTimeDirective from 'directives/itemTime';
import TagsDirective from 'directives/tags';
import PublicPhotoFeed from 'services/publicPhotoFeed';

var app = angular.module('flickr-app', ['ngAnimate', 'ui.router'])
    // constants
    .constant('apiUrl', 'https://api.flickr.com/services/feeds/photos_public.gne')

    // controllers
    .controller('HomeController', HomeController)
    .controller('DetailController', DetailController)

    // directives
    .directive('itemTime', () => new ItemTimeDirective())
    .directive('tags', () => new TagsDirective())

    // services
    .service('PublicPhotoFeed', PublicPhotoFeed);

/*@ngInject*/
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/templates/partials/home.tpl.html',
            controller: 'HomeController'
        })
        .state('details', {
            url: '/details/:itemId',
            templateUrl: '/templates/partials/detail.tpl.html',
            controller: 'DetailController'
        });
    $urlRouterProvider.otherwise("/home");
});

angular.element(document).ready(function () {
    angular.bootstrap(document.body, [app.name]);
});

export default app;