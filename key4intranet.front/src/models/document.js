export default class Document {
    constructor(id, filename, extension, group, permissionLevel) {
        this.id = id;
        this.filename = filename;
        this.extension = extension;
        this.group = group;
        this.permissionLevel = permissionLevel;
    }

    get id() {
        return this.id;
    }

    get filename() {
        return this.filename;
    }

    get extension() {
        return this.extension;
    }

    get group() {
        return this.group;
    }

    get permissionLevel() {
        return this.permissionLevel;
    }

}