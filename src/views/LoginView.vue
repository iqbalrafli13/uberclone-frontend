<template>
    <div class="pt-16">
        <h1 class="text-3x1 font-semibold mb-4">Enter Your Phone Number</h1>

        <form v-if="!waitingOnVerification" action="#" @submit.prevent="handleLogin">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" v-maska data-maska="+62 ### #### ####" v-model="credential.phone" name="phone" id="phone" placeholder="+62 xxx xxxx xxxx" class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">

                    </div>
                </div>

                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <div>
                        
                        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Continue</button>
                            
                    </div>
                </div>
            </div>
        </form>
        <form v-else action="#" @submit.prevent="handleVerification">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" v-maska data-maska="######" v-model="credential.login_code" name="login_code" id="login_code" placeholder="xxxxxx" class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">

                    </div>
                </div>

                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <div>
                        
                        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">verify</button>
                            
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>

import {vMaska} from 'maska'
import { computed, onMounted, reactive,ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter()

const credential = reactive({
    phone: null ,
    login_code: null
})

const getFormatedCredential = (()=>{
    return{
        phone: credential.phone.replaceAll(' ','') ,
        login_code: credential.login_code
    }
})

const waitingOnVerification = ref(false)

onMounted(()=>{
    if (localStorage.getItem('token')) {
        router.push({
            name:'landing'
        })
    }
})

const handleLogin = ()=>{
    axios.post('http://uberclone-backend.test/api/login',getFormatedCredential())
        .then((response)=>{
            console.log(response.data);
            waitingOnVerification.value = true
        })
        .catch((error)=>{
            console.error(error);
            alert(error.response.data.message);
        })
}

const handleVerification = ()=>{
    axios.post('http://uberclone-backend.test/api/login/verify',getFormatedCredential())
        .then((response)=>{
            console.log(response.data);
            localStorage.setItem('token',response.data)
            router.push({
                name:'landing'
            })
        })
        .catch((error)=>{
            console.error(error);
            alert(error.response.data.message);
        })
}
</script>

<style>
</style>