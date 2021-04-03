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
exports.deactivate = exports.activate = void 0;
const searchContextMapper_1 = require("./searchContextMapper");
const extensionActivator_1 = require("./extensionActivator");
const vscode = require("vscode");
const vscode_1 = require("vscode");
const summary_1 = require("./summary");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let extActivator = null;
        let active = false;
        let disposable = vscode.commands.registerCommand('jcs.genSummary', () => {
            if (active === false) {
                vscode_1.window.showErrorMessage("Extension Not Activated! Press 'Alt + Shift + A'");
            }
            else {
                let sg = new summary_1.SummaryGen();
                sg.run();
            }
        });
        context.subscriptions.push(disposable);
        let activation = vscode.commands.registerCommand('jcs.activate', () => {
            active = true;
            vscode_1.window.withProgress({
                location: vscode_1.ProgressLocation.Notification,
                title: "Activating Extension",
                cancellable: true
            }, (progress, token) => __awaiter(this, void 0, void 0, function* () {
                token.onCancellationRequested(() => {
                    active = false;
                    vscode_1.window.showInformationMessage("Session Cancelled!");
                });
                extActivator = new extensionActivator_1.ExtensionActivator();
                yield extActivator.initComponents();
                progress.report({ increment: 100 });
            }));
        });
        context.subscriptions.push(activation);
        let querySearch = vscode.commands.registerCommand('jcs.query', () => {
            if (active === false) {
                vscode_1.window.showErrorMessage("Extension Not Activated! Press 'Alt + Shift + A'");
            }
            else {
                let contextMapper = new searchContextMapper_1.SearchContextMapper(extActivator.model, context, extActivator.methodList);
                contextMapper.init();
            }
        });
        context.subscriptions.push(querySearch);
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map