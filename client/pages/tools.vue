<template>
  <div v-if="pageInfo" class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ pageInfo.title }}
      </h1>
    </div>
    <dataTable v-if="pageInfo" :id="pageInfo.id" />
  </div>
</template>

<script>
import dataTable from '../components/collectibles_table';

export default {
  name: 'Tools',
  components: {
    dataTable,
  },
  data: () => ({
  }),
  computed: {
    pageInfo () {
      return this.$store.getters['layout/getInfo']('tools');
    },
  },
  methods: {

  },
  head () {
    return { title: this.$t('menu.tools') };
  },
};
</script>
