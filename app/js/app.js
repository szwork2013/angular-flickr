import angular from 'angular';
import 'angular-animate';
import 'angular-ui-router';

import HomeController from 'controllers/homeController';
import DetailController from 'controllers/detailController';
import PublicPhotoFeed from 'common/services/publicPhotoFeed';

var app = angular.module('flickr-app', ['ngAnimate', 'ui.router'])
    .controller(HomeController.name, HomeController)
    .controller(DetailController.name, DetailController)
    .service(PublicPhotoFeed.name, PublicPhotoFeed);

/*@ngInject*/
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/templates/home.tpl.html',
            controller: HomeController.name
        })
        .state('details', {
            url: '/details/:itemId',
            templateUrl: 'app/templates/detail.tpl.html',
            controller: DetailController.name
        });
    $urlRouterProvider.otherwise("/home");
});

angular.element(document).ready(function () {
    angular.bootstrap(document.body, [app.name], {});
});

export default app;