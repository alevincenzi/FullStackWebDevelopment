'use strict';

angular
.module('confusionApp', [])
.controller('menuController', function() {

    this.tab = 1;
    this.filtText = '';

    this.select = function(setTab) {
        this.tab = setTab;  

        if (setTab === 2){
            this.filtText = "appetizer";
        } else if (setTab === 3){
            this.filtText = "mains";
        } else if (setTab === 4){
            this.filtText = "dessert";
        } else {
            this.filtText = "";                
        }
    };

    this.isSelected = function (checkTab) {
        return (this.tab === checkTab);
    };
    
    var dishes=[
    {
       name:'Uthapizza',
       image: 'images/uthapizza.png',
       category: 'mains',
       label:'Hot',
       price:'4.99',
       description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
       comment: ''
    },
    {
       name:'Zucchipakoda',
       image: 'images/zucchipakoda.png',
       category: 'appetizer',
       label:'',
       price:'1.99',
       description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
       comment: ''
    },
    {
       name:'Vadonut',
       image: 'images/vadonut.png',
       category: 'appetizer',
       label:'New',
       price:'1.99',
       description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
       comment: ''
    },
    {
       name:'ElaiCheese Cake',
       image: 'images/elaicheesecake.png',
       category: 'dessert',
       label:'',
       price:'2.99',
       description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
       comment: ''
    }];
    
    this.dishes = dishes;
})
.controller('dishDetailController', function() {

    var dish={
        name:'Uthapizza',
        image: 'images/uthapizza.png',
        category: 'mains', 
        label:'Hot',
        price:'4.99',
        description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
        comments: [
            {
                rating:1,
                comment:"Didn't like it at all (i mean, the pizza ;) )!",
                author:"AV",
                date:"2015-12-12"
           },
           {
                rating:5,
                comment:"Imagine all the eatables, living in conFusion!",
                author:"John Lemon",
                date:"2012-10-16T17:57:28.556094Z"
           },
           {
                rating:4,
                comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                author:"Paul McVites",
                date:"2014-09-05T17:57:28.556094Z"
           },
           {
                rating:3,
                comment:"Eat it, just eat it!",
                author:"Michael Jaikishan",
                date:"2015-02-13T17:57:28.556094Z"
           },
           {
                rating:4,
                comment:"Ultimate, Reaching for the stars!",
                author:"Ringo Starry",
                date:"2013-12-02T17:57:28.556094Z"
           },
           {
                rating:2,
                comment:"It's your birthday, we're gonna party!",
                author:"25 Cent",
                date:"2011-12-02T17:57:28.556094Z"
           }
        ]
    };
    
    this.dish = dish;
    
    this.starLabelText = function (starCount) {
        if (starCount === 1){
            return "Star";
        } else {
            return "Stars";
        }
    };
});
