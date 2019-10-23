<template>
  <div id="app">
    <ion-app>
      <ion-menu side="start" content-id="main" v-bind:disabled="isMain">
        <ion-header>
          <ion-toolbar color="warning">
            <ion-title>관리자메뉴</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item button @click="go('/admin')">
              <ion-icon name="home" slot="start"></ion-icon>
              <ion-label>관리홈</ion-label>
            </ion-item>
            <ion-item button @click="go('/admintruck')">
              <ion-icon name="pin" slot="start"></ion-icon>
              <ion-label>푸드트럭관리</ion-label>
            </ion-item>
            <ion-item button @click="go('/adminorder')">
              <ion-icon name="list-box" slot="start"></ion-icon>
              <ion-label>주문관리</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-vue-router id="main"/>
    </ion-app>
  </div>
</template>

<script>
export default {
  computed:{
    // 현재페이지가 메인인지 확인하는 함수
    isMain() {
        return this.$route.path === '/'
    }
  },
  methods: {
    go(url) {
      this.$router.push(url);
      this.$ionic.menuController.close();
    },
  },
}
</script>
