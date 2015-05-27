class ItemTimeDirective {
    constructor() {
        // using external template to allow uncss to work without retrieving class names from js files
        this.templateUrl = 'templates/directives/itemTime.tpl.html';
        this.restrict = 'E';
        this.scope = {
            time: '='
        };
    }
}

export default ItemTimeDirective;