class HomeController {
    /*@ngInject*/
    constructor($scope) {
        $scope.items = [];

        $scope.$on('feed:update', (event, data) => {
            $scope.items = data;
        });

        $scope.$emit('feed:refresh');
    }
}

export default HomeController;