<template>
<div id="pagecontent">
    <p>This child components of Content.vue are:</p>
    <ul>
        <li v-for="child in childComponents" :key="child">{{ child }}</li>
    </ul>
    {{ weather_data }}
    <temp-var-chart :tempVar="tempVar"></temp-var-chart>
    <today-highlights :highlights="highlights"></today-highlights>
</div>
</template>

<script>
import TempVarChart from './TempVarChart.vue';
import Highlights from './Highlights.vue';

export default {
    props: {
        weather_data: {
            type: Object,
            required: false,
        },
    },
    components: {
        'temp-var-chart': TempVarChart,
        'today-highlights': Highlights,
    },
    data() {
        return {
            childComponents: ['TempVarChart.vue', 'Highlights.vue'],
            tempVar: this.weather_data.temperature, // This will be changed out for some computed
            highlights: this.weather_data.highlights, //  values called from the OWAPI 
        }
    },
    methods: {

    },
    computed: {

    },
}
</script>

<style>
#pagecontent {
    border: 1px solid black;
    padding: 2px;
}
</style>
