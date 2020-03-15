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
        <template v-slot:item.image="{ item }">
          <v-avatar color="secondary" dark class="my-2">
            <v-icon>{{ item.image }}</v-icon>
          </v-avatar>
        </template>
        <template v-slot:item.cat_name="{ item }">
          <nuxt-link :to="{ name: item.cat_identifier, params: { catId: item.cat_id }}">
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
    headers: [
      { text: '', value: 'image', sortable: false },
      { text: 'Name', value: 'name' },
      { text: 'Category', value: 'cat_name' },
      { text: 'Materials', value: 'materials', sortable: false },
      { text: 'Obtained from', value: 'obtained', sortable: false },
      { text: 'Unlock', value: 'unlock', sortable: false },
    ],
  }),
  computed: {
    pageInfo () {
      return this.$store.getters['layout/getInfo']('recipes');
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
        this.recipes = data.data;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
  },
  head () {
    return { title: this.$t('menu.recipes') };
  },
};
</script>
