<template>
  <div v-if="pageInfo" class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ pageInfo.title }}
      </h1>
    </div>

    <section>
      <v-data-table
        :headers="headers"
        :items="materials"
        :loading="loading"
        :search="search"
        :footer-props="{
          'items-per-page-options': [20, 50, 100]
        }"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              clearable
            />
          </v-toolbar>
        </template>
        <template v-slot:item.image="{ item }">
          <v-avatar color="secondary" dark class="my-2">
            <v-icon>{{ item.image }}</v-icon>
          </v-avatar>
        </template>
        <template v-slot:item.used_in="{ item }">
          {{ item.used_in.map(x => x.name).join(', ') }}
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Villagers',
  data: () => ({
    search: '',
    loading: false,
    materials: [],
    headers: [
      { text: '', value: 'image', sortable: false },
      { text: 'Name', value: 'name' },
      { text: 'Sell Price', value: 'sell_price' },
      { text: 'Obtained from', value: 'shop', sortable: false },
      { text: 'Used in', value: 'used_in', sortable: false },
    ],
  }),
  computed: {
    pageInfo () {
      return this.$store.getters['layout/getInfo']('materials');
    },
  },
  mounted () {
    this.getData();
  },
  methods: {
    async getData () {
      try {
        this.loading = true;
        const { data } = await this.$axios.get('/materials');
        this.materials = data.data;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
  },
  head () {
    return { title: this.$t('menu.materials') };
  },
};
</script>
