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
        <div class="d-flex justify-center flex-wrap">
          <v-menu
            transition="slide-y-transition"
            bottom
            :y-offset="true"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="isLoggedIn"
                depressed
                :disabled="selectedDisable"
                color="success"
                :loading="processing"
                v-on="on"
              >
                Add selected to list
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="list in userLists"
                :key="list.id"
                @click="addItems(list.id)"
              >
                <v-list-item-title>{{ list.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
      <template v-slot:item.image_url="{ item }">
        <template v-if="isLoggedIn">
          <v-item-group
            v-model="selected"
            multiple
          >
            <div class="d-flex justify-center flex-wrap">
              <span v-for="(variation, index) in item.variations" :key="variation.id" class="mr-4">

                <v-item v-if="index === 0 || expanded.includes(item.id)" v-slot:default="{ active, toggle }" :value="variation.id">
                  <v-badge
                    color="black--text"
                    overlap
                    icon="mdi-check"
                    bottom
                    offset-x="13"
                    offset-y="20"
                    :value="completedItems.filter(i => i.id === variation.id).length > 0 ? true : false"
                  ><v-avatar dark class="my-2" :color="active ? 'accent' : ''">
                    <v-img
                      alt="item.name"
                      max-width="50"
                      :src="`${img_url}/items/${variation.image_url}`"
                      @click="toggle"
                    /></v-avatar></v-badge>
                </v-item>
              </span>
            </div>
          </v-item-group>
        </template>
        <template v-else>
          <div class="d-flex justify-center flex-wrap">
            <span v-for="(variation, index) in item.variations" :key="variation.id" class="mr-4">
              <v-avatar v-if="index === 0 || expanded.includes(item.id)" dark class="my-2">
                <v-img
                  alt="item.name"
                  max-width="50"
                  :src="`${img_url}/items/${variation.image_url}`"
                /></v-avatar>
            </span>
          </div>
        </template>
      </template>
      <template v-slot:item.variations="{ item }">
        <v-icon v-if="item.variations.length > 1" @click="expandVariation(item.id)">
          mdi-more
        </v-icon>
      </template>
      <template v-slot:item.name="{ item }">
        <div>{{ item.name }}</div>
        <div v-if="item.subtitle" class="grey--text">
          {{ item.subtitle }}
        </div>
      </template>
      <template v-slot:item.cat_name="{ item }">
        <nuxt-link :to="'/' + catSlug(item.cat_id)">
          {{ item.cat_name }}
        </nuxt-link>
      </template>
      <template v-slot:item.price="{ item }">
        <v-icon small>
          {{ item.currency_id === 1 ? 'mdi-sack' : 'mdi-cash' }}
        </v-icon>  {{ item.price }}
      </template>
      <template v-slot:item.sell_price="{ item }">
        <span>
          <v-icon small>mdi-sack</v-icon> {{ item.sell_price }}
        </span>
      </template>
    </v-data-table>
    <v-snackbar
      v-model="addedSnack"
      left
      bottom
      color="grey darken-2"
    >
      {{ snackText }}
      <v-btn

        text
        @click="addedSnack = false"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-snackbar>
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
    img_url: process.env.IMG_URL,
    selected: [],
    expanded: [],
    addedSnack: false,
    snackText: null,
    processing: false,
  }),
  computed: {
    subId () {
      return this.data;
    },
    isLoggedIn () {
      return this.$store.state.auth.loggedIn;
    },
    cats () {
      return this.$store.state.layout.menuItems;
    },
    headers () {
      return [
        { text: '', value: 'image_url', width: 100, sortable: false },
        { text: this.$t('headers.item_name'), value: 'name' },
        { text: 'Variations', value: 'variations', sortable: false, align: 'center' },
        { text: this.$t('headers.category'), value: 'cat_name' },
        { text: this.$t('headers.price'), value: 'price' },
        { text: this.$t('headers.sell_price'), value: 'sell_price' },
      ];
    },
    userLists () {
      return this.$store.state.user.lists;
    },
    completedItems () {
      if (this.$store.state.user.completedItems.length > 0) {
        return this.$store.state.user.completedItems.map((i) => { i.completed = true; return i; });
      } else { return this.$store.state.user.completedItems; }
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
  },
  methods: {
    catSlug (id) {
      return this.cats.find(i => i.id === id).name;
    },
    expandVariation (row) {
      if (this.expanded.includes(row)) {
        const index = this.expanded.indexOf(row);
        this.expanded.splice(index);
      } else {
        this.expanded.push(row);
      }
    },
    async addItems (list) {
      try {
        const addedItems = { listid: list, items: this.selected };
        // const listName = this.userLists.filter(n => n.id === list).name;
        this.processing = true;
        const newList = await this.$axios.patch(`/user/lists/${list}`, addedItems);
        this.processing = false;
        this.selected = [];
        this.snackText = `${newList.data.added} items added to list.`;
        this.addedSnack = true;
      } catch (err) {
        this.processing = false;
      }
    },
  },
};
</script>
