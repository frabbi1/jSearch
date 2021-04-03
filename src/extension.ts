import { SearchContextMapper } from './searchContextMapper';
import { ExtensionActivator } from './extensionActivator';
import { CosineSimilarity } from './cosineSimilarity';
import * as vscode from 'vscode';
import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands, ProgressLocation } from 'vscode';
import { SummaryGen } from './summary';


export async function activate(context: vscode.ExtensionContext) {

	let extActivator: ExtensionActivator|null = null;
	let active= false;

	let disposable = vscode.commands.registerCommand('jcs.genSummary', () => {
		if (active === false) {
			window.showErrorMessage("Extension Not Activated! Press 'Alt + Shift + A'");
		} else {
			let sg  = new SummaryGen();
			sg.run();
		}
		
	});

	context.subscriptions.push(disposable);

	let activation = vscode.commands.registerCommand('jcs.activate', () => {
		active = true;
		window.withProgress({
			location: ProgressLocation.Notification,
			title: "Activating Extension",
			cancellable: true

		}, async (progress, token) => {
			token.onCancellationRequested(() => {
				active = false;
				window.showInformationMessage("Session Cancelled!");
			});
			
			extActivator = new ExtensionActivator();
			await extActivator.initComponents();
			progress.report({  increment: 100 });
			
		});
		
		
	});
	context.subscriptions.push(activation);

	let querySearch = vscode.commands.registerCommand('jcs.query', () => {
		if (active === false) {
			window.showErrorMessage("Extension Not Activated! Press 'Alt + Shift + A'");
		} else {
			let contextMapper = new SearchContextMapper(extActivator!.model, context, extActivator!.methodList);
			contextMapper.init();
		}
	});
	context.subscriptions.push(querySearch);

	
}

export function deactivate() {}
