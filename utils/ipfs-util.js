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
const refreshOwnershipIPFS_js_1 = __importDefault(require("./refreshOwnershipIPFS.js"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const mockCIDfromNFT = "QmdCgu2d6oFugS1fDqRymxBdAiXTEfrsmA16pe6zhndzNP";
        let output = (0, refreshOwnershipIPFS_js_1.default)(mockCIDfromNFT, "0x03");
        console.log(yield output);
    });
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
