<template>
  <div class="bg-custom-background min-w-full h-[100dvh] overflow-hidden relative" :class="{ 'mobile-container': !isMobile}">
    <TransitionGroup>
      <router-view></router-view>
    </TransitionGroup>
    
  </div>
  <div v-if="!isMobile" class="text-center">For best experience please view on a mobile device</div>
</template>

<script>
import { RouterView } from 'vue-router'

export default {
  mounted() {
    this.isMobile = !(window.innerWidth > 768);
  },
  data() {
    return {
      isMobile: false,
    }
  }
}
</script>

<style>
@import './assets/css/tailwind.css';
@import 'bootstrap-icons/font/bootstrap-icons.css';
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.mobile-container {
  /* Add your mobile container styles here, simulating an iPhone, for example */
  width: 375px; /* Adjust the width to match your desired mobile viewport */
  min-width: auto;
  background-color: #ffffff; /* Set the background color for the mobile container */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  height: 85vh;
  min-height: auto;
  border-radius: 4px;
  margin: 25px auto; /* Center the container horizontally */
  position: relative;
  overflow: hidden;
}

/* Add your component-specific styles here */
</style>
