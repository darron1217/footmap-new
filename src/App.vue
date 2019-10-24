<template>
  <div id="app">
    <ion-app>
      <ion-vue-router/>
    </ion-app>
  </div>
</template>

<script>
export default {
  mounted() {
    // Pusher등록
    var channel = this.$pusher.subscribe('my-channel');

    channel.bind('my-event', (data) => {
        console.log(`${data.message}`);
    });
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
  },
}
</script>