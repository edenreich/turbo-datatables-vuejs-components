<template>
    <tbody>
        <tr role="row" 
            v-for="(record, index) in records" 
            :key="index" 
            :class="index % 2 === 0 ? 'even': 'odd'">
            <td v-for="(column, index) in columns" :key="index">{{ record[column.name] }}</td>
        </tr>
    </tbody>
</template>

<script>
    export default {
        props: {
            records: {
                type: Array,
                default: {}
            },
            columns: {
                type: Array,
                default: {}
            }
        }
    }
</script>

<style>

</style>


