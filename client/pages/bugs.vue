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
import dataTable from '../components/creatures_table';

export default {
  name: 'Bugs',
  components: {
    dataTable,
  },
  data: () => ({
  }),
  computed: {
    pageInfo () {
      return this.$store.getters['layout/getInfo']('bugs');
    },
    hemi () {
      return this.$store.state.usersettings.settings.hemisphere;
    },
  },
  methods: {

  },
  head () {
    return { title: this.pageInfo.title };
  },
};
</script>
