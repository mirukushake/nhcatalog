<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ $t('messages.welcome') }}
      </h1>
      <h1 class="title grey--text text--darken-2">
        {{ loggedInUser }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
  }),
  computed: {
    loggedInUser () {
      return this.$auth.user;
    },
  },
  methods: {
  },
  head: () => ({
    title: 'NH Catalog',
  }),
};
</script>
