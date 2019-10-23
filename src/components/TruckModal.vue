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
              <!--<img :src="truck.thumbnail">-->
              <img src="../../static/img/hiclipart.com-id_hongw.png">
            </ion-thumbnail>  
            {{ truck.name }}
          </ion-item>
          
        </ion-title>
        <ion-buttons slot="primary">
          <ion-button @click="payConfirm">Submit</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list v-for="food in foods"
                v-bind:key="food.id" lines="full">
        
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
                    <ion-button color="dark" fill="clear" size="small" @click=btnUpClick value="aa">
                      <ion-input type="hidden" v-bind:value="food.id"></ion-input>
                      <ion-icon  name="arrow-dropup"></ion-icon>
                    </ion-button>
                    </ion-col>
                  <ion-col size=6>
                    <ion-input type="number" :value="food.count" style="display: inline-block; width: 20%;" v:model="food.count" disabled=true  ></ion-input>
                  </ion-col>
                  <ion-col size=3>
                    <ion-button color="dark" fill="clear" size="small" @click=btnDownClick>
                      <ion-input type="hidden" v-bind:value="food.id"></ion-input>
                      <ion-icon name="arrow-dropdown"></ion-icon>
                    </ion-button>
                  </ion-col>
                  
                  <!--{{ food.count }}개-->
                  
                                 
                  
                  
                </ion-col>
                <!--<ion-col size=4>
                  <ion-picker-controller></ion-picker-controller>
                  <ion-button color="dark" fill="outline" @click=openSimplePicker v-bind:value="food.id">
                    Select<ion-input type="hidden" v-bind:value="food.id"></ion-input>
                  </ion-button>
                </ion-col>-->
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
export default {
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  data() {
    return {
      truck: {
        name: 'Chicken Truck',
        thumbnail: "/img/hiclipart.com-id_hongw.png"
      }, foods: [{
        id:1,
        image: "https://img.kbs.co.kr/kbs/620/nsimg.kbs.co.kr/data/news/2017/01/04/3405677_bH6.jpg",
        name: 'Chicken',
        count: 0,
        price: 20000
      },{
        id:2,
        image: "https://cdn.pixabay.com/photo/2016/03/15/08/02/food-1257054_960_720.jpg",
        name: 'Gimbab',
        count: 0,
        price: 2500
      },{
        id:3,
        image: "https://img-wishbeen.akamaized.net/plan/1449453370478_2015-12-0318;50;19.PNG",
        name: 'Tteok',
        count: 0,
        price: 4000
      }]
      
    }
  },
  methods: {
    closeModal() {
      return this.$ionic.modalController
        .dismiss()
    },getColumns(numColumns, columnOptions) {
      let columns = [];
      for (let i = 0; i < numColumns; i++) {
        let len = columnOptions[i].data.length;
        // if a na,e is provided then set the object to the
        // the name provided
        let colName = columnOptions[i].name || `col-${i}`;
        let col = {
          name: colName,
          options: this.getColumnOptions(i, len, columnOptions)
        };
        columns.push(col);
      }
      return columns;
    },
    getColumnOptions(columnIndex, numOptions, columnOptions) {
      let options = [];
      for (let i = 0; i < numOptions; i++) {
        // if there is no value property provided in the column data
        // then set value to the row index
        if (typeof columnOptions[columnIndex].data[i] == "object") {
          options.push({
            text: columnOptions[columnIndex].data[i % numOptions][0],
            value: columnOptions[columnIndex].data[i % numOptions][1]
          });
        } else {
          options.push({
            text: columnOptions[columnIndex].data[i % numOptions],
            value: i
          });
        }
      }
      return options;
    } ,async openSimplePicker(e) {
      const currentFoodIndex = parseInt(e.target.childNodes[1].value)-1;
      // get the picker controller this way for now
      const pickerController = document.querySelector("ion-picker-controller");
      await pickerController.componentOnReady();
      // set the arry for the column information, you can set the name of the column
      // and the array of data that should be rendered in the column
      let colOptions = [
        { name: "number", data: ["5", "4", "3", "2", "1", "0"] }
      ];
      // now create the picker, but first you need to create the columns
      // in the proper format for ionic vue to deal with them
      const picker = await pickerController.create({
        columns: this.getColumns(1, colOptions),
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Confirm",
            role: "confirm",
            handler: value => {
              console.log("Got Value", value.number);
              this.foods[currentFoodIndex].count = parseInt(value.number.text);
              
              
              picker.dismiss(value, "confirm");
            }
          }
        ]
      });
      picker.onDidDismiss().then(v => {
        console.log(v);
      });
      // present the picker
      await picker.present();
    }, payConfirm(){
      let payFoodItems = [];
      let orderHistory = ""
      let totalPrice = 0;
      for(let i = 0; i < this.foods.length; i++) {
        if(this.foods[i].count != "0") {
          payFoodItems.push({
            name: this.foods[i].name,
            price: this.foods[i].price,
            count: this.foods[i].count
          });
          orderHistory += payFoodItems[i].name + "   " + payFoodItems[i].count + '개<br>';
          totalPrice += (payFoodItems[i].count * payFoodItems[i].price);
        }
      }
      console.log(orderHistory);
      console.log(totalPrice);
      return this.$ionic.alertController
        .create({
          header: '주문 하시겠습니까?',
          subHeader: '주문 내역',
          message: orderHistory + '<br>총 합계 : ' + totalPrice + '원',
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
    btnUpClick(e) {
      this.foods[e.target.childNodes[0].value-1].count++;
    },
    btnDownClick(e) {
      if(this.foods[e.target.childNodes[0].value-1].count > 0) {
        console.log(this.foods[e.target.childNodes[0].value-1].count);
        this.foods[e.target.childNodes[0].value-1].count--;
      }
      
    },
    countChange(){
      
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