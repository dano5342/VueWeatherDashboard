<template>
<div id="tempvarchart">
    <p>Temperature Information:</p>
    {{ tempVar }}
</div>
</template>

<script>
export default {
    props: {
        tempVar: {
            type: Object,
            required: false,
        }
    },
    data() {
        return {

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
