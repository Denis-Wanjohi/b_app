import { defineStore } from "pinia";


export const user = defineStore('user',{
    state:()=>{

        return{
            authenticated:((localStorage.getItem('auth') == null)  || (localStorage.getItem('auth') == 'false')) ? false : true,
            user:{
                phone:localStorage.getItem('phone') ,
                code:localStorage.getItem('code') ,
            }
        }
    }
})