<template>
<div id="highlights">
    <p>Weather Highlights:</p>
    {{ highlights }}
</div>
</template>

<script>
import UVIndex from './UVIndex.vue';
import Visibility from './Visibility.vue';
import WindStatus from './WindStatus.vue';

export default {
    props: {
        highlights: {
            type: Object,
            required: false,
        },
    },
    components: {
        'uv-index': UVIndex,
        'visibility': Visibility,
        'wind-status': WindStatus,
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
