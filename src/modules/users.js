export default {
    namespaced: true,

    state: {
        items: null,
        userId: null
    },

    getters: {
        give: function (state) {
            return state.items;
        }
    },

    mutations: {
        // setUserId: function (state, id) {
        //     state.userId = id;
        // },

        update: function (state, data) {
            // state.items = data.map(function (item) {
            //     item.isMe = (item.id == state.userId)
            //     return item;
            // });
            state.items = data;
        },
    },

    actions: {

        get: (context) => {

            let parameters = {
                queryName: "user_get",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}