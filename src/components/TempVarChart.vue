<template>
  <div>
    {{ tempVar.tempToday }}    
  </div>
</template>

<script>
export default {
  props: {
      tempVar: {
          type: Object,
          required: false
      }
  },
  components: {},
  data() {
    return {

    };
  },
  methods: {

  },

};
</script>

<style>

</style>
