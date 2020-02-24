<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ $t('welcome') }}
      </h1>
      <h1 class="title grey--text text--darken-2">
        {{ $t('welcome_subtitle') }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
    items: [
      {
        text: 'トップ',
        disabled: false,
        to: 'inspire',
      },
    ],
  }),
  head: () => ({
    title: 'NH Catalog',
  }),
};
</script>
