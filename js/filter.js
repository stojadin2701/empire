
function applyFilter()
{   
    var path = window.location.pathname;
    var pageName = path.split("/").pop().slice(0,-5);

    if (pageName.indexOf('-cheap') > -1)
        pageName = pageName.substring(0, pageName.indexOf('-cheap'));
    if (pageName.indexOf('-expensive') > -1)
        pageName = pageName.substring(0, pageName.indexOf('-expensive'));

    filterValue = $('input[name=price]:checked').val();
    console.log(filterValue);

    var pathArray = window.location.href.split('/').slice(0,-1);
    pathArray.push(pageName + "-" + filterValue + ".html");
    location.href = pathArray.join('/');
    console.log(filterValue); 
}

$(document).ready(function() {

    var $radios = $('input:radio[name=price]');

    var path = window.location.pathname;
    var pageName = path.split("/").pop().slice(0,-5);

    if (pageName.indexOf('-cheap') > -1)
        $radios.filter('[value=cheap]').prop('checked', true);
    else if (pageName.indexOf('-expensive') > -1)
        $radios.filter('[value=expensive]').prop('checked', true);
    else
        $("input:radio").attr("checked", false);
});