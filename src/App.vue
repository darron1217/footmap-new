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

<style>
/* Core CSS required for Ionic components to work properly */
@import "~@ionic/core/css/core.css";

/* Basic CSS for apps built with Ionic */
@import "~@ionic/core/css/normalize.css";
@import "~@ionic/core/css/structure.css";
@import "~@ionic/core/css/typography.css";

/* Optional CSS utils that can be commented out */
@import "~@ionic/core/css/padding.css";
@import "~@ionic/core/css/float-elements.css";
@import "~@ionic/core/css/text-alignment.css";
@import "~@ionic/core/css/text-transformation.css";
@import "~@ionic/core/css/flex-utils.css";



.label * {display: inline-block;vertical-align: top;}
.label .left {background: url("http://t1.daumcdn.net/localimg/localimages/07/2011/map/storeview/tip_l.png") no-repeat;display: inline-block;height: 24px;overflow: hidden;vertical-align: top;width: 7px;}
.label .center {background: url(http://t1.daumcdn.net/localimg/localimages/07/2011/map/storeview/tip_bg.png) repeat-x;display: inline-block;height: 24px;font-size: 12px;line-height: 24px;}
.label .right {background: url("http://t1.daumcdn.net/localimg/localimages/07/2011/map/storeview/tip_r.png") -1px 0  no-repeat;display: inline-block;height: 24px;overflow: hidden;width: 6px;}


</style>
