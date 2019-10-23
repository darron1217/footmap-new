<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>푸드트럭 관리</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="go('/')">
            <ion-icon slot="icon-only" name="home"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item button v-for="truck in trucks" v-bind:key="truck.id" @click="go('/admintruck/'+truck.id)">
          <ion-avatar slot="start">
            <img src="https://ionicframework.com/docs/demos/api/list/avatar-finn.png">
          </ion-avatar>
          <ion-label>
            <h2>{{ truck.name }}</h2>
            <h3>{{ truck.phone }}</h3>
            <p>{{ truck.description }}</p>
          </ion-label>
        </ion-item>
        <ion-button expand="full" fill="clear" @click="go('/admintruck/new')">
          <ion-icon color="warning" slot="icon-only" name="ios-add-circle-outline"></ion-icon>
        </ion-button>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      trucks: [],
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.getTrucks();
    })
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
    getTrucks() {
      axios.get('http://localhost:3000/trucks').then(res => {
        this.trucks = res.data;
      });
    },
  },
}
</script>