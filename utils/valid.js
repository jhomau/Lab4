const { collection } = require("../database/user");

var valid = {
   checkParams: function(refobj){
        var a = refobj;
        if(a.name==''||a.name==null){
            return false;
        }
        if(a.sex==''||a.sex==null){
            return false;
        }
        if(a.address==''||a.address==null){
            return false;
        }
        if(a.email==''||a.email==null){
            return false;
        }
        if(a.password==''||a.password==null){
            return false;
        }
        return true;
    },
    checkPassword: function(password){
        //La contrasena, se verificara que comienze con letra y tenga al menos 2 numero.
        var a = /([A-z])\w+([0-9])+\w+/.test(password);
        return a;
    },
    checkEmail: function(email){
        var a = /^[\w\.]+@[\w\.]+\.\w{3,3}$/.test(email);
        return a;
    }
}
module.exports = valid;