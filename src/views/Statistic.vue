<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 v-if="language === 'RUS'">Статистика по Проекту</h3>
        <h3 v-else-if="language === 'ENG'">Statistic for Project</h3>
      </div>
    </div>

    <div class="row">
      <div class="chart">
        <line-log-article :chart-data="chart_data" :options="chart_options"></line-log-article>
        <button @click="fillData()">Randomize</button>
      </div>
    </div>

  </div>
</template>

<script>

import LineLogArticle from './LineChart.js'

export default {
  name: "Statistic",

  data () {
    return {
      chart_data: null,

      chart_options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  mounted () {
    this.fillData()
  },

  components: {
    LineLogArticle
  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

  },

  methods: {

    fillData () {
      this.chart_data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Data Two',
            backgroundColor: 'green',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },

    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }


};
</script>

<style>
.chart {
  background: silver;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  /* max-height: 400px; */
}
</style>