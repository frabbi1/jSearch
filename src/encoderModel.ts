import { UniversalSentenceEncoder } from "@tensorflow-models/universal-sentence-encoder";
import * as use from '@tensorflow-models/universal-sentence-encoder';

export class EncoderModel {
    private model: UniversalSentenceEncoder|null = null;
    constructor(){
    }

    async load() {
        this.model = await use.load();
        return this.model;
    }


}