<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 v-if="language === 'RUS'">На отправку</h3>
        <h3 v-else-if="language === 'ENG'">Sender</h3>
      </div>
    </div>

    <div class="row">

      <div class="col-6">

        <div class="row">
          <div
            class="col"
            id="col-drop-area"
          >
            <div id="check-drop-area">
              {{ (language == 'RUS') ? 'Брось файл сюда (каждый не более 20 Мб)' : 'Drop file here (each not heavier 20MB)' }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">

        <div class="row">
          <input
            type="text"
            v-model="nameOfFolder"
            placeholder="Имя папки"
          >
          <button
            type="button"
            class="btn btn-primary"
            v-on:click="addFolder"
          >
            {{ (language == 'RUS') ? 'Добавить' : 'Add' }}
          </button>

          <button
            type="button"
            class="btn btn-success"
            v-on:click="getFolder"
          >
            Search
          </button>

        </div>

        <div
          class="row"
          v-for="item in folders"
          :key="item.id"
        >
          <div class="col-10">
            <a
              href="#"
              v-bind:class="[item.id == activeFolderId ? 'active-folder' : '']"
              v-on:click="setActiveFolderId(item.id)"
            >{{item.id}}) {{item.owner}} {{ (language == 'RUS') ? 'добавил(а)' : 'added' }} {{item.name}}</a>
          </div>
          <div class="col-2">
            <a
              href="#"
              v-on:click="deleteFolder(item.id)"
            > {{ (language == 'RUS') ? 'Удалить' : 'Delete' }}</a>
          </div>
        </div>

        <!-- <div class="row">
          <button
            type="button"
            class="btn btn-block btn-warning"
            v-on:click="downloadAllFiles"
          >
            {{ (language == 'RUS') ? 'Скачать все файлы' : 'Download all files' }}
          </button>

        </div> -->

      </div>

    </div>

    <div class="row">
      <div class="col-1"></div>
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

    <!-- <div class="row">

      <table class="table table-striped">
        <thead>
          <tr>
            <th class="text-center">ID</th>
            <th class="td-date text-center">Date</th>
            <th class="td-file text-center">Filename</th>
            <th class="td-extension text-center">Extension</th>
            <th class="td-owner text-center">Surname</th>
            <th class="text-center">Status</th>
            <th class="text-center">Mistake</th>
          </tr>
        </thead>
        <tbody>

          <tr v-on:keyup.enter.prevent="getItems">
            <td>
              <figure> <img
                  src="./img/clean.png"
                  width="35"
                  height="35"
                  v-on:click="cleanSearch"
                  class="hover06"
                > </figure>
            </td>
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
                v-model="search.extension"
                placeholder="Расширение"
                class="full-width"
              /></td>
            <td class="text-center"><input
                type="text"
                v-model="search.owner"
                placeholder="Фамилия"
                class="full-width"
              /></td>
            <td class="text-center">
              <div>
                <input
                  type="checkbox"
                  v-model="search.status_yes"
                >+</div>
              <div>
                <input
                  type="checkbox"
                  v-model="search.status_question"
                >?</div>
              <div>
                <input
                  type="checkbox"
                  v-model="search.status_no"
                >-</div>
            </td>
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
            <td class="text-center"> <img
                src="./img/delete.png"
                width="40"
                height="40"
                v-on:click="deleteItem(item.id)"
                class="hover06"
                title="Удалить / Delete"
              ></td>
            <td class="text-center">{{formatDate(item.date)}}</td>
            <td>
              <div v-if="item.file_id != null">
                <a
                  href="#"
                  v-on:click="downloadFile(item.file_id)"
                >{{item.filename}}</a>
              </div>
              <div v-else>
                {{item.filename}}
              </div>
            </td>
            <td class="text-center">{{item.extension}}</td>
            <td class="text-center">{{item.owner}}</td>
            <td class="text-center">
              <img
                src="./img/approved.png"
                width="40"
                height="40"
                v-if="item.status == 1"
              >
              <img
                src="./img/question.png"
                width="40"
                height="40"
                v-if="item.status == 0"
              >
              <img
                src="./img/rejected.png"
                width="40"
                height="40"
                v-if="item.status == -1"
              >
            </td>
            <td class="text-center">{{item.mistake_count}}</td>
          </tr>

        </tbody>
      </table>
    </div> -->

  </div>
</template>

<script>
import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "Sender",


  data: function () {
    return {

      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,
      isDragging: false,
      maxFileSize: 20 * 1024 * 1024,
      nameOfFolder: '',
      activeFolderId: null,

      // search: {
      //   owner: "",
      //   status_yes: true,
      //   status_no: true,
      //   status_question: true,
      //   filename: "",
      //   extension: "",
      //   mistake_count: "",
      //   date: null,
      //   is_only_last: false
      // }

    };
  },

  mounted: function () {

    this.$nextTick(function () {
      this.$store.commit('sender_file/clean', {}, { root: true });

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

    folders: function () {
      return this.$store.getters['sender/give'];
    },

    // countOfItems: function () {
    //   return (this.items == null) ? 0 : this.items.length;
    // },

    attachedFiles: function () {
      return this.$store.getters['sender_file/give'];
    },

  },

  methods: {
    formatDate: function (timestamp) {
      let date = new Date();
      date.setTime(timestamp * 1000); // переводим в миллисекунды
      return ("0" + date.getHours()).slice(-2) + ':' +
        ("0" + date.getMinutes()).slice(-2) + ':' +
        ("0" + date.getSeconds()).slice(-2) + ' ' +
        ("0" + date.getDate()).slice(-2) + '.' +
        ("0" + (date.getMonth() + 1)).slice(-2) + '.' +
        date.getFullYear()
    },

    getFolder: function () {
      this.$store.dispatch('sender/get', {});
    },

    // downloadFile: function (file_id) {
    //   this.$store.dispatch('checker_file/download', {
    //     id: file_id
    //   });
    // },

    // downloadAllFiles: function () {
    //   if (this.items === null) {
    //     this.$store.dispatch('notify/showNotifyByCode', "E_FILE_006", { root: true });
    //     return;
    //   }

    //   this.$store.dispatch('checker_file/downloadAll', {
    //     ids: this.items.map(function (item) {
    //       return item.file_id;
    //     }).filter(function (id) {
    //       return id !== null;
    //     })
    //   });
    // },

    deleteFolder: function (id) {
      this.$store.dispatch('sender/delete', {
        id: id,
      });

      if (id == this.activeFolderId) { this.activeFolderId = null; }

    },

    startDragging: function () {
      this.isDragging = true;
    },

    stopDragging: function () {
      this.isDragging = false;
    },

    uploadFile: function (file) {

      if (this.activeFolderId == null) {
        this.$store.dispatch('notify/showNotifyByCode', "E_FILE_003", { root: true });
        return;
      }

      if (file.size > this.maxFileSize) {
        this.$store.dispatch('notify/showNotifyByCode', "E_FILE_004", { root: true });
        return;
      }

      let uin = this.guid();
      let progressCallback = this.updateProgress.bind(this);

      let badUploadFunction = function () {
        this.$store.commit('sender_file/deleteSuccess', uin, { root: true });
      };

      this.$store.dispatch('sender_file/upload', {
        log_file: file,
        uin: uin,
        folder_id: this.activeFolderId,

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

      this.$store.commit('sender_file/updateProgress', {
        uin: uin,
        size: totalBytes,
        uploadedSize: uploadedBytes
      });

    },

    cleanSearch: function () {
      this.search.status = "";
      this.search.who = "";
      this.search.filename = "";
      this.search.extension = "";
      this.search.date = null;
    },

    addFolder: function () {
      this.$store.dispatch('sender/add', { name: this.nameOfFolder });
    },

    setActiveFolderId: function (id) {
      this.activeFolderId = id;
    }

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

.checker-description {
  font-size: 10pt;
  color: blue;
  text-align: justify;
}

#check-drop-area {
  border: 2px dashed #ccc;
  border-radius: 20px;
  height: 200px;
  padding-top: 80px;
  text-align: center;
  font: 21pt bold arial;
  color: gray;
}

.hover06:hover {
  -webkit-transform: rotate(15deg) scale(1);
  transform: rotate(15deg) scale(1);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}
.hover06 {
  -webkit-transform: rotate(0) scale(1);
  transform: rotate(0) scale(1);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}

.active-folder {
  color: red;
}
</style>