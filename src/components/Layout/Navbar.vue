<template>
  <div class="navbar">
    <router-link class="logo" :to="{ name: 'Dashboard' }">
      <img alt="УIПА" :src="Logo">
    </router-link>
    <AccountMenu></AccountMenu>
  </div>
</template>

<script>
import AccountMenu from './AccountMenu'
import Logo from './../../assets/Logo.png'

export default {
  name: 'Navbar',
  components: { AccountMenu },
  data () {
    return {
      Logo
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    justify-content: space-around;
    height: 80px;
    background-color: #fff;
  }

  .logo {
    margin: 10px;
    height: 60px;
    width: 60px;

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
