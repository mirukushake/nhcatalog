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
import dataTable from '../components/clothing_table';

export default {
  name: 'Clothing',
  components: {
    dataTable,
  },
  data: () => ({

  }),
  computed: {
    pageInfo () {
      return this.$store.getters['layout/getInfo']('clothing');
    },
  },
  head () {
    return { title: this.$t('menu.clothing') };
  },
};
</script>
