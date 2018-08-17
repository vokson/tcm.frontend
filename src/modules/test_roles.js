export default {
    namespaced: true,

    actions: {

        checkGuest: (context) => {

            let parameters = {
                queryName: "role_check_guest",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        checkEngineer: (context) => {

            let parameters = {
                queryName: "role_check_engineer",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },


        checkPm: (context) => {

            let parameters = {
                queryName: "role_check_pm",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },


        checkAdmin: (context) => {

            let parameters = {
                queryName: "role_check_admin",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },




    }

}