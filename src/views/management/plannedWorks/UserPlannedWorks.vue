<template>
  <ContentWrapper title="Лист викладачів на кафедрі">
    <template v-slot:actions>
      <v-btn @click="addPlannedWork" color="#983620">Додати план</v-btn>
    </template>
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
          <td class="text-start">
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on }">
                <v-btn class="ma-2" v-on="on" icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
              </template>
              <v-list>
                <v-list-item class="action" @click="editPlannedWork(item.id)">
                  <v-list-item-title class="action-item">
                    Редагування
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="action" @click="removePlannedWork(item.id)">
                  <v-list-item-title class="action-item">
                    Видалити
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
      v-model="addPlannedWorkDialog"
      scrollable
      max-width="700px"
    >
      <AddPlannedWorkDialog
        :user-id="userId"
        v-on:cancel="addPlannedWorkDialog = false"
        v-on:done="addPlannedWorkDialog = false"
      />
    </v-dialog>
    <v-dialog
      v-model="editPlannedWorkDialog"
      scrollable
      max-width="700px"
    >
      <EditPlannedWorkDialog
        :value="editPlannedWorkDialog"
        :user-id="userId"
        :id="targetId"
        v-on:cancel="editPlannedWorkDialog = false"
        v-on:done="editPlannedWorkDialog = false"
      />
    </v-dialog>
  </ContentWrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ContentWrapper from '../../../components/Layout/Management/ContentWrapper'
import EditPlannedWorkDialog from '../../../components/Dialogs/PlannedWork/EditPlannedWorkDialog'
import AddPlannedWorkDialog from '../../../components/Dialogs/PlannedWork/AddPlannedWorkDialog'

export default {
  name: 'UserPlannedWorks',
  components: { AddPlannedWorkDialog, EditPlannedWorkDialog, ContentWrapper },
  data () {
    return {
      userId: null,
      targetId: null,
      addPlannedWorkDialog: false,
      editPlannedWorkDialog: false,
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
    this.userId = this.$route.params.id
    await this.fetchPlannedWorksByUser(this.userId)
    this.loading = false
  },
  methods: {
    ...mapActions('plannedWorks', [
      'fetchPlannedWorksByUser',
      'deletePlannedWork'
    ]),
    addPlannedWork () {
      this.addPlannedWorkDialog = true
    },
    editPlannedWork (id) {
      this.targetId = id
      this.editPlannedWorkDialog = true
    },
    async removePlannedWork (id) {
      await this.deletePlannedWork(id)
      this.loading = true
      await this.fetchPlannedWorksByUser(this.userId)
      this.loading = false
    }
  }
}
</script>
