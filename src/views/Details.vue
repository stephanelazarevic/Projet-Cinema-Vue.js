<template>
  <div class="details">
    <h1>Details du film</h1>
    <div class="content">
      <h3>{{film.titre}}</h3>
      <h3>{{film.id}}</h3>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Details',
  data(){
    return{
      film : Object,
    }
  },
  created(){
    this.film = {
      id: this.$route.query.id,
      titre: this.$route.query.titre
    }
  }
}
</script>
