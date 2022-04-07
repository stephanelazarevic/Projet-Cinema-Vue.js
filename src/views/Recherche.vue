<template>
  <div class="columns is-vcentered">
    <div class="container">
      <form v-on:submit.prevent="recherche()">
        <div class="field is-grouped" style="box-shadow: 2px 3px 5px #1A1A1A; border-radius: 5px;">

          <input class="input is-primary" type="text" placeholder="Rechercher un film..." v-model="uneRecherche">
          <button class="button is-primary" v-on:click="recherche ">GO !</button>

        </div>

      </form>
      <br>
      <div>
        <br><h2><b>Resultats de la recherche</b></h2><br><br><br>
        <div align="center">

          <div class="columns is-multiline is-vcentered">
            <div class="column is-one-quarter is-vcentered" v-for="unFilm in films" v-bind:key="unFilm.key">
              <div style="background-color: #1A1A1A;">
                <div class="titreFilm"><br><b><a v-on:click="voirDetails(unFilm)">{{unFilm.title}}</a></b></div><br>
                <div v-if="unFilm.poster_path!=null" >
                  <img v-bind:src="'http://image.tmdb.org/t/p/w500' + unFilm.poster_path"></div>
                <div><br>
                  <button class="button is-success is-outlined is-small" v-on:click="voirDetails(unFilm)">Détails</button>
                </div>

                <br>
              </div><br>

            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Recherche ',
    data() {
      return {
        baseUrl: 'https://api.themoviedb.org/3/search/movie' ,
        films: [],

        uneRecherche: '',
        api_key: '3f2e73f99471592447bae321c22cd045'
      }
    },
    methods: {
      async recherche(){
        // const response = await axios.get(this.baseUrl + '/search.json?title=${this.query}');
        const response = await axios.get(this.baseUrl + '?api_key=' + this.api_key + '&query=' + this.uneRecherche);
        this.films = await response.data.results;
      },

      voirDetails(film) {
        this.$router.push({
          path: 'details', query: {
            id: film.id,
            titre: film.title
          }
        });
      }
    }
  }
</script>
