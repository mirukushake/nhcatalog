<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="creatures"
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
      <template v-slot:item.name="{ item }">
        <div>{{ item.name }}</div>
        <div v-if="item.subtitle" class="grey--text">
          {{ item.subtitle }}
        </div>
      </template>
      <template v-slot:item.seasons="{ item }">
        <div v-for="(season, i) in item.season" :key="i">
          <span v-if="season.seasons != null">
            {{ formatTime(season.seasons) }}, <span class="font-weight-bold">{{ formatHour(season.start_time, season.end_time) }}</span>
          </span>
          <span />
        </div>
      </template>
    </v-data-table>
  </section>
</template>

<script>
export default {
  name: 'Creatures',
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    search: '',
    loading: false,
    creatures: [],
    headers: [
      { text: '', value: 'image', sortable: false },
      { text: 'Name', value: 'name' },
      { text: 'Time', value: 'seasons', sortable: false },
      { text: 'Sell Price', value: 'sell_price' },
      { text: 'Location', value: 'location', sortable: false },

    ],
  }),
  computed: {
    subId () {
      return this.id || null;
    },
    hemi () {
      return this.$store.state.usersettings.settings.hemisphere;
    },
  },
  watch: {
    hemi () {
      this.getData();
    },
  },
  created () {
    this.getData();
  },
  methods: {
    async getData () {
      try {
        this.loading = true;
        const { data } = await this.$axios.get(`/creatures/${this.subId}?hemi=${this.hemi}`);
        this.loading = false;
        this.creatures = data.creatures;
      } catch (err) {
        this.loading = false;
      }
    },
    formatTime (array) {
      if (array != null && array.length > 1) {
        const startMonth = this.$dayjs().locale(this.$i18n.locale).set('month', array[0] - 1).format('MMMM');
        const lastMonth = this.$dayjs().locale(this.$i18n.locale).set('month', array[array.length - 1] - 1).format('MMMM');

        return `${startMonth} - ${lastMonth}`;
      } else if (array != null && array.length > 1) {
        return this.$dayjs().locale(this.$i18n.locale).set('month', array[0] - 1).format('MMMM');
      } else {
        return 'shit';
      }
    },
    formatHour (start, end) {
      if (start != null && end != null) {
        const startTime = this.$dayjs().locale(this.$i18n.locale).set('hour', start.split(':')[0]).set('minute', 0).format('H:mm');
        const endTime = this.$dayjs().locale(this.$i18n.locale).set('hour', end.split(':')[0]).set('minute', 0).format('H:mm');

        return `${startTime} - ${endTime}`;
      } else {
        return 'fuck!';
      }
    },
  },
};
</script>
