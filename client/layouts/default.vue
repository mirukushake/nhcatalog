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
                <v-list-item-title class="text-uppercase" v-text="locale.code" />
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
          v-for="navitem in nav"
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
            nuxt
          >
            <v-list-item-content>
              <v-list-item-title v-text="subitem.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container>
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
    }
  ),
  computed: {
    availableLocales () {
      return this.$i18n.locales;
    },
    nav () {
      return [
        {
          icon: 'mdi-information-outline',
          title: this.$t('menu.information'),
          subitems: [
            { title: 'Villagers', to: '/villagers' },
            { title: 'Special Characters', to: '/special-characters' },
            { title: 'Recipes', to: '/recipes' },
          ],
        },
        {
          icon: 'mdi-tshirt-crew',
          title: 'Clothing',
          subitems: [
            { title: 'Tops', to: '/tops' },
            { title: 'Bottoms', to: '/bottoms' },
            { title: 'Dresses', to: '/dresses' },
            { title: 'Headwear', to: '/headwear' },
            { title: 'Accessories', to: '/accessories' },
            { title: 'Socks', to: '/socks' },
            { title: 'Shoes', to: '/shoes' },
          ],
        },
        {
          icon: 'mdi-lamp',
          title: 'Furniture',
          subitems: [
            { title: 'Furniture', to: '/furniture' }, // change to subcategories later
            { title: 'Wallpaper', to: '/wallpaper' },
            { title: 'Flooring', to: '/flooring' },
          ],
        },
        {
          icon: 'mdi-bank',
          title: 'Museum',
          subitems: [
            { title: 'Bugs', to: '/bugs' },
            { title: 'Fish', to: '/fish' },
            { title: 'Fossils', to: '/fossils' },
          ],
        },
        {
          icon: 'mdi-image',
          title: 'Collectibles',
          subitems: [
            { title: 'Tools', to: '/tools' },
            { title: 'Handhelds', to: '/handhelds' },
            { title: 'Villager Pics', to: '/pics' },
            { title: 'Music', to: '/music' }, // may move to furniture
            { title: 'Stationery', to: '/stationery' },
            { title: 'Gyroids', to: '/gyroids' },
          ],
        },
        {
          icon: 'mdi-flower',
          title: 'Nature',
          subitems: [
            { title: 'Flowers', to: '/flowers' },
            { title: 'Plants', to: '/plants' },
            { title: 'Fruit', to: '/fruit' },
            // buried creatures?
          ],
        },
      ];
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
      this.$router.go({ path: this.$router.currentRoute.path, force: true });
    },
  },
};
</script>
