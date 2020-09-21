<template>
<div id="visibility">
    <p>Visibility: {{ visibility }}</p>
</div>
</template>

<script>
export default {
    props: {
        highlights: {
            type: Object,
            required: false,
        }
    },
    data() {
        return {
            visibility: this.highlights.visibility,
        }
    },
    methods: {

    },
    computed: {

    },
}
</script>

<style>

</style>
