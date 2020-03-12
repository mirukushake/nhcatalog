<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ $t('menu.villagers') }}
      </h1>
    </div>
    <div class="search mb-10" />
    <section>
      <v-data-table
        :headers="headers"
        :items="characters"
        :loading="loading"
        :footer-props="{
          'items-per-page-options': [20, 50, 100]
        }"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
          </v-toolbar>
        </template>
        <template v-slot:item.image="{ item }">
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
        <template v-slot:item.birthday="{ item }">
          <div v-if="item.birthday">
            {{ $dayjs(item.birthday).format('MM/DD') }}
          </div>
          <div v-else>
            {{ $t('common.unknown') }}
          </div>
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Villagers',
  data: () => ({
    search: '',
    loading: true,
    characters: [],
    headers: [
      { text: '', value: 'image', sortable: false },
      { text: 'Name', value: 'name' },
      { text: 'Personality', value: 'personality' },
      { text: 'Birthday', value: 'birthday' },
      { text: 'Species', value: 'species' },
    ],
  }),
  mounted () {
    this.getData();
  },
  methods: {
    async getData () {
      this.loading = true;
      const { data } = await this.$axios.get('/villagers');
      this.characters = data.data;
      this.loading = false;
    },
  },
  head: () => ({
    title: this.$t('menu.villagers'),
  }),
};
</script>
