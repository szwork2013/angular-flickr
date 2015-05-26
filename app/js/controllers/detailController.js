class DetailController {
    /*@ngInject*/
    constructor($scope, $stateParams, PublicPhotoFeed) {
        PublicPhotoFeed.getItem($stateParams.itemId)
            .then((item) => {
                $scope.item = item;
            }, (errMsg) => {
                $scope.message = errMsg;
                console.error('error', errMsg);
            });
    }
}

export default DetailController;