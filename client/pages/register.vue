<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ $t('meta.register') }}
      </h1>
    </div>
    <section />
  </div>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
  }),
  head () {
    return { title: this.$t('meta.register') };
  },
};
</script>
