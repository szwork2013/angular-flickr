class HomeController {
    constructor($scope, feedService) {
        $scope.items = [];

        feedService.getItems()
            .then((items) => {
                console.log('feed items', items);
                $scope.items = items;
            })
    }
}

HomeController.$inject = ['$scope', 'PublicPhotosFeed'];

export default HomeController;