<template>
    <div class="row" v-if="pagination">
        <div class="col-sm-12 col-md-5">
            <div class="dataTables_info" role="status" aria-live="polite">Showing {{ pagination.from || '0' }} to {{ pagination.to || '0' }} of {{ pagination.total || '0' }} entries</div>
        </div>
        <div class="col-sm-12 col-md-7">
            <div class="dataTables_paginate paging_simple_numbers">
                <ul class="pagination">
                    <li class="paginate_button page-item" :class="pagination.currentPage === 1 ? 'disabled': ''">
                        <a class="page-link" :href="pagination.prevPageUrl"
                                             :data-dt-idx="pagination.prevPage" 
                                             :tabindex="pagination.prevPage"
                                             @click.prevent="$parent.$emit('prev', $event.target.getAttribute('tabindex'))">Previous</a>
                    </li>

                    <li class="paginate_button page-item" v-for="linkItem in linkItems" :key="linkItem.page" :class="{ 'active': linkItem.active }">
                        <span class="page-link" v-if="linkItem.name === 'separator'">...</span>
                        <a v-else class="page-link" :href="linkItem.url"
                                                    :data-dt-idx="linkItem.page"
                                                    :tabindex="linkItem.page"
                                                    @click.prevent="$parent.$emit('linkClicked', $event.target.getAttribute('tabindex'))">{{ linkItem.name }}</a>
                    </li>
                    <li class="paginate_button page-item next" :class="pagination.currentPage === pagination.totalPages ? 'disabled': ''">
                        <a class="page-link" :href="pagination.nextPageUrl" 
                                             :data-dt-idx="pagination.nextPage" 
                                             :tabindex="pagination.nextPage" 
                                             @click.prevent="$parent.$emit('next', $event.target.getAttribute('tabindex'))">Next</a>
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
            required: true,
            default: () => {}
        },
        short: {
            type: Boolean,
            default: undefined
        }
    },
    computed: {
        linkItems() {
            let linkItems = [];
            let shouldBeShort = this.pagination.totalPages > 10;
 
            if (typeof this.short !== 'undefined') {
                shouldBeShort = this.short;
            }
            
            if (shouldBeShort) {
                if (this.pagination.currentPage > 10) {
                    linkItems.push({
                        url: '?page='+1,
                        page: 1,
                        name: 1
                    });
                }
                linkItems.push({
                    url: this.pagination.prevPageUrl,
                    page: this.pagination.prevPage,
                    name: this.pagination.prevPage,
                    active: this.pagination.currentPage === this.pagination.prevPage
                });
                if (this.pagination.currentPage != 1 && this.pagination.currentPage != this.pagination.totalPages) {
                    linkItems.push({
                        url: '?page='+this.pagination.currentPage,
                        page: this.pagination.currentPage,
                        name: this.pagination.currentPage,
                        active: true
                    });
                }
                linkItems.push({
                    url: 0,
                    page: 0,
                    name: 'separator'
                });
                linkItems.push({
                    url: this.pagination.lastPageUrl,
                    page: this.pagination.lastPage,
                    name: this.pagination.lastPage,
                    active: this.pagination.currentPage === this.pagination.lastPage
                });
            } else {
                for (let i = 1; i <= this.pagination.lastPage; i++) {
                    linkItems.push({
                        url: '?page='+i,
                        page: i,
                        name: i,
                        active: this.pagination.currentPage === i
                    });
                }
            }

            return linkItems;
        }
    }
}
</script>

<style>

</style>
