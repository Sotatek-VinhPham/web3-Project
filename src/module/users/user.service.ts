import { Injectable } from "@nestjs/common";
import { ethers } from "ethers";
import { async, delay } from "rxjs";
import { ABI, AdminEmail, CONTRACT } from "src/common/constants";
import { getContract, getProvider, getSigner } from "src/common/helper/ether";
import {  sendMail } from "src/common/helper/nodemailer";
import { Users } from "src/database/entities/users.entity";
import { UserRep } from "./user.repository";

@Injectable()

export class UserService {
    constructor (private readonly userRep : UserRep) {}

    public getBalanceOf = async(userId): Promise<number> =>{
        const contract = await getContract()
        const balanceOf = await contract.balanceOf(userId)
        return Number(balanceOf/1e18);
    }

    public transfer = async(userId,amount) =>{

        const walletMnemonic = await getSigner()
        const wallet = walletMnemonic.connect(await getProvider())
        const contract = await getContract();
        const contractWithWallet = await contract.connect(wallet)
        const tx = await contractWithWallet.transfer(userId,amount);
    }
    

    public schedule =  async()=>{
 
        const userIds = await Users.find();
        console.log(userIds);
        
        for(const data of userIds){
            const userId = data.userId 
            const balanceOf:number = await this.getBalanceOf(userId);
            console.log("===============================");
            
            if(balanceOf<5000000)
            {
                await this.transfer(userId,"50000000000000000000")
                await sendMail(data.email);

                console.log(`${AdminEmail} -50VC-> ${data.email}`);
                
            }
        }
    }
}