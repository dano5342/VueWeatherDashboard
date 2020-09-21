<template>
<div id="app">
    <p>This component’s code is in {{ filename }}</p>
    <Content :highlights="weather_data.highlights" :tempVar="weather_data.temperature">
    </Content>
</div>
</template>

<script>
import Content from './components/Content.vue';

export default {
    components: {
        'Content': Content,
    },
    data() {
        return {
            filename: 'App.vue',
            weather_data: {
                location: 'Berlin',
                temperature: {
                    current: '25 C',
                },
                highlights: {
                    uvindex: '3',
                    windstatus: {
                        speed: '20 km/h',
                        direction: 'N-E',
                    },
                    visibility: '12 km'
                },
            },
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
