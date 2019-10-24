<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning" class="toolbar">
        <ion-row class="icon"></ion-row>
        <ion-buttons slot="start">
          <ion-back-button text="뒤로"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="deleteTruck" v-show="truck.id !== undefined">삭제</ion-button>
        </ion-buttons>
    </ion-toolbar>
    </ion-header>
    <ion-content>
      <form v-on:submit.prevent="processForm">
        <ion-list>
          <ion-list-header>기본정보</ion-list-header>
          <ion-item>
            <ion-label position="floating" style="font-family: 'Jua', 'Do Hyeon', 'Noto Sans KR', sans-serif; font-size:24px;">트럭이름 <ion-text color="danger">*</ion-text></ion-label>
            <ion-input required type="text" name="name" v-bind:value="truck.name" @ionInput="truck.name = $event.target.value;" style="font-family: 'Jua', 'Do Hyeon', 'Noto Sans KR', sans-serif;"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating" style="font-family: 'Jua', 'Do Hyeon', 'Noto Sans KR', sans-serif; font-size:24px;">전화번호 <ion-text color="danger">*</ion-text></ion-label>
            <ion-input required type="text" name="phone" v-bind:value="truck.phone" @ionInput="truck.phone = $event.target.value;" style="font-family: 'Jua', 'Do Hyeon', 'Noto Sans KR', sans-serif;"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating" style="font-family: 'Jua', 'Do Hyeon', 'Noto Sans KR', sans-serif; font-size:24px;">소개</ion-label>
            <ion-textarea name="description" v-bind:value="truck.description" @ionInput="truck.description = $event.target.value;" style="font-family: 'Jua', 'Do Hyeon', 'Noto Sans KR', sans-serif;"></ion-textarea>
          </ion-item>
        </ion-list>

        <ion-list>
          <ion-list-header>음식목록</ion-list-header>
          <ion-item-sliding v-for="food in truck.foods" v-bind:key="food.id" v-show="!food.deleted" button>
              <ion-item @click="showFoodPrompt(food)">
                <ion-thumbnail slot="start">
                  <img :src="food.image">
                </ion-thumbnail>
                <ion-label>
                  <h3>{{ food.name }}</h3>
                  <p>{{ food.description }}</p>
                </ion-label>
                <h3>{{ food.price }}원</h3>
              </ion-item>
              <ion-item-options side="end">
                <ion-item-option color="danger" @click="deleteFood(food)">삭제</ion-item-option>
              </ion-item-options>
          </ion-item-sliding>
          <ion-button expand="full" fill="clear" @click="showFoodPrompt({price:0})">
            <ion-icon color="warning" slot="icon-only" name="ios-add-circle-outline"></ion-icon>
          </ion-button>
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
import Vue from 'vue'
import APIURL from '../config.js'

export default {
  props: ['id'],
  data() {
    return {
      truck: {
        foods: []
      },
      deletedFoods: [],
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.getTruck(this.id);
    })
  },
  methods: {
    getTruck(id) {
      // 등록화면이면 truck정보 가져오기 취소
      if(id == 'new') return;
      // 로딩 띄우면서 정보가져오기
      this.$ionic.loadingController.create({message: 'Loading'}).then(loading => {
        loading.present();
        axios.get(`${APIURL}/trucks/${id}?_embed=foods`).then(res => {
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
        // 저장하기전 foods는 제거
        let foods = this.truck.foods;
        delete this.truck.foods;

        // 저장콜백
        let callback = res => {
          console.log(res);

          loading.dismiss();
          // 성공하면 알림
          this.$ionic.alertController.create({
            header: '저장되었습니다',
            message: `<b>${this.truck.name} 트럭이 저장되었습니다</b>`,
            buttons: [{
              text: 'OK'
            }]
          }).then(alert => alert.present());

          let truck = res.data;
          // 음식들저장
          foods.map(async (food, i) => {
            // 새로등록할때를 대비해 truckId를 계속 넣어주도록 구현
            food.truckId = truck.id;
            if(food.deleted) {
              await axios.delete(`${APIURL}/foods/${food.id}`);
            }
            // id가 있으면 수정, 없으면 입력
            else if(food.id === undefined)
              await axios.post(`${APIURL}/foods`, food).then(res => {
                foods[i] = res.data;
              });
            else 
              await axios.put(`${APIURL}/foods/${food.id}`, food);
          });

          // 저장후엔 뒤로가기
          this.$router.go(-1);
        }
        
        // 등록 또는 수정
        if(this.id == 'new') {
          axios.post(`${APIURL}/trucks`, this.truck).then(callback);
        }
        else {
          axios.put(`${APIURL}/trucks/${this.id}`, this.truck).then(callback);
        }

      });
    },
    // 음식 순서바꿀때 사용
    // onReorder({detail}) {
    //   detail.complete(true);
    // },
    // 음식 등록&수정 화면
    showFoodPrompt(food) {
      return this.$ionic.alertController
        .create({
          header: '음식정보',
          inputs: [
            {
              name: 'name',
              type: 'text',
              value: food.name,
              placeholder: '음식 이름을 입력하세요',
            },
            {
              name: 'description',
              type: 'text',
              value: food.description,
              placeholder: '음식 설명을 입력하세요',
            },
            {
              name: 'price',
              type: 'number',
              value: food.price,
              placeholder: '음식 가격을 입력하세요',
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
              handler: (foodData) => {
                food.name = foodData.name;
                food.description = foodData.description;
                food.price = foodData.price;
                
                // 새로등록이면 foods목록에 push
                if(!food.id) {
                  this.truck.foods.push(food);
                }

                this.$ionic.toastController.create({
                  color: 'dark',
                  duration: 2000,
                  message: '저장되었습니다'
                }).then(t => t.present());
                
              },
            },
          ],
        })
        .then(a => a.present());
    },
    deleteFood(food) {
      Vue.set(food, 'deleted', true);
      
      this.$ionic.toastController.create({
        color: 'dark',
        duration: 2000,
        message: '삭제되었습니다'
      }).then(t => t.present());
    },
    async deleteTruck() {
      await axios.delete(`${APIURL}/trucks/${this.id}`);
      // 성공하면 알림
      this.$ionic.alertController.create({
        header: '삭제되었습니다',
        message: `<b>트럭이 삭제되었습니다</b>`,
        buttons: [{
          text: 'OK'
        }]
      }).then(alert => alert.present());
      // 삭제후엔 뒤로가기
      this.$router.go(-1);
    },
  }
}
</script>

<style>
:root {
  --ion-color-warning-shade: #d33939;
}
.icon {position: absolute; z-index: 2; top:0%; left:0%; width: 100%; height: 100%; background: url("../assets/foot_icon.png") no-repeat; background-size: contain; background-position: center}
  .toolbar {position: relative; z-index: 1;}
</style>