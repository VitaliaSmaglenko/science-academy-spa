<template>
  <ContentWrapper title="Лист користувачів" :buttons="[{ route: 'UserCreate', text: 'Створити'}]">
    <v-data-table
      :items="filteredUsers"
      :headers="headers"
      locale="ru-RU"
      :loading="loading"
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
            <v-menu v-if="user.id !== item.id" bottom offset-y>
              <template v-slot:activator="{ on }">
                <v-btn class="ma-2" v-on="on" icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
              </template>
              <v-list>
                <v-list-item class="action" :to="{ name: 'UserDetails', params: { id: item.id } }">
                  <v-list-item-title class="action-item">
                    Детальніше
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="action" :to="{ name: 'UserUpdate', params: { id: item.id } }">
                  <v-list-item-title class="action-item">
                    Редагування
                  </v-list-item-title>
                </v-list-item>
                <v-list-item v-if="!isAdmin(item)" class="action" @click="removeUser(item.id)">
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
  </ContentWrapper>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import ContentWrapper from '../../../components/Layout/Management/ContentWrapper'
import constants from './../../../constants'

const {
  ROLE_ADMIN
} = constants.roles

export default {
  name: 'UserList',
  components: { ContentWrapper },
  data () {
    return {
      ROLE_ADMIN,
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
  async created () {
    await this.fetchUsers()
    this.loading = false
  },
  computed: {
    ...mapState('auth', {
      user: state => state.user,
      department: state => state.department
    }),
    ...mapState('users', {
      users: state => state.users
    }),
    ...mapGetters('auth', [
      'iAmAdmin'
    ]),
    filteredUsers () {
      if (this.iAmAdmin) return this.users
      return this.users.filter(u => u.departments.some(d => d.name === this.department.name))
    }
  },
  methods: {
    ...mapActions('users', [
      'fetchUsers',
      'deleteUser',
      'isAdmin'
    ]),
    async removeUser (id) {
      await this.deleteUser(id)
      this.loading = true
      await this.fetchUsers()
      this.loading = false
    }
  }
}
</script>
