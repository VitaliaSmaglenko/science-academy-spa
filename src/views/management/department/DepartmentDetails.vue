<template>
  <ContentWrapper title="Дані кафедри" :buttons="[{ route: 'DepartmentList', text: 'Список кафедр'}]">
    <KeyValueList :items="info"></KeyValueList>
    <div>
      <div class="users-list-top">
        <div class="users-list-title">
          Список користувачів
        </div>
        <div class="users-list-action">
          <v-btn @click="addUserDialog = true" color="#983620">Додати користувача</v-btn>
        </div>
      </div>
      <v-data-table
        :items="department.users"
        :headers="headers"
        locale="ru-RU"
        class="users-list"
        :loading="loading"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-start">{{ item.id }}</td>
            <td class="text-start">{{ item.name }}</td>
            <td class="text-start">{{ item.surname }}</td>
            <td class="text-start">{{ item.email }}</td>
            <td class="text-start">
              <v-menu bottom offset-y v-if="item.id !== user.id">
                <template v-slot:activator="{ on }">
                  <v-btn class="ma-2" v-on="on" icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                </template>
                <v-list>
                  <v-list-item class="action" @click="detachUser(item.id)">
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
    </div>
    <v-dialog v-model="addUserDialog" max-width="700px">
      <v-card>
        <v-card-title primary-title>
          Додади користувача до кафедри
        </v-card-title>
        <v-card-text>
          <template v-if="availableUsers.length">
            <v-select
              v-model="targetUser"
              :items="availableUsers"
              label="Користувач"
              item-value="id"
              item-text="email"
            ></v-select>
            <v-select
              v-model="position"
              :items="DEPARTMENT_POSITIONS"
              label="Посада"
            ></v-select>
          </template>
          <div v-else>
            Нема доступних користувачів
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="dialog-actions">
          <v-btn class="btn-empty" @click.stop="addUserDialog = false">Скасувати</v-btn>
          <v-btn class="btn-main" :disabled="!targetUser || !position" @click="attachUser" color="#983620">Додати</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </ContentWrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ContentWrapper from '../../../components/Layout/Management/ContentWrapper'
import KeyValueList from '../../../components/UI/KeyValueList'
import constants from './../../../constants'

const {
  DEPARTMENT_POSITIONS
} = constants.departments

export default {
  name: 'DepartmentDetails',
  components: { KeyValueList, ContentWrapper },
  data () {
    return {
      DEPARTMENT_POSITIONS,
      addUserDialog: false,
      position: null,
      targetUser: null,
      loading: true,
      department: {},
      headers: [
        { text: 'Id', class: 'table-header left', value: 'id' },
        { text: 'Ім\'я', class: 'table-header left', value: 'name' },
        { text: 'Прізвище', class: 'table-header left', value: 'surname' },
        { text: 'Email', class: 'table-header left', value: 'email' },
        { text: '', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState('auth', {
      user: state => state.user
    }),
    ...mapState('users', {
      users: state => state.users
    }),
    info () {
      return [
        { key: 'department', title: 'Назва', value: this.department.department },
        { key: 'city', title: 'Місто', value: this.department.city }
      ]
    },
    availableUsers () {
      return this.users.filter(u => u.id !== this.user.id && !this.department.users.find(du => du.id === u.id))
    }
  },
  async created () {
    const id = this.$route.params.id
    this.department = await this.getDepartment(id)
    await this.fetchUsers()
    this.loading = false
  },
  methods: {
    ...mapActions('departments', [
      'getDepartment',
      'removeUser',
      'addUser'
    ]),
    ...mapActions('users', [
      'fetchUsers'
    ]),
    async attachUser () {
      this.department = await this.addUser({ id: this.department.id, userId: this.targetUser, position: this.position })
      this.addUserDialog = false
      this.targetUser = null
      this.position = null
      await this.fetchUsers()
    },
    async detachUser (id) {
      await this.removeUser({ id: this.department.id, userId: id })
      this.department = await this.getDepartment(this.department.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .users-list-top {
    display: flex;
    justify-content: space-between;
  }
  .users-list-title {
    font-size: 20px;
  }
</style>

<style lang="scss">
  .users-list-action {
    .v-btn__content {
      color: #fff;
      text-transform: capitalize;
    }
  }
</style>
