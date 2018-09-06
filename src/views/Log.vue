<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 v-if="language === 'RUS'">Журнал событий проекта</h3>
        <h3 v-else-if="language === 'ENG'">Project Log</h3>
      </div>
    </div>

    <div class="row">

      <div class="col-4">

        <div class="row">
          <div class="col">
            <label v-if="language === 'RUS'">Номер записи: {{targetItem.id}}</label>
            <label v-else-if="language === 'ENG'">Item's ID: {{targetItem.id}}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <label v-if="language === 'RUS'">Дата</label>
            <label v-else-if="language === 'ENG'">Date</label>
          </div>
          <div class="col-9">
            <datepicker v-model="targetItem.date" :format="date_format" :bootstrap-styling="true" :language="languageForDatePicker"></datepicker>
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <label v-if="language === 'RUS'">От</label>
            <label v-else-if="language === 'ENG'">From</label>
          </div>
          <div class="col-9">
            <select class="form-control" v-bind:value="targetItem.from" v-on:change="targetItem.from = $event.target.value">
              <option v-for="item in users" :key="item.id" v-bind:value="item.id">
                {{item.surname}} {{item.name}}
              </option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <label v-if="language === 'RUS'">Кому</label>
            <label v-else-if="language === 'ENG'">To</label>
          </div>
          <div class="col-9">

            <select class="form-control" v-bind:value="targetItem.to" v-on:change="targetItem.to = $event.target.value">
              <option v-for="item in users" :key="item.id" v-bind:value="item.id">{{item.surname}} {{item.name}}</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-3">

            <label v-if="language === 'RUS'">Титул</label>
            <label v-else-if="language === 'ENG'">Title</label>
          </div>
          <div class="col-9">
            <input type="text" v-model="targetItem.title" class="form-control" />
          </div>
        </div>

        <div v-if="isNewItemMayBeAdded == true" class="row">
          <div class="col-3">
            <img src="./img/reverse.jpg" width="40" height="40" v-on:click="switchUsers" title="От <> Кому / From <> To">
          </div>

          <div class="col-9">
            <button type="button" class="btn btn-block btn-primary" v-on:click="addItem">
              {{ (language == 'RUS') ? 'Добавить' : 'Add' }}
            </button>
          </div>
        </div>

        <div v-else class="row">
          <div class="col-3">
            <img src="./img/plus.png" width="40" height="40" v-on:click="resetToAdd" title="Вернуться к Добавить / Back to ADD">
          </div>

          <div class="col-9">
            <div class="row">
              <div class="col">
                <button type="button" class="btn btn-block btn-warning" v-on:click="modifyItem">
                  {{ (language == 'RUS') ? 'Изменить' : 'Modify' }}
                </button>
              </div>
              <div class="col">
                <button type="button" class="btn btn-block btn-danger" v-on:click="deleteItem">
                  {{ (language == 'RUS') ? 'Удалить' : 'Delete' }}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-8">
        <div class="row">
          <div class="col" id="col-drop-area">
            <editor v-if="isDragging == false" v-model="targetItem.what" :editorToolbar="customEditorToolbar"></editor>
            <div v-else id="drop-area"> Drop Here / Бросай Сюда</div>
          </div>
        </div>
      </div>

    </div>

    <div class="row">
      <div class="col-4"></div>
      <div class="col-8">

        <div class="row" v-for="item in attachedFiles" :key="item.uin">
          <div class="col-1">
            <span v-if="item.uploadedSize >= item.actualSize" class="badge badge-success">OK</span>
            <span v-else class="badge badge-warning">{{ Math.round(item.uploadedSize/item.actualSize*100)}}% </span>
          </div>
          <div class="col-7">
            {{item.name}}
          </div>
          <div class="col-2">
            {{formatBytes(item.actualSize)}}
            <!-- <button type="button" class="btn btn-success btn-sm"> -->
            <!-- Скачать -->
            <!-- </button> -->
          </div>
          <div class="col-2">
            <button type="button" class="btn btn-danger btn-sm">
              Удалить
            </button>
          </div>
        </div>

      </div>
    </div>

    <br/>
    <div class="row">
      <input type="checkbox" v-model="search.is_only_last" title="Только последние записи / Only last rows">
      <div class="col">
        <button type="button" class="btn btn-block btn-success" v-on:click="getItems">
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
            <th class="text-center">Title</th>
            <th class="text-center">From (surname)</th>
            <th class="text-center">What</th>
            <th class="text-center">To (surname)</th>
          </tr>
        </thead>
        <tbody>

          <tr v-on:keyup.enter.prevent="getItems">
            <td></td>
            <td class="td-date">
              <datepicker v-model="search.date" :format="date_format" :bootstrap-styling="true" :language="languageForDatePicker"></datepicker>
            </td>
            <td class="text-center"><input type="text" v-model="search.title" placeholder="Титул" /></td>
            <td class="text-center"><input type="text" v-model="search.from" placeholder="От (фамилия)" /></td>
            <td class="text-center"><input type="text" v-model="search.what" placeholder="Текст" /></td>
            <td class="text-center"><input type="text" v-model="search.to" placeholder="Кому (фамилия)" /></td>
          </tr>

          <tr v-for="item in items" :key="item.id" v-on:click="editItem(item.id)">
            <td class="text-center">{{item.id}}</td>
            <td class="text-center">{{formatDate(item.date)}}</td>
            <td class="text-center">{{item.title}}</td>
            <td class="text-center">{{item.from}}</td>
            <td v-html="item.what"></td>
            <td class="text-center">{{item.to}}</td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "Log",


  data: function () {
    return {

      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,
      isNewItemMayBeAdded: true,
      isDragging: false,

      attachedFiles: [
        {
          name: "test",
          actualSize: 100,
          uploadedSize: 100
        }
      ],

      customEditorToolbar: [
        ['bold', 'underline'],
        // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // ['image', 'code-block']
      ],

      targetItem: {
        id: null,
        to: 0,
        from: 0,
        what: "",
        title: "",
        date: new Date()
      },

      search: {
        to: "",
        from: "",
        what: "",
        title: "",
        date: null,
        is_only_last: true
      }

    };
  },

  mounted: function () {

    this.$nextTick(function () {
      this.getTitles();
      this.getUsers();
      this.targetItem.from = this.$store.state.user.id;
      this.targetItem.to = 0;

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

      // dropArea.addEventListener('drop', handleDrop, false)



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
      return this.$store.getters['log/giveItems'];
    },

    titles: function () {
      return this.$store.getters['title/give'];
    },

    users: function () {
      return this.$store.getters['users/give'];
    },

    countOfItems: function () {
      return (this.items == null) ? 0 : this.items.length;
    },

  },

  methods: {
    formatDate: function (timestamp) {
      let date = new Date();
      date.setTime(timestamp * 1000); // переводим в миллисекунды
      return ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
    },

    getTitles: function () {
      this.$store.dispatch('title/get', {});
    },

    getUsers: function () {
      this.$store.dispatch('users/get', {});
    },

    getItems: function () {
      this.$store.dispatch('log/getItems', {
        to: this.search.to,
        from: this.search.from,
        title: this.search.title,
        what: this.search.what,
        is_only_last: this.search.is_only_last,
        date: (this.search.date == null) ? "" : Math.round(this.search.date.getTime() / 1000)
      });
    },

    getTargetItemTitleId: function () {
      //    Ищем id от title
      let localTitle = this.titles.filter(obj => {
        return obj.name === this.targetItem.title
      });

      return (localTitle.length > 0) ? localTitle[0].id : 0;
    },

    addItem: function () {

      let titleId = this.getTargetItemTitleId();

      if (titleId == 0) {
        this.$store.dispatch('notify/showNotifyByCode', 303, { root: true });
        return;
      }

      this.$store.dispatch('log/setItem', {
        to: this.targetItem.to,
        from: this.targetItem.from,
        title: titleId,
        what: this.targetItem.what,
        date: Math.round(this.targetItem.date.getTime() / 1000)
      });
    },

    modifyItem: function () {

      let titleId = this.getTargetItemTitleId();

      if (titleId == 0) {
        this.$store.dispatch('notify/showNotifyByCode', 303, { root: true });
        return;
      }

      this.$store.dispatch('log/setItem', {
        id: this.targetItem.id,
        to: this.targetItem.to,
        from: this.targetItem.from,
        title: titleId,
        what: this.targetItem.what,
        date: Math.round(this.targetItem.date.getTime() / 1000)
      });
    },

    deleteItem: function () {
      this.$store.dispatch('log/deleteItem', {
        id: this.targetItem.id,
      });
    },

    editItem: function (id) {

      let itemToBeModified = this.items.filter(obj => {
        return obj.id === id
      })[0];

      let localTo = this.users.filter(obj => {
        return (obj.surname + ' ' + obj.name) === itemToBeModified.to
      })[0].id;

      let localFrom = this.users.filter(obj => {
        return (obj.surname + ' ' + obj.name) === itemToBeModified.from
      })[0].id;

      // let localTitle = this.titles.filter(obj => {
      //   return obj.name === itemToBeModified.title
      // })[0].id;

      this.targetItem.id = itemToBeModified.id;

      // this.targetItem.title = localTitle;
      this.targetItem.title = itemToBeModified.title;
      this.targetItem.to = localTo;
      this.targetItem.from = localFrom;
      this.targetItem.what = itemToBeModified.what;

      let date = new Date();
      date.setTime(itemToBeModified.date * 1000);
      this.targetItem.date = date;

      this.isNewItemMayBeAdded = false;
    },

    switchUsers: function () {
      let temp = this.targetItem.to;
      this.targetItem.to = this.targetItem.from;
      this.targetItem.from = temp;
    },

    resetToAdd: function () {
      this.targetItem.id = null;
      this.isNewItemMayBeAdded = true;
      this.targetItem.date = new Date();
    },

    startDragging: function () {
      this.isDragging = true;
    },

    stopDragging: function () {
      this.isDragging = false;
    },

    uploadFile: function (file, i) {

      let uin = this.guid();

      this.attachedFiles.push({
        uin: uin,
        name: file.name,
        actualSize: file.size,
        uploadedSize: 0
      });

      var url = 'http://tcm.api/api/upload_file';
      var xhr = new XMLHttpRequest();
      var formData = new FormData();
      xhr.open('POST', url, true);

      let progressCallback = this.updateProgress.bind(this);

      // Добавили следующие слушатели
      xhr.upload.addEventListener("progress", function (e) {
        progressCallback(uin, e.loaded, e.total)
      });


      xhr.addEventListener('readystatechange', function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log("OK");
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
          console.log("ERROR");
        }
      })
      formData.append('test_file', file)
      xhr.send(formData);

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

      this.attachedFiles.map(function (item) {
        if (item.uin == uin) {
          item.uploadedSize = uploadedBytes;
          item.actualSize = totalBytes;
        }
      });

    }

  }
};
</script>

<style>
.td-date {
  width: 130px;
}

.td-title {
  width: 120px;
}

.text-center {
  text-align: center;
}

#drop-area {
  border: 2px dashed #ccc;
  border-radius: 20px;
  height: 200px;
  /* font-family: sans-serif; */
  margin-top: 40px;
  padding-top: 80px;
  text-align: center;
  /* vertical-align: middle; */
  font: 21pt bold arial;
  color: gray;
}
</style>