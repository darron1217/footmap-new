<template>
  <ion-page>
    
    <ion-content class="ion-padding">

      <!-- Food Truck Infomation View -->
      <ion-card>
        <ion-card-header>
          <ion-card-title color="medium" style=" text-align : center; padding-bottom: 15px; color:#3b444b"> 
            {{ truck.name }}
          </ion-card-title>
          <img class="storeImg" :src="truck.image">
          
          
          <ion-card-subtitle>
            <span class="gradeTxt" style="color:#3b444b"> 
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              {{ truck.grade.toFixed(1) }}
            </span>
          </ion-card-subtitle>
          <ion-card-subtitle style="color:#3b444b">
            영업시간 : xx ~ xx
          </ion-card-subtitle>
          <ion-card-subtitle style="color:#3b444b">
            최소 대기시간: xx분
          </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content style="color:#232b2b">
          {{ truck.description }}
        </ion-card-content>
        <ion-item-group class="infoBtnGroup">
          <ion-grid>
            <ion-row >
              <ion-col size=4>
                <ion-button @click=presentActionSheet style="color:#232b2b">
                  <ion-icon class="iconInInfoBtn" name="call"></ion-icon>전화
                </ion-button>
                
              </ion-col>
              <ion-col size=4>
                <ion-button class="likeBtn" @click=likeBtnClick style="color:#232b2b">
                  <ion-icon  class="likeIcon iconInInfoBtn" name="heart-empty"></ion-icon>찜
                </ion-button>
              </ion-col>
              <ion-col size=4>
                <ion-button style="color:#232b2b">
                  <ion-icon class="iconInInfoBtn" name="share"></ion-icon>공유
                </ion-button>
              </ion-col>
            </ion-row>
            <!-- <ion-row>
              <ion-col size=12>
                <ion-button  @click="payConfirm" style="color:#232b2b">
                  <ion-icon class="iconInInfoBtn" name="card"></ion-icon>  결제하기
                </ion-button>
                
              </ion-col>
            </ion-row> -->
          </ion-grid>
        </ion-item-group>
      </ion-card>
      <!-- Food Truck Infomation View -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="payFabBtn" @click=payConfirm>
          <ion-icon name="card"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <!-- Food List View  -->
      <ion-grid>
        <ion-row class="menuGridBtn" style="text-align: center;">
          <ion-col size=6>
            <ion-button @click=menuBtnClick class="menuBtn listMenuSelected">메뉴</ion-button>
          </ion-col>
          <ion-col size=6>
            <ion-button @click=reviewBtnClick class="reviewBtn">리뷰</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid class="menuReviewGrid">
        <ion-row class="menuGrid">
          <ion-list v-for="(food, index) in truck.foods"
                v-bind:key="index" lines="full">
            <ion-item class="foodInfo">
              <ion-row style="margin-bottom: 10px;">
                <ion-col size=4>
                  <img :src="food.image" class="foodImg">
                </ion-col>
                <ion-col size=8>
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
                        <ion-button class="btnCount" color="dark" fill="clear" size="small" @click="btnUpClick(food, index)" value="aa">
                          <ion-input type="hidden" v-bind:value="index"></ion-input>
                          <ion-icon  name="arrow-dropup"></ion-icon>
                        </ion-button>
                        </ion-col>
                      <ion-col size=6>
                        <ion-input type="number" :value="food.count" style="display: inline-block; width: 20%;" disabled=true v-model="food.count"></ion-input>
                      </ion-col>
                      <ion-col size=3>
                        <ion-button class="btnCount" color="dark" fill="clear" size="small" @click="btnDownClick(food, index)">
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
        </ion-row>
        <ion-row class="reviewGrid hiddenRow">
          <ion-row style="padding-bottom: 15px; border-bottom: 1px solid #f58ccd">
            <ion-col size=12 style="text-align: center;">
              <span class="gradeTxt"> 
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-icon class="icStar" name="star-outline"></ion-icon>
              <ion-text>   {{ userInputGrade.toFixed(1) }}</ion-text>
            </span>
            </ion-col>
            <ion-col size=8>
              <ion-textarea autofocus=true name="reviewContents" required=true style="font-size: 12px; padding-left: 10px;"></ion-textarea>
            </ion-col>
            <ion-col size=4>
              <ion-button type="submit" color="light" class="reviewConfirmBtn">
                <ion-icon name="create"></ion-icon>확 인
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-col>
            <ion-row class="reviewContentsRow" style="border-bottom: 1px dashed #fdb1e0">
              <ion-col class="reviewUserThumbDiv" size=3><ion-icon name="person" style="width:100%; height: 100%;"></ion-icon></ion-col>
              <ion-col class="reviewContentsDiv" size=9>
                <ion-row class="userNick" style="color: #000000; font-size:20px;">
                  이 종아
                </ion-row>
                <ion-row class="reviewContents" style="padding-top: 7px; color: #999999; font-size: 15px;">
                  맛있네요^^
                </ion-row>
              </ion-col>
            </ion-row>
            <ion-row class="reviewContentsRow" style="border-bottom: 1px dashed #fdb1e0">
              <ion-col class="reviewUserThumbDiv" size=3><ion-icon name="person" style="width:100%; height: 100%;"></ion-icon></ion-col>
              <ion-col class="reviewContentsDiv" size=9>
                <ion-row class="userNick" style="color: #000000; font-size:20px;">
                  박 관영
                </ion-row>
                <ion-row class="reviewContents" style="padding-top: 7px; color: #999999; font-size: 15px;">
                  맛있습니다.
                </ion-row>
              </ion-col>
            </ion-row>
            <ion-row class="reviewContentsRow" style="border-bottom: 1px dashed #fdb1e0 ">
              <ion-col class="reviewUserThumbDiv" size=3><ion-icon name="person" style="width:100%; height: 100%;"></ion-icon></ion-col>
              <ion-col class="reviewContentsDiv" size=9>
                <ion-row class="userNick" style="color: #000000; font-size:20px;">
                  강 찬
                </ion-row>
                <ion-row class="reviewContents" style="padding-top: 7px; color: #999999; font-size: 15px;">
                  정말 맛있네요.
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-grid>
      
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
import axios from 'axios'

export default {
  name: 'Modal',
  props: {
    truck: {type: Object, defaultValue: {}}
  },
  data() {
    return {
      orderFoodList: [],
      orderHistory: "",
      totalPrice: 0,
      userInputGrade: 0.0,
    }
  },
  created() {
    let tempObj = {};
    this.truck.foods.map(food => {
      Vue.set(food, 'count', 0);
    });
    for(let i = 0; i < this.truck.foods.length; i++) {
      tempObj = {};
      tempObj['truckId']=this.truck.id;
      tempObj['foodId']= this.truck.foods[i].id;
      tempObj['count'] = 0;
      tempObj['isReady']=false;

      this.orderFoodList[i] = tempObj;
    }

    console.log(this.orderFoodList);
  },
  mounted() {
    let i = 0;
    for(; i < parseInt(this.truck.grade); i++) {
      this.$el.querySelectorAll('.gradeTxt .icStar')[i].name = "star";
    }
    if(this.truck.grade - i > 0) {
      this.$el.querySelectorAll('.gradeTxt .icStar')[i++].name = "star-half";
    } 
    for(; i < 5; i++) {
      this.$el.querySelectorAll('.gradeTxt .icStar')[i].name = "star-outline";
    }
    
  },
  methods: {
    test() {
      console.log('test');
    },
    likeBtnClick() {
      const cuBtn = this.$el.querySelector('.likeBtn');
      if(cuBtn.classList.contains('selectedLike')) {
        cuBtn.classList.remove('selectedLike');
        cuBtn.childNodes[0].name="heart-empty";
      } else {
        cuBtn.classList.add('selectedLike');
        cuBtn.childNodes[0].name="heart";
      }
    },
    reviewBtnClick() {
      this.$el.querySelector('.menuBtn').classList.remove("listMenuSelected");
      this.$el.querySelector('.reviewBtn').classList.add("listMenuSelected");
      this.$el.querySelector('.menuReviewGrid').childNodes[0].classList.add("hiddenRow");
      this.$el.querySelector('.menuReviewGrid').childNodes[1].classList.remove("hiddenRow");
    },
    menuBtnClick() {
      this.$el.querySelector('.menuBtn').classList.add("listMenuSelected");
      this.$el.querySelector('.reviewBtn').classList.remove("listMenuSelected");
      this.$el.querySelector('.menuReviewGrid').childNodes[0].classList.remove("hiddenRow");
      this.$el.querySelector('.menuReviewGrid').childNodes[1].classList.add("hiddenRow");
    },
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
                console.log('press cancel');
              },
            }, {
            text: 'OK',
            handler: () => {  
              for(let i = 0; i < this.orderFoodList.length; i++){
                if(this.orderFoodList[i].count > 0) {
                  this.$ionic.loadingController.create({message: 'Loading'}).then(loading => {
                  axios.post(`http://localhost:3000/orders`, this.orderFoodList[i]).then(res => {
                    console.log(res);
                    loading.dismiss();
                    // 성공하면 알림
                    this.$ionic.alertController.create({
                      header: '주문이 완료되었습니다.',
                      buttons: [{
                        text: 'OK',
                        handler: () => {
                          return this.$ionic.modalController.dismiss()
                      }
                      }],
                      
                    }).then(alert => alert.present());
                  });
                  console.log('loding wanryo');
                });
                }
              }
            }
          }],
        })
        .then(a => a.present())
    },
    
    setOrder() {
      this.orderHistory="";
      this.totalPrice=0;
      //let tempObj = {};
      for(let i = 0; i < this.truck.foods.length; i++) {
        if(this.truck.foods[i].count != "0") {
          this.orderHistory += this.truck.foods[i].name + "   " + this.truck.foods[i].count + '개<br>';
          this.totalPrice += (this.truck.foods[i].price * this.truck.foods[i].count);
        }
      }
    },
    
    btnUpClick(food, index) {
      food.count++;
      this.orderFoodList[index].count = food.count;
      console.log(this.orderFoodList[index].count);
      this.setOrder();
    },
    btnDownClick(food, index) {
      if(food.count > 0) {
        food.count--;
        this.orderFoodList[index].count = food.count;
        console.log(this.orderFoodList[index].count);
        this.setOrder();
      }
    },presentActionSheet() {
      return this.$ionic.actionSheetController
        .create({
          buttons: [
            {
              text: '통화 ' + this.truck.phone,
              handler: () => {
                console.log('Call clicked')
              },
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked')
              },
            },
          ],
        })
        .then(a => a.present())
    },
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
    max-height: 105px;
  }
  ion-item{
    --border-color: #f58ccd;
  }

  ion-row {
    --width: 100%;
  }
  ion-card {
    background: #fae3e3eb;
  }
  ion-button.btnCount {
    position: relative;
    top: -5px;
    
  }
  .selectedLike {
    --background:#dddddd;
    --color: #ffffff;
  }
  .hiddenRow {
    display: none;
  }
  .infoBtnGroup ion-button {
    --background: #ffffff;
    --border-color: #fae3e3eb;
    --border-style: solid;
    --border-width: 1px;
    --color: #3f3f3f;
    --background-activated: #dddddd;
    --color-activated: #ffffff;
    width:100%;
    position: relative;
  }
  .menuGridBtn ion-button {
    --background: #ffffff;
    --color: #000000;
    --background-activated: #ffffff;
    --color-activated: #000000;
    --border-color: #fae3e3eb!important;
    width:100%;
  }
  .listMenuSelected {
    --background: #fae3e3eb!important;
    --background-activated: #fae3e3eb!important;
    --color-activated:   #000000!important;
  }
  .foodNameTxt {
    font-size: 15px;
    font-weight: bold;
    height: 100%;
  }
  .foodPriceTxt {
    width: 100% ;
    font-size: 14px;
    text-align: center;
    height: 100%;
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
  ion-textarea {
    border-radius: 10px;
    border: 1px solid #afafaf;

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
     border-bottom: 1px solid #f58ccd;
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
  .icStar {
    font-size: 30px;
    color: #ffb245;
    font-weight: bold;
  }
  .gradeTxt .icStar {
    position: relative;
    top: 5px;
  }
  .storeImg {
    border-radius: 20% 20%;
  }
  .reviewConfirmBtn {
    width: 100%;
    height: 100%;
    font-size: 20px;
    --background: #ffffff;
    --border-color: #afafaf;
    --border-style: solid;
    --border-width: 1px;
    --color: #3f3f3f;
    --background-activated: #dddddd;
    --color-activated: #ffffff;
  }
  .iconInInfoBtn {
    position: relative;
    top: 1px;
    left: -2px;
  }
  .payFabBtn {
    --background: #f86f70;
    --background-activated: #d33939;
  }
</style>