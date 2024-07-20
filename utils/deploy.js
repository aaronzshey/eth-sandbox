"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.default = deployContract;
const ethers_1 = require("ethers");
const hardhat_1 = __importDefault(require("hardhat"));
const contract = __importStar(require("../artifacts/contracts/MyNFT.sol/MyNFT.json"));
//right now, all of these values are hardcoded
//in the future, I'll make this function more interactive
function deployContract() {
    return __awaiter(this, void 0, void 0, function* () {
        const impersonatedSigner = yield hardhat_1.default.ethers.getImpersonatedSigner("0x06b0ED5338e36623b859081B0692F7dE33aF67E5");
        const myContractFactory = new ethers_1.ethers.ContractFactory(contract.default.abi, contract.default.bytecode, impersonatedSigner);
        const contractFactoryTxn = yield myContractFactory.deploy(myAddress);
        yield contractFactoryTxn.waitForDeployment();
        const factoryAddress = yield contractFactoryTxn.getAddress();
        return factoryAddress;
    });
}
