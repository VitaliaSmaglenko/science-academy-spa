<template>
  <v-card>
    <v-card-title primary-title>
      <p class="mx-auto blue--text headline">
        Додання наукового профілю
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
      <v-btn color="#983620" @click="send">Оновити</v-btn>
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
  name: 'EditPlannedWorkDialog',
  components: { BlockWIthError },
  props: {
    value: {
      type: Boolean,
      require: true
    },
    id: {
      require: true
    },
    userId: {
      require: true
    }
  },
  data () {
    return {
      SEASONS,
      TYPES,
      plannedWork: {},
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
  watch: {
    value: {
      async handler (value) {
        if (value) {
          this.plannedWork = await this.getPlannedWork(this.id)
          this.fillForm()
        }
      },
      immediate: true
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
      'getPlannedWork',
      'fetchPlannedWorksByUser',
      'updatePlannedWork'
    ]),
    fillForm () {
      this.workType = this.plannedWork.work.type
      this.form.work_id = this.plannedWork.work.id
      this.form.quantity = this.plannedWork.quantity
      this.form.number_of_hours = this.plannedWork.number_of_hours
      this.form.season = this.plannedWork.season
    },
    reset () {
      this.form = {}
      this.$emit('cancel')
    },
    async send () {
      this.form.work_id = this.form.work_id.toString()
      this.form.quantity = this.form.quantity.toString()
      this.form.number_of_hours = this.form.number_of_hours.toString()
      this.errors = await this.updatePlannedWork({ id: this.id, data: this.form })
      if (!this.errors.length) {
        this.form = {}
        this.fetchPlannedWorksByUser(this.userId)
        this.$emit('done')
      }
    }
  }
}
</script>
