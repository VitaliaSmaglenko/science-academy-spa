<template>
  <ContentWrapper title="Лист запланованих робіт" :buttons="[{ route: 'CompletedWorksList', text: 'Список виконанних робіт'}]">
    <v-data-table
      :items="plannedWorks"
      :headers="headers"
      locale="ru-RU"
      :loading="loading"
      loading-text="Завантаження..."
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.id }}</td>
          <td class="text-start">{{ item.work.name }}</td>
          <td class="text-start">{{ item.quantity }}</td>
          <td class="text-start">{{ item.number_of_hours }}</td>
          <td class="text-start">{{ item.season }}</td>
          <td class="text-start">
            {{ item.created_at ? new Date(item.created_at).toISOString().substring(0, 10) : '' }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </ContentWrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ContentWrapper from '../../components/Layout/Management/ContentWrapper'

export default {
  name: 'PlannedWorksForUser',
  components: { ContentWrapper },
  data () {
    return {
      loading: true,
      headers: [
        { text: 'Id', class: 'table-header left', value: 'id' },
        { text: 'Вид роботи', class: 'table-header left', value: 'work.name' },
        { text: 'Кількість', class: 'table-header left', value: 'quantity' },
        { text: 'Кількість годин', class: 'table-header left', value: 'number_of_hours' },
        { text: 'Осінь/Весна', class: 'table-header left', value: 'season' },
        { text: 'Дата створення', class: 'table-header left', value: 'created_at' },
        { text: '', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState('plannedWorks', {
      plannedWorks: state => state.plannedWorks
    })
  },
  async created () {
    await this.fetchPlannedWorksForUser()
    this.loading = false
  },
  methods: {
    ...mapActions('plannedWorks', [
      'fetchPlannedWorksForUser'
    ])
  }
}
</script>

<style scoped>

</style>
