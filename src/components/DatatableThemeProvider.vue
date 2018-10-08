<template>
  <div class="theme-provider">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'bootstrap4'
    }
  },
  data() {
    return {
      availableThemes: [
        'bootstrap4',

      ]
    }
  },
  mounted() {
    if (!this.exists(this.name)) {
      throw new Error('Theme does not exists!');
    }

    this.$theme.select(this.name);
  },
  methods: {
    exists(name) {
      return this.availableThemes.indexOf(name) !== -1;
    }
  }
}
</script>
