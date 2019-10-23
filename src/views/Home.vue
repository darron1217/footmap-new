<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Hello World</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button @click="openModal">Open Modal</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import TruckModal from '../components/TruckModal.vue'

export default {
  name: 'App',
  methods: {
    openModal(truckid) {
      console.log("@@@@@@@@@@@@@@@");
      return this.$ionic.modalController
        .create({
          component: TruckModal,
          componentProps: {
            title: "Teeste",
            id: truckid,
            image: "",
            foods:[]
          }
        })
        .then(m => m.present())
    },
  }
}
</script>