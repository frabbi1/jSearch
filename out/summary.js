"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryGen = void 0;
const node_fetch_1 = require("node-fetch");
const vscode = require("vscode");
String.prototype.se;
class SummaryGen {
    constructor() { }
    run() {
        let api = 'http://bc466256de2f.ngrok.io/summarize';
        let bodyText = this.getSelectionText();
        let body = {
            method: bodyText
        };
        node_fetch_1.default(api, {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.text())
            .then((t) => {
            t = t.replace("<s>", "");
            t = t.split("<UNK>").join(" ");
            t = t.split("<NULL>").join("");
            t = t.replace("</s>", "");
            // t = t.split('<')[0];
            if (t.length > 0) {
                t = "Summary:\n" + t;
                vscode.window.showInformationMessage(t);
            }
            else {
                if (bodyText && (bodyText === null || bodyText === void 0 ? void 0 : bodyText.length) > 100) {
                    bodyText = bodyText === null || bodyText === void 0 ? void 0 : bodyText.slice(0, 100);
                    let body = {
                        method: bodyText
                    };
                    node_fetch_1.default(api, {
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
                    });
                }
                else {
                    vscode.window.showErrorMessage("Something Went Wrong! Try with another snippet");
                }
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