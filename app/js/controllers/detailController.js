class DetailController {
    /*@ngInject*/
    constructor($scope, $route, PublicPhotosFeed) {
        $scope.item = {};

        PublicPhotosFeed.getItem($route.current.params.itemId)
            .then((item) => {
                $scope.item = item;
            });
    }
}

export default DetailController;