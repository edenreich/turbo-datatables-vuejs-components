<template>
    <tbody v-if="records.length > 0">
        <tr role="row"
            v-for="(record, index) in records" 
            :key="index" 
            :class="index % 2 === 0 ? 'even': 'odd'">
            <td v-for="(column, index) in columns" :key="index">{{ record[column.name] }}</td>
        </tr>
    </tbody>
    <tbody v-else>
        <tr>
            <td class="text-center" :colspan="columns.length">No matching records found</td>
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
