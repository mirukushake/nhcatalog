<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ $t('meta.login') }}
      </h1>
    </div>
    <section>
      <v-row>
        <v-col cols="6">
          <v-form ref="loginForm">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
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
              submit
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
import { required, minLength, email } from 'vuelidate/lib/validators';
export default {
  name: 'Login',
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },
  data: () => ({
    email: null,
    password: null,
  }),
  computed: {
    emailErrors () {
      const errors = [];
      if (!this.$v.email.$dirty) { return errors; }
      !this.$v.email.email && errors.push('Must be valid e-mail');
      !this.$v.email.required && errors.push('E-mail is required');
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
      this.email = '';
    },
  },
  head () {
    return { title: this.$t('meta.login') };
  },
};
</script>
