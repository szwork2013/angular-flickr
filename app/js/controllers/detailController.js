class DetailController {
    /*@ngInject*/
    constructor($scope, $stateParams, PublicPhotosFeed) {
        PublicPhotosFeed.getItem($stateParams.itemId)
            .then((item) => {
                $scope.item = item;
            }, (errMsg) => {
                $scope.message = errMsg;
                console.error('error', errMsg);
            });
    }
}

export default DetailController;