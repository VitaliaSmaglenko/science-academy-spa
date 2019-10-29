<template>
  <div class="block-with-error">
    <slot></slot>
    <div v-if="errors" class="error">
      <div v-for="(error, index) in errors" :key="index">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockWIthError',
  props: {
    errors: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .block-with-error {

  }
  .error {
    color: red;
  }
</style>
