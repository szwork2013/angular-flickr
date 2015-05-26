class HomeController {
    /*@ngInject*/
    constructor($scope, PublicPhotoFeed) {
        $scope.items = [];

        PublicPhotoFeed.getItems()
            .then((items) => {
                console.log('feed items', items);
                $scope.items = items;
            })
    }
}

export default HomeController;