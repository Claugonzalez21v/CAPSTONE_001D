const DB = {

    /* ===== USERS ===== */
    getUsers(){
        return JSON.parse(localStorage.getItem("users")) || [];
    },

    saveUsers(users){
        localStorage.setItem("users", JSON.stringify(users));
    },

    addUser(user){
        let users = this.getUsers();
        users.push(user);
        this.saveUsers(users);
    },

    findUser(username, password){
        return this.getUsers().find(
            u => u.user === username && u.pass === password
        );
    },

    userExists(username){
        return this.getUsers().some(
            u => u.user === username
        );
    },

    /* ===== RESERVAS ===== */
    getReservas(){
        return JSON.parse(localStorage.getItem("reservas")) || [];
    },

    saveReservas(reservas){
        localStorage.setItem("reservas", JSON.stringify(reservas));
    },

    addReserva(reserva){
        let reservas = this.getReservas();
        reservas.push(reserva);
        this.saveReservas(reservas);
    },

    deleteReserva(index){
        let reservas = this.getReservas();
        reservas.splice(index, 1);
        this.saveReservas(reservas);
    },

    /* ===== NOTIFICACIONES ===== */
    getNotifs(){
        return JSON.parse(localStorage.getItem("notifs")) || [];
    },

    saveNotifs(notifs){
        localStorage.setItem("notifs", JSON.stringify(notifs));
    },

    addNotif(text){
        let notifs = this.getNotifs();
        notifs.push(text);
        this.saveNotifs(notifs);
    },

    deleteNotif(index){
        let notifs = this.getNotifs();
        notifs.splice(index, 1);
        this.saveNotifs(notifs);
    }

};