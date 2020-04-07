<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ listinfo.title }}
      </h1>
      <h2 class="title">
        by {{ listinfo.username }}
      </h2>
      <section>
        <v-data-table
          :headers="headers"
          :items="listinfo.variations"
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
              <v-btn
                v-if="isLoggedIn"
                depressed
                :disabled="selectedDisable"
                color="success"
                :loading="processing"
                @click="deleteItems"
              >
                Remove selected
              </v-btn>
            </div>
          </template>
          <template v-slot:item.name="{ item }">
            <div>{{ item.name }}</div>
            <div v-if="item.subtitle" class="grey--text">
              {{ item.subtitle }}
            </div>
          </template>
          <template v-slot:item.variations="{ item }">
            <template v-if="isLoggedIn">
              <v-item-group
                v-model="selected"
                multiple
              >
                <div class="d-flex flex-wrap">
                  <span v-for="variation in item.variations" :key="variation.id" class="mr-4">
                    <v-item v-slot:default="{ active, toggle }" :value="variation.id">
                      <v-avatar dark class="my-2" :color="active ? 'accent' : ''">
                        <v-img
                          alt="item.name"
                          max-width="50"
                          :src="`${img_url}/items/${variation.image_url}`"
                          @click="toggle"
                        /></v-avatar></v-item>
                  </span>
                </div>
              </v-item-group>
            </template>
            <template v-else>
              <div class="d-flex flex-wrap">
                <span v-for="variation in item.variations" :key="variation.id" class="mr-4">
                  <v-avatar dark class="my-2">
                    <v-img
                      alt="item.name"
                      max-width="50"
                      :src="`${img_url}/items/${variation.image_url}`"
                    /></v-avatar>
                </span>
              </div>
            </template>
          </template>
        </v-data-table>
        <v-snackbar
          v-model="deletedSnack"
          left
          bottom
          color="grey darken-2"
        >
          {{ snackText }}
          <v-btn

            text
            @click="deletedSnack = false"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-snackbar>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data: () => ({
    listinfo: [],
    search: '',
    loading: false,
    img_url: process.env.IMG_URL,
    selected: [],
    deletedSnack: false,
    snackText: null,
    processing: false,
  }),
  computed: {
    isLoggedIn () {
      if (this.$store.state.auth.loggedIn && this.$store.state.auth.user.id === this.listinfo.user_id) {
        return true;
      } else {
        return false;
      }
    },
    headers () {
      return [
        { text: this.$t('headers.item_name'), value: 'name' },
        { text: '', value: 'variations', sortable: false },
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
  mounted () {
    this.getList();
  },
  methods: {
    async getList () {
      try {
        this.loading = true;
        const { data } = await this.$axios.get(`/user/lists/${this.$route.params.hash}`);
        this.listinfo = data.list[0];
        this.loading = false;
      } catch (err) {
        if (err.response.status === 404) {
          return this.$nuxt.error({ statusCode: 404, message: 'Page not found' });
        }
        this.loading = false;
      }
    },
    async deleteItems () {
      try {
        const deletedItems = { listid: this.listinfo.list_id, items: this.selected };
        this.processing = true;
        const newList = await this.$axios.delete(`/user/lists/${deletedItems.listid}`, { data: { deletedItems } });
        await this.getList();
        this.processing = false;
        this.selected = [];
        this.snackText = `Deleted ${newList.data.deleted} items from the list.`;
        this.addedSnack = true;
      } catch (err) {
        this.processing = false;
      }
    },
  },
  head () {
    return { title: this.listinfo.title };
  },
};
</script>
