class NavController {
    /*@ngInject*/
    constructor($scope, $rootScope, PublicPhotoFeed, CurrentTags) {
        $scope.currentTags = [];

        // although it's probably better to pass the model as an argument, clearing the form is easier via $scope
        $scope.addTag = () => {
            CurrentTags.add($scope.newTagName);
            $scope.newTagName = null;
        };

        $scope.$watchCollection(() => {
            return CurrentTags.tagList;
        }, (newVal) => {
            $scope.currentTags = newVal;
        });

        $scope.fetchData = () => {
            PublicPhotoFeed.getItems($scope.currentTags)
                .then((items) => {
                    $rootScope.$broadcast('feed:update', items);
                })
        };

        $rootScope.$on('feed:refresh', () => {
            $scope.fetchData();
        });
    }
}

export default NavController;