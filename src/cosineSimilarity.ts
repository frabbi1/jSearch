
import * as stemmer from 'stemmer';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs';
import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder';
export class CosineSimilarity {

    constructor(private model: use.UniversalSentenceEncoder | null) {}
    termFreqMap(str: string) {
        let words = str.split(' ');
        let termFreq: { [x: string]: number; } = {};
        words.forEach((w: string) => {
            w = w.toLocaleLowerCase();
            w = stemmer(w)
            termFreq[w] = (termFreq[w] || 0) + 1;
        });
        return termFreq;
    }

    addKeysToDict(map: { [x: string]: number; }, dict: { [x: string]: boolean; }) {
        for (let key in map) {
            dict[key] = true;
        }
    }

    vecDotProduct(vecA: string | any[], vecB: number[]) {
        let product = 0;
        for (let i = 0; i < vecA.length; i++) {
            product += vecA[i] * vecB[i];
        }
        return product;
    }

    vecMagnitude(vec: string | any[]) {
        let sum = 0;
        for (let i = 0; i < vec.length; i++) {
            sum += vec[i] * vec[i];
        }
        return Math.sqrt(sum);
    }

    cosineSimilarity(vecA: any[], vecB: any[]) {
        return this.vecDotProduct(vecA, vecB) / (this.vecMagnitude(vecA) * this.vecMagnitude(vecB));
    }

    termFreqMapToVector(map: { [x: string]: any; }, dict: {}) {
        let termFreqVector = [];
        for (let term in dict) {
            termFreqVector.push(map[term] || 0);
        }
        return termFreqVector;
    }
    textCosineSimilarity(strA: string, strB: string) {
        let termFreqA = this.termFreqMap(strA);
        let termFreqB = this.termFreqMap(strB);

        let dict = {};
        this.addKeysToDict(termFreqA, dict);
        this.addKeysToDict(termFreqB, dict);

        let termFreqVecA = this.termFreqMapToVector(termFreqA, dict);
        let termFreqVecB = this.termFreqMapToVector(termFreqB, dict);

        return this.cosineSimilarity(termFreqVecA, termFreqVecB);
    }

    async getSimilarityScore(str1: string, str2: string){
        let sentences = [str1, str2]
        const embds = await (await this.model!.embed(sentences)).unstack();

        let score = tf.losses.cosineDistance(embds[0], embds[1], 0);
        // return await score.data();
        return await score.data();

    }
}