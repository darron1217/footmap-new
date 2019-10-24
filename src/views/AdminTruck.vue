<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning" class="toolbar">
        <ion-row class="icon"></ion-row>
        <ion-title>푸드트럭 관리</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="go('/')">
            <ion-icon slot="icon-only" name="home" style="font-size: 40px;"></ion-icon>
          </ion-button>
        </ion-buttons>
    </ion-toolbar>
      
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item button v-for="truck in trucks" v-bind:key="truck.id" @click="go('/admintruck/'+truck.id)">
          <ion-thumbnail slot="start">
            <img :src="truck.image">
          </ion-thumbnail>
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
import APIURL from '../config.js'

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
      axios.get(APIURL+'/trucks').then(res => {
        this.trucks = res.data;
      });
    },
  },
}
</script>


<style>
.icon {position: absolute; z-index: 2; top:0%; left:0%; width: 100%; height: 100%; background: url("../assets/foot_icon.png") no-repeat; background-size: contain; background-position: center}
  .toolbar {position: relative; z-index: 1;}
</style>