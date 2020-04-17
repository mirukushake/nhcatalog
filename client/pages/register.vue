<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        {{ $t('meta.register') }}
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
          <v-alert
            v-if="message"
            class="mt-2"
            dense
            type="success"
            transition="scale-transition"
          >
            {{ message }}
          </v-alert>
          <v-form ref="registerForm">
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
            <v-text-field
              v-model="confirmPassword"
              :error-messages="confirmPasswordErrors"
              label="Confirm Password"
              required
              type="password"
              @blur="$v.confirmPassword.$touch()"
            />
            <v-text-field
              v-model="inviteCode"
              :error-messages="inviteCodeErrors"
              label="Invite Code"
              required
              @input="$v.inviteCode.$touch()"
              @blur="$v.inviteCode.$touch()"
            />
            <v-text-field
              v-model="businessCat"
              style="display: none;"
            />

            <v-btn depressed class="mr-4 mt-4" color="success" :loading="processing" @click="register">
              {{ $t('meta.register') }}
            </v-btn>
            <v-btn depressed class="mt-4" @click="reset">
              Clear
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <div class="ml-3 caption">
          Already have an account? <nuxt-link to="/login">
            Log in here!
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
import { required, minLength, sameAs, alphaNum, helpers } from 'vuelidate/lib/validators';
const passStrength = helpers.regex('passStrength', /^[a-zA-Z0-9!@#$%^&*]{6,30}$/);

export default {
  name: 'Register',
  mixins: [validationMixin],
  validations: {
    username: { required, alphaNum, minLength: minLength(5) },
    password: { required, passStrength },
    confirmPassword: { required, sameAs: sameAs(function () { return this.password; }) },
    inviteCode: { required, alphaNum },
  },
  data: () => ({
    error: null,
    username: null,
    password: null,
    confirmPassword: null,
    inviteCode: null,
    businessCat: null,
    message: null,
    processing: false,
  }),
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.loggedIn;
    },
    usernameErrors () {
      const errors = [];
      if (!this.$v.username.$dirty) { return errors; }
      !this.$v.username.required && errors.push('Username is required');
      !this.$v.username.minLength && errors.push('Username must be at least 5 characters long.');
      !this.$v.username.alphaNum && errors.push('Username must contain only letters and numbers.');
      return errors;
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
    inviteCodeErrors () {
      const errors = [];
      if (!this.$v.inviteCode.$dirty) { return errors; }
      !this.$v.inviteCode.required && errors.push('Invite code is required');
      !this.$v.inviteCode.alphaNum && errors.push('Username must contain only letters and numbers.');
      return errors;
    },
  },
  methods: {
    reset () {
      this.$v.$reset();
      this.password = '';
      this.confirmPassword = '';
      this.username = '';
      this.inviteCode = '';
    },
    async register () {
      try {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.processing = true;
          const userinfo = { username: this.username, password: this.password, businessCat: this.businessCat, inviteCode: this.inviteCode };
          await this.$axios.post('/auth/register', userinfo);
          this.message = 'Your account was created! ';
          await this.$auth.loginWith('local', { data: { password: this.password, username: this.username } });
          this.processing = false;
          await this.$router.push({ path: '/profile' });
        }
      } catch (err) {
        this.processing = false;
        if (err.response.status === 409) {
          this.error = 'That username already exists.';
        } else {
          this.error = err.response.data.message;
        }
      }
    },
  },
  head () {
    return { title: this.$t('meta.register') };
  },
};
</script>
