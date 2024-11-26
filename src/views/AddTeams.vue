<template>
    <div>
        <div class="sm:w-3/4 h-[70vh] overflow-auto  shadow-amber-100 shadow sm:mx-auto">
            <div class="text-center font-serif sm:text-3xl text-xl sm:py-5">Add games with correct scores:</div>
            <div class="sm:mt-5 mt-2 sm:pt-4 pt-2" v-if="matches.length != 0">
                <p class="text-center">*you can add more matches as you like</p>
                <div  class="sm:w-3/4  bg-blue-300 py-5 my-5 shadow  mx-auto flex justify-between rounded" v-for="match in matches">
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
                        
                        <div class="flex justify-between">
                            <p class="font-bold sm:text-sm text-xs">
                                <span v-if="match.bet == 0" class="text-green-500">WIN</span>
                                <span v-if="match.bet == 2" class="text-red-500">LOSE</span>
                            </p>
                            <p class="font-bold sm:text-sm text-xs text-blue-500" v-if="match.bet == 1" >DRAW</p>
                            <p class="font-bold sm:text-sm text-xs">
                                <span v-if="match.bet == 2" class="text-green-500">WIN</span>
                                <span v-if="match.bet == 0" class="text-red-500">LOSE</span>
                            </p>
                        </div>
                        <!-- <div class="flex justify-between">
                            <p class="border rounded-lg sm:px-3 px-2 border-black">{{ match.odd_home }}</p>
                            <p class="border rounded-lg sm:px-3 px-2 border-black">{{ match.odd_draw }}</p>
                            <p class="border rounded-lg sm:px-3 px-2 border-black">{{ match.odd_away }}</p>
                        </div> -->
                    </div>
                    <div class="w-[30%] text-center font-bold sm:text-3xl text-xl  my-auto">
                        <p>{{match.team_b}}</p>
                    </div>
                </div>
            </div>
            <div class="mt-6 flex items-center justify-center gap-x-6 " v-if="matches.length != 0">
                <button type="submit" @click="updateMatches"  class="rounded-md bg-indigo-600 px-3 py-2 text-sm  w-52 my-auto font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload</button>
            </div>

            <div v-else>
                <p class="text-center mt-[100px]">
                    Press the blue button to add matches
                </p>
            </div>
        </div>
    </div>
    
    <!-- button -->
    <div class="bg-blue-400 rounded cursor-pointer  fixed z-20 bottom-10 sm:left-[90%] left-[80%]" @click.prevent="overlay = true">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-white" viewBox="0 0 24 24"><path fill="black" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
    </div>

    <!-- overlay -->
    <div class="rounded cursor-pointer  fixed z-30 top-0 left-0 bg-green-500 w-screen h-screen bg-opacity-65 overflow-scroll" v-if="overlay">
        <p class="fixed top-16 left-[90%] sm:block hidden">
            <svg xmlns="http://www.w3.org/2000/svg" @click="overlay = false" class="w-12 bg-white rounded-full" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m5 19l7-7m0 0l7-7m-7 7L5 5m7 7l7 7"/></svg>
        </p>
        <div class="sm:w-3/4 w-[95%] px-3 mx-auto h-fit pb-20   sm:mt-20 bg-white">
           
            <p class="text-center font-bold text-3xl py-5 flex justify-between">
                Add a match
                <svg xmlns="http://www.w3.org/2000/svg" @click="overlay = false" class="w-6 h-6 bg-slate-300 rounded-full" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m5 19l7-7m0 0l7-7m-7 7L5 5m7 7l7 7"/></svg>
            </p>
            <form class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:w-3/4 sm:mx-auto" @submit.prevent="addMatch">
                <div class="sm:col-span-3">
                <label for="team_a" class="block text-sm/6 font-medium text-gray-900">Team A</label>
                <div class="mt-2">
                    <input type="text" name="team_a" id="team_a"   required v-model="match.team_a" autocomplete="given-name" class="block w-full rounded-md pl-5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                </div>
                </div>

                

                <div class="sm:col-span-3">
                <label for="team_b" class="block text-sm/6 font-medium text-gray-900">Team B</label>
                <div class="mt-2">
                    <input type="text" name="team_b" id="team_b" required v-model="match.team_b" autocomplete="family-name" class="block w-full  pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                </div>
                </div>


                <div class="sm:col-span-3">
                <label for="date" class="block text-sm/6 font-medium text-gray-900">Date</label>
                <div class="mt-2">
                    <input type="date" name="date" id="date"   required v-model="match.date" autocomplete="given-name" class="block w-full rounded-md pl-5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                </div>
                </div>

                <div class="sm:col-span-3">
                <label for="time" class="block text-sm/6 font-medium text-gray-900">Time</label>
                <div class="mt-2">
                    <input type="time" name="time" id="time"   required v-model="match.time" autocomplete="given-name" class="block w-full rounded-md pl-5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                </div>
                </div>

                <div class="sm:col-span-6" v-if="match.team_a != '' & match.team_b !=''">
                <label for="bet" class="block text-sm/6 font-medium text-gray-900">Select where to  place the bet</label>
                <div class="mt-2 flex justify-around">
                    <div>
                        <input type="radio" v-model="match.bet" name="bet"  id="a" value="0"> 
                        <label for="a" class="px-5">{{match.team_a}}</label>
                    </div>
                    <div>
                        <input type="radio" v-model="match.bet" name="bet" id="draw" value="1">
                        <label for="draw" class="px-5">Draw</label>
                    </div>
                    <div>
                        <input type="radio" v-model="match.bet" name="bet" id="b" value="2">      
                        <label for="b" class="px-5">{{match.team_b}}</label>
                    </div>

                    <!-- <input type="bet" name="bet" id="bet"   required v-model="match.bet" autocomplete="given-name" class="block w-full rounded-md pl-5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"> -->
                </div>
                </div>

                
                <!-- <div class="sm:col-span-2">
                    <label for="odd_home" class="block text-sm/6 font-medium text-gray-900">Home</label>
                    <div class="mt-2">
                        <input id="odd_home" name="odd_home" required v-model="match.odd_home" type="text" placeholder="2.0" class="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label for="odd_draw" class="block text-sm/6 font-medium text-gray-900">Draw</label>
                    <div class="mt-2">
                        <input id="odd_draw" name="odd_draw" required v-model="match.odd_draw" placeholder="2.0" type="text"class="block pl-5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label for="odd_away" class="block text-sm/6 font-medium text-gray-900">Away</label>
                    <div class="mt-2">
                        <input id="odd_away" name="odd_away"   required v-model="match.odd_away" type="text" placeholder="2.0" autocomplete="email" class="block w-full pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                    </div>
                </div> -->

                <div class="mt-6 flex items-center justify-center gap-x-6 sm:col-span-6">
                    <button type="submit"  class="rounded-md bg-indigo-600 px-3 py-2 text-sm  w-52 my-auto font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>
            </form>
        </div>
        
    </div>
    
</template>

<script setup>
import { supabase } from '@/lib/supabaseClient';
import router from '@/router';
import {ref} from 'vue'
const overlay = ref(false)
const matches = ref([])
const match  = ref({
    team_a:'',
    team_b:'',
    date:'',
    bet:'',
    time:'',
    // odd_home:'',
    // odd_draw:'',
    // odd_away:'',
})

const addMatch = ()=>{
    matches.value.push({...match.value})
    overlay.value = false
    match.value.team_a = ''
    match.value.team_b = ''
    match.value.date = ''
    match.value.time = ''
    match.value.bet = ''
    // match.value.odd_away = ''
    // match.value.odd_draw = ''
    // match.value.odd_home = ''
    // match.value.date = ''
}

const updateMatches = ()=>{

    matches.value.forEach(async(element)=>{
    const { data, error } = await supabase
        .from('matches')
        .insert([
            { 'team_a': element.team_a,
             'team_b': element.team_b,
             'time': element.time,
             'bet': element.bet,
             'date': element.date},
        ])
        .select()

        if(error){
            console.error(error)
        }
    })

    router.push('/dashboard')
    matches.value = []
}
</script>