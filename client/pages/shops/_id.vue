<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ pageTitle }}
      </h1>
    </div>

    <dataTable v-if="itemsList" :datalist="itemsList" />
  </div>
</template>

<script>
import dataTable from '../../components/shop_table';

export default {
  name: 'Shop',
  components: {
    dataTable,
  },
  data: () => ({
    search: '',
    itemsList: [],
    pageTitle: null,
  }),
  computed: {
  },
  mounted () {
    this.getData();
  },
  methods: {
    async getData () {
      try {
        this.loading = true;
        const { data } = await this.$axios.get(`/shops/${this.$route.params.id}`);
        this.pageTitle = data.shop.name;
        this.itemsList = data.shop.items;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
  },
  head () {
    return { title: this.pageTitle };
  },
};
</script>
