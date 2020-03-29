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
      <template v-slot:item.image_url="{ item }">
        <v-avatar color="secondary" dark class="my-2">
          <v-icon>{{ item.image }}</v-icon>
        </v-avatar>
      </template>
      <template v-slot:item.name="{ item }">
        <div>{{ item.name }}</div>
        <div v-if="item.subtitle" class="grey--text">
          {{ item.subtitle }}
        </div>
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
      <template v-slot:item.is_remake="{ item }">
        <div v-if="item.is_remake == true">
          {{ $t('common.ok') }}
        </div>
        <div v-else-if="item.remake == false">
          {{ $t('common.notok') }}
        </div>
        <div else>
          &nbsp;
        </div>
      </template>
      <template v-slot:item.is_reorder="{ item }">
        <div v-if="item.is_reorder == true">
          {{ $t('common.ok') }}
        </div>
        <div v-else-if="item.reorder == false">
          {{ $t('common.notok') }}
        </div>
        <div else>
          &nbsp;
        </div>
      </template>
    </v-data-table>
  </section>
</template>

<script>
export default {
  name: 'ItemTable',
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
  }),
  computed: {
    subId () {
      return this.id || null;
    },
    headers () {
      return [
        { text: '', value: 'image_url', sortable: false },
        { text: this.$t('headers.item_name'), value: 'name' },
        { text: this.$t('headers.sell_price'), value: 'sell_price' },
        { text: this.$t('headers.size'), value: 'size' },
        { text: this.$t('headers.obtained'), value: 'obtained', sortable: false },
        { text: this.$t('headers.remake'), value: 'is_remake', sortable: false, align: 'center' },
        { text: this.$t('headers.catalog'), value: 'is_reorder', sortable: false, align: 'center' },
      ];
    },
  },
  created () {
    this.getData();
  },
  methods: {
    async getData () {
      try {
        this.loading = true;
        const { data } = await this.$axios.get(`/items/${this.subId}`);
        this.loading = false;
        this.items = data.items;
      } catch (err) {
        this.loading = false;
      }
    },
  },
};
</script>
