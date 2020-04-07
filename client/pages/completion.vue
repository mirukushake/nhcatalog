<template>
  <div class="container">
    <h1 class="display-1 info--text">
      Catalog Completion
    </h1>
    <section class="mt-4">
      <template v-for="cat in newData">
        <v-card :key="cat.id" flat>
          <v-card-title>
            <span>{{ cat.title }}</span>
          </v-card-title>
          <v-row>
            <v-col v-for="child in cat.children" :key="child.id" cols="3">
              {{ child.title }}
              <v-progress-linear
                color="accent"
                background-color="grey lighten-3"
                height="16"
                :value="Math.ceil((child.count / child.total) * 100)"
                striped
                class="caption"
              >
                <template v-slot="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
              <div class="text-right overline">
                ({{ child.count }} / {{ child.total }})
              </div>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </section>
  </div>
</template>

<script>
import { merge, keyBy, values } from 'lodash';
export default {
  name: 'Completion',
  middleware: 'auth',
  data: () => ({
    listinfo: [],
    search: '',
    loading: false,
    processing: false,
    // categories: [],
    completionData: [],
  }),
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.loggedIn;
    },
    categories () {
      return [...this.$store.state.layout.menuItems.filter(remove => !remove.slug.includes('bugs') && !remove.slug.includes('fish'))];
    },
    newData () {
      const merged = merge(keyBy(this.listinfo, 'id'), keyBy(this.categories, 'id'));
      const final = values(merged).sort((a, b) => (a.order > b.order) ? 1 : -1);
      const nest = (items, id = null, link = 'parent') =>
        items
          .filter(item => item[link] === id)
          .map(item => ({ ...item, children: nest(items, item.id) }));
      return nest(final);
    },
  },
  mounted () {
    // this.getCategories();
    this.getList();
  },
  methods: {
    async getList () {
      try {
        this.loading = true;
        const { data } = await this.$axios.get('/user/completion');
        this.listinfo = data.list;
        this.loading = false;
      } catch (err) {
        if (err.response.status === 404) {
          return this.$nuxt.error({ statusCode: 404, message: 'Page not found' });
        }
        this.loading = false;
      }
    },
    async getCategories () {
      const items = await this.$axios.get('/categories');
      const editlist = items.data.categories;
      this.categories = editlist;
    },
  },
  head () {
    return { title: 'Catalog Completion' };
  },
};
</script>
