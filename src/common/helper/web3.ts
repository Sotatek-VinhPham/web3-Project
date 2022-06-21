const Web3 = require("web3")
import { delay } from "rxjs"
import { ABI, AdminPrivateKeyWallet, AdminWallet, CONTRACT, PROVIDER } from "../constants"

export const getProvider = (provider : string) =>{
    return new Web3(provider)  
} 

export const getContract = ()=>{
    const web3 : typeof Web3 = getProvider(PROVIDER)
    return new web3.eth.Contract(ABI,CONTRACT)
}

export const getBlockNumber = async () =>{
    const web3 : typeof Web3 = getProvider(PROVIDER)
    return await web3.eth.getBlockNumber()
}

export const getTransactionCount = async(userId) =>{
    const web3 : typeof Web3 = getProvider(PROVIDER)
    return await web3.eth.getTransactionCount(userId)
}

export const sign = async(raw,prk)=>{
    const web3 : typeof Web3 = getProvider(PROVIDER)
    await web3.eth.accounts.signTransaction(raw,prk)
    
}

export const transfer = async(walletTo) =>{

    const web3 = new Web3(PROVIDER)
    const nonce = await web3.eth.getTransactionCount(AdminWallet)
console.log(nonce);

    const contract = new web3.eth.Contract(ABI,CONTRACT)

    const enCodeABI = await contract.methods.transfer(walletTo, "50000000000000000000").encodeABI() 
    const transaction = {
        "from":AdminWallet, 
        "gasLimit": 200000,
        "to": CONTRACT,
        "data": enCodeABI,
        nonce
    } 

    const signedTx = await web3.eth.accounts.signTransaction(transaction,AdminPrivateKeyWallet)
    console.log(signedTx);
    
    const dataSend = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    console.log(dataSend);
    
}

