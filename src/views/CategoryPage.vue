<template>
  <div class="home">
    <Feed page="category" v-bind:category="category" />
  </div>
</template>

<script>
import Feed from "@/components/Feed.vue";

export default {
  name: "category",
  components: {
    Feed,
  },
  data() {
    return {
      category: this.$route.params.category,
    };
  },
};
</script>
