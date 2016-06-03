
// parse a date in yyyy-mm-dd format
function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
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

    var dateFrom = parseDate(document.getElementById('dateFrom').value);
    var dateTo = parseDate(document.getElementById('dateTo').value);

    if (dateFrom > dateTo)
    {
        response += "'Date To' must be later than 'Date From'.\n"
    }

    re = /\d{4}-\d{4}-\d{4}-\d{4}/
    if (!re.test(document.getElementById('creditCard').value))
    {
        response += "Credit card number is not in the proper format.\n"
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