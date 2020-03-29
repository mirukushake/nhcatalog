<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text text-capitalize">
        {{ $t('menu.recipes') }}
      </h1>
    </div>

    <section>
      <v-data-table
        :headers="headers"
        :items="recipes"
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
        <template v-slot:item.cat_name="{ item }">
          <nuxt-link :to="'/' + catSlug(item.cat_id)">
            {{ item.cat_name }}
          </nuxt-link>
        </template>
        <template v-slot:item.materials="{ item }">
          <div v-for="mat in item.materials" :key="mat.mat_id">
            {{ mat.name }} x {{ mat.qty }}
          </div>
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Recipes',
  data: () => ({
    search: '',
    loading: false,
    recipes: [],
  }),
  computed: {
    headers () {
      return [
        { text: '', value: 'image', sortable: false },
        { text: this.$t('headers.item_name'), value: 'name' },
        { text: this.$t('headers.category'), value: 'cat_name' },
        { text: this.$t('headers.materials'), value: 'materials', sortable: false },
      ];
    },
    cats () {
      return this.$store.state.layout.menuItems;
    },
  },
  mounted () {
    this.getData();
  },
  methods: {
    async getData () {
      try {
        this.loading = true;
        const { data } = await this.$axios.get('/recipes');
        this.recipes = data.recipes;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
    catSlug (id) {
      return this.cats.find(i => i.id === id).name;
    },
  },
  head () {
    return { title: this.$t('menu.recipes') };
  },
};
</script>
