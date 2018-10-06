<template>
  <thead>
    <tr role="row">
      <th
        v-for="(column, index) in columns"
        :key="column.name"
        :aria-sort="dir+'ending'"
        :class="(active === index) ? 'sorting_'+dir : 'sorting'"
        :tabindex="index"
        rowspan="1"
        colspan="1"
        clicks="0"
        @click="onColumnClicked">{{ column.label }}</th>
    </tr>
  </thead>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      active: 0,
      dir: 'desc'
    }
  },
  methods: {
    onColumnClicked(event) {
      let element = event.target;
      let clicks = parseInt(element.getAttribute('clicks'));
      element.setAttribute('clicks', clicks+1);

      if (clicks % 2 === 1) {
          this.dir = 'desc';
      } else {
          this.dir = 'asc';
      }

      let columnIndex = parseInt(element.getAttribute('tabindex'));

      this.active = columnIndex;

      this.$parent.$parent.$emit('columnClicked', columnIndex, this.dir);
    }
  }
}
</script>

<style>

</style>
