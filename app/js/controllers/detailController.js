class DetailController {
    /*@ngInject*/
    constructor($scope, $stateParams, PublicPhotoFeed) {
        PublicPhotoFeed.getItem($stateParams.itemId)
            .then((item) => {
                $scope.item = item;
            });
    }
}

export default DetailController;