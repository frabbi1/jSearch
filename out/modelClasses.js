"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchButton = exports.SuggestionItem = void 0;
class SuggestionItem {
    constructor(suggestion, desc, detail, score, startAt, path) {
        this.label = '';
        this.label = suggestion;
        this.description = desc;
        this.detail = detail;
        this.score = score;
        this.startAt = startAt;
        this.path = path;
    }
}
exports.SuggestionItem = SuggestionItem;
class SearchButton {
    constructor(iconPath, tooltip) {
        this.iconPath = iconPath;
        this.tooltip = tooltip;
    }
}
exports.SearchButton = SearchButton;
//# sourceMappingURL=modelClasses.js.map