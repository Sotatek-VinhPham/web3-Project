const { ethers } = require("ethers")
import { Contract, getDefaultProvider, Wallet } from "ethers";
import { ABI, AdminPrivateKeyWallet, AdminWallet, CONTRACT, PROVIDER } from "../constants"

export const getProvider = async()=>{
    return new ethers.getDefaultProvider(PROVIDER)
}

export const getSigner = async()=>{
    const provider = await getProvider()
    
    const signer = new Wallet(AdminPrivateKeyWallet)
    return signer
}

export const getContract = async()=>{
    const provider = await getProvider()
    const contract = new Contract(CONTRACT,ABI,provider)
    return contract
}

