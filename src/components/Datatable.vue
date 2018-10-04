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
      default: 'http://localhost/users'
    },
    filter: {
      type: Object,
      default: () => {
        return {
          page: 1,
          limit: 10,
          search: '',
          column: 0,
          direction: 'desc'
        }
      }
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  created() {    
    this.$watch('filter.page', value => this.getRecords(this.url));
    this.$watch('filter.limit', value => this.getRecords(this.url));
    this.$watch('filter.direction', value => this.getRecords(this.url));

    // Just so we won't over kill the server timeout for 
    // search typing is set to 500 miliseconds.
    this.$watch('filter.search', _.debounce(value => {
      if (value === '') {
        this.getRecords(this.url)
      } else {
        this.search(this.url);
      }
    }, 500));

    try {
      this.getRecords(this.url);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async getRecords(url) {
      url = url || this.url;

      this.$parent.$emit('gettingRecords');

      try {
        const response = await axios.get(url, { params: this.filter });
        this.$parent.$emit('recordsFetched', response.data);
        
        return Promise.resolve(response.data);
      } catch (err) {
        return Promise.reject('Could not fetch records from the server.');
      }
    },
    async search(url) {
      this.$parent.$emit('gettingRecords');
      
      try {
        const response = await axios.get(url, { params: { search: this.filter.search, column: this.filter.column } })
        this.$parent.$emit('recordsFetched', response.data);
        
        return Promise.resolve(response.data);
      } catch (err) {
        return Promise.reject('Could not fetch searched record from the server.');
      }
    }
  }
}
</script>

<style>

</style>
