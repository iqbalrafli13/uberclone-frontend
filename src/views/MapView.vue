<template>
     <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Ini Tujuan Nama</h1>
        <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
            <div class="bg-white px-4 py-5 sm:p-6">
                <div>
                    <GMapMap v-if="location.destination.name !== ''" 
                            :zoom="11" :center="location.destination.geometry"
                            ref="gMap"
                            style="width: 100%; height: 256px;">
                            <GMapMarker :position="location.destination.geometry"/>
                        </GMapMap>
                </div>
                <div class="mt-2">
                    <p class="text-xl">Kita akan Pergi ke <strong>{{location.destination.name}}</strong></p>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                    @click.prevent="handleConfirmTrip"
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
                    Berangkat
                </button>
            </div>
        </div>

    </div>
</template>
<script setup>
import { useLocationStore } from '@/stores/location.js'
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import http from '@/helpers/http'


const router = useRouter()
const location = useLocationStore();
const gMap = ref(null)

const handleConfirmTrip = () => {
    http().post('/api/trip',{
        origin: location.current.geometry,
        destination: location.destination.geometry,
        destination_name: location.destination.name
    }).then((response)=>{
        router.push({
            name:'trip'
        })
    }).catch((error)=>{
        console.error(error);
    })
}
onMounted( async ()=>{
    //apakah user punya lokasi tujuan
    if (location.destination.name == '') {
        router.push({
            name:'location'
        })   
    }

    //get user location current
    await location.updateCurrentLocation();

    
    // draw a path on the map
    gMap.value.$mapPromise.then((mapObject)=>{
        let currentPoint = new google.maps.LatLng(location.current.geometry),
            destinationPoint = new google.maps.LatLng(location.destination.geometry),
            diractionService = new google.maps.DirectionsService,
            diractionDisplay = new google.maps.DirectionsRenderer({
                map:mapObject
            })

        diractionService.route({
            origin:currentPoint,
            destination:destinationPoint,
            avoidTolls: false,
            avoidHighways: false,
            travelMode:google.maps.TravelMode.DRIVING
        },(res,status)=>{
            if (status == google.maps.DirectionsStatus.OK){
                diractionDisplay.setDirections(res)
            }else{
                console.error(status);
            }
        })
    })
})
    
</script>

<style>
</style>