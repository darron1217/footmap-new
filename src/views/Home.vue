<template>
    <div>
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
  <vue-daum-map

      :appKey="appKey"

      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"

      @load="onLoad"

      @center_changed="onMapEvent('center_changed', $event)"
      @zoom_start="onMapEvent('zoom_start', $event)"
      @zoom_changed="onMapEvent('zoom_changed', $event)"
      @bounds_changed="onMapEvent('bounds_changed', $event)"
      @click="onMapEvent('click', $event)"
      @dblclick="onMapEvent('dblclick', $event)"
      @rightclick="onMapEvent('rightclick', $event)"
      @mousemove="onMapEvent('mousemove', $event)"
      @dragstart="onMapEvent('dragstart', $event)"
      @drag="onMapEvent('drag', $event)"
      @dragend="onMapEvent('dragend', $event)"
      @idle="onMapEvent('idle', $event)"
      @tilesloaded="onMapEvent('tilesloaded', $event)"
      @maptypeid_changed="onMapEvent('maptypeid_changed', $event)"

      style="width:400px;height:600px;">
    </vue-daum-map>
</div>
</template>

<script>
import TruckModal from '../components/TruckModal.vue'
import VueDaumMap from 'vue-daum-map';

export default {
  name: 'App',
  components: {VueDaumMap},
    data: () => ({
      appKey: "0efaf6ad743635fa29b5dcd6927f99e6",
      center: {lat:126.7867031999999, lng:37.4495673},
      level: 4,
      mapTypeId: VueDaumMap.MapTypeId.NORMAL,
      libraries: [],
      mapObject: null,
      trucks:[{
        title: "새우 나라",
        id: 0,
        lat: 37.4505673,
        lng: 126.7887031999999,
        image: "",
        description: "",
        distance: 1000.3,
        foods:[{
          id: 0,
          truck_id: 0,
          name: "양념치킨",
          price: 9000,
          image: ""
        },{
          id: 1,
          truck_id: 0,
          name: "등심꼬치",
          price: 5000,
          image: ""
        }]
      },{
        title: "갈비 천국",
        id: 0,
        lat: 37.4465673,
        lng: 126.7857031999999,
        image: "",
        description: "",
        distance: 1000.3,
        foods:[{
          id: 0,
          truck_id: 0,
          name: "간장치킨",
          price: 9000,
          image: ""
        },{
          id: 1,
          truck_id: 0,
          name: "등심꼬치",
          price: 5000,
          image: ""
        }]
      }]
    }),
  methods: {
    openModal(truckid) {
        console.log("@@@@@@@@@@@@@@@");
        return this.$ionic.modalController
          .create({
            component: TruckModal,
            componentProps: {
              data:{
                truck : this.trucks[truckid]
              },
              propsData: {
                
                // truckid: truckid,
                // title: this.trucks[truckid].title,
                // img: this.trucks[truckid].image,
                // foodinfos: this.trucks[truckid].foods,
              },
            },
            // componentProps: {
            // title: "Teeste",
            // id: truckid,
            // image: ""
            // }
        })
        .then(m => m.present())
      },
      onLoad (map) {
        if (navigator.geolocation) { // GPS를 지원하면
          navigator.geolocation.getCurrentPosition(function(position) {
          // console.log(position.coords.latitude + ' ' + position.coords.longitude);
          var moveLoca = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(moveLoca);

        }, function(error) {
          console.error(error);
        }, {enableHighAccuracy: true,
        timeout: 5000});
        }else{
          alert("GPS를 지원하지 않습니다");
        }

        // axios.get('https://footmap-api-xfydr.run.goorm.io/?lat='+this.center.lat+'+&lng='+this.center.lng)
        // .then(res => {
        //   console.log(res);
        // })

        console.log(this.trucks[1].title);
        

        // 지도의 현재 영역을 얻어옵니다
        var bounds = map.getBounds();

        // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
        var boundsStr = bounds.toString();

        console.log('Daum Map Loaded', boundsStr);

        this.mapObject = map;

        var positions = [
          {
            content: this.trucks[0].title,
            latlng : new kakao.maps.LatLng(this.trucks[0].lat, this.trucks[0].lng)
          },
          {
            content: this.trucks[1].title,
            latlng : new kakao.maps.LatLng(this.trucks[1].lat, this.trucks[1].lng)
          }
        ];

        var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/2012/img/marker_p.png"

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
            xAnchor: 0.57
          });


          // 이벤트 리스너로는 클로저를 만들어 등록합니다 
          // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
          kakao.maps.event.addListener(marker, 'click', () => this.openModal(truckid));
          // kakao.maps.event.addListener(marker, 'click', () => this.openModal(truckid));
        
        });

        // function showDetail(truckid){
        //   return function(){
        //     this.openModal(truckid);
        //   }
        // }

        // function openModal(truckid) {
        //   return function(){
        //     console.log(truckid);
        //     // return this.$ionic.modalController
        //     //   .create({
        //     //     component: Modal,
        //     //     componentProps: {
        //     //       title: "Teeste",
        //     //       id: truckid
        //     //     }
        //     //   })
        //     //   .then(m => m.present())
        //   }
        // };
      },
      // onMapEvent (event, params) {
      //   console.log(`Daum Map Event(${event})`, params);
      // },
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