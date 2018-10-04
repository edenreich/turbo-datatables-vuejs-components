<template>
    <thead>
        <tr role="row">
            <th rowspan="1" 
                colspan="1"
                clicks="0"
                :aria-sort="dir+'ending'"
                v-for="(column, index) in columns" 
                :class="(active === index) ? 'sorting_'+dir : 'sorting'"
                :key="column.name"
                :tabindex="index"
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
            let sortDirection = element.getAttribute('aria-sort');

            this.active = columnIndex;

            this.$parent.$parent.$emit('columnClicked', columnIndex, this.dir);
        }
    }
}
</script>

<style>

</style>

