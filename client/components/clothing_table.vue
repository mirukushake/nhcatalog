<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="items"
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
      <template v-slot:item.obtained="{ item }">
        <div v-if="item.shop.length">
          <span v-for="shop in item.shop" :key="shop.recipe_id">
            {{ shop.name }} ({{ shop.price }} {{ shop.currency_name }})
          </span>
        </div>
        <div>
          <span v-for="recipe in item.recipes" :key="recipe.recipe_id">
            {{ recipe.name }}
          </span>
        </div>
      </template>
    </v-data-table>
  </section>
</template>

<script>
export default {
  name: 'ClothingTable',
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    search: '',
    loading: false,
    items: [],
    headers: [
      { text: '', value: 'image', sortable: false },
      { text: 'Name', value: 'name' },
      { text: 'Category', value: 'cat_name' },
      { text: 'Sell Price', value: 'sell_price' },
      { text: 'Obtained from', value: 'obtained', sortable: false },
      { text: 'Variations', value: 'variations', sortable: false },
    ],
  }),
  computed: {
    subId () {
      return this.id || null;
    },
  },
  created () {
    this.getData();
  },
  methods: {
    async getData () {
      try {
        this.loading = true;
        if (this.subId) {
          const { data } = await this.$axios.get(`/clothing/${this.subId}`);
          this.loading = false;
          this.items = data.data;
        } else {
          const { data } = await this.$axios.get('/clothing');
          this.loading = false;
          this.items = data.data;
        }
      } catch (err) {
        this.loading = false;
      }
    },
  },
};
</script>
