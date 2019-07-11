export default {
    namespaced: true,

    state: {},

    getters: {},

    mutations: {},

    actions: {

        create: (context, payload) => {

            let parameters = {
                queryName: "task_create",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },


    }

}