<template>
    <div>
        <div class="sm:w-3/4 h-screen  sm:mx-auto">
            <div class="text-center font-serif text-3xl py-5">Sure bet selection games:</div>
            <p class="text-center text-gray-700">
                <router-link class="font-bold text-blue-500 underline" to="/login">
                   Login 
                </router-link>
                to get the correct score</p>
            <div class=" pt-4">
                <div  class="sm:w-3/4  bg-blue-200 py-5 my-5 shadow  mx-auto flex justify-between rounded" v-for="match in matches">
                    <div class="w-[30%] text-center font-bold sm:text-3xl text-xl  my-auto">
                        <p>{{match.team_a}}</p>
                    </div>
                    <div class="w-[30%]">
                        <div class="flex justify-evenly">
                            <p class="sm:text-sm text-xs text-center"> 
                                <span class="font-bold">Date: </span>
                                {{ match.date }}  
                            </p>
                            <p class="sm:text-sm text-xs text-center"> 
                                <span class="font-bold">Time: </span>
                                {{ match.time }} 
                            </p>
                        </div>
                    </div>
                    <div class="w-[30%] text-center font-bold sm:text-3xl text-xl  my-auto">
                        <p>{{match.team_b}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { supabase } from '@/lib/supabaseClient';
import { onMounted,ref } from 'vue';
const matches = ref([])
onMounted(async()=>{
    const {data,error} = await supabase
                                .from('matches')
                                .select('team_a,team_b,date,time')

    if(error){
        console.error(error)
    }else{
        console.log(data)
        data.forEach((el)=>{
            matches.value.push(el)
        })
    }
})
</script>