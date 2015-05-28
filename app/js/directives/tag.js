// function form due to some problems with service injection
const TagDirective = (CurrentTags) => {
    return {
        templateUrl: 'templates/directives/tag.tpl.html',
        restrict: 'E',
        scope: {
            name: '='
        },
        link: (scope, element) => {
            let name = scope.name;

            scope.$watch(() => {
                return CurrentTags.contains(name);
            }, (newVal) => {
                scope.isSelected = newVal;
            });

            element.on('click', () => {
                scope.$apply(() => {
                    CurrentTags.toggle(name);
                });
            });
        }
    }
};

// ng-annotate sometimes has problems with es6, so set dependencies manually
TagDirective.$inject = ['CurrentTags'];

export default TagDirective;