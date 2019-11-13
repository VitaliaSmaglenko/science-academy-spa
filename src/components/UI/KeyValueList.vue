<template>
  <div class="details-info-block">
    <div class="details-group" v-for="(item, index) in items" :key="index">
      <div class="details-title">{{ item.title }}:</div>
      <div class="details-value">
        <div v-if="typeof item.value === 'object'">
          <div v-for="( subItem, subIndex ) in item.value" :key="subIndex">
            {{ subItem[subItemsKeys[item.key]] }}
          </div>
        </div>
        <template v-else>
          {{ item.value }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyValueList',
  props: {
    items: {
      type: Array
    },
    subItemsKeys: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
  .details-info-block {
    font-size: 18px;
    margin-bottom: 25px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  .details-group {
    display: flex;
  }
  .details-title {
    margin-right: 25px;
    color: #983620;
  }
  .details-value {
    color: #000;
  }
</style>
