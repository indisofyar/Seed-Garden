<script>
import { TransitionGroup, Transition } from 'vue'

export default {
    mounted() {
        this.show = true;
    },
    name: 'Welcome',
    data() {
        return {
            screen: 1,
            show: false,
            showSeeds: false,
            showSoil: false,
            wheatStage: 0,
            showPopup: false,
        }
    },
    methods: {
        increaseScreen() {
            if (this.screen < 3) {
                this.screen++
            }
        },
        plantSeeds() {
            const vm = this;
            if (this.showSeeds && this.wheatStage < 7) {
                vm.wheatStage++
            }
        },
        showSeedsAfterDelay() {
            const vm = this;
            setTimeout(() => {
                vm.showSeeds = true
            }, 1500)
        },
        showPopupAfterDelay() {
            const vm = this;
            setTimeout(() => {
                vm.showPopup = true
            }, 3000)
        }
    },
    watch: {
        screen(val) {
            if (val == 4) {
                this.showSeedsAfterDelay();
            }
        },
        wheatStage(val) {
            if (val == 7) {

                this.showPopupAfterDelay();
            }
        }
    }
}
</script>
<template>
    <Transition name="leaf-down">
        <img src="/down-leaf.png" class="left-[-150px] absolute" v-if="show && screen != 4">
    </Transition>

    <div style="height: 100%; width: 100%;" class="flex items-center justify-center min-h-[100dvh] overflow-hidden"
        @click="increaseScreen">
        <TransitionGroup>
            <div class="font-serif text-gray-600 italic text-4xl mb-[100px]" v-if="screen == 1 && show">Welcome to...</div>
            <div v-if="screen == 2" style="position: absolute;">
                <div class="font-serif text-brown-600 text-5xl " v-if="screen == 2">Seed garden</div>
                <div class="font-serif text-gray-400 italic text-4xl mb-[100px]" v-if="screen == 2">Grow, learn & flourish
                </div>
            </div>
            <div v-if="screen == 3" style="position: absolute;">
                <div class="font-serif text-gray-500 italic text-4xl ">What is your name?</div>
                <div class="relative">
                    <input type="text" @keydown.enter="screen++" v-model="$store.state.userName"
                        class="mb-[100px] rounded  w-full min-h-[65px] mt-2 bg-[#F1F1F180] border-2 border-[#AB9283] relative">
                    <button class="absolute right-2 top-4 btn btn-primary text-white" @click="screen = 4">Submit</button>
                </div>
            </div>
            <div v-if="screen == 4 && wheatStage < 7" style="position: absolute; top: 100px">
                <div class="font-serif text-gray-500 italic text-3xl ">Hi {{ $store.state.userName }}, let's get planting!
                </div>
                <TransitionGroup>
                    <p class="text-center mt-6" v-if="wheatStage < 1">Click to plant</p>
                    <p class="text-center mt-6" v-else>Tap to grow</p>
                </TransitionGroup>


            </div>
        </TransitionGroup>
    </div>
    <Transition name="seeds">
        <img src="/seeds.svg" class="absolute  w-[70px]"
            style="left:42%; transition: bottom 0.5s ease, transform 0.5s ease; bottom: 450px"
            v-if="showSeeds && wheatStage < 2" :class="{ 'planted': wheatStage > 0 }">
    </Transition>

    <Transition name="leaf-up">
        <img src="/up-leaf.png" class="absolute bottom-0 right-[-120px]" v-if="show && screen != 5">
    </Transition>
    <Transition name="soil-up">
        <img src="/soil.png" class="absolute w-100 left-0 right-0 bottom-0" v-if="screen == 4" @click="plantSeeds">
    </Transition>
    <TransitionGroup name="wheat">
        <img src="/wheat-1.svg" class="absolute w-100 left-[30%] right-0 bottom-[250px]" v-if="wheatStage == 1" :key="1"
            style="z-index: 3;" @click="plantSeeds">
        <img src="/wheat-2.svg" class="absolute w-100 left-[30%] right-0 bottom-[250px]" v-if="wheatStage == 2" :key="2"
            style="z-index: 3;" @click="plantSeeds">
        <img src="/wheat-3.svg" class="absolute w-100 left-[30%] right-0 bottom-[250px]" v-if="wheatStage == 3" :key="3"
            style="z-index: 3;" @click="plantSeeds">
        <img src="/wheat-4.svg" class="absolute w-100 left-[28%] right-0 bottom-[250px]" v-if="wheatStage == 4" :key="4"
            style="z-index: 3;" @click="plantSeeds">
        <img src="/wheat-5.svg" class="absolute w-100 left-[28%] right-0 bottom-[250px]" v-if="wheatStage == 5" :key="5"
            style="z-index: 3;" @click="plantSeeds">
        <img src="/wheat-6.svg" class="absolute w-100 left-[28%] right-0 bottom-[250px]"
            v-if="wheatStage == 6 || wheatStage == 7" :key="6" style="z-index: 3;" @click="plantSeeds">
    </TransitionGroup>
    <TransitionGroup>
        <iframe src="https://lottie.host/?file=599f397c-d7b5-41e0-b2fb-d847d55027e9/Z0Y1Xqu8fM.json"
            class="absolute bottom-[400px] " style="z-index: 3;" key="a" v-if="wheatStage == 7"></iframe>
        <iframe src="https://lottie.host/?file=599f397c-d7b5-41e0-b2fb-d847d55027e9/Z0Y1Xqu8fM.json"
            class="absolute bottom-[500px] " style="z-index: 3;" key="b" v-if="wheatStage == 7"></iframe>

    </TransitionGroup>
    <Transition>
        <div class="flex-col w-full h-full absolute top-0 bg-[#6D806D] shadow-black-500/50 text-white p-6 flex justify-center items-center"
            style="z-index: 5;" v-if="showPopup">
            <div class="font-serif text-3xl italic text-[#fff] font-normal">You've earned your first plant <i
                    class="bi bi-stars  text-[#ddddc2]"></i></div>
            <div class=" bg-[#9fb09f] mt-4 max-h-[200px] w-full p-3 flex justify-center rounded-lg shadow-xl">
                <img src="/wheat-6.svg" class="max-w-full max-h-full">

            </div>
            <div class=" relative bg-[#779277] mt-4 max-h-[150px] w-full p-3 flex justify-center text-lg rounded-lg shadow-xl overflow-y-scroll">
                Wheat is a grass widely cultivated for its seed, a cereal grain that is a worldwide staple food. The many
                species of wheat together make up the genus Triticum /ˈtrɪtɪkəm/;[3] the most widely grown is common wheat
                (T. aestivum). The archaeological record suggests that wheat was first cultivated in the regions of the
                Fertile Crescent around 9600 BC. Botanically, the wheat kernel is a caryopsis, a type of fruit.
            </div>
            <div class="text-left relative bg-[#9dba9d] mt-4 max-h-[150px] w-full p-3 text-lg rounded-lg shadow-xl overflow-y-scroll">
                <strong>Did you know?</strong><br>
                
                Wheat cultivation is even older than the first cities in the world, the Great Pyramid of Giza and the first solar calendar ever created. 
            </div>
            <router-link to="/garden" class="w-full">
                <button class="w-full mt-20 btn btn-primary text-white" >Visit garden</button>
            </router-link>
            
        </div>
    </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.v-enter-from {
    opacity: 0;
    transform: translateY(120px)
}

.v-leave-to {
    opacity: 0;
    transform: translateY(-120px)
}

.leaf-up-enter-active,
.leaf-up-leave-active {
    transition: transform 0.8s ease;
}

.leaf-up-enter-from,
.leaf-up-leave-to {

    transform: translateY(120px) rotate(20deg)
}

.leaf-down-enter-active,
.leaf-down-leave-active {
    transition: transform 0.8s ease;
}

.leaf-down-enter-from,
.leaf-down-leave-to {
    transform: translateY(-120px) rotate(-20deg)
}

.soil-up-enter-active,
.soil-up-leave-active {
    transition: transform 1.5s ease-in-out;
}

.soil-up-enter-from,
.soil-up-leave-to {
    transform: translateY(100%)
}

.seeds-enter-active,
.seeds-leave-active {
    transition: transform 0.2s ease-in-out;
}

.seeds-enter-from,
.seeds-leave-to {
    transform: scale(0);
}

.planted {
    bottom: 260px !important;
    transform: scale(0.5);
    z-index: 1;
}

.wheat-enter-active,
.wheat-leave-active {
    transition: transform 0.2s ease-in-out;
}

.wheat-enter-from,
.wheat-leave-to {
    transform: scale(0.9);
    opacity: 0;
}
</style>