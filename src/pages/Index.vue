<template>
  <div class="q-pa-md">
    <q-carousel
      arrows
      animated
      v-model="slide"
      height="400px"
      infinite
      :autoplay="autoplay"
    >
      <q-carousel-slide name="first" img-src="../assets/1.jpg">
        <div class="absolute-center custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="../assets/2.jpg">
        <div class="absolute-center custom-caption">
          <div class="text-h2">Second stop</div>
          <div class="text-subtitle1">Famous City</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" img-src="../assets/3.jpg">
        <div class="absolute-center custom-caption">
          <div class="text-h2">Third stop</div>
          <div class="text-subtitle1">Famous Bridge</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      slide: 'first',
      autoplay: true,
    };
  },
  // created() {
  //   console.log('Created');
  // },
  // mounted() {
  //   console.log('Mounted');
  // },
  // beforeCreate() {
  //   console.log('At this point, events and lifecycle have been initialized.');
  // },
};
</script>

<style lang="sass" scoped>
  .custom-caption
    text-align: center
    padding: 12px
    color: white
    background-color: rgba(0, 0, 0, .3)
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
  .q-pa-md
    padding: 0
</style>
