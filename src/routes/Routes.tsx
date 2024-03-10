export const routes = {
    event: {
        create: "/evento/criar",
        all: "/todos",
        admin: "/evento/:idEvent/admin",
        subscribe: "/evento/:idEvent/categoria/:idCategory/inscricao",
    },
    auth: {
        login: "/login",
        register: "/register",
        not_allowed: "/block"

    },
    client: {
        contact: "/contato",
        evaluate: "/avalie",
        questions: "/duvidas",
    },
    user: {
        admin: "/admin",
        perfil: "/perfil",
        setting: "/perfil/setting",
        edit: "/user/edit"
    }
}