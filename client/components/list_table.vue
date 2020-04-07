<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :search="search"
      item-key="id"
      show-expand
      :expanded="expanded"
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
        <div class="d-flex justify-center flex-wrap">
          <v-btn depressed class="mr-4" :color="expanded.length !== items.length ? 'success' : 'primary'" @click="toggleExpand()">
            {{ expanded.length !== items.length ? 'Expand all' : 'Collapse All' }}
          </v-btn>
          <v-btn depressed :disabled="selectedDisable" color="success">
            Add selected to list
          </v-btn>
        </div>
      </template>
      <template v-slot:item.image_url="{ item }">
        <template v-if="item.variations.length === 0">
          <v-avatar color="secondary" dark class="my-2">
            <v-icon>{{ item.image }}</v-icon>
          </v-avatar>
        </template>
        <template v-else>
          <v-img
            alt="item.name"
            max-width="50"
            :src="`${img_url}/items/${getImageUrl(item.variations)}`"
          />
        </template>
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
      <template v-slot:item.data-table-expand="{ item, expand, isExpanded }">
        <v-icon v-if="item.variations.length > 0" @click="expand(!isExpanded)">
          mdi-more
        </v-icon>
      </template>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length">
          <v-item-group
            v-model="selected"
            multiple
          >
            <div class="d-flex justify-center flex-wrap">
              <span v-for="variation in item.variations" :key="variation.id" class="mr-4">
                <v-item v-slot:default="{ active, toggle }" :value="variation.id">
                  <v-avatar dark class="my-2" :color="active ? 'accent' : ''">
                    <v-img
                      alt="item.name"
                      max-width="50"
                      :src="`${img_url}/clothing/${variation.image_url}`"
                      @click="toggle"
                    /></v-avatar></v-item>
              </span>
            </div>
          </v-item-group>
        </td>
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
    img_url: process.env.IMG_URL,
    selected: [],
    expanded: [],
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
        { text: 'Variations', value: 'data-table-expand' },
      ];
    },
    selectedDisable () {
      if (this.selected.length > 0) {
        return false;
      } else {
        return true;
      }
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
    getImageUrl (array) {
      const url = array.find(f => f.is_first === true).image_url;
      return url;
    },
    toggleExpand () {
      if (this.expanded.length < this.items.length) {
        this.expanded = this.items;
      } else {
        this.expanded = [];
      }
    },
    expandAll () {
      this.expanded = this.items;
    },
    collapseAll () {
      this.expanded = [];
    },
  },
};
</script>
