"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionActivator = void 0;
const vscode_1 = require("vscode");
const encoderModel_1 = require("./encoderModel");
const fs_1 = require("fs");
class ExtensionActivator {
    constructor() {
        this.model = null;
        this.cwd = undefined;
        this.methodList = [];
        const cwds = vscode_1.workspace.workspaceFolders ? vscode_1.workspace.workspaceFolders.map(f => f.uri) : [];
        if (cwds.length > 0) {
            this.cwd = cwds[0];
        }
    }
    initComponents() {
        return __awaiter(this, void 0, void 0, function* () {
            //indexing
            //method summary file if not exist\
            //encoderModel load
            this.parseIndex();
            let enc = new encoderModel_1.EncoderModel();
            this.model = yield enc.load();
        });
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
        if (this.cwd) {
            fs_1.readFile(this.cwd.fsPath + '/res/index.json', 'utf-8', (e, content) => {
                if (e) {
                    vscode_1.window.showWarningMessage("Workspace indexing skipped!!");
                    return;
                }
                try {
                    const jsObj = JSON.parse(content);
                    const methods = jsObj.methods;
                    this.methodList = methods;
                    // const jsObj = JSON.parse(content);
                    // const path = jsObj.methods[0].path;
                    // window.showInformationMessage(path);
                    // const doc = Uri.file(path);
                    // window.showTextDocument(doc, this.getOptions(jsObj.methods[0].startAt,jsObj.methods[0].startAt));
                }
                catch (e) {
                    vscode_1.window.showErrorMessage(e);
                }
            });
        }
    }
}
exports.ExtensionActivator = ExtensionActivator;
//# sourceMappingURL=extensionActivator.js.map