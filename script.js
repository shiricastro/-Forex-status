var currency = ["AUD","GBP", "JPY"];
var ob ={};

$('.button-convert').click(function(e){
   getVal();
   $('form').addClass('view');
   $('div.alert').css({display:"none"});
});

function getVal(){
$(currency).each(function(i,el){
    var data = {base:el,symbols:"USD" }; 
    $.get('//api.fixer.io/latest', data ,function(data){
       $(""+ '.time'+ el + "").text(data.date);
       let price = data.rates.USD.toFixed(4);
       $(""+ '.price'+ el + "").text(price);
       ob[el] = price;
    });    
});
}

$('form').on('submit', function(e){
    e.preventDefault(); 
    if($('form').hasClass('view')){
         if ($('input#quantity').val() > 0 ){
            var inputVal = $('input#quantity').val();
         }else{
            $('input#quantity').val(1);
            var inputVal = 1;     
         }
         var selectVal = $('select#selectVal').val();
         var answer = (parseInt(inputVal) * ob[selectVal]);
        $('input#disabledInput').val(answer.toFixed(4));         
    }else{
        $('div.alert').css({display:"block"});
    }
  
});

 $('select#selectVal').change(clean);
 $('input#quantity').change(clean);
 
 function clean(){
     $('input#disabledInput').val(" ");
 }


/******timestamp to time normal format******/
/*
 $(data).each(function(i,el){
    let date = new Date(el.timestamp*1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
});
 */