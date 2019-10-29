<template>
  <div class="content">
    <div class="manage-header">
      <div class="manage-title">
        {{ title }}
        <div class="manage-underline"></div>
      </div>
      <div class="manage-header-controls">
        <v-btn :to="{ name: actionRoute }" color="#983620">{{ actionText }}</v-btn>
      </div>
    </div>
    <div class="manage-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentWrapper',
  props: {
    title: {
      type: String
    },
    actionRoute: {
      type: String
    },
    actionText: {
      type: String
    }
  }
}
</script>
