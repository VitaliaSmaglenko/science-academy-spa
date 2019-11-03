<template>
  <ContentWrapper title="Редагування користувача" action-route="UserList" action-text="Список користувачів">
    <v-form ref="form" class="manage-form">
      <BlockWIthError :errors="errors.name ? errors.name : []">
        <v-text-field
          v-model="form.name"
          label="Ім'я"
          type="text"
        ></v-text-field>
      </BlockWIthError>
      <BlockWIthError :errors="errors.surname ? errors.surname : []">
        <v-text-field
          v-model="form.surname"
          label="Прізвище"
          type="text"
        ></v-text-field>
      </BlockWIthError>
      <BlockWIthError :errors="errors.patronymic ? errors.patronymic : []">
        <v-text-field
          v-model="form.patronymic"
          label="По-батькові"
          type="text"
        ></v-text-field>
      </BlockWIthError>
      <BlockWIthError :errors="errors.email ? errors.email : []">
        <v-text-field
          v-model="form.email"
          label="E-mail"
          type="text"
        ></v-text-field>
      </BlockWIthError>
      <BlockWIthError :errors="errors.science_degree ? errors.science_degree : []">
        <v-select
          class="manage-select"
          v-model="form.science_degree"
          :items="SCIENCE_RANKS"
          label="Науковий рівень"
        ></v-select>
      </BlockWIthError>
      <BlockWIthError :errors="errors.academic_rank ? errors.academic_rank : []">
        <v-select
          class="manage-select"
          v-model="form.academic_rank"
          :items="ACADEMY_RANKS"
          label="Академічний рівень"
        ></v-select>
      </BlockWIthError>
      <div class="manage-controls">
        <v-btn color="#983620" @click="reset">Скасувати</v-btn>
        <v-btn color="#983620" @click="send">Оновити</v-btn>
      </div>
    </v-form>
  </ContentWrapper>
</template>

<script>
import { mapActions } from 'vuex'
import constants from '../../../constants'
import BlockWIthError from '../../../components/UI/BlockWIthError'
import ContentWrapper from '../../../components/Layout/Management/ContentWrapper'

const {
  SCIENCE_RANKS,
  ACADEMY_RANKS
} = constants.user

export default {
  name: 'UserUpdate',
  components: { ContentWrapper, BlockWIthError },
  data () {
    return {
      SCIENCE_RANKS,
      ACADEMY_RANKS,
      user: {},
      form: {
        name: '',
        surname: '',
        patronymic: '',
        email: '',
        academic_rank: '',
        science_degree: ''
      },
      errors: []
    }
  },
  async created () {
    const id = this.$route.params.id
    this.user = await this.getUser(id)
    this.reset()
  },
  methods: {
    ...mapActions('users', [
      'getUser',
      'updateUser'
    ]),
    reset () {
      this.form.name = this.user.name
      this.form.surname = this.user.surname
      this.form.patronymic = this.user.patronymic
      this.form.email = this.user.email
      this.form.academic_rank = this.user.academic_rank
      this.form.science_degree = this.user.science_degree
    },
    async send () {
      this.errors = await this.updateUser({ id: this.user.id, data: this.form })
    }
  }
}
</script>

<style scoped>

</style>
