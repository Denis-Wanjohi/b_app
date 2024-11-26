<template>
    <div>
        <div class="sm:w-1/2 sm:mx-auto">
            <form class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:w-3/4 sm:mx-auto" @submit.prevent="requestCode">
                
                <div class="sm:col-span-6">
                <label for="team_a" class="block text-sm/6 font-medium text-gray-900">Phone number</label>
                <div class="mt-2">
                    <input type="tel" name="phone"    required v-model="user.phone" autocomplete="given-name" class="block w-full rounded-md pl-5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                </div>
                </div>


                <div class="mt-6 flex items-center justify-center gap-x-6 sm:col-span-6">
                    <button type="submit"  class="rounded-md bg-indigo-600 px-3 py-2 text-sm  w-52 my-auto font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue';


const user = ref({
    phone:'',
})

const requestCode = async()=>{
    const {data,error} = await supabase.from('b_users').insert({'phone':user.value.phone,'requested':0})
}

</script>