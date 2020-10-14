<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 v-if="language === 'RUS'">Пакуй PDF</h3>
        <h3 v-else-if="language === 'ENG'">Merge PDF</h3>
      </div>
    </div>

    <div class="row pdf-merge-description">
      <div class="col-8">
      {{ (language == 'RUS') ? 'Пользоваться нужно следующим образом. Перетаскиваете файлы и бросаете их в контейнер. Файлы, брошенные за один раз, образуют группу. Объединение происходит, начиная с 1-ой группы и далее по порядку. Внутри группы файлы сортируются в алфавитном порядке. Имя будущего файла можно выбрать из имен загруженных файлов.' : 'Merging tool to be used in following way. Drag files and drop them into container. Files dropped together is group. Merging will be done starting from 1st group, then 2nd, 3rd etc. Inside group files will be sorted in alphabetical order. Name of merged file can be choosen from names of uploaded files.' }}
      </div>
    </div>

    <div class="row">

      <div class="col-8 col-drop-area">
        <div class="pdf-drop-area">
          {{ (language == 'RUS') ? 'Брось файл сюда (каждый не более ' + formatBytes(property_max_file_size) +')' : 'Drop file here (each not heavier ' + formatBytes(property_max_file_size) +')' }}
        </div>
      </div>

      <div class="col-4">

        <div class="row">

          <button
            type="button"
            class="btn btn-block btn-warning"
            v-if="isMergingInProgress"
            disabled
          >
            {{ (language == 'RUS') ? 'Выполняется объединение ...' : 'Merging in progress ...' }}
            <span class="badge badge-light">{{countOfItems}}</span>
          </button>

          <button
            type="button"
            class="btn btn-block btn-success"
            v-on:click="downloadMergedFile"
            v-else
          >
            {{ (language == 'RUS') ? 'Объединить' : 'Merge' }}
            <span class="badge badge-light">{{countOfItems}}</span>
          </button>

        </div>

        <div class="row">
          <button
            type="button"
            class="btn btn-block btn-primary"
            v-on:click="cleanItems"
          >
            {{ (language == 'RUS') ? 'Очистить' : 'Clean' }}
          </button>
        </div>

      </div>

    </div>

    <div class="row">
      <div class="col-1"></div>
      <div class="col-11">

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

          <div class="col-9">
            {{item.original_name}}
          </div>

          <div class="col-2">
            {{formatBytes(item.size)}}
          </div>

        </div>

      </div>
    </div>

    <div class="row">

      <table class="table table-striped">

        <thead>
          <th class="text-center">{{ (language == 'RUS') ? 'Имя от файла' : 'Name from file' }}</th>
          <th class="text-center">{{ (language == 'RUS') ? 'Загружено' : 'Uploaded' }}</th>
          <th class="text-center">{{ (language == 'RUS') ? 'Группа' : 'Group' }}</th>
          <th>{{ (language == 'RUS') ? 'Имя файла' : 'Filename' }}</th>
        </thead>

        <tbody>

          <tr
            v-for="item in items"
            :key="item.id"
            v-on:click="setMainName(item.id)"
          >
            <td class="text-center"> <img
                src="./img/approved.png"
                width="20"
                height="20"
                title="Имя для объединенного файла / Name for merged file"
                v-if="item.is_name === '1'"
              ></td>

            <td class="text-center">{{formatDate(item.date)}}</td>
            <td class="text-center"> {{item.group}} </td>

            <td> {{item.filename}} </td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>

</template>

<script>

export default {
  name: "MergePdf",


  data: function () {
    return {

      isDragging: false,
      maxFileSize: 100 * 1024 * 1024,
      dropUin: null

    };
  },

  mounted: function () {

    this.$nextTick(function () {

      this.cleanAttachedFiles();

      this.getItems();

      // Очищаем установленные по умолчанию обработчики событий
      let dropAreas = document.getElementsByClassName('col-drop-area');

      function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      for (let area of dropAreas) {

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
          area.addEventListener(eventName, preventDefaults, false)
        });

        ['dragenter', 'dragover'].forEach(eventName => {
          area.addEventListener(eventName, this.startDragging, false)
        });

        ['dragleave', 'drop'].forEach(eventName => {
          area.addEventListener(eventName, this.stopDragging, false)
        });

        ['drop'].forEach(eventName => {
          area.addEventListener(eventName, this.handleDrop, false)
        });

      }

    })

  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

    isMergingInProgress: function () {
      return this.$store.getters['pdf_merge_file/giveIsMergingInProgress'];
    },

    items: function () {
      return this.$store.getters['pdf_merge/giveItems'];
    },

    countOfItems: function () {
      return (this.items == null) ? 0 : this.items.length;
    },

    attachedFiles: function () {
      return this.$store.getters['pdf_merge_file/give'];
    },

    property_max_file_size: function () {
        let mb = this.$store.getters['setting/give_property']('FRONTEND_MERGE_PDF_MAX_FILE_SIZE_MB');
        return Number.parseInt(mb) * 1024 * 1024;
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

    getItems: function () {
      this.$store.dispatch('pdf_merge/getItems', {});
    },

    cleanItems: function () {
      this.$store.dispatch('pdf_merge/cleanItems', {});
    },

    cleanAttachedFiles: function () {
      this.$store.commit('pdf_merge_file/clean', {});
    },

    downloadMergedFile: function () {
      this.$store.dispatch('pdf_merge_file/download', {});
    },

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

    setMainName: function (id) {
      this.$store.dispatch('pdf_merge/setMainName', {
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

      let uin = window.$guid();
      let progressCallback = this.updateProgress.bind(this);

      let badUploadFunction = function () {
        this.$store.commit('pdf_merge_file/deleteSuccess', uin, { root: true });
      };

      this.$store.dispatch('pdf_merge_file/upload', {
        pdf_file: file,
        uin: uin,
        drop_uin: this.dropUin,


        progressCallback: function (e) {
          progressCallback(uin, e.loaded, e.total)
        },

        badFileUploadCallback: badUploadFunction.bind(this)

      });

    },

    handleDrop: function (e) {
      this.dropUin = window.$guid();
      let dt = e.dataTransfer;
      let files = dt.files;
      files = [...files];
      files.forEach(this.uploadFile);
    },

     formatBytes: function(bytes, decimals) {
      return window.$formatBytes(bytes, decimals);
    },

    updateProgress: function (uin, uploadedBytes, totalBytes) {

      this.$store.commit('pdf_merge_file/updateProgress', {
        uin: uin,
        size: totalBytes,
        uploadedSize: uploadedBytes
      });

    },

  },

};
</script>

<style>
.text-center {
  text-align: center;
}

.pdf-drop-area {
  border: 2px dashed #46e385;
  border-radius: 20px;
  height: 100px;
  padding-top: 30px;
  text-align: center;
  font: 21pt bold arial;
  color: gray;
}

.pdf-merge-description {
  font-size: 12pt;
  color: green;
  text-align: justify;
}
</style>