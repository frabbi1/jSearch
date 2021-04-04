import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder';
import { workspace, window, Uri, TextEditor, Range, TextDocumentShowOptions, Position } from 'vscode';
import { EncoderModel } from './encoderModel';
import * as cp from 'child_process';
import { readFile } from 'fs';
import { Method } from './res/indexing';
export class ExtensionActivator {
    public model: UniversalSentenceEncoder|null = null;
    private cwd: Uri|undefined = undefined;
    public methodList: Method[] = []

    constructor() {
        const cwds = workspace.workspaceFolders ? workspace.workspaceFolders.map(f => f.uri) : [];
        if (cwds.length > 0) {
            this.cwd = cwds[0];
        }
    }
    async initComponents() {
        //indexing
        //method summary file if not exist\
        //encoderModel load
        this.parseIndex();

        let enc = new EncoderModel();
	    this.model = await enc.load();

    }

    // indexMethods() {
    //     const cwds = workspace.workspaceFolders ? workspace.workspaceFolders.map(f => f.uri) : [];
    //     cwds.forEach(cwd => {
    //         readFile(cwd.fsPath + '/res/test.json', 'utf-8', (e, content) => {
    //             if(e) {
    //                 window.showErrorMessage(e.message);
    //                 return;
    //             }
    //             try {
    //                 const jsObj = JSON.parse(content);
    //                 const path = jsObj.methods[0].path;
    //                 window.showInformationMessage(path);
    //                 const doc = Uri.file(path);
                    
                    
    //                 window.showTextDocument(doc, this.getOptions(jsObj.methods[0].startAt,jsObj.methods[0].startAt));
                    
    //             } catch (e) {
    //                 window.showErrorMessage(e);
    //             }
    //         });
            
    //     })
        

    // }

    parseIndex() {
        if(this.cwd){
            readFile(this.cwd.fsPath + '/res/index.json', 'utf-8', (e, content) => {
                if(e) {
                    window.showWarningMessage("Workspace indexing skipped!!");
                    return;
                }
                try {
          
                    const jsObj = JSON.parse(content)
                    const methods = jsObj.methods;

                    this.methodList = methods;

                    // const jsObj = JSON.parse(content);
                    // const path = jsObj.methods[0].path;
                    // window.showInformationMessage(path);
                    // const doc = Uri.file(path);
                    
                    
                    // window.showTextDocument(doc, this.getOptions(jsObj.methods[0].startAt,jsObj.methods[0].startAt));
                    
                } catch (e) {
                    window.showErrorMessage(e);
                }
            });
        }
       

    }
}