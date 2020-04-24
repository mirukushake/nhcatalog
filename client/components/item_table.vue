<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="merged"
      :loading="loading"
      :search="search"
      item-key="id"
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

                <v-item v-if="index === 0" v-slot:default="{ active, toggle }" :value="variation.id">
                  <v-badge
                    color="secondary lighten-1 black--text"
                    overlap
                    icon="mdi-check"
                    bottom
                    offset-x="20"
                    offset-y="30"
                    :value="variation.completed === true ? true : false"
                  >
                    <v-avatar dark width="75" height="75" class="my-2" :color="active ? 'accent' : ''">
                      <v-img
                        alt="item.name"
                        max-width="75"
                        :src="`${img_url}/items/${variation.image_url}`"
                        @click="toggle"
                      /></v-avatar>
                  </v-badge></v-item>
              </span>
            </div>
          </v-item-group>
        </template>
        <template v-else>
          <div class="d-flex justify-center flex-wrap">
            <span v-for="(variation, index) in item.variations" :key="variation.id" class="mr-4">
              <v-avatar v-if="index === 0" dark class="my-2">
                <v-img
                  alt="item.name"
                  max-width="50"
                  :src="`${img_url}/items/${variation.image_url}`"
                /></v-avatar>
            </span>
          </div>
        </template>
      </template>
      <template v-slot:item.name="{ item }">
        <div><span @click="imgPopUp(item)">{{ item.name }}</span></div>
        <div v-if="item.subtitle" class="grey--text">
          {{ item.subtitle }}
        </div>
      </template>
      <template v-slot:item.shop[0].price="{ item }">
        <div v-if="item.shop.length">
          <span>
            <v-icon small>{{ item.shop[0].currency_id === 1 ? 'mdi-sack' : 'mdi-cash' }}</v-icon> {{ item.shop[0].price }}
          </span>
        </div>
      </template>
      <template v-slot:item.sell_price="{ item }">
        <span>
          <v-icon small>mdi-sack</v-icon> {{ item.sell_price }}
        </span>
      </template>
      <template v-slot:item.obtained="{ item }">
        <div v-if="item.shop.length">
          <div v-for="shop in item.shop" :key="shop.id">
            <nuxt-link :to="`/shops/${shop.slug}`">
              {{ shop.name }}
            </nuxt-link>
          </div>
        </div>
        <div v-if="item.recipes.length > 0">
          <span>
            Crafting
          </span>
        </div>
      </template>
      <template v-slot:item.info="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon :color="item.is_event === true ? 'secondary' : 'grey lighten-2'" v-on="on">
              mdi-snowflake
            </v-icon>
          </template>
          <span>Seasonal/event</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon :color="item.is_remake === true ? 'secondary' : 'grey lighten-2'" v-on="on">
              mdi-brush
            </v-icon>
          </template>
          <span>Remake</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon :color="item.is_reorder === true ? 'secondary' : 'grey lighten-2'" v-on="on">
              mdi-cart
            </v-icon>
          </template>
          <span>Catalog reorder</span>
        </v-tooltip>
      </template>
      <template v-slot:item.variations="{ item }">
        <v-icon v-if="item.variations.length > 1" @click="imgPopUp(item)">
          mdi-more
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog
      v-model="imgBox"
      transition="dialog-transition"
      max-width="60%"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ currentImg.name }}
        </v-card-title>

        <v-card-text>
          <template v-if="isLoggedIn">
            <v-item-group
              v-model="selected"
              multiple
            >
              <div class="d-flex justify-center flex-wrap">
                <span v-for="variation in currentImg.variations" :key="variation.id" class="mr-4">

                  <v-item v-slot:default="{ active, toggle }" :value="variation.id">
                    <v-badge
                      color="secondary lighten-1 black--text"
                      overlap
                      icon="mdi-check"
                      bottom
                      offset-x="20"
                      offset-y="30"
                      :value="variation.completed === true ? true : false"
                    >
                      <v-avatar dark width="75" height="75" class="my-2" :color="active ? 'accent' : ''">
                        <v-img
                          alt="item.name"
                          max-width="75"
                          :src="`${img_url}/items/${variation.image_url}`"
                          @click="toggle"
                        /></v-avatar>
                    </v-badge></v-item>
                </span>
              </div>
            </v-item-group>
          </template>
          <template v-else>
            <div class="d-flex justify-center flex-wrap">
              <span v-for="variation in currentImg.variations" :key="variation.id" class="mr-4">
                <v-avatar dark class="my-2">
                  <v-img
                    alt="item.name"
                    max-width="50"
                    :src="`${img_url}/items/${variation.image_url}`"
                  /></v-avatar>
              </span>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-dialog>
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
// import { unionWith } from 'lodash';

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
    addedSnack: false,
    snackText: null,
    processing: false,
    imgBox: false,
    currentImg: [],
  }),
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.loggedIn;
    },
    subId () {
      return this.id || null;
    },
    headers () {
      return [
        { text: '', value: 'image_url', width: 100, sortable: false, align: 'left' },
        { text: this.$t('headers.item_name'), value: 'name' },
        // { text: this.$t('headers.variations'), value: 'data-table-expand' },
        { text: this.$t('headers.variations'), value: 'variations', sortable: false, align: 'center' },
        { text: 'Price', value: 'shop[0].price' },
        { text: this.$t('headers.sell_price'), value: 'sell_price' },
        // { text: this.$t('headers.size'), value: 'size' },
        { text: this.$t('headers.obtained'), value: 'obtained', sortable: false },
        { text: this.$t('headers.info'), value: 'info', sortable: false },
      ];
    },
    userLists () {
      return this.$store.state.user.lists;
    },
    merged () {
      const items = this.items;
      if (this.completedItems && this.completedItems.length > 0) {
        items.map(item => item.variations.map(
          (i) => {
            if (this.completedItems.find(x => x.item_id === i.item_id)) {
              i.completed = true;
            } else {
              i.completed = false;
            }
          }));
        return items;
      } else {
        return items;
      }
    },
    completedItems () {
      return this.$store.state.user.completedItems;
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
    this.getSearch();
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
        if (newList.data.completed.length > 0) {
          await this.$store.dispatch('user/changeItems', newList.data.completed);
        }
        this.processing = false;
        this.selected = [];
        this.snackText = `${newList.data.added} items added to list.`;
        this.addedSnack = true;
      } catch (err) {
        this.processing = false;
      }
    },
    async getSearch () {
      if (this.$route.query.search) {
        this.search = await this.$route.query.search;
      }
    },
    imgPopUp (index) {
      this.imgBox = true;
      this.currentImg = index;
    },
  },
};
</script>
