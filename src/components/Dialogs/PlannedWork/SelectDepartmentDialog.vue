<template>
  <v-card>
    <v-card-title primary-title>
      <p class="mx-auto blue--text headline">
        Додання планової роботи
      </p>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-select
          v-model="department"
          :items="departments"
          item-text="department"
          item-value="id"
          label="Кафедра"
        ></v-select>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="manage-controls">
      <v-btn color="#983620" @click="cancel">Скасувати</v-btn>
      <v-btn :disable="!department" color="#983620" @click="select">Обрати</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SelectDepartmentDialog',
  userId: {
    require: true
  },
  data () {
    return {
      department: {},
      errors: {}
    }
  },
  computed: {
    ...mapState('departments', {
      departments: state => state.departments
    })
  },
  async created () {
    await this.fetchDepartments()
  },
  methods: {
    ...mapActions('departments', [
      'fetchDepartments'
    ]),
    ...mapActions('auth', [
      'selectDepartment'
    ]),
    cancel () {
      this.$emit('cancel')
    },
    async select () {
      if (!this.department) return
      await this.selectDepartment(this.departments.find(d => d.id === this.department))
      this.$emit('done')
    }
  }
}
</script>
