
import fetch from 'node-fetch';
import * as vscode from 'vscode';

export class SummaryGen {

    constructor() {}
    run() {
        let api = 'http://22656db1c55c.ngrok.io/summarize'
        let bodyText = this.getSelectionText();
        let body = {
            method: bodyText
        };
        fetch(api, {
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
                 if(bodyText && bodyText?.length > 100) {
                    bodyText = bodyText?.slice(0, 100);
                    let body = {
                        method: bodyText
                    };
                    fetch(api, {
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
                        }else {
                            vscode.window.showErrorMessage("Something Went Wrong! Try with another snippet");
                         }
                        
                    });

                 } else {
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
        var selection = editor?.selection;
        let text =  editor?.document.getText(selection);
        return text;
    }
}