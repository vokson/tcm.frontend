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

        updateAttachmentStatus: (context) => {

            let parameters = {
                queryName: "service_database_update_attachment_status",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        deleteFilesWithoutArticles: (context) => {

            let parameters = {
                queryName: "log_files_delete_files_without_articles",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        }

    }

}