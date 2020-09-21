<template>
    <div>
        <p> This child components of content.vue are:</p>
        <ul>
            <li v-for="child in childComponents"> {{ child }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            childComponents: ['temp_var_chart.vue', 'highlights.vue']
        }
    },

    methods: {},
    computed: {},
    

}
</script>