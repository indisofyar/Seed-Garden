<script>

import {
    AppConfig,
    UserSession,
    showConnect,
    openContractCall,
} from "@stacks/connect";

import { StacksMocknet } from "@stacks/network";


import {
    stringUtf8CV,
    AnchorMode,
    standardPrincipalCV,
    callReadOnlyFunction,
    makeStandardSTXPostCondition,
    FungibleConditionCode
} from "@stacks/transactions";


const network = new StacksMocknet();
const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });
const appDetails = {
    name: "Hello Stacks",
    icon: "https://freesvg.org/img/1541103084.png",
};


export default {
    name: 'Garden',
    methods: {
        deployNft() {
            
            const network = new StacksMocknet();

            const options = {
                contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
                contractName: "seedgarden-nft",
                functionName: "mint-nft",
                functionArgs: [stringUtf8CV(this.message)],
                network,
                appDetails: {
                    name: "Hello Stacks",
                    icon: "https://freesvg.org/img/1541103084.png",
                },
                onFinish: ({ txId }) => console.log(txId),
            };

            openContractCall(options);
        },
        connectWallet() {
            const appConfig = new AppConfig(["store_write"]);
            const userSession = new UserSession({ appConfig });
            const appDetails = {
                name: "Hello Stacks",
                icon: "https://freesvg.org/img/1541103084.png",
            };

            showConnect({
                appDetails,
                onFinish: () => this.finishedConnecting(userSession),
                userSession,
            });
        },
        finishedConnecting(userSession) {


            const vm = this;
            if (userSession.isSignInPending()) {
                userSession.handlePendingSignIn().then((userData) => {
                    vm.userData = userData;
                });
            } else if (userSession.isUserSignedIn()) {
                vm.userData = userSession.loadUserData();
            }
        },
    },
    computed: {
        userSession() {
            return userSession
        }
    },
    data() {
        return {
            showSign: false,
            dotsAmount: 2,
            selectedDot: 1,
            showHistory: false,
            userData: null,
        }
    },
    watch: {
        userSession(val) {
            if (val.isSignInPending()) {
                val.handlePendingSignIn().then((userData) => {
                    vm.userData = userData;
                });
            } else if (userSession.isUserSignedIn()) {
                userData = userSession.loadUserData()
            }
        }
    },
    mounted() {
        this.showSign = true
    }
}


</script>

<template>
    <div class="flex gap-8 absolute bottom-10 w-full justify-center z-20">
        <div v-for="n in dotsAmount" class="bg-white w-[15px] opacity-50 h-[15px] transition-all rounded-full"
            :class="{ 'w-[20px] h-[20px] opacity-100 ': n == selectedDot }" @click="selectedDot = n">

        </div>
    </div>
    <Transition name="slideright">
        <div class="w-full h-full bg-[url('/garden.avif')] bg-cover absolute left-0 top-0 z-10" v-if="selectedDot == 1">
            <Transition name="sign">
                <div class="float-in relative">
                    <img src="/sign.svg" class="">
                    <div class="absolute bottom-[50px] left-[80px] text-[#4D3423] font-serif italic text-3xl uppercase">
                        <span v-if="$store.state.userName != ''" class="text-[#4D3423]">{{ $store.state.userName
                        }}</span><span class="text-[#4D3423]" v-else>Jake</span>'s Garden
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
    <TransitionGroup>
        <div class="w-full h-full p-4 absolute" v-if="selectedDot == 2">
            <div class="font-serif text-4xl italic mb-4">
                Plants <i class="bi bi-flower1"></i>
            </div>
            <div class="mb-4">
                1/330 collected
            </div>
            <div class="p-4 bg-white rounded-xl shadow-md flex gap-5">
                <div class="bg-[#6D806D] p-1 rounded flex justify-center w-[60px] h-[60px]">
                    <img src="/wheat-6.svg" class="w-[50px]">
                </div>
                <div>
                    <div class="text-2xl">Wheat</div>
                    <button class="btn btn-primary h-[25px] min-h-[38px] py-0" @click="selectedDot++">Details <i
                            class="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="selectedDot == 3" class="p-4 absolute w-full">
            <div class="font-serif text-3xl italic  font-normal">Wheat <i class="bi bi-stars  "></i></div>
            <div class=" bg-[#9fb09f] mt-4 max-h-[200px] w-full p-3 flex justify-center rounded-lg shadow-xl">
                <img src="/wheat-6.svg" class="max-w-full max-h-full">
            </div>
            <button class="w-full mt-4 btn btn-neutral  text-black transition-all transition-duration-1s"
                @click="showHistory = !showHistory">History <i class="bi text-black bi-chevron-right"
                    :class="{ 'rotate-90': showHistory }"></i></button>

            <div v-if="showHistory">
                <div
                    class=" relative bg-[#779277] mt-4 max-h-[150px] w-full p-3 flex justify-center text-lg rounded-lg shadow-xl overflow-y-scroll">
                    Wheat is a grass widely cultivated for its seed, a cereal grain that is a worldwide staple food. The
                    many
                    species of wheat together make up the genus Triticum /ˈtrɪtɪkəm/;[3] the most widely grown is common
                    wheat
                    (T. aestivum). The archaeological record suggests that wheat was first cultivated in the regions of
                    the
                    Fertile Crescent around 9600 BC. Botanically, the wheat kernel is a caryopsis, a type of fruit.
                </div>
                <div
                    class="text-left relative bg-[#9dba9d] mt-4 max-h-[150px] w-full p-3 text-lg rounded-lg shadow-xl overflow-y-scroll">
                    <strong>Did you know?</strong><br>

                    Wheat cultivation is even older than the first cities in the world, the Great Pyramid of Giza and
                    the
                    first
                    solar calendar ever created.
                </div>
            </div>
            <div>
                <button class="w-full mt-4 btn btn-neutral  text-black transition-all transition-duration-1s opacity"
                    @click="selectedDot++">
                    <div>Mint NFT </div>
                    <div class="badge badge-accent">Only 4 left</div>
                </button>
            </div>


            <button class="w-full mt-20 btn btn-primary text-white" @click="selectedDot = 2">Back</button>
        </div>
        <div v-if="selectedDot == 4" class="p-4">
            <div class="font-serif text-3xl italic  font-normal">Mint your NFT</div>
            <button className=" mt-4 p-4 btn btn-primary w-full first-line:rounded text-white" @click="connectWallet"
                v-if="!userData">
                Connect Wallet
            </button>

            <button className="p-4 mt-4  mb-4 btn btn-primary w-full first-line:rounded text-white" @click="selectedDot++"
                v-if="userData">
                Confirm (0.68 STX)
            </button>
       
            <div class="card w-96 bg-base-100 shadow-xl max-w-full" v-if="userData">
                <div class="card-body overflow-scroll">
                    <strong class="font-bold">STX Address</strong>
                    {{ userSession.loadUserData().profile.stxAddress.testnet }}
                </div>
            </div>



        </div>
    </TransitionGroup>
    <Transition name="slideright">
        <img src="/real-nfts-in-your-area.png" class="absolute top-0" v-if="selectedDot == 5">
    </Transition>
</template>

<style>
.opacity-100 {
    opacity: 1 !important;
}

.sign-enter-active,
.sign-leave-active {
    transition: transform 0.2s ease-in-out;
}

.sign-enter-from,
.sign-leave-to {
    transform: scale(0.9);
    opacity: 0;
}

.slideright-enter-active,
.slideright-leave-active {
    transition: transform 0.8s ease-in-out;
}

.slideright-enter-from,
.slideright-leave-to {
    transform: translateX(-100%);
}

.opacity-enter-active,
.opacity-leave-active {
    transition: opacity 0.8s ease-in-out;
}

.opacity-enter-from,
.opacity-leave-to {
    opacity: 0;
}

.float-in {
    transition: all;
    animation: floatin 0.7s ease-in-out;
    padding: 0 20px;
}

@keyframes floatin {
    0% {
        transform: translateY(-100%) rotate(20deg);
    }

    50% {
        transform: translateY(-50%), rotate(-5deg);
    }

    100% {
        transform: translateY(0);
    }

}
</style>