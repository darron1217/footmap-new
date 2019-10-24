<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>주문 관리</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="go('/')">
            <ion-icon slot="icon-only" name="home"></ion-icon>
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