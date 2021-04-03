import { QuickInputButton, QuickPickItem, Uri } from 'vscode';
export class SuggestionItem implements QuickPickItem {
    label: string = '';
    description?: string | undefined;
    detail?: string | undefined;
    picked?: boolean | undefined;
    alwaysShow?: boolean | undefined;
    score: number;
    startAt: string;
    path: string;

    constructor(suggestion: string, desc: string, detail: string, score: number, startAt: string, path: string) {
        this.label = suggestion;
        this.description = desc;
        this.detail = detail;
        this.score = score;
        this.startAt = startAt;
        this.path = path;
    }
    
}

export class SearchButton implements QuickInputButton {
    constructor(public iconPath: { light: Uri; dark: Uri; }, public tooltip: string) { }
}

