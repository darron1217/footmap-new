<template>
  <ion-page>
    <ion-header>
        <ion-toolbar color="warning" class="toolbar">
        <ion-row class="icon"></ion-row>
        <ion-buttons slot="end">
          <ion-button @click="go('/')">
            <ion-icon slot="icon-only" name="home" style="font-size:40px;"></ion-icon>
          </ion-button>
        </ion-buttons>
    </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header style=" padding-bottom: 0px">
            <ion-card-title  style="text-align:center;">가맹점 로그인</ion-card-title>
        </ion-card-header>

        <ion-card-content class="loginCard">
            <ion-list lines="none">
                <ion-grid>
                    <ion-row>
                        <ion-col size=8>
                            <ion-item>
                                <ion-label position="floating">ID <ion-text color="danger">*</ion-text></ion-label>
                                <ion-input required type="text" name="id"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Password <ion-text color="danger">*</ion-text></ion-label>
                                <ion-input required type="password" name="password"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col size=4 align-self-center style="height:100px">
                            <ion-button class="btnBorder" @click="go('/truck/1')">Login</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                
                <!-- <ion-item style="padding-bottom: 8px;">
                    <ion-grid>
                        <ion-row class="authBtnGroup" style="text-align: center;">
                            <ion-col size=6>
                                <ion-button class="guestBtn authBtnClick" @click=guestBtnClick>
                                    <ion-icon name="person" class="userTypeIcon"></ion-icon> 손님 <ion-icon class="checkIcon" name="checkmark-circle"></ion-icon>
                                </ion-button>
                            </ion-col>
                            <ion-col size=6>
                                <ion-button class="adminBtn" @click=adminBtnClick>
                                    <ion-icon name="build" class="userTypeIcon"></ion-icon> 관리자 <ion-icon class="checkIcon" name="checkmark-circle-outline"></ion-icon>
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-item> -->
                <ion-item>
                    <ion-button class="btnBorder" style="font-size: 20px;">Sign Up</ion-button>
                </ion-item>
            </ion-list>
        </ion-card-content>

      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
  data() {
    return {
      
    }
  },
  
  methods: {
    go(url) {
      this.$router.push(url);
    },
    adminBtnClick(){
        const guestBtn = this.$el.querySelector('.authBtnGroup').childNodes[0].children[0];
        const adminBtn = this.$el.querySelector('.authBtnGroup').childNodes[1].children[0];
        adminBtn.childNodes[2].name ="checkmark-circle";
        guestBtn.childNodes[2].name ="checkmark-circle-outline";
    },
    guestBtnClick() {
        const guestBtn = this.$el.querySelector('.authBtnGroup').childNodes[0].children[0];
        const adminBtn = this.$el.querySelector('.authBtnGroup').childNodes[1].children[0];
        adminBtn.childNodes[2].name ="checkmark-circle-outline";
        guestBtn.childNodes[2].name ="checkmark-circle";
    }
  },
}
</script>

<style scoped>
    .loginCard ion-button {
        --background: #ffffff;
        --border-color: #ffffff;
        --color: #3f3f3f;
        --background-activated: #ffffff!important;
        --color-activated: #3f3f3f!important;
        width:100%;
        height: 100%;
    }

    .btnBorder {
        border-radius:5px;
        border: 1px solid #afafaf;    
    }
    .authBtnGroup ion-icon {
        position: relative;
        top: 10x;
    }

    .authBtnGroup ion-icon.userTypeIcon {
        right: 10px;
    }
    .authBtnGroup ion-icon.checkIcon {
        left: 10px;
    }
    
</style>