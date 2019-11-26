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
          v-model="workType"
          :items="TYPES"
          label="Категорія роботи"
          @change="() => {form.work_id = null}"
        ></v-select>
        <BlockWIthError :errors="errors.work_id ? errors.work_id : []">
          <v-select
            v-model="form.work_id"
            :items="filteredWorks"
            item-text="name"
            item-value="id"
            no-data-text="Спочатку оберіть категорію"
            label="Вид роботи"
          ></v-select>
        </BlockWIthError>
        <BlockWIthError :errors="errors.quantity ? errors.quantity : []">
          <v-text-field
            v-model="form.quantity"
            label="Кількість"
            type="text"
          ></v-text-field>
        </BlockWIthError>
        <BlockWIthError :errors="errors.number_of_hours ? errors.number_of_hours : []">
          <v-text-field
            v-model="form.number_of_hours"
            label="Кількість годин"
            type="text"
          ></v-text-field>
        </BlockWIthError>
        <BlockWIthError :errors="errors.season ? errors.season : []">
          <v-select
            v-model="form.season"
            :items="SEASONS"
            label="Осінь/Весна"
          ></v-select>
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
import { mapActions, mapState } from 'vuex'
import BlockWIthError from '../../UI/BlockWIthError'
import constants from '../../../constants'

const {
  SEASONS,
  TYPES
} = constants.works

export default {
  name: 'AddPlannedWorkDialog',
  components: { BlockWIthError },
  props: {
    userId: {
      require: true
    }
  },
  data () {
    return {
      SEASONS,
      TYPES,
      workType: null,
      form: {
        work_id: '',
        quantity: 0,
        number_of_hours: '',
        season: ''
      },
      errors: {}
    }
  },
  computed: {
    ...mapState('works', {
      works: state => state.works
    }),
    filteredWorks () {
      if (!this.workType) return []
      return this.works.filter(w => w.type === this.workType)
    }
  },
  async created () {
    await this.fetchWorks()
  },
  methods: {
    ...mapActions('works', [
      'fetchWorks'
    ]),
    ...mapActions('plannedWorks', [
      'fetchPlannedWorksByUser',
      'addPlannedWork'
    ]),
    reset () {
      this.$refs.form.reset()
      this.$emit('cancel')
    },
    async send () {
      this.form.work_id = this.form.work_id.toString()
      this.form.quantity = this.form.quantity.toString()
      this.form.number_of_hours = this.form.number_of_hours.toString()
      this.form.user_id = this.userId
      this.errors = await this.addPlannedWork(this.form)
      if (!this.errors.length) {
        this.$refs.form.reset()
        this.fetchPlannedWorksByUser(this.userId)
        this.$emit('done')
      }
    }
  }
}
</script>
