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
exports.CosineSimilarity = void 0;
const stemmer = require("stemmer");
const tf = require("@tensorflow/tfjs");
class CosineSimilarity {
    constructor(model) {
        this.model = model;
    }
    termFreqMap(str) {
        let words = str.split(' ');
        let termFreq = {};
        words.forEach((w) => {
            w = w.toLocaleLowerCase();
            w = stemmer(w);
            termFreq[w] = (termFreq[w] || 0) + 1;
        });
        return termFreq;
    }
    addKeysToDict(map, dict) {
        for (let key in map) {
            dict[key] = true;
        }
    }
    vecDotProduct(vecA, vecB) {
        let product = 0;
        for (let i = 0; i < vecA.length; i++) {
            product += vecA[i] * vecB[i];
        }
        return product;
    }
    vecMagnitude(vec) {
        let sum = 0;
        for (let i = 0; i < vec.length; i++) {
            sum += vec[i] * vec[i];
        }
        return Math.sqrt(sum);
    }
    cosineSimilarity(vecA, vecB) {
        return this.vecDotProduct(vecA, vecB) / (this.vecMagnitude(vecA) * this.vecMagnitude(vecB));
    }
    termFreqMapToVector(map, dict) {
        let termFreqVector = [];
        for (let term in dict) {
            termFreqVector.push(map[term] || 0);
        }
        return termFreqVector;
    }
    textCosineSimilarity(strA, strB) {
        let termFreqA = this.termFreqMap(strA);
        let termFreqB = this.termFreqMap(strB);
        let dict = {};
        this.addKeysToDict(termFreqA, dict);
        this.addKeysToDict(termFreqB, dict);
        let termFreqVecA = this.termFreqMapToVector(termFreqA, dict);
        let termFreqVecB = this.termFreqMapToVector(termFreqB, dict);
        return this.cosineSimilarity(termFreqVecA, termFreqVecB);
    }
    getSimilarityScore(str1, str2) {
        return __awaiter(this, void 0, void 0, function* () {
            let sentences = [str1, str2];
            const embds = yield (yield this.model.embed(sentences)).unstack();
            let score = tf.losses.cosineDistance(embds[0], embds[1], 0);
            // return await score.data();
            return yield score.data();
        });
    }
}
exports.CosineSimilarity = CosineSimilarity;
//# sourceMappingURL=cosineSimilarity.js.map