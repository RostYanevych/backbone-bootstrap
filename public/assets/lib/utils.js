// CUSTOM UTILITY FUNCTIONS

// retrieves error messages from server's response to XHR call
/**
 * @param response -- XHR response object
 * @returns string
 */
function getErrorMsg(response){
    var error = response.statusText;
    if(response.responseJSON && response.responseJSON.error) {
        error = response.responseJSON.error;
    } else {
        if(response.responseText)
            error = response.responseText;
    }
    return error;
}

function formatEmail(email){
    if(email){
        var emailTemplate = _.template('<a href="mailto:<%=email%>"><%=email%></a>');
        return emailTemplate({email: _.escape(email)});
    }
    else
        return('');
}

function months(){
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}

function formatDateTime(value){
    if(value){
        var res = value;
        return(res);
    }
    else
        return('');
}

function dateString(dt) {
    if ($.type(dt) != "date") dt = new Date(dt);
    return months()[dt.getMonth()]+' '+dt.getDate()+', '+dt.getFullYear();
}

function dateTimeString(dt, showSeconds) {
    if ($.type(dt) != "date") dt = new Date(dt);
    var hours = dt.getHours()%12;
    if (hours == 0)
        hours = 12;
    var pm = parseInt(dt.getHours()/12);
    var seconds = dt.getSeconds() < 10 ? "0"+dt.getSeconds() : dt.getSeconds();
    var mins = dt.getMinutes() < 10 ? "0"+dt.getMinutes() : dt.getMinutes();
    var hours = hours < 10 ? "0"+hours : hours;

    str  = dateString(dt);
    str += " "+hours;
    str += ":" +mins;
    if (showSeconds)
        str += ":" + seconds;
    str += (pm ? 'pm' : 'am');
    return str;
}
