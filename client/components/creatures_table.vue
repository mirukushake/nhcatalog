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
        <v-btn-toggle
          v-model="hemi"
          tile
          color="primary"
          group
          class="d-flex justify-center"
        >
          <v-btn value="north">
            Northern Hemisphere
          </v-btn>

          <v-btn value="south">
            Southern Hemisphere
          </v-btn>
        </v-btn-toggle>
      </template>
      <template v-slot:item.image="{ item }">
        <v-avatar color="secondary" dark class="my-2">
          <v-icon>{{ item.image }}</v-icon>
        </v-avatar>
      </template>
      <template v-slot:item.seasons="{ item }">
        <div v-for="(season, i) in item.season" :key="i">
          <span v-if="season.is_allday === false">
            {{ formatTime(season.seasons) }}, <span class="font-weight-bold">{{ formatHour(season.start_time, season.end_time) }}</span>
          </span>
          <span v-else>
            All day
          </span>
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
    hemi: 'north',
    headers: [
      { text: '', value: 'image', sortable: false },
      { text: 'Name', value: 'name' },
      { text: 'Time', value: 'seasons', sortable: false },
      { text: 'Shadow', value: 'size' },
      { text: 'Sell Price', value: 'sell_price' },
      { text: 'Location', value: 'location', sortable: false },

    ],
  }),
  computed: {
    subId () {
      return this.id || null;
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
        this.creatures = data.data;
      } catch (err) {
        this.loading = false;
      }
    },
    formatTime (array) {
      if (array.length > 1) {
        const startMonth = this.$dayjs().set('month', Math.min(...array) - 1).format('MMMM');
        const lastMonth = this.$dayjs().set('month', Math.max(...array) - 1).format('MMMM');

        return `${startMonth} - ${lastMonth}`;
      } else {
        return this.$dayjs().set('month', array[0] - 1).format('MMMM');
      }
    },
    formatHour (start, end) {
      const startTime = this.$dayjs().set('hour', start.split(':')[0]).set('minute', 0).format('H:mm');
      const endTime = this.$dayjs().set('hour', end.split(':')[0]).set('minute', 0).format('H:mm');

      return `${startTime} - ${endTime}`;
    },
  },
};
</script>
