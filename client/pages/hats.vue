<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
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
      <!-- <v-container fluid>
        <v-data-iterator
          :items="itemdata"
          hide-default-footer
        >
          <template v-slot:header>
            <v-toolbar
              class="mb-2"
              dark
              flat
            >
              <v-toolbar-title>This is a header</v-toolbar-title>
            </v-toolbar>
          </template>

          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.name"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card outlined :color="isSelected(item) ? 'grey lighten-5' : ''">
                  <v-container>
                    <v-row justify="space-between">
                      <v-col cols="3" class="justify-center center">
                        <img
                          v-if="item.itemicon"
                          :src="'/icons/' + item.itemicon"
                          width="50"
                          height="50"
                          class="pa-0 ma-0"
                        >
                        <img
                          v-else
                          src="/icons/placeholder.png"
                          width="50"
                          height="50"
                          class="pa-0 ma-0"
                        >
                        <div class="text-center mt-n5" style="width: 50px;">
                          <v-icon v-for="n in item.rarity" :key="n" size="8" color="red">
                            mdi-heart
                          </v-icon>
                        </div>
                      </v-col>
                      <v-col cols="9">
                        <h2 class="body-2">
                          <a href="#">{{ item.itemname }}</a>
                        </h2>
                        <div class="caption grey-text">
                          No. {{ item.gameid }}
                        </div>
                        <div>
                          <v-chip color="#eeb362" dark small>
                            華麗
                          </v-chip>
                          <v-chip color="#ebe9ff" small style="color: #8e6aaa;">
                            エレガント
                          </v-chip>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="text-right py-0">
                        <v-checkbox
                          :input-value="isSelected(item)"
                          class="pa-0 ma-0 mb-n5 float-left"
                          on-icon="mdi-check-circle-outline"
                          off-icon="mdi-plus-circle-outline"
                          dense
                          @change="(v) => select(item, v)"
                        />
                        <img src="/icons/custom.png" width="auto" height="18">
                        <img src="/icons/gradeup.png" width="auto" height="18">
                        <img src="/icons/sozai.png" width="auto" height="18">
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container> -->
      <v-data-iterator
        v-model="selected"
        :items="itemdata"
        :items-per-page.sync="itemsPerPage"
        :footer-props="{ itemsPerPageOptions }"
        item-key="itemid"
      >
        <template v-slot:default="{ items, isSelected, select }">
          <v-row>
            <v-col v-for="item in items" :key="item.itemid" cols="12" sm="9" md="3">
              <v-card outlined :color="isSelected(item) ? 'grey lighten-5' : ''">
                <v-container>
                  <v-row justify="space-between">
                    <v-col cols="3" class="justify-center center">
                      <v-avatar color="teal" size="50">
                        <span class="white--text headline">AC</span>
                      </v-avatar>
                    </v-col>
                    <v-col cols="9">
                      <h2 class="body-2">
                        <a href="#">{{ item.itemname }}</a>
                      </h2>
                      <p class="caption grey-text">
                        日本語
                      </p>
                      <v-checkbox
                        :input-value="isSelected(item)"
                        class="pa-0 ma-0 mb-n5 float-right"
                        on-icon="mdi-check-circle-outline"
                        off-icon="mdi-plus-circle-outline"
                        dense
                        @change="(v) => select(item, v)"
                      />
                      <v-checkbox
                        :input-value="isSelected(item)"
                        class="pa-0 ma-0 mb-n5 float-right"
                        on-icon="mdi-check-circle-outline"
                        off-icon="mdi-plus-circle-outline"
                        dense
                        @change="(v) => select(item, v)"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  selected: [],
  itemsPerPage: 12,
  data: () => ({
    itemdata: [
      {
        itemname: 'purple-pumpkin head',
        obtained: 'Labelle',
        price: '320 bells',
        sells: '80 bells',
        interior: null,
        fashion: 'sporty',
        image: null,

      },
      {
        itemname: 'purple-pumpkin head',
        obtained: 'Labelle',
        price: '320 bells',
        sells: '80 bells',
        interior: null,
        fashion: 'sporty',
        image: null,

      },
      {
        itemname: 'purple-pumpkin head',
        obtained: 'Labelle',
        price: '320 bells',
        sells: '80 bells',
        interior: null,
        fashion: 'sporty',
        image: null,

      },
    ],
    headers: [
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
