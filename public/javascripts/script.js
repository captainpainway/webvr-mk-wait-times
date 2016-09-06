$(document).ready(function() {
    getData();
});

function getData() {
    $.get('times.json', function(data) {
        rideTimes(data);
        rideNames(data);
    });
    setTimeout(getData, 60000);
}

function rideNames(data) {
    $(document).on('click', function(event) {
        var clickable = event.originalEvent.target.className;
        var attraction = event.originalEvent.target.id;
        if(clickable == "clickable") {
            var name = document.getElementById('attraction');
            var waittime = document.getElementById('waittime');
            $(data).each(function(index, obj) {
                window.clearTimeout(this.timeout);
                if(obj.id == attraction) {
                    ridename = obj.name;
                    source = ridename.replace(/[^A-Za-z]+/g, "").toLowerCase();
                    name.setAttribute('src', '#' + source);
                    name.setAttribute('visible', 'true');
                    waittime.setAttribute('src', '#time' + obj.waitTime);
                    waittime.setAttribute('visible', 'true');
                }
                this.timeout = window.setTimeout(function(){
                    name.setAttribute('visible', 'false');
                    waittime.setAttribute('visible', 'false');
                }.bind(this), 2000);
            });
        }
    });
}

function rideTimes(data) {
    $(data).each(function(index, obj) {
        var cylinder = $('#' + obj.id);
        if(obj.status == "Operating") {
            if(obj.waitTime < 5) {
                var height = 2;
                var color = '#00a300';
            } else if (obj.waitTime < 30) {
                var height = obj.waitTime;
                var color = '#00a300';
            } else if (obj.waitTime >= 30 && obj.waitTime <= 60) {
                var height = obj.waitTime;
                var color = '#ffc40d';
            } else {
                var height = obj.waitTime;
                var color = '#ee1111';
            }
            cylinder.attr('height', height);
            cylinder.attr('color', color);
        } else if (obj.status == "Closed" || "Down") {
            cylinder.attr('height', 2);
            cylinder.attr('color', '#333');
        }
    });
}
