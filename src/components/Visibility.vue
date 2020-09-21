<template>
  <div>
    <p>Visibility: {{ visibility }}</p>
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
  data () {
    return {
      visibility: this.highlights.visibility.toString()
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