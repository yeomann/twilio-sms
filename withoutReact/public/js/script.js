console.log('up and running');

$(function() {
    var $age = $('#form__container--age'),
        $condition = $('#form__container--conditions'),
        $phone = $('#form__container--phone');

    function validatePhone(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /^[0-9 ()+]+$/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    function validateCBox() {
        if (!$(this.attr('id')).is(":checked")) {
            return false;
        }
        return true;
    }

    $('#form__container--phone').on('keypress', validatePhone);

    $('#form__container').on('submit', function(e) {
        e.preventDefault();
        var $this = $(this);

        /*if($age.is(':checked') && $condition.is(':checked')) {
	        return true;
	    } else {
	        return false;	
	    }*/
        $.ajax({
            url         : $this.attr('action'),
            type        : 'POST',
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8', //sending
            data        : { phone : $phone.val() }, 
            dataType    : 'text', //expecting
            cache       : false,
            timeout     : 5000,
            complete    : function() { console.log('Completed ajax') },
            success     : function(data) {
                console.log('success');
                console.log(data);
                // console.log(JSON.stringify(data));
                $('#form__container').trigger('reset');
                $('#response').html(data);
            },
            error    : function() { console.log('Ajax error') },
        });
        return false;	
    }); //on submit

});
