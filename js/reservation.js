
// parse a date in yyyy-mm-dd format
function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}

function isValidDate(dateString)
{
    // First check for the pattern
    var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

    if(!regex_date.test(dateString))
    {
        return false;
    }

    // Parse the date parts to integers
    var parts   = dateString.split("-");
    var day     = parseInt(parts[2], 10);
    var month   = parseInt(parts[1], 10);
    var year    = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
    {
        return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

function fillPlace()
{
    if (localStorage.getItem('place'))
    {
        document.getElementById('place').value = localStorage.getItem('place');
        localStorage.removeItem('place');
    }

    $('#place').prop('disabled', true);
}

function formValid()
{

    console.log('hello');
    var response = ""

    if (document.getElementById('place').value == '')
    {
        response += "'Place' cannot be empty.\n";
    }

    if (document.getElementById('dateFrom').value == document.getElementById('dateTo').value)
    {
        response += "Dates can't be equal.\n";
    }

    var personsTraveling = document.getElementById('persons').options[document.getElementById('persons').selectedIndex].value;
    var roomCapacity = document.getElementById('room').options[document.getElementById('room').selectedIndex].value

    if (personsTraveling > roomCapacity)
    {
        response += "Number of persons traveling can't be larger then the room's capacity.\n"
    }

    var dateFromValid = isValidDate(document.getElementById('dateFrom').value);
    if (!dateFromValid)
    {
        response += "'Date From' field is not in valid format.\n"
    }

    var dateToValid = isValidDate(document.getElementById('dateTo').value);
    if (!dateToValid)
    {
        response += "'Date To' field is not in valid format.\n"
    }

    if (dateToValid && dateFromValid)
    {
        var dateFrom = parseDate(document.getElementById('dateFrom').value);
        var dateTo = parseDate(document.getElementById('dateTo').value);

        if (dateFrom > dateTo)
        {
            response += "'Date To' must be later than 'Date From'.\n"
        }
    }

    re = /\d{4}-\d{4}-\d{4}-\d{4}/
    if (!re.test(document.getElementById('creditCard').value))
    {
        response += "Credit card number is not in the proper format.\n"
    }

    if (response == "") {
    var now = new Date();
    var arr = store.get('reservations');
    if (arr === undefined) arr = new Array();
    arr.push({
        place: document.getElementById('place').value,
        dateFrom: document.getElementById('dateFrom').value,
        dateTo: document.getElementById('dateTo').value,
        persons: document.getElementById('persons').options[document.getElementById('persons').selectedIndex].value,
        reserveTime: now
    });
    store.set('reservations', arr);
}
return response;

}

$(document).ready(function() {

    $("#reservationForm").submit(function(e){
        var response = formValid();
        if (response != '')
        {
            alert(response)
            e.preventDefault();
        }
    });

});
