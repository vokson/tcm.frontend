<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 v-if="language === 'RUS'">Редактирование трансмитталов</h3>
        <h3 v-else-if="language === 'ENG'">Edit transmitals</h3>
      </div>
    </div>

    <div class="row">

      <div class="col-5">
        <td class="text-center full-width"><input
            type="text"
            v-model="search.transmittal"
            placeholder="Титул"
          />
        </td>
      </div>

      <div class="col-2">
        <div class="row">
          <button
            type="button"
            class="btn btn-warning"
            v-on:click="getListOfDocsForTransmittal"
          >
            {{ (language == 'RUS') ? 'Найти' : 'Search' }}
            <span class="badge badge-light">{{countOfDocs}}</span>
          </button>
        </div>

        <div class="row">
          <button
            type="button"
            class="btn btn-danger"
            v-on:click="saveListOfDocsForTransmittal"
          >
            {{ (language == 'RUS') ? 'Сохранить' : 'Save' }}
          </button>
        </div>

        <div class="row">
          <button
            type="button"
            class="btn btn-success"
            v-on:click="addNewDoc"
          >
            {{ (language == 'RUS') ? 'Добавить' : 'Add' }}
          </button>
        </div>
      </div>

      <div class="col-5">

        <div class="row">
          <div
            class="col"
            id="col-drop-area"
          >
            <div id="doc-drop-area">
              {{ (language == 'RUS') ? 'JSON (не более ' + formatBytes(maxFileSize) +')' : 'JSON ( not heavier ' + formatBytes(maxFileSize) +')' }}
            </div>
          </div>
        </div>

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

    <br />

    <div class="row">

      <table class="table table-striped">
        <thead>
          <tr>
            <th class="text-center">ID</th>
            <th class="td-code-1 text-center">{{ (language == 'RUS') ? 'Код TCM' : 'TCM Code' }}</th>
            <th class="td-code-2 text-center">{{ (language == 'RUS') ? 'Код НИИК' : 'NIIK Code' }}</th>
            <th class="td-revision text-center">{{ (language == 'RUS') ? 'Рев' : 'Rev' }}</th>
            <th class="td-class text-center">{{ (language == 'RUS') ? 'Класс' : 'Class' }}</th>
            <th class="td-title-en text-center">{{ (language == 'RUS') ? 'Имя ENG' : 'Title ENG' }}</th>
            <th class="td-title-ru text-center">{{ (language == 'RUS') ? 'Имя RUS' : 'Title RUS' }}</th>
          </tr>
        </thead>
        <tbody>

          <tr
            v-for="item in docs"
            :key="item.id"
          >
            <td class="text-center td-id"> <img
                src="./img/delete.png"
                width="40"
                height="40"
                class="hover06"
                title="Удалить / Delete"
                v-on:click="deleteDoc(item.id)"
              ></td>

            <td class="text-center td-code">

              <input
                v-if="isValid(tcmCodeRegExp, item.code_1)"
                type="text"
                v-model="item.code_1"
                class="full-width"
              />

              <input
                v-else
                type="text"
                v-model="item.code_1"
                class="full-width bg-danger"
              />

            </td>

            <td class="text-center td-code">

              <input
                v-if="isValid(niikCodeRegExp, item.code_2)"
                type="text"
                v-model="item.code_2"
                class="full-width"
              />

              <input
                v-else
                type="text"
                v-model="item.code_2"
                class="full-width bg-danger"
              />

            </td>
            <td class="text-center td-revision">

              <input
                v-if="isValid(revRegExp, item.revision)"
                type="text"
                v-model="item.revision"
                class="full-width"
              />

              <input
                v-else
                type="text"
                v-model="item.revision"
                class="full-width bg-danger"
              />

            </td>

            <td class="text-center td-class">
              <input
                v-if="isValid(classRegExp, item.class)"
                type="text"
                v-model="item.class"
                class="full-width"
              />

              <input
                v-else
                type="text"
                v-model="item.class"
                class="full-width bg-danger"
              />

            </td>
            <td class="text-center">
              <input
                type="text"
                v-model="item.title_en"
                class="full-width"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                v-model="item.title_ru"
                class="full-width"
              />
            </td>

          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "DocsEdit",


  data: function () {
    return {

      en: en,
      ru: ru,
      maxFileSize: 1 * 1024 * 1024,
      isDragging: false,
      tcmCodeRegExp: /^4022-[A-Z]{2}-[A-Z]{2}-(00000|66210|66220|66230|66321|66340|66341|66422|66450|66560|66570|66580|66690)(\d{4}|\d{2}-\d{3}|\d{1}-\d{3}(\s[A-Z]\d?)?)(_C_RH_(OP|CL))?$/,
      niikCodeRegExp: /^7500081106-(00000|66210|66220|66230|66321|66340|66341|66422|66450|66560|66570|66580|66690)-(КМ|КЖ|АР|ЭГ|НВК|НВК|ОВ)\d{0,2}(\.(РР|ТИ|ТЗ))?-\d{4}$/,
      revRegExp: /\d{1}[A-Z0-9]{1}$/,
      classRegExp: /^(A|C|I|RQ|FI|IFC)$/,


      search: {
        transmittal: ""
      }

    };
  },

  mounted: function () {

    this.$nextTick(function () {

      this.$store.commit('docs_edit_file/clean', {}, { root: true });

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

    docs: function () {
      return this.$store.getters['docs_edit/give'];
    },

    countOfDocs: function () {
      return (this.docs == null) ? 0 : this.docs.length;
    },

    attachedFiles: function () {
      return this.$store.getters['docs_edit_file/give'];
    },

  },

  methods: {

    getListOfDocsForTransmittal: function () {
      this.$store.dispatch('docs_edit/get', {
        transmittal: this.search.transmittal
      });
    },

    saveListOfDocsForTransmittal: function () {
      this.$store.dispatch('docs_edit/set', {
        items: this.docs
      });
    },

    addNewDoc: function () {
      this.$store.dispatch('docs_edit/add', {
        transmittal: this.search.transmittal
      });
    },

    deleteDoc: function (id) {
      this.$store.dispatch('docs_edit/delete', {
        doc_id: id
      });
    },

    startDragging: function () {
      this.isDragging = true;
    },

    stopDragging: function () {
      this.isDragging = false;
    },

    uploadFile: function (file) {

      console.log(file);

      if (file.size > this.maxFileSize) {
        this.$store.dispatch('notify/showNotifyByCode', "E_FILE_004", { root: true });
        return;
      }

      this.search.transmittal = file.name.split('.').slice(0, -1).join('.');

      let uin = this.guid();
      let progressCallback = this.updateProgress.bind(this);

      let badUploadFunction = function () {
        this.$store.commit('docs_edit_file/deleteSuccess', uin, { root: true });
      };

      this.$store.dispatch('docs_edit_file/upload', {
        log_file: file,
        uin: uin,
        // transmittal: this.search.transmittal,

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

      this.$store.commit('docs_edit_file/updateProgress', {
        uin: uin,
        size: totalBytes,
        uploadedSize: uploadedBytes
      });

    },

    isValid: function (regexp, str) {
      return regexp.test(str);
    }

  },


};
</script>

<style>
.td-code {
  width: 200px;
}

.td-revision,
.td-class,
.td-id {
  width: 40px;
}

.td-title {
  width: 200px;
}

.text-center {
  text-align: center;
}

.full-width {
  width: 100%;
}

#doc-drop-area {
  border: 2px dashed #ccc;
  border-radius: 20px;
  height: 100px;
  padding-top: 30px;
  text-align: center;
  font: 16pt bold arial;
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

.bg-danger {
  background-color: #dc3545 !important;
}
</style>