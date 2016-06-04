function showRecent(place1, place2) {
    var arr = store.get('reservations');
    var place, dateFrom, dateTo, persons;
    if (arr !== undefined) {
        var now = new Date();
        var lastWeek = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7);
        for (var i = 0; i < arr.length; i++) {
            var reserveTime = new Date(arr[i].reserveTime);
            if (reserveTime.getTime() - lastWeek.getTime() > 0) {
                place = arr[i].place;
                if (place === place1 || place === place2) {
                    dateFrom = arr[i].dateFrom;
                    dateTo = arr[i].dateTo;
                    persons = arr[i].persons;
                    document.getElementById('recent_reservations').innerHTML +=
                        "<div class='col-md-3'>" +
                        "<div class='panel panel-default'>" +
                        "<div class='panel-heading text-center'>" +
                        "<h3 class='panel-title'>" + place + "</h3>" +
                        "</div>" +
                        "<ul class='list-group'>" +
                        "<li class='list-group-item'> <strong>From: </strong>" + dateFrom +
                        "</li><li class='list-group-item'><strong>Until: </strong>" + dateTo +
                        "</li><li class='list-group-item'><strong>Persons: </strong>" + persons + "</ul> </div> </div>"

                }
            }
        }
    }
}
