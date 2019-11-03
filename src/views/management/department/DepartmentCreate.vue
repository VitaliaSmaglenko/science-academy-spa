<template>
  <ContentWrapper title="Створення кафедри" action-route="DepartmentList" action-text="Список кафедр">
    <v-form ref="form" class="manage-form">
      <BlockWIthError :errors="errors.department ? errors.department : []">
        <v-text-field
          v-model="form.department"
          label="Назва"
          type="text"
        ></v-text-field>
      </BlockWIthError>
      <BlockWIthError :errors="errors.city ? errors.city : []">
        <v-select
          class="manage-select"
          v-model="form.city"
          :items="DEPARTMENT_CITIES"
          label="Місто"
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
import { mapActions } from 'vuex'
import constants from '../../../constants'
import ContentWrapper from '../../../components/Layout/Management/ContentWrapper'
import BlockWIthError from '../../../components/UI/BlockWIthError'

const {
  DEPARTMENT_CITIES
} = constants.departments

export default {
  name: 'DepartmentCreate',
  components: { ContentWrapper, BlockWIthError },
  data () {
    return {
      DEPARTMENT_CITIES,
      form: {
        department: '',
        city: ''
      },
      errors: {}
    }
  },
  methods: {
    ...mapActions('departments', [
      'createDepartment'
    ]),
    reset () {
      this.$refs.form.reset()
    },
    async send () {
      this.errors = await this.createDepartment(this.form)
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
