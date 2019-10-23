<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>푸드트럭 관리</ion-title>
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
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data() {
    return {
      trucks: [{ id:1, name: '푸드트럭1', phone: '010-1234-1234', description: '세상에서 제일 잘나가는 푸드트럭이다', foods:[{id:1,name:'양념치킨',price:10000}]}],
    }
  },
  methods: {
    go(url) {
      this.$router.push(url);
    }
  },
}
</script>