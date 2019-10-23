<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-back-button text="뒤로"></ion-back-button>
        </ion-buttons>
        <ion-title>푸드트럭 정보</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form v-on:submit.prevent="processForm">
        <ion-list lines="full" class="ion-no-margin ion-no-padding">
          <ion-list-header>기본정보</ion-list-header>
          <ion-item>
            <ion-label position="floating">트럭이름 <ion-text color="danger">*</ion-text></ion-label>
            <ion-input required type="text" name="name" v-bind:value="truck.name" @ionInput="truck.name = $event.target.value;"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">설명</ion-label>
            <ion-textarea name="description" v-bind:value="truck.description" @ionInput="truck.description = $event.target.value;"></ion-textarea>
          </ion-item>
        </ion-list>

        <ion-list>
          <ion-list-header>음식목록</ion-list-header>
          <ion-item v-for="food in truck.foods" v-bind:key="food.id">
            <ion-thumbnail slot="start">
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
            </ion-thumbnail>
            <ion-label>
              <h3>{{ food.name }}</h3>
              <p>{{ food.description }}</p>
            </ion-label>
            <h3>{{ food.price }}원</h3>
          </ion-item>
        </ion-list>

        <div class="ion-padding">
          <ion-button color="warning" expand="block" type="submit" class="ion-no-margin">저장</ion-button>
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],
  data() {
    return {
      truck: {},
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.getTruck();
    })
  },
  methods: {
    getTruck() {
      // 로딩 띄우면서 정보가져오기
      this.$ionic.loadingController.create({message: 'Loading'}).then(loading => {
        loading.present();
        axios.get(`http://localhost:3000/trucks/${this.id}?_embed=foods`).then(res => {
          this.truck = res.data;
          loading.dismiss();
          console.log(this.truck);
        });
      });
    },
    processForm: function(event) {
      event.preventDefault();
      // 로딩 띄우면서 저장하기
      this.$ionic.loadingController.create({message: 'Loading'}).then(loading => {
        loading.present();
        axios.put(`http://localhost:3000/trucks/${this.id}`, this.truck).then(res => {
          console.log(res);
          this.truck = res.data;
          loading.dismiss();
          // 성공하면 알림
          this.$ionic.alertController.create({
            header: '등록되었습니다',
            message: `<b>${this.truck.name} 트럭이 등록되었습니다</b>`,
            buttons: [{
              text: 'OK'
            }]
          }).then(alert => alert.present());
        });
      });
    }
  }
}
</script>