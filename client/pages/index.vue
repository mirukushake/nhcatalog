<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ $t('messages.welcome') }}
      </h1>
      <!-- <h1 class="title grey--text text--darken-2">
      </h1> -->
    </div>
    <section>
      {{ loggedInUser.lists }}
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
    this.getCompletion(0);
  },
  methods: {
    async getCompletion () {
      await this.$auth.fetchUser();
    },
  },
  head: () => ({
    title: 'NH Catalog',
  }),
};
</script>
