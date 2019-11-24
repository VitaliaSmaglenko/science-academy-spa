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
      <v-btn color="#983620" @click="send">Створити</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import BlockWIthError from '../../UI/BlockWIthError'

export default {
  name: 'AddScienceProfileDialog',
  components: { BlockWIthError },
  data () {
    return {
      form: {
        title: '',
        profile_link: '',
        number_of_publication: '',
        index: ''
      },
      errors: {}
    }
  },
  methods: {
    ...mapActions('scienceProfiles', [
      'fetchScienceProfilesForUser',
      'addScienceProfile'
    ]),
    reset () {
      this.$refs.form.reset()
      this.$emit('cancel')
    },
    async send () {
      this.errors = await this.addScienceProfile(this.form)
      if (!this.errors.length) {
        this.$refs.form.reset()
        this.fetchScienceProfilesForUser()
        this.$emit('done')
      }
    }
  }
}
</script>
