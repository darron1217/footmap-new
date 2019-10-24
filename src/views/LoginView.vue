<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>로그인</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="go('/')">
            <ion-icon slot="icon-only" name="home"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
            <ion-card-title>Login</ion-card-title>
            
            
        </ion-card-header>

        <ion-card-content>
        Keep close to Nature's heart... and break clear away, once in awhile,
        and climb a mountain or spend a week in the woods. Wash your spirit clean.
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
    
  },
}
</script>