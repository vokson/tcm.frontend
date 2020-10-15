export default {
    namespaced: true,

    actions: {

        getDatabaseBackup: (context) => {

            let parameters = {
                queryName: "service_database_backup",
                data: {},
            };

            context.dispatch('download/do', parameters, { root: true })
        },

        deleteFilesWithoutArticles: (context) => {

            let parameters = {
                queryName: "log_files_delete_files_without_articles",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        updateDocsRevisionPriorityIndex: (context) => {

            let parameters = {
                queryName: "docs_update_priority_indexes",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        }


    }

}