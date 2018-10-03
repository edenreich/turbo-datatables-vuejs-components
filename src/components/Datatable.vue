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
import { EventBus } from '../main.js';

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
  created() {    
    this.$watch('data.page', value => this.getRecords(this.url));
    this.$watch('data.limit', value => this.getRecords(this.url));
    this.$watch('data.direction', value => this.getRecords(this.url));

    EventBus.$on('reload', () => this.getRecords(this.url));

    // Just so we won't over kill the server timeout for 
    // search typing is set to 500 miliseconds.
    this.$watch('data.search', _.debounce(value => {
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
      this.$emit('gettingRecords');

      try {
        const response = await axios.get(url, { params: this.data });
        this.$emit('recordsFetched', response.data);
        
        return Promise.resolve(response.data);
      } catch (err) {
        return Promise.reject('Could not fetch records from the server.');
      }
    },
    async search(url) {
      this.$emit('gettingRecords');
      
      try {
        const response = await axios.get(url, { params: { search: this.data.search, column: this.data.column } })
        this.$emit('recordsFetched', response.data);
        
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
