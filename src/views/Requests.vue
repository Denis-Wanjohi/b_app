<template>

    <div>
        <div class="text-center">Below are requests sent out to login to the application:</div>
        <div class="sm:w-1/2 sm:mx-auto border" v-if="requests.length > 0">
            <table class="w-full">
                <thead>
                    <tr>
                        <th>Phone</th>
                        <th> Date and Time</th>
                        <th>Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="req in requests" class="text-center bg-blue-200 border">
                        <td>{{ req.phone }}</td>
                        <td>{{  formatDateString(req.created_at) }}</td>
                        <td>{{ req.code == '' ? '--' : req.code }}</td>
                        <td>
                            <button type="submit" v-if="req.requested == 0" @click.prevent="permission(1,req.phone)" class="rounded-md bg-indigo-600 px-3 py-2 text-sm   my-auto font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Allow</button> 
                            <button type="submit" v-if="req.requested == 1"   @click.prevent="permission(0,req.phone)"   class="rounded-md bg-red-600 px-3 py-2 text-sm   my-auto font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Disallow</button> 
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="text-center py-5">No data</div>
    </div>

</template>


<script setup>
import { supabase } from '@/lib/supabaseClient';
import { onMounted, ref } from 'vue';
import { rewriteDefault } from 'vue/compiler-sfc';
import {user}  from '@/stores/user'
const requests = ref([])

onMounted(async ()=>{
     await get_data()
})

const get_data = async()=>{
    requests.value = []
    const {data,error} = await supabase.from('b_users').select() 

    if(error){
        alert('error fetching requests')
    }else{
        data.forEach((el)=>{
            requests.value.push(el)
        })
    }
}

const permission = async(data,phone)=>{
    if(data == 0){
        const { data, error } = await supabase
            .from('b_users')
            .update({ requested: '0',code: phone == '0723892001' ? '0000' : '' })
            .eq('phone', phone)
            .select()

        if(error){
            alert('error inupdating the permissions')
        }else{
            get_data()
        }
    }else if(data == 1){
        const { data, error } = await supabase
            .from('b_users')
            .update({ requested: '1',code: phone == '0723892001' ? '0000' : Math.floor(Math.random() * 10000)  })
            .eq('phone', phone)
            .select()

        if(error){
            alert('error in updating the permissions')
        }else{
            get_data()
        } 
    }
}

function formatDateString(dateString) {
    // Parse the input date string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date)) {
        throw new Error("Invalid date string");
    }

    // Extract hours, minutes, day, month, and year
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();

    // Format the output as "HH:mm DD-MM-YYYY"
    return `${hours}:${minutes} ${day}-${month}-${year}`;
}
</script>