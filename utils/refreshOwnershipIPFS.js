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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = refreshOwnershipIPFS;
require("dotenv/config");
const sdk_1 = __importDefault(require("@pinata/sdk"));
const pinata = new sdk_1.default({ pinataJWTKey: process.env.PINATA_KEY });
function refreshOwnershipIPFS(uri, newOwner) {
    return __awaiter(this, void 0, void 0, function* () {
        //get the array of original owners
        //uri: string, does not start with ipfs://, begins with "Qm...."
        const ownersRaw = yield fetch(`${process.env.PINATA_GATEWAY}${uri}`);
        //convert the ReadableStream output to JSON
        const ownersJSON = yield ownersRaw.json();
        //add the new owner to the object
        ownersJSON.owners.push(newOwner);
        //send the new data to IPFS
        const response = yield pinata.pinJSONToIPFS(ownersJSON);
        //delete the old one so I don't run out of space
        yield pinata.unpin(uri);
        //return the new URI
        return response.IpfsHash;
    });
}
