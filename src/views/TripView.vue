<template>
     <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Menunggu Driver ...</h1>
        <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
            <div class="bg-white px-4 py-5 sm:p-6">
                <div>
                    <GMapMap 
                            :zoom="11" 
                            ref="gMap"
                            style="width: 100%; height: 256px;">
                            <!-- <GMapMarker :position="location.destination.geometry"/> -->
                        </GMapMap>
                </div>
                
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6">
                <span>ketika driver sudah diterima, info akan muncul disini</span>
            </div>
        </div>

    </div>
</template>
<script setup>
import { useLocationStore } from '@/stores/location.js'
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';


const router = useRouter()
const location = useLocationStore();
const gMap = ref(null)

    
</script>

<style>
</style>