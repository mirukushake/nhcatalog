<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ $t('messages.welcome') }}
      </h1>
      <!-- <h1 class="title grey--text text--darken-2">
      </h1> -->
    </div>
    <section class="mt-8">
      <p>NH Catalog is a multilingual wishlist sharing and catalog completion site for Animal Crossing New Horizons.</p>

      <p>This site is very much a work in progress, and your help would be greatly appreciated! You can submit an issue on the site's Github page if you find any incorect info or bugs, or have any information or contributions to add!</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
  }),
  computed: {
    loggedInUser () {
      return this.$store.state.auth.user;
    },
  },
  mounted () {
  },
  methods: {
  },
  head: () => ({
    title: 'NH Catalog',
  }),
};
</script>
