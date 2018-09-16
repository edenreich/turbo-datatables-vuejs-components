<template>
    <tbody>
        <tr role="row" 
            v-for="(record, index) in records" 
            :key="record.id" 
            :class="index % 2 === 0 ? 'even': 'odd'">
            <td>{{ record.name }}</td>
            <td>{{ record.email }}</td>
            <td>{{ record.phone }}</td>
        </tr>
    </tbody>
</template>

<script>
    export default {
        props: {
            records: Array,
            default: {}
        }
    }
</script>

<style>

</style>


