<template>
  <div class="content">
    <div class="manage-header">
      <div class="manage-title">
        {{ title }}
        <div class="manage-underline"></div>
      </div>
      <div class="manage-header-controls">
        <slot name="actions">
          <v-btn v-for="(btn, index) in buttons" :key="index" :to="{ name: btn.route }" color="#983620">{{ btn.text }}</v-btn>
        </slot>
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
    buttons: {
      type: Array
    }
  }
}
</script>
