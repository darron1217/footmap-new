<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>푸트맵 관리자</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="go('/')">
            <ion-icon slot="icon-only" name="home"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card button @click="go('/admintruck')">
        <ion-card-header>
          <ion-card-title>푸드트럭</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{ truckCount }}대
        </ion-card-content>
      </ion-card>
      <ion-card button @click="go('/adminorder')">
        <ion-card-header>
          <ion-card-title>준비중인 주문</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{ orderCount }}건
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios'
import APIURL from '../config.js'

export default {
  data() {
    return {
      truckCount: 0,
      orderCount: 0
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.getInfos();
    })
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
    getInfos() {
      axios.get(APIURL+'/trucks').then(res => {
        this.truckCount = res.data.length;
      });
      axios.get(APIURL+'/orders').then(res => {
        this.orderCount = res.data.length;
      });
    }
  },
}
</script>