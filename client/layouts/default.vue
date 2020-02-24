<template>
  <v-app>
    <v-app-bar
      clipped-left
      app
      color="primary"
      dark
      flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span><nuxt-link to="/" class="white--text">NH Catalog</nuxt-link></span>
      </v-toolbar-title>
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        label="Search for an item"
        single-line
        filled
        rounded
        class="mt-6 hidden-sm-and-down"
        dense
      />
      <v-spacer />

      <v-btn v-if="$vuetify.breakpoint.smAndUp" text class="mr-2" small to="/register">
        {{ $t('register') }}
      </v-btn>
      <v-btn v-else text icon to="/register">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>

      <v-btn v-if="$vuetify.breakpoint.smAndUp" text class="mr-2" small to="/login">
        {{ $t('login') }}
      </v-btn>
      <v-btn v-else text icon to="/login">
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            text
            small
            v-on="on"
          >
            <span>{{ currentLocale }}</span>
            <v-icon right class="hidden-sm-and-down">
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item
              v-for="locale in availableLocales"
              :key="locale.code"
              @click="changeLocale(locale.code)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="locale.name" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <template v-if="$vuetify.breakpoint.smAndDown" v-slot:extension>
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          label="Search for an item"
          single-line
          filled
          rounded
          class="mt-2"
          dense
        />
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list nav dense expand>
        <v-list-group
          v-for="navitem in nav.filter(x => x.subitems)"
          :key="navitem.tile"
          :prepend-icon="navitem.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="navitem.title" />
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subitem in navitem.subitems"
            :key="subitem.title"
            :to="subitem.to"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subitem.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-for="navitem in nav.filter(x => !x.subitems)"
          :key="navitem.tile"
          :to="navitem.to"
        >
          <v-list-item-icon>
            <v-icon v-text="navitem.icon" />
          </v-list-item-icon>

          <v-list-item-title v-text="navitem.title" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <!-- <div>
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            label="Search for an item"
            single-line
            filled
            rounded
            class="mt-6 hidden-md-and-up"
            dense
          />
        </div> -->
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => (
    {
      drawer: null,
      currentLocale: null,
      nav: [
        {
          icon: 'mdi-tshirt-crew',
          title: 'Clothing',
          subitems: [
            { title: 'Hats', to: '/hats' },
            { title: 'Accessories' },
            { title: 'Tops' },
            { title: 'Bottoms' },
            { title: 'Dresses' },
            { title: 'Socks' },
            { title: 'Shoes' },
            { title: 'Umbrellas' },
            { title: 'Wetsuits' },
          ],
        },
        {
          icon: 'mdi-lamp',
          title: 'Furniture',
          subitems: [
            { title: 'Furniture' },
            { title: 'Wallpaper' },
            { title: 'Flooring' },
          ],
        },
        {
          icon: 'mdi-bank',
          title: 'Museum',
          subitems: [
            { title: 'Bugs' },
            { title: 'Fish' },
            { title: 'Fossils' },
            { title: 'Art' },
          ],
        },
        {
          icon: 'mdi-image',
          title: 'Collectibles',
          subitems: [
            { title: 'Music' },
            { title: 'Stationery' },
            { title: 'Villager Pics' },
            { title: 'Gyroids' },
            { title: 'Handhelds' },
            { title: 'Tools' },
          ],
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Sets',
          to: '/sets',
        },
        {
          icon: 'mdi-flower',
          title: 'Nature',
          subitems: [
            { title: 'Flowers' },
            { title: 'Plants' },
            { title: 'Fruit' },
          ],
        },
      ],
    }
  ),
  computed: {
    availableLocales () {
      return this.$i18n.locales
    },
    currentLocale () {
      return this.$i18n.getLocaleCookie();
    },
  },
  mounted () {
    this.getLocale();
  },
  methods: {
    blank () {},
    getLocale () {
      this.currentLocale = this.$i18n.getLocaleCookie();
    },
    async changeLocale (locale) {
      await this.$i18n.setLocale(locale);
      this.getLocale();
    },
  },
};
</script>
