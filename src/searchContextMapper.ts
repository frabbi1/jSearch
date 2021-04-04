import { Method } from './res/indexing';
import { FileNavigator } from './fileNavigation';
import { SuggestionItem, SearchButton } from './modelClasses';
import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder';
import { window, QuickPickItem, Disposable, QuickPick, InputBox, QuickInputButton, Uri, ExtensionContext, ProgressLocation } from 'vscode';
import { CosineSimilarity } from './cosineSimilarity';
export class SearchContextMapper{
    private input!: InputBox;
    private fileNavigator: FileNavigator;

    constructor(private model: UniversalSentenceEncoder | null, private context: ExtensionContext, private methods: Method[]){
        this.fileNavigator = new FileNavigator();
    }

   async init(){
        this.input = window.createInputBox();
        this.input.title = 'Ouery Input';
        this.input.placeholder = 'Type your query to search';
        this.input.buttons = [this.getSearchButton()];
        this.input.show();

        let cs  = new CosineSimilarity(this.model);
        const selectedItem = await this.generateQueryContext(cs);
    }
    getSearchButton(): QuickInputButton {
        let button = new SearchButton({
            dark: Uri.file(this.context.asAbsolutePath('./res/search2.svg')),
            light: Uri.file(this.context.asAbsolutePath('./res/search.svg')),
        }, 'Query');
        return button;
    }


   

    async generateQueryContext(cs: CosineSimilarity) {
        const disposables: Disposable[] = [];
        try {
            return await new Promise<SuggestionItem|undefined>((resolve, reject) => {
                this.input.onDidAccept( async e => {
                        this.input.title = "Searching from the project... Please Wait..."
                        let value = this.input.value;
                        let inputs: SuggestionItem[] = [];

                        const len = this.methods.length;

                        for (let i = 0; i<len; i++) {
                            let res = await cs.getSimilarityScore(value, this.methods[i].summary);
                            let scr = res.toString();
                            let scrN = ((1 - Number(scr))*100);
                            
                            if (scrN >= 40.0) {
                                let sItem = new SuggestionItem(
                                    '<Method: ' + this.methods[i].method + ' >',
                                    '<Class: ' + this.methods[i].class + ' >',
                                    scrN.toFixed(1) + '%', 
                                    scrN,
                                    this.methods[i].startAt,
                                    this.methods[i].path
                                );

                                sItem.alwaysShow = true;
                                inputs.push(sItem);
                            }
                            
                        }
                    
                        inputs.sort((a, b) => {
                            return b.score - a.score;
                        });

                        this.input.title = "Searching Complete"
                        window.showQuickPick(inputs).then(item => {
                            if(item) {
                                this.fileNavigator.navigate(item.startAt, item.path);
                                resolve(item);
                            }
                            
                        });
                        

                    });     

        
      
                this.input.onDidHide(() => {
                    resolve(undefined);
                    this.input.dispose();
                });
                
                 
            });
        } finally {
            disposables.forEach(d => d.dispose());
        }
 
    }


}