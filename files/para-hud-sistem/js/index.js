var StockGov = new Vue({
    el: ".main",
    data: {
		active: false,
		style: 0,
		name: "rent",
		items: null,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        },
		deks: function(para, islem) {
			mp.trigger("client::deks", para, islem);
			mp.trigger("Hide_Crafting_System");
		},
		exit: function() {
			mp.trigger("Hide_Crafting_System");
		},
    }
});