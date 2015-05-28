class CurrentTags {
    /*@ngInject*/
    constructor(feedConfig) {
        this.tags = [];

        if (feedConfig && feedConfig.defaultTag) {
            this.tags.push(feedConfig.defaultTag);
        }
    }

    add(tag) {
        if (!this.contains(tag)) {
            this.tags.push(tag);
        }
    }

    remove(tag) {
        let idx = this.tags.indexOf(tag);

        if (idx > -1) {
            this.tags.splice(idx, 1);
        }
    }

    toggle(tag) {
        if (!this.contains(tag)) {
            this.add(tag);
        } else {
            this.remove(tag);
        }
    }

    contains(tag) {
        return this.tags.indexOf(tag) > -1;
    }

    get tagList() {
        return this.tags.slice(0);
    }
}

export default CurrentTags;