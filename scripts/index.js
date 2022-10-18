const init_date={
    year:1999,
    month:11,
    day:31,
    hour:23,
    minutes:00,
    secondes:00
}

// Secondes avant que le timer se reset lors d'une victoire


var current_date = new Date(0);
var tick_func;

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function refresh_display(){
    $( ".timer-hours" ).text(current_date.getUTCHours().toString().padStart(2, '0'));
    $( ".timer-minutes" ).text(current_date.getUTCMinutes().toString().padStart(2, '0'));
    $( ".timer-year" ).text(current_date.getUTCFullYear());
    $(".timer-seconds").val(map_range(current_date.getUTCSeconds(),0,60,0,100));
    //$( ".reset-btn" ).click(reset);

}

const date_limit = new Date(Date.UTC(2000))

function tick(){
    //console.log(current_date.toUTCString());
    if(current_date>=date_limit){
        window.clearInterval(tick_func);
        $( "#videoloose" ).show();
        $( "#videoloose" ).get(0).play();
    }
    current_date.setUTCSeconds(current_date.getUTCSeconds()+1);
    refresh_display();
}

function init(){
    $( "#start-btn" ).hide();
    reset();
}

function reset(){
    current_date.setUTCSeconds(init_date.secondes);
    current_date.setUTCMinutes(init_date.minutes);
    current_date.setUTCHours(init_date.hour);
    
    current_date.setUTCDate(init_date.day);
    current_date.setUTCMonth(init_date.month);
    current_date.setUTCFullYear(init_date.year);

    window.clearInterval(tick_func);
    tick_func = window.setInterval(tick,1000);
    //init_date.year,init_date.month,init_date.day,init_date.hour,init_date.minutes,init_date.secondes);
    refresh_display();
}

function keyUpEvent(e){

    // Increase le timer d'une seconde
    if(e.code=="KeyO"){
        window.clearInterval(tick_func);
        $( "#videowin" ).show();
        $( "#videowin" ).get(0).play();
    }
}


window.document.addEventListener("keyup",keyUpEvent);



