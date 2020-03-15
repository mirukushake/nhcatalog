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
  name: 'Music',
  components: {
    dataTable,
  },
  data: () => ({
  }),
  computed: {
    pageInfo () {
      return this.$store.getters['layout/getInfo']('music');
    },
  },
  methods: {

  },
  head () {
    return { title: this.$t('menu.music') };
  },
};
</script>
