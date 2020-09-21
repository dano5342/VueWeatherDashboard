<template>
<div id="uvindex">
    <p>UV Index: {{ uvindex }}</p>
</div>
</template>

<script>
export default {
    props: {
        highlights: {
            type: Object,
            required: false
        }
    },
    data() {
        return {
            uvindex: this.highlights.uvIndex
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
