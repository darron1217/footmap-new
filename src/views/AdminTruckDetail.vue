<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-back-button text="뒤로"></ion-back-button>
        </ion-buttons>
        <ion-title>푸드트럭 등록</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form v-on:submit.prevent="processForm">
        <ion-list lines="full" class="ion-no-margin ion-no-padding">
          <ion-item>
            <ion-label position="stacked">트럭이름 <ion-text color="danger">*</ion-text></ion-label>
            <ion-input required type="text" name="name"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">설명</ion-label>
            <ion-textarea name="description"></ion-textarea>
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
export default {
  props: ['id'],
  methods: {
    processForm: function(event) {
      event.preventDefault();
      let name = event.target.name.value;
      this.$ionic.alertController.create({
        header: '등록되었습니다',
        message: `<b>${name} 트럭이 등록되었습니다</b>`,
        buttons: [{
          text: 'OK'
        }]
      }).then(alert => alert.present());
    }
  }
}
</script>