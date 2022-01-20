import { action, computed, makeObservable, observable } from "mobx";

interface UserData{
    id:number;
    userName:string;
    fullName:string;
    lastLogIn:number|string;
    enabled:boolean|string;
}

export class UserStore{
    users:UserData[]=[]
    constructor(){
        makeObservable(this,{
            users:observable,
            addUser:action
        })
    }
   
    addUser(userData:UserData){
        const myUser:UserData={
            id: +Math.random().toFixed(4),
            userName:userData.userName,
            fullName:userData.fullName,
            lastLogIn:userData.lastLogIn,
            enabled:userData.enabled
        }
        this.users.push(myUser)
    }

}

export const  Users= new UserStore()