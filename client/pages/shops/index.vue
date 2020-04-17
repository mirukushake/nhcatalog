<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ $t('menu.shops') }}
      </h1>
    </div>

    <section>
      <v-list two-line subheader>
        <v-list-item v-for="shop in shops" :key="shop.id">
          <v-list-item-content>
            <v-list-item-title class="title font-weight-bold">
              <nuxt-link :to="`/shops/${shop.slug}`">
                {{ shop.name }}
              </nuxt-link>
              <div v-if="shop.subtitle" class="grey--text font-weight-regular">
                {{ shop.subtitle }}
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ShopsList',
  data: () => ({
    search: '',
    loading: false,
    shops: [],
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
        const { data } = await this.$axios.get('/shops');
        this.shops = data.shops;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
  },
  head () {
    return { title: this.$t('menu.shops') };
  },
};
</script>
