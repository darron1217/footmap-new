<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning">
        <ion-title>푸트맵</ion-title>
        <ion-buttons slot="primary">
          <ion-button @click="showLoginPrompt">
            <ion-icon slot="icon-only" name="settings"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button @click="openModal(1)">Open Modal</ion-button>
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
            id: truckid,
            name: "치킨트럭",
            image: "",
            foods:[]
          }
        })
        .then(m => m.present())
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
  }
}
</script>