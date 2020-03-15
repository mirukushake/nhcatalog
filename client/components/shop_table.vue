<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="datalist"
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
      <template v-slot:item.price="{ item }">
        {{ item.price }} {{ item.currency_name }}
      </template>
    </v-data-table>
  </section>
</template>

<script>
export default {
  name: 'ShopTable',
  props: {
    datalist: {
      type: Array,
      default: Function,
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
      { text: 'Price', value: 'price' },
      { text: 'Sell Price', value: 'sell_price' },
      { text: 'Variations', value: 'variations', sortable: false },
    ],
  }),
  computed: {
    subId () {
      return this.data;
    },
  },
  created () {
  },
  methods: {
  },
};
</script>
