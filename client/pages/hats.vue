<template>
  <div class="container">
    <div>
      <h1 class="display-1">
        Hats
      </h1>
      <!-- <h1 class="title grey--text text--darken-2">
        {{ $t('welcome_subtitle') }}
      </h1> -->
    </div>
    <div class="search mb-10">
      <!-- Filtering here. -->
    </div>
    <section>
      <v-data-table
        :headers="headers"
        :items="itemdata"
        :items-per-page="5"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <!-- sorting/search options -->
          </v-toolbar>
        </template>
        <template v-slot:item.image="{ item }">
          <v-avatar color="secondary" dark class="my-2">
            <v-icon>{{ item.image }}</v-icon>
          </v-avatar>
        </template>
        <template v-slot:item.itemname="{ item }">
          <div>{{ item.itemname }}</div>
          <div v-if="item.jpitemname" class="grey--text">
            {{ item.jpitemname }}
          </div>
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Hats',
  data: () => ({
    data: null,
    itemdata: [
      {
        itemname: 'purple-pumpkin head',
        jpitemname: 'パンプキンヘッド',
        obtained: 'Labelle',
        price: '320 bells',
        sells: '80 bells',
        interior: null,
        fashion: 'sporty',
        image: 'mdi-alarm',

      },
      {
        itemname: 'purple-pumpkin head',
        obtained: 'Labelle',
        price: '320 bells',
        sells: '80 bells',
        interior: null,
        fashion: 'sporty',
        image: 'mdi-heart',

      },
      {
        itemname: 'purple-pumpkin head',
        obtained: 'Labelle',
        price: '320 bells',
        sells: '80 bells',
        interior: null,
        fashion: 'sporty',
        image: 'mdi-magnify',

      },
    ],
    headers: [
      { text: '', value: 'image', sortable: false },
      { text: 'Item', value: 'itemname' },
      { text: 'Obtained from', value: 'obtained' },
      { text: 'Price', value: 'price' },
      { text: 'Sells for', value: 'sells' },
      { text: 'Interior theme', value: 'interior' },
      { text: 'Fashion theme', value: 'fashion' },
    ],
  }),
  head: () => ({
    title: 'NH Catalog - Hats',
  }),
};
</script>
