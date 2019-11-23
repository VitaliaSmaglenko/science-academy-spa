<template>
  <v-card>
    <v-card-title primary-title>
      <p class="mx-auto blue--text headline">
        Додання наукового профілю
      </p>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <BlockWIthError :errors="errors.title ? errors.title : []">
          <v-text-field
            v-model="form.title"
            label="Назва"
            type="text"
          ></v-text-field>
        </BlockWIthError>
        <BlockWIthError :errors="errors.profile_link ? errors.profile_link : []">
          <v-text-field
            v-model="form.profile_link"
            label="Посилання на профіль"
            type="text"
          ></v-text-field>
        </BlockWIthError>
        <BlockWIthError :errors="errors.number_of_publication ? errors.number_of_publication : []">
          <v-text-field
            v-model="form.number_of_publication"
            label="Кількість публікацій"
            type="text"
          ></v-text-field>
        </BlockWIthError>
        <BlockWIthError :errors="errors.index ? errors.index : []">
          <v-text-field
            v-model="form.index"
            label="Індекс"
            type="text"
          ></v-text-field>
        </BlockWIthError>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="manage-controls">
      <v-btn color="#983620" @click="reset">Скасувати</v-btn>
      <v-btn color="#983620" @click="send">Оновити</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import BlockWIthError from '../../components/UI/BlockWIthError'

export default {
  name: 'AddScienceProfileDialog',
  components: { BlockWIthError },
  props: {
    value: {
      type: Boolean,
      require: true
    },
    id: {
      require: true
    }
  },
  data () {
    return {
      profile: {},
      form: {
        title: '',
        profile_link: '',
        number_of_publication: '',
        index: ''
      },
      errors: {}
    }
  },
  watch: {
    value: {
      async handler (value) {
        if (value) {
          this.profile = await this.getScienceProfile(this.id)
          this.fillForm()
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('scienceProfiles', [
      'getScienceProfile',
      'fetchScienceProfilesForUser',
      'updateScienceProfile'
    ]),
    fillForm () {
      this.form.title = this.profile.title
      this.form.profile_link = this.profile.profile_link
      this.form.number_of_publication = this.profile.number_of_publication
      this.form.index = this.profile.index
    },
    reset () {
      this.form = {}
      this.$emit('cancel')
    },
    async send () {
      this.errors = await this.updateScienceProfile({ id: this.id, data: this.form })
      if (!this.errors.length) {
        this.form = {}
        this.fetchScienceProfilesForUser()
        this.$emit('done')
      }
    }
  }
}
</script>
