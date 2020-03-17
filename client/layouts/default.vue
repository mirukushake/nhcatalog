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
       <v-btn
            text
            small
          >
            <span>Settings</span>
            <v-icon left class="hidden-sm-and-down">
              mdi-cog-outline
            </v-icon>
          </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list v-if="linkData" nav dense expand>
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
            :to="{ name: subitem.name, params: { catId: subitem.id }}"
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
      linkData: null,
    }
  ),
  computed: {
    availableLocales () {
      return this.$i18n.locales;
    },
    menuItems () {
      return this.$store.state.layout.menuItems;
    },
    nav () {
      if (this.linkData) {
        return [
          {
            icon: 'mdi-information-outline',
            title: this.$t('menu.information'),
            subitems: [
              { title: this.$t('menu.villagers'), name: 'villagers' },
              { title: this.$t('menu.special_characters'), name: 'special-characters' },
              { title: this.$t('menu.shops'), name: 'shops' },
              { title: this.$t('menu.recipes'), name: 'recipes' },
              { title: this.$t('menu.materials'), name: 'materials' },
            ],
          },
          {
            icon: 'mdi-tshirt-crew',
            title: this.$t('menu.clothing'),
            subitems: [
              { title: this.$t('common.everything'), name: 'clothing' },
            ].concat(this.linkData.filter(x => x.identifier === 'clothing')[0].children),
          },
          {
            icon: 'mdi-lamp',
            title: this.$t('menu.furniture'),
            subitems: [
              { title: this.$t('common.everything'), name: 'all-furniture' },
            ].concat(this.linkData.filter(x => x.identifier === 'furniture')[0].children.slice(0, 2)),
          },
          {
            icon: 'mdi-bank',
            title: this.$t('menu.museum'),
            subitems: this.linkData.filter(x => x.identifier === 'museum')[0].children,
          },
          {
            icon: 'mdi-image',
            title: this.$t('menu.collectibles'),
            subitems: [
              { title: this.$t('common.everything'), name: 'collectibles' },
            ].concat(this.linkData.filter(x => x.identifier === 'collectibles')[0].children),
          },
          {
            icon: 'mdi-flower',
            title: this.$t('menu.nature'),
            subitems: [
              { title: this.$t('common.everything'), name: 'nature' },
            // buried creatures?
            ].concat(this.linkData.filter(x => x.identifier === 'nature')[0].children),
          },
        ];
      } else { return []; }
    },
  },
  mounted () {
    this.getLocale();
    this.getMenuItems();
  },
  methods: {
    blank () {},
    getLocale () {
      this.currentLocale = this.$i18n.getLocaleCookie();
    },
    async getMenuItems () {
      const items = await this.$axios.get('/categories');
      const flat = await this.$axios.get('/categories?flat=true');
      const editflat = flat.data.data.map(x => ({ name: x.identifier, id: x.id, title: x.name }));
      const editlist = items.data.data.map(y => ({ ...y, children: y.children.map(x => ({ name: x.identifier, id: x.id, title: x.name })) }));
      await this.$store.dispatch('layout/getItems', editflat);
      this.linkData = editlist;
    },
    async changeLocale (locale) {
      await this.$i18n.setLocale(locale);
      this.getLocale();
      this.$router.go({ path: this.$router.currentRoute.path, force: true });
    },
  },
};
</script>
