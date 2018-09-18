<template>
  <div class="row">
    <div class="col-sm-12">
      <table class="table table-striped table-bordered dataTable" role="grid" style="width: 100%;">
        <slot></slot>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

  export default {
    props: {
      url: {
        type: String,
        required: true
      },
      data: {
        type: Object,
        required: true
      }
    },
    async created() {
      let response = await this.getRecords(this.url);
      this.$emit('recordsFetched', response);

      this.$watch('data.page', async (value) => {
        let response = await this.getRecords(this.url)
        this.$emit('recordsFetched', response);
      });

      this.$watch('data.limit', async (value) => {
        let response = await this.getRecords(this.url)
        this.$emit('recordsFetched', response);
      });

      // Just so we won't over kill the server timeout for 
      // search typing is set to 500 miliseconds.
      this.$watch('data.search', _.debounce(async (value) => {
        if (value === '') {
          let response = await this.getRecords(this.url)
          this.$emit('recordsFetched', response);
          return;
        }

        let response = await this.search(this.url);
        this.$emit('recordsFetched', response);
      }, 500));

      this.$watch('data.direction', async (value) => {
        let response = await this.getRecords(this.url);
        this.$emit('recordsFetched', response);
      });
    },
    methods: {
      async getRecords(url) {
        this.$emit('gettingRecords');

        const response = await axios.get(url, { params: this.data });

        return response.data;
      },
      async search(url) {
        this.$emit('gettingRecords');

        const response = await axios.get(url, { params: { search: this.data.search, column: this.data.column } })

        return response.data;
      }
    }
  }
</script>

<style>

</style>
