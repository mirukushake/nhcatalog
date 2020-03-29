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
      <template v-slot:item.image_url="{ item }">
        <v-avatar dark class="my-2">
          <v-img
            v-if="item.image_url != null"
            alt="item.name"
            :src="`${img_url}/creatures/${item.image_url}`"
          />
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
            {{ formatTime(season.seasons) }}
          </span>
          <span v-else-if="season.is_allyear === true">
            {{ $t("creatures.all_year") }}
          </span>
        </div>
      </template>
      <template v-slot:item.start_time="{ item }">
        <div v-if="item.is_allday === true">
          {{ $t("creatures.all_day") }}
        </div>
        <div v-else>
          {{ formatHour(item.start_time, item.end_time) }}
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
    img_url: process.env.IMG_URL,
  }),
  computed: {
    subId () {
      return this.id || null;
    },
    headers () {
      return [
        { text: '', value: 'image_url', width: 100, align: 'center', sortable: false },
        { text: 'Name', value: 'name' },
        { text: this.$t('headers.season'), value: 'seasons', sortable: false },
        { text: this.$t('headers.time'), value: 'start_time', sortable: false },
        { text: this.$t('headers.sell_price'), value: 'sell_price' },
        { text: this.$t('headers.location'), value: 'location', sortable: false },

      ];
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
        const grouped = array.reduce((arr, val, i, a) => {
          if (!i || val !== a[i - 1] + 1) { arr.push([]); }
          arr[arr.length - 1].push(val);
          return arr;
        }, []);

        const strings = grouped.map((x) => {
          if (x.length > 1) {
            const startMonth = this.$dayjs().locale(this.$i18n.locale).set('month', x[0] - 1).format('MMMM');
            const lastMonth = this.$dayjs().locale(this.$i18n.locale).set('month', x[x.length - 1] - 1).format('MMMM');

            return `${startMonth} - ${lastMonth}`;
          } else {
            return this.$dayjs().locale(this.$i18n.locale).set('month', x[0] - 1).format('MMMM');
          }
        });

        return strings.join(', ');
      } else {
        return this.$dayjs().locale(this.$i18n.locale).set('month', array[0] - 1).format('MMMM');
      }
    },
    formatHour (start, end) {
      if (start != null & end != null) {
        const times = start.map((x, i) => {
          const startString = this.$dayjs().locale(this.$i18n.locale).set('hour', x.split(':')[0]).set('minute', 0).format('H:mm');
          const endString = this.$dayjs().locale(this.$i18n.locale).set('hour', end[i].split(':')[0]).set('minute', 0).format('H:mm');
          return `${startString} - ${endString}`;
        });
        return times.join(', ');
      }
    },
  },
};
</script>
