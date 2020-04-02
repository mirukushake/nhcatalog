<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ $t('meta.login') }}
      </h1>
    </div>
    <section>
      {{ error }}
      <v-row>
        <v-col cols="6">
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

            <v-btn class="mr-4 mt-4" color="success" @click="submit">
              Submit
            </v-btn>
            <v-btn class="mt-4" @click="reset">
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
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  name: 'Login',
  mixins: [validationMixin],
  validations: {
    username: { required },
    password: { required, minLength: minLength(6) },
  },
  data: () => ({
    error: null,
    username: null,
    password: null,
  }),
  computed: {
    usernameErrors () {
      const errors = [];
      if (!this.$v.username.$dirty) { return errors; }
      !this.$v.username.required && errors.push('Username is required');
      return errors;
    },
    passwordErrors () {
      const errors = [];
      if (!this.$v.password.$dirty) { return errors; }
      !this.$v.password.minLength && errors.push('Password must be at least 6 characters long');
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
        await this.$auth.loginWith('local', { data: { password: this.password, username: this.username } });
        this.$router.push({ path: '/shops' });
      } catch (err) {
        this.error = 'The username or password you entered was incorrect.';
      }
    },
  },
  head () {
    return { title: this.$t('meta.login') };
  },
};
</script>
