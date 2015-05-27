class TagsDirective {
    constructor() {
        // using external template to allow uncss to work without retrieving class names from js files
        this.templateUrl = 'templates/directives/tags.tpl.html';
        this.restrict = 'E';
        this.scope = {
            tags: '='
        };
    }
}

export default TagsDirective;