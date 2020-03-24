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

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn
            text
            small
            v-on="on"
          >
            <span>{{ $t('meta.settings') }}</span>
          </v-btn>
        </template>
        <v-card v-if="newSettings">
          <v-card-title>
            <span class="headline">{{ $t('meta.settings') }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <h2 class="info--text">
                    Hemisphere
                  </h2>
                  <v-btn-toggle
                    v-model="newSettings.hemisphere"
                    tile
                    color="primary"
                    group
                    class="d-flex justify-center"
                  >
                    <v-btn value="north">
                      {{ $t('creatures.north_hemisphere') }}
                    </v-btn>

                    <v-btn value="south">
                      {{ $t('creatures.south_hemisphere') }}
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
                <v-col cols="12" sm="6">
                  <h2 class="info--text">
                    Subtitles
                  </h2>
                  <v-btn-toggle
                    v-model="newSettings.subtitle"
                    tile
                    color="primary"
                    group
                    class="d-flex justify-center"
                  >
                    <v-btn :value="true">
                      On
                    </v-btn>

                    <v-btn :value="false">
                      Off
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="updateSettings()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list nav dense expand>
        <v-list-group
          v-for="navi in nav"
          :key="navi.name"
          :prepend-icon="navi.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize">
                {{ navi.name }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="list in navi.children" :key="list.name" :to="{ name: list.name }">
            <v-list-item-content>
              <v-list-item-title class="text-capitalize">
                {{ list.title }}
              </v-list-item-title>
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
      dialog: false,
      newSettings: {},
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
        const newData = [
          {
            icon: 'mdi-information-outline',
            name: this.$t('menu.information'),
            children: [
              { title: this.$t('menu.villagers'), name: 'villagers' },
              { title: this.$t('menu.special_characters'), name: 'special-characters' },
              { title: this.$t('menu.shops'), name: 'shops' },
              { title: this.$t('menu.recipes'), name: 'recipes' },
            ],
          },
        ].concat(this.linkData);
        return newData;
      } else { return []; }
    },
  },
  mounted () {
    this.getLocale();
    this.getMenuItems();
    this.getSettings();
  },
  methods: {
    blank () {},
    getLocale () {
      this.currentLocale = this.$i18n.getLocaleCookie();
    },
    async getMenuItems () {
      const items = await this.$axios.get('/categories');
      const editflat = items.data.flat.map(x => ({ name: x.slug, id: x.id, title: x.name }));
      const editlist = items.data.categories.map(y => ({ ...y, children: y.children.map(x => ({ name: x.slug, id: x.id, title: x.name })) }));
      await this.$store.dispatch('layout/getItems', editflat);
      this.linkData = editlist;
    },
    async changeLocale (locale) {
      await this.$i18n.setLocale(locale);
      this.getLocale();
      this.$router.go({ path: this.$router.currentRoute.path, force: true });
    },
    async getSettings () {
      this.newSettings = await this.$store.state.usersettings.settings;
    },
    async updateSettings () {
      await this.$store.dispatch('usersettings/changeSettings', this.newSettings);
      this.dialog = false;
      this.$router.go({ path: this.$router.currentRoute.path, force: true });
    },
  },
};
</script>
