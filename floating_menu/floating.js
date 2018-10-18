
var Floating = (function(){
    function Obj(opt){
        
        this.init();
    }


    Obj.prototype = {
        init:function(){
        console.log(2)
    },
}

    return Obj;
})();



var floating = new Floating({
    a:1,
    b:'d'
});
