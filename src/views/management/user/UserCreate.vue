<template>
  <ContentWrapper title="Створення користувача" action-route="UserList" action-text="Список користувачів">
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
      <BlockWIthError :errors="errors.password ? errors.password : []">
        <v-text-field
          v-model="form.password"
          label="Пароль"
          type="text"
        ></v-text-field>
      </BlockWIthError>
      <BlockWIthError :errors="errors.department_id ? errors.department_id : []">
        <v-select
          class="manage-select"
          v-model="form.department_id"
          :items="departments"
          item-text="department"
          item-value="id"
          label="Кафедра"
        ></v-select>
      </BlockWIthError>
      <BlockWIthError :errors="errors.position ? errors.position : []">
        <v-select
          class="manage-select"
          v-model="form.position"
          :items="DEPARTMENT_POSITIONS"
          label="Посада"
        ></v-select>
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
      <BlockWIthError :errors="errors.role_id ? errors.role_id : []">
        <v-select
          class="manage-select"
          v-model="form.role_id"
          :items="MAP_ROLE_PERMISSIONS[getHighestRole]"
          item-text="text"
          item-value="id"
          label="Роль"
        ></v-select>
      </BlockWIthError>
      <div class="manage-controls">
        <v-btn color="#983620" @click="reset">Скасувати</v-btn>
        <v-btn color="#983620" @click="send">Створити</v-btn>
      </div>
    </v-form>
  </ContentWrapper>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import constants from '../../../constants'
import ContentWrapper from '../../../components/Layout/Management/ContentWrapper'
import BlockWIthError from '../../../components/UI/BlockWIthError'

const {
  SCIENCE_RANKS,
  ACADEMY_RANKS
} = constants.user

const {
  MAP_ROLE_PERMISSIONS
} = constants.roles

const {
  DEPARTMENT_POSITIONS
} = constants.departments

export default {
  name: 'UserCreate',
  components: { ContentWrapper, BlockWIthError },
  data () {
    return {
      SCIENCE_RANKS,
      ACADEMY_RANKS,
      MAP_ROLE_PERMISSIONS,
      DEPARTMENT_POSITIONS,
      form: {
        name: '',
        surname: '',
        patronymic: '',
        email: '',
        password: '',
        academic_rank: '',
        science_degree: '',
        department_id: '',
        position: '',
        role_id: ''
      },
      errors: {}
    }
  },
  computed: {
    ...mapState('auth', {
      user: state => state.user
    }),
    ...mapState('departments', {
      departments: state => state.departments
    }),
    ...mapGetters('auth', [
      'getHighestRole'
    ])
  },
  async created () {
    await this.fetchDepartments()
  },
  methods: {
    ...mapActions('users', [
      'createUser'
    ]),
    ...mapActions('departments', [
      'fetchDepartments'
    ]),
    reset () {
      this.$refs.form.reset()
    },
    async send () {
      this.errors = await this.createUser(this.form)
    }
  }
}
</script>

<style lang="scss">
  .manage-select {
    .v-menu__content {
      top: 0 !important;
      left: 0 !important;
    }
  }
</style>
