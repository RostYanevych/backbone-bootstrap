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
