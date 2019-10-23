<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="secondary" style="padding-left: 10px;">
          <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
        <ion-title>
          <ion-item>
            <ion-thumbnail slot="start">
              <img :src="truck.image">
            </ion-thumbnail>  
            {{ truck.title }}
          </ion-item>
          
        </ion-title>
        <ion-buttons slot="primary">
          <ion-button @click="payConfirm">Submit</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list v-for="(food, index) in truck.foods"
                v-bind:key="index" lines="full">
        <ion-item class="foodInfo">
          <ion-row>
            <ion-col size=6>
              <img :src="food.image" class="foodImg">
            </ion-col>
            <ion-col size=6>
              <ion-row class="foodNamePrice">
                <ion-col size=7>
                  <span class="foodNameTxt">{{ food.name }}</span>
                </ion-col>
                <ion-col size=5>
                  <div class="foodPriceTxt">{{ food.price }}원</div>
                </ion-col>
              </ion-row>
              <ion-row class="foodConfirm">
                <ion-col size=12>
                  <ion-col size=3>
                    <ion-button color="dark" fill="clear" size="small" @click="btnUpClick(food)" value="aa">
                      <ion-input type="hidden" v-bind:value="index"></ion-input>
                      <ion-icon  name="arrow-dropup"></ion-icon>
                    </ion-button>
                    </ion-col>
                  <ion-col size=6>
                    <ion-input type="number" :value="food.count" style="display: inline-block; width: 20%;" disabled=true v-model="food.count"></ion-input>
                  </ion-col>
                  <ion-col size=3>
                    <ion-button color="dark" fill="clear" size="small" @click="btnDownClick(food)">
                      <ion-input type="hidden" v-bind:value="index"></ion-input>
                      <ion-icon name="arrow-dropdown"></ion-icon>
                    </ion-button>
                  </ion-col> 
                </ion-col>
              </ion-row>
              
            </ion-col>
            
          </ion-row>
        </ion-item>
      </ion-list>
      <!--
      <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button color="light">
          <ion-icon name="cart"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      --> 
    </ion-content>
  </ion-page>
  
</template>

<script>
import Vue from 'vue';

export default {
  name: 'Modal',
  props: {
    
  },
  data() {
    return {
      orderHistory: "",
      totalPrice: 0,
      
    }
  },
  created() {
    this.truck.foods.map(food => {
      Vue.set(food, 'count', 0);
    });
  },
  methods: {
    closeModal() {
      return this.$ionic.modalController
        .dismiss()
    }, payConfirm(){
      return this.$ionic.alertController
        .create({
          header: '주문 하시겠습니까?',
          subHeader: '주문 내역',
          message: this.orderHistory + '<br>총 합계 : ' + this.totalPrice + '원',
          buttons: [{
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel')
              },
            }, {
            text: 'OK',
            handler: () => {  
              console.log('press confirm');
            }
            }],
        })
        .then(a => a.present())
    },
    setOrder() {
      this.orderHistory="";
      this.totalPrice=0;
      for(let i = 0; i < this.truck.foods.length; i++) {
        if(this.truck.foods[i].count != "0") {
          this.orderHistory += this.truck.foods[i].name + "   " + this.truck.foods[i].count + '개<br>';
          this.totalPrice += (this.truck.foods[i].price * this.truck.foods[i].count);
        }
      }
    },
    
    btnUpClick(food) {
      console.log(food.count++);
      this.setOrder();
    },
    btnDownClick(food) {
      if(food.count > 0) {
        console.log(food.count--);
        this.setOrder();
      }
      
    }
  }
}
</script>


<style scoped>

  ion-content {
    padding: 5%!important;
  }
  .foodImg {
    width: 100%;
    height: 100%;
    max-height: 120px;
  }

  ion-row {
    --width: 100%;
  }

  ion-button {
    position: relative;
    top: -5px;
  }
  .foodNameTxt {
    font-size: 19px;
    font-weight: bold;
  }
  .foodPriceTxt {
    width: 100% ;
    font-size: 14px;
    text-align: right;
  }
  .foodConfirm {
    text-align: center;
  }
  .foodInfo > ion-row  .foodNamePrice {
    height: 55%;
  }
  .foodInfo > ion-row  .foodConfirm {
    height: 40%;
  }
  ion-list {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  ion-input {
    --padding-top : 0px;
    --padding-right : 0px;
    --padding-bottom : 0px;
    --padding-start: 0px;
    --padding-end: 0px;
  }
</style>