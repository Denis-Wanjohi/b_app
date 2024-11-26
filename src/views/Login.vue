<template>
    <div>
        <div class="sm:w-1/2 sm:mx-auto">
            <form class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:w-3/4 sm:mx-auto" @submit.prevent="login">
                
                <div class="sm:col-span-6">
                <label for="team_a" class="block text-sm/6 font-medium text-gray-900">Phone number</label>
                <div class="mt-2">
                    <input type="tel" name="phone"    required v-model="form.phone" autocomplete="given-name" class="block w-full rounded-md pl-5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                </div>
                </div>

                <div class="sm:col-span-6">
                <label for="team_b" class="block text-sm/6 font-medium text-gray-900">Entry code</label>
                <div class="mt-2">
                    <input type="number" name="code"  required v-model="form.code" autocomplete="family-name" class="block w-full  pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                    <p class="text-end text-sm">Dont have an entry code? 
                        <router-link to="code-request" class="text-blue-600 underline font-bold">Request one</router-link>    
                    </p>
                </div>
                </div>

                <!-- <p class="sm:col-span-6 text-center">Dont have an entry code? 
                    <router-link to="code-request" class="text-blue-600 underline font-bold">Request one</router-link>    
                </p> -->
                <div class="mt-6  gap-x-6 sm:col-span-6">
                    <p class="sm:col-span-6 text-center text-xs text-red-500" v-if="formError">{{ formError }}</p>
                    <div class="sm:w-3/4  mx-auto">
                        <button type="submit"  class="rounded-md  bg-indigo-600 px-3 py-2 text-sm  w-full mx-auto font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                    
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import { supabase } from '@/lib/supabaseClient';
import router from '@/router';
import { ref } from 'vue';
import { user } from '@/stores/user';
const userData = user()
const formError = ref()

const form = ref({
    phone:'',
    code:''
})

const login = async()=>{
    const {data,error} = await supabase.from('b_users')
                        .select()
                        .eq('phone',form.value.phone)
                        // .eq('code',form.value.code)
                       

    if(error){
        console.error(error)
        return;
    }
    
    if(data){
        console.log(data[0])
        if(data[0].code == form.value.code){
            userData.authenticated = true
            localStorage.setItem('auth',true)
            localStorage.setItem('code',data[0].code)
            localStorage.setItem('phone',data[0].phone)
            userData.user.phone = data[0].phone
            userData.user.code = data[0].code
            router.push('/dashboard')
        }else{
            formError.value = 'Invalid credentials'
            setTimeout(()=>{
                formError.value = ''
            },5000)
        }
        
        
    }
}

</script>