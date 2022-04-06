<template>
  <div id="nav">
    <router-link to="/">Accueil</router-link> |
    <router-link to="/recherche">Recherche</router-link>
  </div>
  <router-view/>
</template>

<script>
/* export default {
	name: 'App',
	methods: {
		getList(){
			this.axios.get(api).then((response) => {
				console.log(response.data)
			})
		}
	}
} */
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      baseUrl: 'https://api.themoviedb.org/3',
      films: [],
      query: '',
      api_key: '9021264f48ddf90a2c1bf9c58af5d837',
      show_result: false,
    }
  },
  methods: {
    async recherche() {
      if (this.query.length == 0){
        this.show_result = false;
      } else {
        const response = await axios.get(this.baseUrl + '/search/movie?language=fr&api_key=' + this.api_key + '&query=' + this.query);
        this.films = await response.data.results;
        this.show_result = true;
      }
    },
    showDetails(film) {

      this.$router.push({
        path: 'Details', query: {
          id: film.id
        }

      });
      this.show_result = false;

    },
    show() {
      this.show_result = true;
    },
    hide() {
      this.show_result = false;
    }
  }

}
</script>

<style></style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
