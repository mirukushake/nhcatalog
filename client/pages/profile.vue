<template>
  <div class="container">
    <div>
      <h1 class="display-1 info--text">
        Welcome, {{ loggedInUser.username }}!
      </h1>
      <section>
        <v-row>
          <v-col cols="12" sm="6">
            <h2 class="headline primary--text">
              My Lists
            </h2>
            <v-alert
              v-if="message"
              class="mt-2"
              dense
              type="success"
              transition="scale-transition"
              dismissible
            >
              {{ message }}
            </v-alert>
            <v-alert
              v-if="error"
              class="mt-2"
              dense
              type="error"
              transition="scale-transition"
              dismissible
            >
              {{ error }}
            </v-alert>

            <v-list>
              <v-list-item
                v-for="(list, i) in lists"
                :key="i"
              >
                <v-list-item-icon>
                  <v-tooltip v-if="list.completion === true" top>
                    <template v-slot:activator="{ on }">
                      <v-btn small icon to="/completion" v-on="on">
                        <v-icon>
                          mdi-check
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Completion</span>
                  </v-tooltip>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <nuxt-link :to="`/lists/${list.hashid}`">
                      {{ list.title }}
                    </nuxt-link>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon
                    color="grey lighten-1"
                    @click.stop="getListInfo(list)"
                  >
                    mdi-pencil
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <div>
              <v-dialog v-model="newDialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn depressed color="primary" v-on="on">
                    New List
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">New List</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-alert
                            v-if="dialogError"
                            class="mt-2"
                            dense
                            type="error"
                            transition="scale-transition"
                            dismissible
                          >
                            {{ dialogError }}
                          </v-alert>
                          <v-text-field
                            v-model="newTitle"
                            label="Title"
                            required
                            :error-messages="newTitleErrors"
                            @input="$v.newTitle.$touch()"
                            @blur="$v.newTitle.$touch()"
                          />
                          <v-checkbox v-model="isCompletion" :disabled="noCompletion" label="Completion checklist" />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn text @click="closeDialog">
                      Close
                    </v-btn>
                    <v-btn color="success" text :loading="processing" @click="createList">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
            <v-dialog v-model="editDialog" persistent max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="headline">Edit List</span>
                  <v-spacer />
                  <div v-if="confirm === false" class="d-flex justify-right">
                    <v-btn icon color="error" @click="confirm = !confirm">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                  <div v-else class="d-flex justify-right">
                    Are you sure? <v-btn text color="error" :loading="processing" @click="deleteList">
                      Delete
                    </v-btn> <v-btn text @click="confirm = !confirm">
                      Cancel
                    </v-btn>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-alert
                          v-if="dialogError"
                          class="mt-2"
                          dense
                          type="error"
                          transition="scale-transition"
                          dismissible
                        >
                          {{ dialogError }}
                        </v-alert>
                        <v-text-field
                          v-model="editTitle.title"
                          label="Title"
                          required
                          :error-messages="editTitleErrors"
                          @input="$v.editTitle.$touch()"
                          @blur="$v.editTitle.$touch()"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn text @click="closeDialog">
                    Close
                  </v-btn>
                  <v-btn color="success" text :loading="processing" @click="editList">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </section>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
export default {
  name: 'MyLists',
  middleware: 'auth',
  mixins: [validationMixin],
  validations: {
    newTitle: { required },
    editTitle: { required },
  },
  data: () => ({
    newDialog: false,
    editDialog: false,
    newTitle: null,
    editTitle: {},
    error: null,
    dialogError: null,
    message: null,
    processing: false,
    confirm: false,
    isCompletion: false,
  }),
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.loggedIn;
    },
    loggedInUser () {
      return this.$store.state.auth.user;
    },
    lists () {
      return this.$store.state.auth.user.lists;
    },
    noCompletion () {
      if (this.lists.filter(c => c.completion === true)) {
        return true;
      } else {
        return false;
      }
    },
    newTitleErrors () {
      const errors = [];
      if (!this.$v.newTitle.$dirty) { return errors; }
      !this.$v.newTitle.required && errors.push('Title is required.');
      return errors;
    },
    editTitleErrors () {
      const errors = [];
      if (!this.$v.editTitle.$dirty) { return errors; }
      !this.$v.editTitle.required && errors.push('Title is required.');
      return errors;
    },
  },
  mounted () {
  },
  methods: {
    closeDialog () {
      this.newDialog = false;
      this.editDialog = false;
      this.newTitle = null;
      this.editTitle = {};
      this.dialogError = null;
    },
    getListInfo (list) {
      this.editTitle = { ...list };
      this.editDialog = true;
    },
    async createList () {
      try {
        this.processing = true;
        await this.$axios.post('/user/lists', { title: this.newTitle, completion: this.isCompletion });
        await this.$auth.fetchUser();
        this.processing = false;
        this.message = 'List created!';
        this.newTitle = null;
        this.newDialog = false;
      } catch (err) {
        this.processing = false;
        this.dialogError = 'Could not create list.';
      }
    },
    async editList () {
      try {
        this.processing = true;
        await this.$axios.patch(`/user/lists/${this.editTitle.id}`, { title: this.editTitle.title });
        await this.$auth.fetchUser();
        this.processing = false;
        this.message = 'List edited!';
        this.editTitle = {};
        this.editDialog = false;
      } catch (err) {
        this.processing = false;
        this.dialogError = 'Could not edit list.';
      }
    },
    async deleteList () {
      try {
        this.processing = true;
        await this.$axios.delete(`/user/lists/${this.editTitle.id}`);
        await this.$auth.fetchUser();
        this.processing = false;
        this.message = 'List deleted!';
        this.editTitle = {};
        this.editDialog = false;
      } catch (err) {
        this.processing = false;
        this.dialogError = 'Could not delete list.';
      }
    },
  },
  head () {
    return { title: 'My Lists' };
  },
};
</script>
