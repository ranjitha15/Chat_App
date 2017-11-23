[{
    id: '/123',
    name: "Ranjitha",
    room: "Node"
}];

//addUser(id,name,room)
//removerUser(id)
//getUser(id)
//getUserList(room)

//--Storing Users with ES6 classes--//

class Users {
    constructor () {
        this.users = [];
    } //initialize instance of your class
    addUSer(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }
    removerUser(id){
      //return user that was removed
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=>user.id !== id);
        }
        return user;
    }
    getUser(id){
        return this.users.filter((user) => user.id === id)[0];

    }
    getUserList(room){
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = {Users};
