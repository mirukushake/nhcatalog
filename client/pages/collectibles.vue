<template>
  <div class="container">
    <div>
      <h1 v-if="pageInfo" class="display-1 info--text">
        {{ pageInfo.title }}
      </h1>
    </div>
    <dataTable />
  </div>
</template>

<script>
import dataTable from '../components/collectibles_table';

export default {
  name: 'Collectibles',
  components: {
    dataTable,
  },
  data: () => ({

  }),
  computed: {
    pageInfo () {
      return this.$store.getters['layout/getInfo']('collectibles');
    },
  },
  head () {
    return { title: this.$t('menu.collectibles') };
  },
};
</script>
