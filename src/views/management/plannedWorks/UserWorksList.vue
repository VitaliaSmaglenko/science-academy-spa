<template>
  <ContentWrapper title="Лист викладачів на кафедрі">
    <template v-slot:actions>
      <v-btn v-if="iAmAdmin" @click="selectDepartmentDialog = true" color="#983620">Обрати кафедру</v-btn>
    </template>
    <v-data-table
      :items="filteredUsers"
      :headers="headers"
      locale="ru-RU"
      :loading="loading"
      :no-data-text="`${department.department} не має викладачів`"
      loading-text="Завантаження..."
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.id }}</td>
          <td class="text-start">{{ item.email }}</td>
          <td class="text-start">{{ item.science_degree }}</td>
          <td class="text-start">{{ item.academic_rank }}</td>
          <td class="text-start">
            {{ item.created_at ? new Date(item.created_at).toISOString().substring(0, 10) : '' }}
          </td>
          <td class="text-start">
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on }">
                <v-btn class="ma-2" v-on="on" icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
              </template>
              <v-list>
                <v-list-item class="action" :to="{ name: 'UserCompletedWorks', params: { id: item.id } }">
                  <v-list-item-title class="action-item">
                    Виконанні роботи
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="action" :to="{ name: 'UserPlannedWorks', params: { id: item.id } }">
                  <v-list-item-title class="action-item">
                    Планові роботи
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
      v-model="selectDepartmentDialog"
      scrollable
      max-width="700px"
    >
      <SelectDepartmentDialog
        v-on:cancel="selectDepartmentDialog = false"
        v-on:done="selectDepartmentDialog = false"
      />
    </v-dialog>
  </ContentWrapper>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import ContentWrapper from '../../../components/Layout/Management/ContentWrapper'
import constants from './../../../constants'
import SelectDepartmentDialog from '../../../components/Dialogs/PlannedWork/SelectDepartmentDialog'

const {
  ROLE_TEACHER
} = constants.roles

export default {
  name: 'UserWorksList',
  components: { ContentWrapper, SelectDepartmentDialog },
  data () {
    return {
      selectDepartmentDialog: false,
      ROLE_TEACHER,
      loading: true,
      headers: [
        { text: 'Id', class: 'table-header left', value: 'id' },
        { text: 'E-Mail', class: 'table-header left', value: 'email' },
        { text: 'Науковий рівень', class: 'table-header left', value: 'science_degree' },
        { text: 'Академічний рівень', class: 'table-header left', value: 'academic_rank' },
        { text: 'Дата регістрації', class: 'table-header left', value: 'created_at' },
        { text: '', sortable: false }
      ]
    }
  },
  watch: {
    department: {
      async handle (department) {
        this.loading = true
        await this.fetchUsersByDepartment(department.id)
        this.loading = false
      },
      deep: true
    }
  },
  computed: {
    ...mapState('auth', {
      department: state => state.department
    }),
    ...mapState('users', {
      users: state => state.users
    }),
    ...mapGetters('auth', [
      'iAmAdmin'
    ]),
    filteredUsers () {
      return this.users.filter(u => u.roles.some(r => r.name === ROLE_TEACHER.value))
    }
  },
  async created () {
    await this.fetchUsersByDepartment(this.department.id)
    this.loading = false
  },
  methods: {
    ...mapActions('users', [
      'fetchUsersByDepartment'
    ])
  }
}
</script>
