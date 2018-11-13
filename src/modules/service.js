export default {
    namespaced: true,

    actions: {

        getDatabaseBackup: (context) => {

            let parameters = {
                queryName: "service_database_backup",
                data: {},
            };

            context.dispatch('query/sendInOrderToGetFile', parameters, { root: true })
        },

        updateAttachmentStatus: (context) => {

            let parameters = {
                queryName: "service_database_update_attachment_status",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        }

    }

}