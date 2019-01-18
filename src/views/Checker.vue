<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 v-if="language === 'RUS'">Проверялка</h3>
        <h3 v-else-if="language === 'ENG'">Checker</h3>
      </div>
    </div>

    <div class="row">

      <div class="col-8">

        <div class="row">
          <div
            class="col"
            id="col-drop-area"
          >
            <div id="drop-area">
              Drop Here / Бросай Сюда (max 20 MB)
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="row">
      <div class="col-4"></div>
      <div class="col-8">

        <div
          class="row"
          v-for="item in attachedFiles"
          :key="item.uin"
        >
          <div class="col-1">
            <span
              v-if="item.uploadedSize >= item.size"
              class="badge badge-success"
            >OK</span>
            <span
              v-else
              class="badge badge-warning"
            >{{ Math.round(item.uploadedSize/item.size*100)}}% </span>
          </div>

          <div
            class="col-7"
            v-if="item.id != null"
          >
            <a
              href="#"
              v-on:click="downloadFile(item.id)"
            >{{item.original_name}}</a>
          </div>
          <div
            class="col-7"
            v-else
          >
            {{item.original_name}}
          </div>

          <div class="col-2">
            {{formatBytes(item.size)}}
          </div>

        </div>

      </div>
    </div>

    <br />
    <div class="row">
      <div class="col-4">
        <div class="row">
          <div class="col-11">
            {{ (language == 'RUS') ? 'Только последние записи' : 'Only last rows' }}
          </div>
          <div class="col-1">
            <input
              type="checkbox"
              v-model="search.is_only_last"
            >
          </div>
        </div>
      </div>

      <div class="col-8">
        <button
          type="button"
          class="btn btn-block btn-success"
          v-on:click="getItems"
        >
          {{ (language == 'RUS') ? 'Найти' : 'Search' }}
          <span class="badge badge-light">{{countOfItems}}</span>
        </button>
      </div>

    </div>

    <div class="row">

      <table class="table table-striped">
        <thead>
          <tr>
            <th class="text-center">ID</th>
            <th class="td-date text-center">Date</th>
            <th class="td-file text-center">Filename</th>
            <th class="td-owner text-center">Who</th>
            <th class="text-center">Status</th>
            <th class="text-center">Mistake</th>
          </tr>
        </thead>
        <tbody>

          <tr v-on:keyup.enter.prevent="getItems">
            <td> <img
                src="./img/clean.png"
                width="35"
                height="35"
                v-on:click="cleanSearch"
              > </td>
            <td class="td-date">
              <datepicker
                v-model="search.date"
                :format="date_format"
                :bootstrap-styling="true"
                :language="languageForDatePicker"
              ></datepicker>
            </td>
            <td class="text-center"><input
                type="text"
                v-model="search.filename"
                placeholder="Имя файла"
                class="full-width"
              /></td>
            <td class="text-center"><input
                type="text"
                v-model="search.owner"
                placeholder="Кто ?"
                class="full-width"
              /></td>
            <td class="text-center"><input
                type="text"
                v-model="search.status"
                placeholder="Статус"
                class="full-width"
              /></td>
            <td class="text-center"><input
                type="text"
                v-model="search.mistake_count"
                placeholder="Ошибки"
                class="full-width"
              /></td>

          </tr>

          <tr
            v-for="item in items"
            :key="item.id"
          >
            <td
              class="text-center"
              v-on:click="deleteItem(item.id)"
            > УДАЛИТЬ</td>
            <td class="text-center">{{formatDate(item.date)}}</td>
            <td>{{item.filename}}</td>
            <td class="text-center">{{item.owner}}</td>
            <td class="text-center">{{item.status}}</td>
            <td class="text-center">{{item.mistake_count}}</td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "Checker",


  data: function () {
    return {

      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,
      isDragging: false,
      maxFileSize: 20 * 1024 * 1024,

      search: {
        owner: "",
        status: "",
        filename: "",
        mistake_count: "",
        date: null,
        is_only_last: false
      }

    };
  },

  mounted: function () {

    this.$nextTick(function () {
      this.$store.commit('checker_file/clean', {}, { root: true });

      // Очищаем установленные по умолчанию обработчики событий
      let dropArea = document.getElementById('col-drop-area');

      function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, this.startDragging, false)
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, this.stopDragging, false)
      });

      ['drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, this.handleDrop, false)
      });

    })


  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

    languageForDatePicker: function () {
      if (this.language == "RUS") { return this.ru }
      if (this.language == "ENG") { return this.en }
    },

    items: function () {
      return this.$store.getters['checker/giveItems'];
    },

    countOfItems: function () {
      return (this.items == null) ? 0 : this.items.length;
    },

    attachedFiles: function () {
      return this.$store.getters['checker_file/give'];
    },

  },

  methods: {
    formatDate: function (timestamp) {
      let date = new Date();
      date.setTime(timestamp * 1000); // переводим в миллисекунды
      return ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
    },

    getItems: function () {
      let queryObject = {
        status: this.search.status,
        owner: this.search.owner,
        filename: this.search.filename,
        mistake_count: this.search.mistake_count,
        is_only_last: this.search.is_only_last,
        date: (this.search.date == null) ? "" : Math.round(this.search.date.getTime() / 1000)
      };

      this.$store.dispatch('checker/getItems', queryObject);
    },

    downloadFile: function (file_id) {
      this.$store.dispatch('checker_file/download', {
        id: file_id
      });
    },

    deleteItem: function (id) {
      this.$store.dispatch('checker/deleteItem', {
        id: id,
      });
    },

    startDragging: function () {
      this.isDragging = true;
    },

    stopDragging: function () {
      this.isDragging = false;
    },

    uploadFile: function (file) {

      if (file.size > this.maxFileSize) {
        this.$store.dispatch('notify/showNotifyByCode', "E_FILE_004", { root: true });
        return;
      }

      let uin = this.guid();
      let progressCallback = this.updateProgress.bind(this);

      let badUploadFunction = function () {
        this.$store.commit('checker_file/deleteSuccess', uin, { root: true });
      };

      this.$store.dispatch('checker_file/upload', {
        log_file: file,
        uin: uin,

        progressCallback: function (e) {
          progressCallback(uin, e.loaded, e.total)
        },

        badFileUploadCallback: badUploadFunction.bind(this)

      });

    },

    handleDrop: function (e) {
      let dt = e.dataTransfer;
      let files = dt.files;
      files = [...files];
      files.forEach(this.uploadFile);
    },

    formatBytes: function (bytes, decimals) {
      if (bytes == 0) return '0 Bytes';
      var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    guid: function () {
      function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    updateProgress: function (uin, uploadedBytes, totalBytes) {

      this.$store.commit('checker_file/updateProgress', {
        uin: uin,
        size: totalBytes,
        uploadedSize: uploadedBytes
      });

    },

    cleanSearch: function () {
      this.search.status = "";
      this.search.who = "";
      this.search.filename = "";
      this.search.date = null;
    },

  },

};
</script>

<style>
.td-date {
  width: 130px;
}

.td-file {
  width: 520px;
}

.td-owner {
  width: 250px;
}

.text-center {
  text-align: center;
}

.full-width {
  width: 100%;
}

#drop-area {
  border: 2px dashed #ccc;
  border-radius: 20px;
  height: 200px;
  margin-top: 40px;
  padding-top: 80px;
  text-align: center;
  font: 21pt bold arial;
  color: gray;
}
</style>