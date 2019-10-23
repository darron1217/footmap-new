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

      <div main>
        <ion-header>
          <ion-toolbar color="warning">
            <!-- 홈이 아니면 보이는 메뉴버튼 (관리자용) -->
            <ion-buttons slot="start" v-if="!isMain">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>푸트맵</ion-title>
            <ion-buttons slot="primary">
              <ion-button @click="showLoginPrompt">
                <ion-icon slot="icon-only" name="person"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-vue-router id="main"/>
      </div>
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
    // 로그인
    showLoginPrompt() {
      return this.$ionic.alertController
        .create({
          header: '관리자 확인',
          inputs: [
            {
              name: 'password',
              type: 'password',
              placeholder: '비밀번호를 입력하세요',
            },
          ],
          buttons: [
            {
              text: '취소',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {

              },
            },
            {
              text: '확인',
              handler: (form) => {
                if(form.password == '1234') {
                  console.log(this.$ionic);
                  this.$ionic.toastController.create({
                    color: 'dark',
                    duration: 2000,
                    message: '관리자페이지로 이동합니다'
                  }).then(t => t.present());
                  // 관리자페이지로 이동
                  this.$router.push('/admin');
                }
                else {
                  this.$ionic.toastController.create({
                    color: 'dark',
                    duration: 2000,
                    message: '비밀번호가 일치하지 않습니다. 다시 시도해주세요.'
                  }).then(t => t.present());
                }
              },
            },
          ],
        })
        .then(a => a.present());
    },
  },
}
</script>

<style>

</style>
