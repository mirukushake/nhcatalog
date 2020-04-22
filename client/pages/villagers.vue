<template>
  <div class="container">
    <div>
      <h1 v-if="pageInfo" class="display-1 info--text">
        {{ pageInfo ? pageInfo.title : null }}
      </h1>
    </div>

    <section>
      <v-data-table
        :headers="headers"
        :items="characters"
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
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
          </v-toolbar>
        </template>
        <template v-slot:item.image_url="{ item }">
          <v-avatar dark class="my-2">
            <v-img
              alt="item.name"
              max-width="50"
              :src="`${img_url}/animals/${item.image_url}`"
            />
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
    loading: false,
    characters: [],
    img_url: process.env.IMG_URL,
  }),
  computed: {
    pageInfo () {
      const basic = this.$route.path.substr(1);
      return this.$store.getters['layout/getInfo'](basic);
    },
    headers () {
      return [
        { text: '', value: 'image_url', sortable: false, width: 100 },
        { text: this.$t('headers.animal_name'), value: 'name' },
        { text: this.$t('headers.personality'), value: 'personality' },
        { text: this.$t('headers.birthday'), value: 'birthday' },
        { text: this.$t('headers.species'), value: 'species' },
      ];
    },
  },
  mounted () {
    this.getData();
  },
  methods: {
    async getData () {
      try {
        this.loading = true;
        const { data } = await this.$axios.get('/animals?type=villager');
        this.characters = data.animals;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
  },
  head () {
    return { title: this.pageInfo ? this.pageInfo.title : null };
  },
};
</script>
