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
exports.SearchContextMapper = void 0;
const fileNavigation_1 = require("./fileNavigation");
const modelClasses_1 = require("./modelClasses");
const vscode_1 = require("vscode");
const cosineSimilarity_1 = require("./cosineSimilarity");
class SearchContextMapper {
    constructor(model, context, methods) {
        this.model = model;
        this.context = context;
        this.methods = methods;
        this.fileNavigator = new fileNavigation_1.FileNavigator();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.input = vscode_1.window.createInputBox();
            this.input.title = 'Ouery Input';
            this.input.placeholder = 'Type your query to search';
            this.input.buttons = [this.getSearchButton()];
            this.input.show();
            let cs = new cosineSimilarity_1.CosineSimilarity(this.model);
            const selectedItem = yield this.generateQueryContext(cs);
        });
    }
    getSearchButton() {
        let button = new modelClasses_1.SearchButton({
            dark: vscode_1.Uri.file(this.context.asAbsolutePath('./res/search2.svg')),
            light: vscode_1.Uri.file(this.context.asAbsolutePath('./res/search.svg')),
        }, 'Query');
        return button;
    }
    generateQueryContext(cs) {
        return __awaiter(this, void 0, void 0, function* () {
            const disposables = [];
            try {
                return yield new Promise((resolve, reject) => {
                    this.input.onDidAccept((e) => __awaiter(this, void 0, void 0, function* () {
                        let value = this.input.value;
                        let inputs = [];
                        const len = this.methods.length;
                        for (let i = 0; i < len; i++) {
                            let res = yield cs.getSimilarityScore(value, this.methods[i].summary);
                            let scr = res.toString();
                            let scrN = ((1 - Number(scr)) * 100);
                            if (scrN >= 40.0) {
                                let sItem = new modelClasses_1.SuggestionItem('<Method: ' + this.methods[i].method + ' >', '<Class: ' + this.methods[i].class + ' >', scrN.toFixed(1) + '%', scrN, this.methods[i].startAt, this.methods[i].path);
                                sItem.alwaysShow = true;
                                inputs.push(sItem);
                            }
                        }
                        inputs.sort((a, b) => {
                            return b.score - a.score;
                        });
                        vscode_1.window.showQuickPick(inputs).then(item => {
                            if (item) {
                                this.fileNavigator.navigate(item.startAt, item.path);
                                resolve(item);
                            }
                        });
                    }));
                    this.input.onDidHide(() => {
                        resolve(undefined);
                        this.input.dispose();
                    });
                });
            }
            finally {
                disposables.forEach(d => d.dispose());
            }
        });
    }
}
exports.SearchContextMapper = SearchContextMapper;
//# sourceMappingURL=searchContextMapper.js.map