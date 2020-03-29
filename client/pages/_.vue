<template>
  <div class="container">
    <div>
      <h1 v-if="pageInfo" class="display-1 info--text">
        {{ pageInfo ? pageInfo.title : null }}
      </h1>
    </div>
    <dataTable v-if="pageInfo" :id="pageInfo.id" />
  </div>
</template>

<script>
import dataTable from '../components/item_table';

export default {
  components: {
    dataTable,
  },
  data: () => ({
  }),
  computed: {
    pageInfo () {
      const basic = this.$route.path.substr(1);
      return this.$store.getters['layout/getInfo'](basic);
    },
  },
  mounted () {
    this.check404();
  },
  methods: {
    check404 () {
      if (this.$store.state.layout.menuItems.filter(r => r.name === this.$route.path.substr(1)).length === 0) {
        return this.$nuxt.error({ statusCode: 404, message: 'Page not found ' });
      }
    },
  },
  head () {
    return { title: this.pageInfo ? this.pageInfo.title : null };
  },
};
</script>
