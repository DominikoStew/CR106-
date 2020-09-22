var serverURL="http://restclass.asurewebsites.net/API/";
var items = [];


function fetchCatalog() {
    // get items from server
    $.ajax({
        url:serverURL+"point",
        type:"GET",
        success:function(res){
            console.log('it works',res);
            for(var i=0;i<res.length;i++){
                if(res[i].user=="Dominique" && res[i].title!="" && res[i]. description!=""&& res[i].code!=""){
                items.push(res[i]);
                }
            }
            displayCatalog();
            console.log();
        },
            error:function(details){
            console.log('Error',details);
        }
    });
}

function displayCatalog(){
    for(let i=0; i<items.length;i++){
        var item =items[i];
        drawItem(item);
    }
}

function drawItem(product) {
    var layout = `
    <div id="${product.code}" class="${product.code} 
            <img src="${product.image}">
            <h4>${product.title}</h4>
            <h5 class="itemPrice">$${product.price}</h5>
            <p> ${product.description} </p>
            <div>
                <button class="btn btn-primary">Add to cart </button>
            </div>
        </div> `;

    $('#catalog').append(layout);

}

function Search() {
    var searchText = $('#txt-search').val();

    $('#catalog').html("");

    for (var i=0;i<items.length;i++){

        var item = items[i];

        if (item.title.toLowerCase().includes(searchText) || item.description.toLowerCase().includes(searchText) || item.category.toLowerCase().includes(searchText) || item.price.toString().includes(searchText) || item.code.toString().includes(searchText)){
            drawItem(item);
        } 
    } 
}

function init() {

    console.log('Catalog page');
    fetchCatalog();

    // detecting events
    $('#btn-search').click(Search);

    $('#txt-search').change(function(){
        var searchText = $('#txt-search').val();
        for ( var i=0;i<items.length;i++){
            if(searchText==''){
                //$('#'+items[i].code).show();
                drawItem(items[i]);
            }
        }
    });

    $('#txt-search').keypress(function(e) {
        console.log(e);
        if(e.keyCode == 13){
            Search();
        }
    });

    $('#txt-search').keypress(function(e){
        if(e.keycode==13){
            Search();
        }
    });

}



window.onload = init;