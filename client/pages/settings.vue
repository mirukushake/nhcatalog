<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ $t('meta.settings') }}
      </h1>
      <section>
        <v-tabs
          background-color="white"
          light
          class="mt-4"
        >
          <v-tab>
            Site Settings
          </v-tab>

          <v-tab v-if="isLoggedIn">
            User Settings
          </v-tab>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-alert
                  v-if="error"
                  class="mt-2"
                  dense
                  type="error"
                  transition="scale-transition"
                  style="width: 50%;"
                >
                  {{ error }}
                </v-alert>
                <v-alert
                  v-if="message"
                  class="mt-2"
                  dense
                  type="success"
                  transition="scale-transition"
                  style="width: 50%;"
                >
                  {{ message }}
                </v-alert>
                <span class="font-weight-black">UI Language</span>
                <v-radio-group v-model="siteLang" row>
                  <v-radio v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
                    <template v-slot:label>
                      <span>{{ locale.local_name }}</span>
                    </template>
                  </v-radio>
                </v-radio-group>
                <v-divider class="mb-4" />
                <span class="font-weight-black">Item Language</span>
                <v-radio-group v-model="newSettings.textLang" row>
                  <v-radio v-for="lang in availableLangs" :key="lang.id" :value="lang.code">
                    <template v-slot:label>
                      <span>{{ lang.local_name }}</span>
                    </template>
                  </v-radio>
                </v-radio-group>
                <v-divider class="mb-4" />
                <span class="font-weight-black">Subtitles</span>
                <v-radio-group v-model="newSettings.subtitleLang" row>
                  <v-radio :label="$t('meta.off') " :value="false" />
                  <v-radio v-for="lang in availableLangs" :key="lang.id" :value="lang.code">
                    <template v-slot:label>
                      <span>{{ lang.local_name }}</span>
                    </template>
                  </v-radio>
                </v-radio-group>
                <v-divider class="mb-4" />
                <span class="font-weight-black">Hemisphere</span>
                <v-radio-group v-model="newSettings.hemisphere" row>
                  <v-radio :label="$t('creatures.north_hemisphere') " value="north" />
                  <v-radio :label="$t('creatures.south_hemisphere') " value="south" />
                </v-radio-group>

                <v-btn depressed class="mr-4 mt-4" color="success" :loading="processing" @click="updateSettings">
                  Save
                </v-btn>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-if="isLoggedIn">
            <v-card flat>
              <v-card-text>
                <v-alert
                  v-if="passwordError"
                  class="mt-2"
                  dense
                  type="error"
                  transition="scale-transition"
                  style="width: 50%;"
                >
                  {{ passwordError }}
                </v-alert>
                <v-alert
                  v-if="passwordMessage"
                  class="mt-2"
                  dense
                  type="success"
                  transition="scale-transition"
                  style="width: 50%;"
                >
                  {{ passwordMessage }}
                </v-alert>
                <span class="font-weight-black">Change Password</span>
                <v-form ref="changePassForm">
                  <v-text-field
                    v-model="password"
                    :error-messages="passwordErrors"
                    label="New Password"
                    required
                    type="password"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  />
                  <v-text-field
                    v-model="confirmPassword"
                    :error-messages="confirmPasswordErrors"
                    label="Confirm Password"
                    required
                    type="password"
                    @blur="$v.confirmPassword.$touch()"
                  />

                  <v-btn depressed class="mr-4 mt-4" color="success" :loading="processing" @click="changePassword">
                    Change password
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </section>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, sameAs, helpers } from 'vuelidate/lib/validators';
const passStrength = helpers.regex('passStrength', /^[a-zA-Z0-9!@#$%^&*]{6,30}$/);

export default {
  name: 'Settings',
  mixins: [validationMixin],
  validations: {
    password: { required, passStrength },
    confirmPassword: { required, sameAs: sameAs(function () { return this.password; }) },
  },
  data: () => ({
    siteLang: null,
    newSettings: {},
    message: null,
    error: null,
    passwordMessage: null,
    passwordError: null,
    password: null,
    confirmPassword: null,
    processing: false,
  }),
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.loggedIn;
    },
    loggedInUser () {
      return this.$store.state.auth.user;
    },
    availableLocales () {
      return this.$i18n.locales;
    },
    availableLangs () {
      return this.$store.state.layout.languages.filter(l => l.available === true);
    },
    passwordErrors () {
      const errors = [];
      if (!this.$v.password.$dirty) { return errors; }
      !this.$v.password.required && errors.push('Password is required.');
      !this.$v.password.passStrength && errors.push('Password must be between 6 and 30 characters and can include letters, numbers, and some special characters (!@#$%^&*).');
      return errors;
    },
    confirmPasswordErrors () {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) { return errors; }
      !this.$v.confirmPassword.required && errors.push('Password is required.');
      !this.$v.confirmPassword.sameAs && errors.push('Does not match password.');
      return errors;
    },
  },
  mounted () {
    this.getSettings();
    this.getLocale();
  },
  methods: {
    getLocale () {
      this.siteLang = this.$i18n.getLocaleCookie();
    },
    async getSettings () {
      const newSettings = await { ...this.$store.state.user.settings };
      newSettings.subtitleLang = newSettings.subtitleLang === null ? false : newSettings.subtitleLang;
      this.newSettings = newSettings;
    },
    async updateSettings () {
      try {
        this.processing = true;
        const newSettings = this.newSettings;
        newSettings.subtitleLang = newSettings.subtitleLang === false ? null : newSettings.subtitleLang;
        await this.$store.dispatch('user/changeSettings', newSettings);
        const settings = Object.assign({}, { siteLang: this.siteLang }, newSettings);
        if (this.isLoggedIn) {
          await this.$axios.patch('/user/settings', settings);
        }
        this.processing = false;
        this.message = 'Your settings have been saved!';
        await this.$i18n.setLocale(this.siteLang);
        const items = await this.$axios.get('/meta');
        const editflat = items.data.flat.map(x => ({ ...x, name: x.slug, id: x.id, title: x.name }));
        const editlist = items.data.categories.map(y => ({ ...y, children: y.children.map(x => ({ name: x.slug, id: x.id, title: x.name })) }));
        await this.$store.dispatch('layout/getItems', { editflat, editlist });
      } catch (err) {
        this.processing = false;
        this.error = 'There was a problem saving your settings.';
      }
    },
    async changePassword () {
      try {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.processing = true;
          const userinfo = { password: this.password };
          await this.$axios.patch('/auth/changepassword', userinfo);
          this.processing = false;
          this.message = 'Your password has been updated!';
        }
      } catch (err) {
        this.processing = false;
        this.error = 'Could not change your password.';
      }
    },
  },
  head () {
    return { title: this.$t('meta.settings') };
  },
};
</script>
