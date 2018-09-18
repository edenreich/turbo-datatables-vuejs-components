<template>
    <div class="col-sm-12 col-md-6">
        <div class="dataTables_length">
            <label>Show
                <select class="custom-select custom-select-sm form-control form-control-sm" @change="$emit('perPageChanged', $event.target.value)">
                    <option v-for="(records, index) in perPage" :key="index" :value="records">{{ records }}</option>
                </select> entries
            </label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        perPage: {
            type: Array,
            default: []
        }
    }
}
</script>

<style>

</style>


