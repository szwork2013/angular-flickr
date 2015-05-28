import angular from 'angular';
import 'angular-animate';
import 'angular-ui-router';

import HomeController from 'controllers/home';
import DetailController from 'controllers/detail';
import NavController from 'controllers/nav';
import ItemTimeDirective from 'directives/itemTime';
import TagDirective from 'directives/tag';
import TagsDirective from 'directives/tags';
import CurrentTags from 'services/currentTags';
import PublicPhotoFeed from 'services/publicPhotoFeed';

var app = angular.module('flickr-app', ['ngAnimate', 'ui.router'])
    // constants
    .constant('feedConfig', {
        apiUrl: 'https://api.flickr.com/services/feeds/photos_public.gne',
        defaultTag: 'potato'
    })

    // controllers
    .controller('HomeController', HomeController)
    .controller('DetailController', DetailController)
    .controller('NavController', NavController)

    // directives
    // TODO: check how to use class form of directives (if possible w/o () => new ...)
    .directive('itemTime', () => new ItemTimeDirective())
    .directive('tag', TagDirective)
    .directive('tags', () => new TagsDirective())

    // services
    .service('CurrentTags', CurrentTags)
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