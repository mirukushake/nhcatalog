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
            { title: this.$t('menu.villagers'), to: '/villagers' },
            { title: this.$t('menu.special_characters'), to: '/special-characters' },
            { title: this.$t('menu.shops'), to: '/shops' },
            { title: this.$t('menu.recipes'), to: '/recipes' },
          ],
        },
        {
          icon: 'mdi-tshirt-crew',
          title: this.$t('menu.clothing'),
          subitems: [
            { title: this.$t('menu.tops'), to: '/tops' },
            { title: this.$t('menu.bottoms'), to: '/bottoms' },
            { title: this.$t('menu.dresses'), to: '/dresses' },
            { title: this.$t('menu.headwear'), to: '/headwear' },
            { title: this.$t('menu.accessories'), to: '/accessories' },
            { title: this.$t('menu.socks'), to: '/socks' },
            { title: this.$t('menu.shoes'), to: '/shoes' },
          ],
        },
        {
          icon: 'mdi-lamp',
          title: this.$t('menu.furniture'),
          subitems: [
            { title: this.$t('menu.furniture'), to: '/furniture' }, // change to subcategories later
            { title: this.$t('menu.wallpaper'), to: '/wallpaper' },
            { title: this.$t('menu.flooring'), to: '/flooring' },
          ],
        },
        {
          icon: 'mdi-bank',
          title: this.$t('menu.museum'),
          subitems: [
            { title: this.$t('menu.bugs'), to: '/bugs' },
            { title: this.$t('menu.fish'), to: '/fish' },
            { title: this.$t('menu.fossils'), to: '/fossils' },
          ],
        },
        {
          icon: 'mdi-image',
          title: this.$t('menu.collectibles'),
          subitems: [
            { title: this.$t('menu.tools'), to: '/tools' },
            { title: this.$t('menu.handhelds'), to: '/handhelds' },
            { title: this.$t('menu.pics'), to: '/pics' },
            { title: this.$t('menu.music'), to: '/music' }, // may move to furniture
            { title: this.$t('menu.stationery'), to: '/stationery' },
            { title: this.$t('menu.gyroids'), to: '/gyroids' },
          ],
        },
        {
          icon: 'mdi-flower',
          title: this.$t('menu.nature'),
          subitems: [
            { title: this.$t('menu.flowers'), to: '/flowers' },
            { title: this.$t('menu.plants'), to: '/plants' },
            { title: this.$t('menu.fruit'), to: '/fruit' },
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
