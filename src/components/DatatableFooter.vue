<template>
    <tfoot>
        <tr>
            <th rowspan="1" colspan="1" v-for="column in columns" :key="column.name">{{ column.label }}</th>
        </tr>
    </tfoot>
</template>

<script>
    export default {
        props: {
            columns: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style>

</style>


