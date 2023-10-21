import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import store from './store' // import your store

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCme1q4ah7SffQLJnlSyrd8mWDJioftPr4",
    authDomain: "seedgarden4761.firebaseapp.com",
    projectId: "seedgarden4761",
    storageBucket: "seedgarden4761.appspot.com",
    messagingSenderId: "693794995429",
    appId: "1:693794995429:web:2c2105076431476b52e80c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities() {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}

createApp(App)
    .use(store)
    .use(router)
    .mount('#app');