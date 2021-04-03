"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNavigator = void 0;
const vscode_1 = require("vscode");
class FileNavigator {
    constructor() {
    }
    navigate(startAt, path) {
        const doc = vscode_1.Uri.file(path);
        vscode_1.window.showTextDocument(doc, this.getOptions(startAt, startAt));
    }
    getOptions(start, end) {
        const startPos = new vscode_1.Position(+start, 0);
        const endPos = new vscode_1.Position(+end, 0);
        const options = {
            selection: new vscode_1.Range(startPos, endPos)
        };
        return options;
    }
}
exports.FileNavigator = FileNavigator;
//# sourceMappingURL=fileNavigation.js.map