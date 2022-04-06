<template>
  <div class="details">
    <div class="content">

            <div class="infos"><br>
              <h2>{{details.title}}</h2>
              <div v-if="details.poster_path">
                <img class="affiche" v-bind:src="'http://image.tmdb.org/t/p/w500' + details.poster_path">
              </div><br>
                <p class="resume">{{details.overview}}</p>
            </div>
    </div>

    <h2><b>Note des utilisateurs</b></h2>
      <div style="margin: 15px; display: inline-block">
        <div class="vote">
          <img src="../assets/etoileNote.png" style="width: 40px; height: 40px;">
          <div class="vote_bck" v-bind:style="styles"></div>
        </div>

        <b>{{(details.vote_average /2)}} / 5</b>
        <br>
        <i>{{details.vote_count}} personnes ont voté !</i>

      </div>
      <div v-if="voted" class="back" style="margin: -40px 15px 15px 15px; float: right; text-align: center">
        <b>Merci !</b>
      </div>
      <div v-if="!voted" class="back" style="margin: -40px 15px 15px 15px; float: right;  text-align: center">
        <h3>Et vous, qu'en pensez ?</h3>
        <span v-for="n in 5" v-bind:key="n">
                    <img  v-if="n > note" class="note" src="../assets/etoileNote.png"   style="filter: grayscale(100%);"    v-on:click="setnote(n)">
                    <img  v-if="n <= note" class="note" src="../assets/etoileNote.png"      v-on:click="setnote(n)">
                </span>
        <br>
        <button v-on:click="postreview">Voter</button>
      </div>


      <h2>Casting</h2>
      <table class="cast" v-for='credit in credits.cast' v-bind:key="credit.key">
        <tr>
          <td v-if="credit.profile_path"><img class="profile" v-bind:src="'http://image.tmdb.org/t/p/w500' + credit.profile_path"></td>
          <td>
            <b>{{ credit.name }}</b>
            <br>
            {{ credit.character }}
          </td>
        </tr>
      </table>

    </div>
</template>

<script>
  import axios from 'axios'
  export default{
    name: 'Details',
    data: () => ({
      baseUrl: 'https://api.themoviedb.org/3',
      api_key: '9021264f48ddf90a2c1bf9c58af5d837',
      film: [],
      details: [],
      credits: [],
      reviews: [],
      note: 0,
      voted: false,
      load: true,
    }),
    methods: {
      async getdetails() {
        const response = await axios.get(this.baseUrl + '/movie/' + this.film.id + '?language=fr&api_key=' + this.api_key);
        this.details = await response.data;
      },
      async getcredits() {
        const response = await axios.get(this.baseUrl + '/movie/' + this.film.id + '/credits?language=fr&api_key=' + this.api_key);
        this.credits = await response.data;
      },
      async getreviews() {
        const response = await axios.get(this.baseUrl + '/movie/' + this.film.id + '/reviews?language=fr&api_key=' + this.api_key);
        this.reviews = await response.data;
      },
      setnote(e){
        this.note = e;
      },
      async postreview(){
        if (this.note <= 0 || this.note > 5){
          alert('pas content');
        } else {
          const review = { value: (this.note * 2) };
          const response = await axios.post(this.baseUrl + '/movie/' + this.film.id + '/rating?api_key=' + this.api_key, review);

          const dat = await response.data;
          console.log(dat.status_message);
          this.voted = true;
        }
      }
    },
    created() {
      this.film = {
        id: this.$route.query.id,
      }

      this.getdetails();
      this.getcredits();
      this.load = false;
    },
    computed: {
      styles: function() {
        return {
          width: (this.details.vote_average * 10) + '%',
        };
      }
    }
  }

</script>