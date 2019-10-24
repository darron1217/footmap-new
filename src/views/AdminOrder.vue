<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning" class="toolbar">
        <ion-row class="icon"></ion-row>
        <ion-buttons slot="start">
         <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="go('/')">
          <ion-icon slot="icon-only" name="home" style="font-size:40px"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item-sliding v-for="order in orders" v-bind:key="order.id" v-show="!order.isReady">
          <ion-item>
            <ion-thumbnail slot="start">
              <img :src="order.food.image">
            </ion-thumbnail>
            <ion-label>
              <h2>{{ order.truck.name }}</h2>
              <h3>{{ order.food.name }}</h3>
              <p>{{ order.count }}개</p>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="primary" @click="readyOrder(order)">준비완료</ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
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
      orders: [],
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.getOrders();
    })
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
    getOrders() {
      axios.get(APIURL+'/orders?_expand=truck&_expand=food').then(res => {
        this.orders = res.data;
      });
    },
    readyOrder(order) {
      axios.patch(APIURL+'/orders/'+order.id, {isReady:true}).then(() => {
        // 목록 갱신
        this.getOrders();
      });
    }
  },
}
</script>


<style>
.icon {position: absolute; z-index: 2; top:0%; left:0%; width: 100%; height: 100%; background: url("../assets/foot_icon.png") no-repeat; background-size: contain; background-position: center}
  .toolbar {position: relative; z-index: 1;}
</style>