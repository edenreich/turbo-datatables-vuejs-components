<template>
    <tbody v-if="records.length > 0">
        <tr role="row"
            v-for="(record, index) in records" 
            :key="index" 
            :class="index % 2 === 0 ? 'even': 'odd'">
            <td v-for="(prop, index) in record" :key="index">{{ prop }}</td>
            <datatable-action-buttons v-if="withAction" 
                                      :record-id="record.id"
                                      @edit="$emit('edit', arguments[0], arguments[1])"
                                      @del="$emit('del', arguments[0], arguments[1])">
            </datatable-action-buttons>
        </tr>
    </tbody>
    <tbody v-else>
        <tr>
            <td class="text-center" colspan="100%">No matching records found</td>
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
        withAction: {
            type: Boolean,
            default: false
        }
    }
}
</script>
