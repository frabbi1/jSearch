
import fetch from 'node-fetch';
import * as vscode from 'vscode';

export class SummaryGen {

    constructor() {}
    run() {
        let body = {
            method: this.getSelectionText()
        };
        fetch('http://4bf0c8b4a33d.ngrok.io/summarize', {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.text())
        .then((t) => {
            t = t.replace("<s>", "");
            t = t.split('<')[0];
            

            if(t.length > 0) {
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
        var selection = editor?.selection;
        let text =  editor?.document.getText(selection);
        return text;
    }
}