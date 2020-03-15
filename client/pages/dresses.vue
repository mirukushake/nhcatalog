<template>
  <div class="container">
    <div>
      <h1 v-if="pageInfo" class="display-1 info--text">
        {{ pageInfo.title }}
      </h1>
    </div>
    <dataTable v-if="pageInfo" :id="pageInfo.id" />
  </div>
</template>

<script>
import dataTable from '../components/clothing_table';

export default {
  name: 'Dresses',
  components: {
    dataTable,
  },
  data: () => ({

  }),
  computed: {
    pageInfo () {
      return this.$store.getters['layout/getInfo']('dresses');
    },
  },
  head () {
    return { title: this.$t('menu.dresses') };
  },
};
</script>
