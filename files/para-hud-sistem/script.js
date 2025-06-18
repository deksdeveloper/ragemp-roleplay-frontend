var ParaIslem = new Vue({
    el: ".main",
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        }
    }
});