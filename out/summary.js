"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryGen = void 0;
const node_fetch_1 = require("node-fetch");
const vscode = require("vscode");
class SummaryGen {
    constructor() { }
    run() {
        let body = {
            method: this.getSelectionText()
        };
        node_fetch_1.default('http://4bf0c8b4a33d.ngrok.io/summarize', {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.text())
            .then((t) => {
            t = t.replace("<s>", "");
            t = t.split('<')[0];
            if (t.length > 0) {
                t = "Summary:\n" + t;
                vscode.window.showInformationMessage(t);
            }
            else {
                vscode.window.showErrorMessage("Something Went Wrong! Try with another snippet");
            }
            // let myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
            // myStatusBarItem.text = t;
            // myStatusBarItem.show();
        });
    }
    getSelectionText() {
        var editor = vscode.window.activeTextEditor;
        var selection = editor === null || editor === void 0 ? void 0 : editor.selection;
        let text = editor === null || editor === void 0 ? void 0 : editor.document.getText(selection);
        return text;
    }
}
exports.SummaryGen = SummaryGen;
//# sourceMappingURL=summary.js.map