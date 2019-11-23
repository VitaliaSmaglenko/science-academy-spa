<template>
  <ContentWrapper title="Заповнення роботи" :buttons="[{ route: 'CompletedWorksList', text: 'Список виконанних робіт'}]">
    <v-form ref="form" class="manage-form">
      <v-select
        class="manage-select"
        v-model="workType"
        :items="TYPES"
        label="Категорія роботи"
        @change="() => {form.work_id = null}"
      ></v-select>
      <BlockWIthError :errors="errors.work_id ? errors.work_id : []">
        <v-select
          class="manage-select"
          v-model="form.work_id"
          :items="filteredWorks"
          item-text="name"
          item-value="id"
          no-data-text="Спочатку оберіть категорію"
          label="Вид роботи"
        ></v-select>
      </BlockWIthError>
      <BlockWIthError :errors="errors.title ? errors.title : []">
        <v-text-field
          v-model="form.title"
          label="Назва"
          type="text"
        >
          <template v-slot:append-outer>
            <v-icon color="#983620" v-if="selectedWork" :title="selectedWork.title">mdi-alert-circle-outline</v-icon>
          </template>
        </v-text-field>
      </BlockWIthError>
      <BlockWIthError :errors="errors.reference ? errors.reference : []">
        <v-text-field
          v-model="form.reference"
          label="Посилання"
          type="text"
        >
          <template v-slot:append-outer>
            <v-icon color="#983620" v-if="selectedWork" :title="selectedWork.reference">mdi-alert-circle-outline</v-icon>
          </template>
        </v-text-field>
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
          class="manage-select"
          v-model="form.season"
          :items="SEASONS"
          label="Осінь/Весна"
        ></v-select>
      </BlockWIthError>
      <div class="manage-controls">
        <v-btn color="#983620" @click="reset">Скасувати</v-btn>
        <v-btn color="#983620" @click="send">Додати</v-btn>
      </div>
    </v-form>
  </ContentWrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import constants from '../../constants'
import ContentWrapper from '../../components/Layout/Management/ContentWrapper'
import BlockWIthError from '../../components/UI/BlockWIthError'

const {
  SEASONS,
  TYPES
} = constants.works

export default {
  name: 'CompletedWorkAdd',
  components: { ContentWrapper, BlockWIthError },
  data () {
    return {
      SEASONS,
      TYPES,
      workType: null,
      form: {
        work_id: null,
        title: null,
        reference: null,
        number_of_hours: null,
        season: null
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
    },
    selectedWork () {
      if (!this.form.work_id || !this.workType) return null
      return this.works.find(w => w.id === this.form.work_id)
    }
  },
  async created () {
    await this.fetchWorks()
  },
  methods: {
    ...mapActions('works', [
      'fetchWorks'
    ]),
    ...mapActions('completedWorks', [
      'addCompletedWork'
    ]),
    reset () {
      this.$refs.form.reset()
    },
    async send () {
      this.errors = await this.addCompletedWork(this.form)
    }
  }
}
</script>
