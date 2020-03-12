<template>
  <div class="container">
    <section>
      <h1 v-if="error.statusCode === 404" class="display-1 info--text">
        {{ $t('messages.404') }}
      </h1>
      <h1 v-else class="display-1 info--text">
        {{ $t('messages.500') }}
      </h1>
      <nuxt-link to="/">
        {{ $t('messages.return_to_top') }}
      </nuxt-link>
    </section>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog', // you can set a custom layout for the error page
  head () {
    return { title: 'Oh no! An error!' };
  },
};
</script>
