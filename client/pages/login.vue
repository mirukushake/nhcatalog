<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ $t('meta.login') }}
      </h1>
    </div>
    <section v-if="!isLoggedIn">
      <v-row>
        <v-col cols="12" sm="6">
          <v-alert
            v-if="error"
            class="mt-2"
            dense
            type="error"
            transition="scale-transition"
          >
            {{ error }}
          </v-alert>
          <v-form ref="loginForm">
            <v-text-field
              v-model="username"
              :error-messages="usernameErrors"
              label="Username"
              required
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
            />
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              label="Password"
              required
              type="password"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            />

            <v-btn depressed class="mr-4 mt-4" color="success" :loading="processing" @click="submit">
              {{ $t('meta.login') }}
            </v-btn>
            <v-btn depressed class="mt-4" @click="reset">
              Clear
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <div class="ml-3 caption">
          Don't have an account? <nuxt-link to="/register">
            Register here!
          </nuxt-link>
        </div>
      </v-row>
    </section>
    <section v-else>
      You are already logged in!
    </section>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
export default {
  name: 'Login',
  mixins: [validationMixin],
  validations: {
    username: { required },
    password: { required },
  },
  data: () => ({
    error: null,
    username: null,
    password: null,
    processing: false,
    currentLocale: null,
  }),
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.loggedIn;
    },
    usernameErrors () {
      const errors = [];
      if (!this.$v.username.$dirty) { return errors; }
      !this.$v.username.required && errors.push('Username is required');
      return errors;
    },
    passwordErrors () {
      const errors = [];
      if (!this.$v.password.$dirty) { return errors; }
      !this.$v.password.required && errors.push('Password is required.');
      return errors;
    },
  },
  methods: {
    reset () {
      this.$v.$reset();
      this.password = '';
      this.username = '';
    },
    async submit () {
      try {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.processing = true;
          const user = await this.$auth.loginWith('local', { data: { password: this.password, username: this.username } });
          await this.$auth.setUser({ username: user.data.user.userInfo.username, id: user.data.user.userInfo.id });
          await this.$i18n.setLocale(user.data.user.userInfo.site_language);
          await this.$store.dispatch('user/changeSettings', {
            textLang: user.data.user.userInfo.data_language,
            subtitleLang: user.data.user.userInfo.subtitles,
            hemisphere: user.data.user.userInfo.hemisphere,
          });
          await this.$store.dispatch('user/changeLists', user.data.user.lists);
          await this.$store.dispatch('user/changeItems', user.data.user.completed);
          // await this.getLists();
          this.processing = false;
        }
      } catch (err) {
        this.processing = false;
        this.error = 'The username or password you entered was incorrect.';
      }
    },
  },
  head () {
    return { title: this.$t('meta.login') };
  },
};
</script>
