<template>
  <div id="app">
    <ion-app>
      <ion-vue-router/>
    </ion-app>
  </div>
</template>

<script>
export default {
  methods: {
    go(url) {
      this.$router.push(url);
    },
  },
}
</script>