var serverURL="http://restclass.asurewebsites.net/API/";
let items=[];


class Item{
    constructor(code,title,price,description,category,image){
        this.code=code;
        this.title=title;
        this.price=price;
        this.description=description;
        this.category=category;
        this.image=image;
        this.user="Dominique";
    }
}

function clearForm(){
    $('#code').val("");
    $('#title').val("");
    $('#price').val("");
    $('#description').val("");
    $('#category').val("");
    $('#image').val("");
}

function register() {
    // save the input values into variables
    let code = $('#code').val();
    let title = $('#title').val();
    let price = $('#price').val();
    let description = $('#description').val();
    let category = $('#category').val();
    let image = $('#image').val();

    // prevents null input. Only allow it to work if these conditions are different from empty. 
    if (code != "" && title != "" && price != "") {
        // create the object using the constructor
        let newItem = new Item (code, title, price, description, category, image); 
        // push the items into the array
        items.push(newItem);
        var jsonString = JSON.stringify(newItem);
        // display on the console
        console.table(newItem);
        console.log(jsonString);
        console.table(items);
    }

    $.ajax({
        url:serverURL + "items", // use the URL variable so if the URL on top changes the code stays the same.
        type:"POST", 
        contentType:"application/json",
        data:jsonString,
        success:function(response) {
            console.log("Ajax !-Connected-!", response);
            // show notification to user
            $('#alert-box').removeClass('hidden');
            // hide the notification
            setTimeout(function(){
                $('#alert-box').addClass('hidden');
            }, 3000);
        },
        error:function(errorDetails) {
            console.log("Something went wrong...", errorDetails);
        }
    });

    clearForm();
}


    

function init(){
    console.log("admin page");
    $('#btn-register').on('click',function(){
        register();
    });

}
window.onload=init;