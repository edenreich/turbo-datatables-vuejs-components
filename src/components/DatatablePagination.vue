<template>
    <div class="row">
        <div class="col-sm-12 col-md-5">
            <div class="dataTables_info" role="status" aria-live="polite">Showing {{ pagination.currentPage }} to {{ pagination.totalPages }} of {{ pagination.total }} entries</div>
        </div>
        <div class="col-sm-12 col-md-7">
            <div class="dataTables_paginate paging_simple_numbers">
                <ul class="pagination">
                    <li class="paginate_button page-item">
                        <a class="page-link" :href="pagination.prevPageUrl"
                                             :data-dt-idx="pagination.prevPage" 
                                             :tabindex="pagination.prevPage"
                                             @click.prevent="$emit('prev', $event.target.getAttribute('tabindex'))">Previous</a>
                    </li>
                    <li class="paginate_button page-item" v-if="pagination.totalPages > 10"
                                                          :key="pagination.prevPage" 
                                                          :class="(pagination.currentPage === pagination.prevPage) ? 'active' : ''">
                        <a class="page-link" :href="'?page='+pagination.prevPage"
                                                :data-dt-idx="pagination.prevPage"
                                                :tabindex="pagination.prevPage"
                                                @click.prevent="$emit('linkClicked', $event.target.getAttribute('tabindex'))">{{ pagination.prevPage }}</a>
                    </li>
                    <li class="paginate_button page-item" v-if="pagination.totalPages > 10">
                        <span class="page-link">...</span>
                    </li>
                    <li class="paginate_button page-item" v-if="pagination.totalPages > 10"
                                                          :key="pagination.nextPage" 
                                                          :class="(pagination.currentPage === pagination.nextPage) ? 'active' : ''">
                        <a class="page-link" :href="'?page='+pagination.nextPage"
                                                :data-dt-idx="pagination.nextPage"
                                                :tabindex="pagination.nextPage"
                                                @click.prevent="$emit('linkClicked', $event.target.getAttribute('tabindex'))">{{ pagination.nextPage }}</a>
                    </li>
                    <li class="paginate_button page-item" v-if="pagination.totalPages <= 10"
                                                            v-for="index in pagination.totalPages" 
                                                            :key="index" 
                                                            :class="(pagination.currentPage === index) ? 'active' : ''">
                        <a class="page-link" :href="'?page='+index"
                                                :data-dt-idx="index"
                                                :tabindex="index"
                                                @click.prevent="$emit('linkClicked', $event.target.getAttribute('tabindex'))">{{ index }}</a>
                    </li>
                    <li class="paginate_button page-item next">
                        <a class="page-link" :href="pagination.nextPageUrl" 
                                             :data-dt-idx="pagination.nextPage" 
                                             :tabindex="pagination.nextPage" 
                                             @click.prevent="$emit('next', $event.target.getAttribute('tabindex'))">Next</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
           pagination: {
               type: Object,
               required: true
           }
        }
    }
</script>

<style>

</style>


