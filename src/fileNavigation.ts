import { window, workspace, Uri, Position, TextDocumentShowOptions, Range } from 'vscode';
export class FileNavigator {


    constructor() {
        
    }

    navigate(startAt: string, path: string) {
            const doc = Uri.file(path);
            window.showTextDocument(doc, this.getOptions(startAt, startAt));
        
    }
    
    getOptions(start: string, end: string) {
        const startPos = new Position(+start, 0);
        const endPos = new Position(+end, 0);
        const options: TextDocumentShowOptions = {
            selection: new Range(startPos, endPos)
        }
        return options;
    }
}