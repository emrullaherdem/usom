
var search = document.getElementById("search-button")
var obj = []
var results = []
document.getElementById('file').addEventListener('change', function() {
    console.log("worked")
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(){
        var content = reader.result;
        obj = content.split("\r\n")
    }
    reader.readAsText(file);

    reader.onerror = function(error){
        console.log('Error', error);
    }
});

search.addEventListener('click',function(){
    results.length=0
    searchresults(obj)
})

function searchresults(obj){
    for(var i = 0; i<obj.length; i++){
        $.ajax({
            url: `https://www.usom.gov.tr/api/address/index?q=${obj[i]}`,
            method: "GET",
            success: function (result) {
               if(result.count==1){
                results.push(result.models[0].url+"\n")
               }
               $("#resultsarea").val(results)
            },
            error: function (result) {
                alert("bir hata oluştu")
            }
        });
    }
}