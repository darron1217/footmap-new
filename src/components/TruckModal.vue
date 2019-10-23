<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>  
        </ion-title>
        <ion-buttons slot="primary" style="padding-left: 10px;">
          <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <!-- Food Truck Infomation View -->
      <ion-card>
        <ion-card-header>
          <ion-card-title color="medium" style=" text-align : center; padding-bottom: 15px;"> 
            {{ truck.name }}
          </ion-card-title>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRegnsUD0Zjmms7vGD4InbXlAoc8uuYQH62hWINvEUgUpBhzA8OsA&s">
          
          
          <ion-card-subtitle>
            <span class="gradeTxt"> 
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              {{ truck.grade.toFixed(1) }}
            </span>
          </ion-card-subtitle>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          {{ truck.description }}
        </ion-card-content>
        <ion-item-group class="infoBtnGroup">
          <ion-grid>
            <ion-row >
              <ion-col size=4>
                <ion-button>
                  <ion-icon name="call"></ion-icon>전화
                </ion-button>
              </ion-col>
              <ion-col size=4>
                <ion-button>
                  <ion-icon name="heart-empty"></ion-icon>찜
                </ion-button>
              </ion-col>
              <ion-col size=4>
                <ion-button>
                  <ion-icon name="share"></ion-icon>공유
                </ion-button>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size=12>
                <ion-button @click="payConfirm">
                  <ion-icon name="card"></ion-icon>  결제하기
                </ion-button>
                
              </ion-col>
            </ion-row>
          </ion-grid>
          
        </ion-item-group>
      </ion-card>
      <!-- Food Truck Infomation View -->

      <!-- Food List View  -->
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
                    <ion-button class="btnCount" color="dark" fill="clear" size="small" @click="btnUpClick(food)" value="aa">
                      <ion-input type="hidden" v-bind:value="index"></ion-input>
                      <ion-icon  name="arrow-dropup"></ion-icon>
                    </ion-button>
                    </ion-col>
                  <ion-col size=6>
                    <ion-input type="number" :value="food.count" style="display: inline-block; width: 20%;" disabled=true v-model="food.count"></ion-input>
                  </ion-col>
                  <ion-col size=3>
                    <ion-button class="btnCount" color="dark" fill="clear" size="small" @click="btnDownClick(food)">
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
      <!-- Food List View  -->
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
    truck: {type: Object, defaultValue: {}}
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
  mounted() {
    let i = 0;
    for(; i < parseInt(this.truck.grade); i++) {
      this.$el.querySelectorAll('.icStar')[i].name = "star";
    }
    if(this.truck.grade - i > 0) {
      this.$el.querySelectorAll('.icStar')[i++].name = "star-half";
    } 
    for(; i < 5; i++) {
      this.$el.querySelectorAll('.icStar')[i].name = "star-outline";
    }
    
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

  ion-button.btnCount {
    position: relative;
    top: -5px;
    
  }
  .infoBtnGroup ion-button {
    --background: #ffffff;
    --border-color: #afafaf;
    --border-style: solid;
    --border-width: 1px;
    --color: #3f3f3f;
    --background-activated: #dddddd;
    --color-activated: #ffffff;
    width:100%;
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
  ion-card-header {
     border-bottom: 1px solid #bbbbbb;
     padding-left: 0px;
     padding-right: 0px;
     margin-left: 20px;
     margin-right: 20px;
  }
  ion-card-subtitle {
    text-align: center;
  }
  .gradeTxt {
    font-size: 28px;
    font-weight: lighter;
  }
  .gradeTxt .icStar {
    position: relative;
    top: 5px;
    font-size: 30px;
    color: #ffb245;
    font-weight: bold;
  }
</style>