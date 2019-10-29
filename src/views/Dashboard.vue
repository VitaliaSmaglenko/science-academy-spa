<template>
  <div class="dashboard">
    <Navbar></Navbar>
    <div class="main-container">
      <div class="main-content">
        <router-view></router-view>
      </div>
      <div class="footer">
        Українська інженерно-педагогічна академія
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Layout/Navbar'

export default {
  name: 'Dashboard',
  components: { Navbar }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    height: 100vh;
    overflow-y: hidden;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    height: calc(100% - 80px);
    overflow-y: auto;
  }
  .main-content {
    flex: 1 1 auto;
    margin: 50px 100px 0 100px;
    background-color: #fff;
  }
  .footer {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    height: 40px;
    background-color: #983620;
    color: #fff;
  }
</style>
