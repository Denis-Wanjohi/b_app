<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import router from './router';
import { user } from './stores/user';

const logout = ()=>{
  localStorage.setItem('auth',false)
  user().authenticated = false
  user().user.phone = ''
  user().user.code = ''
  router.push('/')
}
</script>

<template>
  <div class="min-h-full">
  <nav class="bg-blue-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:block  hidden">
      <div class="flex h-16 items-center justify-between  ">
        <div class="flex items-center">
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <RouterLink to="/" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Correct Scores</RouterLink>
              <p class="text-sm">....you can't go wrong</p>
              <RouterLink v-if="user().user.phone == '0723892001'" to="/add-matches" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Add matches</RouterLink>
              <RouterLink v-if="user().user.phone == '0723892001'" to="/requests" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Requests</RouterLink>
              
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <router-link v-if="user().authenticated == false" to="/login"  class="relative rounded-md font-bold px-2 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              Login
            </router-link>
            <button v-if="user().authenticated == true" @click.prevent="logout"  class="relative rounded-md font-bold px-2 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="md:hidden flex justify-between" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <RouterLink to="/" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Correct Scores</RouterLink>
      </div>
      
    </div>
    <div class="pr-3 flex justify-between sm:hidden block">
      <RouterLink v-if="user().user.phone == '0723892001'" to="/add-matches" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Add matches</RouterLink>
      <RouterLink v-if="user().user.phone == '0723892001'" to="/requests" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Requests</RouterLink>
        <p></p>      
      <button v-if="user().authenticated == true" @click.prevent="logout"  class="relative rounded-md font-bold px-2 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          Logout
        </button>
    </div>
  </nav>

  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{$route.name}}</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <!-- Your content -->
      <RouterView />
    </div>
  </main>
</div>

</template>


