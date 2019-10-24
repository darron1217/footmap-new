<template>
  <ion-page>
    <ion-header class="header">
      
      <ion-toolbar color="warning" class="toolbar">
        <ion-row class="icon"></ion-row>
        <ion-buttons slot="secondary" @click="go('/login')" class="button">         
          <ion-icon slot="icon-only" name="ios-contacts" style="font-size:40px"></ion-icon>
        </ion-buttons>
        <ion-title></ion-title>
        <ion-buttons slot="primary" @click="showLoginPrompt" class="button">         
          <ion-icon slot="icon-only" name="settings" style="font-size:40px"></ion-icon>
        </ion-buttons>
      </ion-toolbar>
      <ion-searchbar class="searchBackground"  @search="searchLocation"></ion-searchbar>
    </ion-header>
    <ion-content>
      <ion-fab vertical="bottom" horizontal="start" slot="fixed" class="posiButton">
        <ion-fab-button color="danger" @click="setCurrentLocation" class="currentButton">
          <ion-icon name="locate"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <vue-daum-map

      :appKey="appKey"

      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"

      @load="onLoad"


      style="position: relative; width:100%;height:100%;z-index:1;">
    </vue-daum-map>
    </ion-content>
    
  </ion-page>
  
</template>


<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0efaf6ad743635fa29b5dcd6927f99e6&libraries=services,clusterer,drawing"></script>
<script>
import TruckModal from '../components/TruckModal.vue'
import VueDaumMap from 'vue-daum-map';
import axios from 'axios'


export default {
  name: 'App',
  components: {VueDaumMap},
    data: () => ({
      appKey: "0efaf6ad743635fa29b5dcd6927f99e6",
      center: {lat:37.4495415999999, lng:126.7867055},
      level: 4,
      mapTypeId: VueDaumMap.MapTypeId.NORMAL,
      libraries: [],
      mapObject: null,
      trucks:[],
      searchText:'',
    }),
    mounted() {
      // Pusher등록
      var channel = this.$pusher.subscribe('orders');
      channel.bind('user', (data) => {
        this.$ionic.toastController.create({
          color: 'dark',
          duration: 2000,
          message: '주문이 준비되었습니다'
        }).then(t => {
          t.present();
        });
      });
    },
    methods: {
      async searchLocation(e){
        await axios.get('http://dapi.kakao.com/v2/local/search/address.json',
        {
          params: {
            query: e.target.value
          },
          headers: {
            Authorization: 'KakaoAK e8a2cb43fae0248ba00ee6c8ff14cf3b'
          },
          timeout: 3000
        }).then(res=>{
          var moveLatLon = new kakao.maps.LatLng(res.data.documents[0].y, res.data.documents[0].x);
          this.mapObject.setCenter(moveLatLon);
        });
      },
      openModal(truckid) {
        return this.$ionic.modalController
          .create({
            component: TruckModal,
            componentProps: {
              data:{

              },
              propsData: {
                truck : this.trucks[truckid]
              },
            },
        })
        .then(m => m.present())
      },
      async onLoad (map) {
        if (navigator.geolocation) { // GPS를 지원하면
          navigator.geolocation.getCurrentPosition(function(position) {
          var moveLoca = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(moveLoca);

        }, function(error) {
          var moveLoca = new kakao.maps.LatLng(37.4495528, 126.7867041);
          map.setCenter(moveLoca);
        }, {enableHighAccuracy: true,
        timeout: 3000});
        }else{
          alert("GPS를 지원하지 않습니다");
        }

        await axios.get('http://localhost:3000/trucks?_embed=foods').then(res=>{
          this.trucks = res.data;
        });


        // 지도의 현재 영역을 얻어옵니다
        var bounds = map.getBounds();

        // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
        var boundsStr = bounds.toString();

        console.log('Daum Map Loaded', boundsStr);

        this.mapObject = map;

        var positions = [];
        for(let i=0; i<this.trucks.length; i++){
            var posi = {
              content: this.trucks[i].name,
              latlng: new kakao.maps.LatLng(this.trucks[i].lat, this.trucks[i].lng)
            }
            positions[i] = posi;
          }
          // positions[i].content = this.trucks[i].name;
          // positions[i].latlng = new kakao.maps.LatLng(this.trucks[i].lat, this.trucks[i].lng);
        

        // var positions = [
        //   {
        //     content: this.trucks[0].name,
        //     latlng : new kakao.maps.LatLng(this.trucks[0].lat, this.trucks[0].lng)
        //   },
        //   {
        //     content: this.trucks[1].name,
        //     latlng : new kakao.maps.LatLng(this.trucks[1].lat, this.trucks[1].lng)
        //   }
        // ];

        var imageSrc = "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"

        positions.map((position, i) => {
          var imageSize = new kakao.maps.Size(33,35);
          var markerImage = new kakao.maps.MarkerImage(imageSrc,imageSize);
          var marker = new kakao.maps.Marker({
            map: this.mapObject,
            position: position.latlng,
            image: markerImage
          });
          var truckid = i;

          var leftContent = '<div class ="label"><span class="left"></span><span class="center">';
          var rightContent = '</span><span class="right"></span></div>';

          var customOverlay = new kakao.maps.CustomOverlay({
            map: this.mapObject,
            position: position.latlng,
            content: leftContent+position.content+rightContent,
            yAnchor: 2.5,
            xAnchor: 0.535
          });


          // 이벤트 리스너로는 클로저를 만들어 등록합니다 
          // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
          kakao.maps.event.addListener(marker, 'click', () => this.openModal(truckid));
          // kakao.maps.event.addListener(marker, 'click', () => this.openModal(truckid));
          map.relayout();
        });

        

      },
      onMapEvent (event, params) {
        console.log(`Daum Map Event(${event})`, params);
      },
      setCurrentLocation(){
        var obj = this;
        if (navigator.geolocation) { // GPS를 지원하면
          navigator.geolocation.getCurrentPosition(function(position) {
          var moveLoca = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
          obj.mapObject.panTo(moveLoca);
        }, function(error) {
          var moveLoca = new kakao.maps.LatLng(37.4495528, 126.7867041);
          obj.mapObject.panTo(moveLoca);
        }, {enableHighAccuracy: true,
        timeout: 5000});
        }else{
          alert("GPS를 지원하지 않습니다");
        }
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
                  this.$router.push('/admintruck');
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
    },go(url) {
      this.$router.push(url);
    },
  }
}
</script>
<style>
  :root {
    --ion-color-warning: #f86f70;
    --background-activated: #f86f70;
    --ion-color-danger: #f86f70;
  }
  .icon {position: absolute; z-index: 2; top:0%; left:0%; width: 100%; height: 100%; background: url("../assets/foot_icon.png") no-repeat; background-size: contain; background-position: center}
  .toolbar {position: relative; z-index: 1;}
  .label * {display: inline-block;vertical-align: top; }
  .label .left {background: url("http://t1.daumcdn.net/localimg/localimages/07/2011/map/storeview/tip_l.png") no-repeat;display: inline-block;height: 24px;overflow: hidden;vertical-align: top;width: 7px;}
  .label .center {background: url(http://t1.daumcdn.net/localimg/localimages/07/2011/map/storeview/tip_bg.png) repeat-x;display: inline-block;height: 24px;font-size: 14px;line-height: 24px;}
  .label .right {background: url("http://t1.daumcdn.net/localimg/localimages/07/2011/map/storeview/tip_r.png") -1px 0  no-repeat;display: inline-block;height: 24px;overflow: hidden;width: 6px;}
  .header-ios ion-toolbar.toolbar:last-child{
    --border-width:0px;
  }
  .searchBackground {background: #f86f70; --background: white; border-color: #f86f70;}
  .posiButton {position: absolute; z-index: 3; left: 4%; top: 4%}


</style>