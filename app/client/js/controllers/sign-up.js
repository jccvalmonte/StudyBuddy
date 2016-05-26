    window.ParsleyValidator.addValidator('date',
        function(value){

    if(moment(value, 'MM/DD/YYYY', true).isValid()){
        
        var currentDate = moment().format('MM/DD/YYYY');
        value = moment(value, 'MM/DD/YYYY');

        // Return if birth year is 13 years less than today
        return currentDate.diff(value, 'years') > 12;
    }
    
    return false;
         
    }).addMessage('en', 'date', 'Please enter a correct date (13+) in the specified format.');