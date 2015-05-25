class HomeController {
    /*@ngInject*/
    constructor($scope, PublicPhotosFeed) {
        $scope.items = [];

        PublicPhotosFeed.getItems()
            .then((items) => {
                console.log('feed items', items);
                $scope.items = items;
            })
    }
}

export default HomeController;