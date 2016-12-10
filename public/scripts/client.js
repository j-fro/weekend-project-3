var objectToSend = {};

$(document).ready(function() {
    console.log('jq');
    enable();
});

function enable() {
    $('#calculateButton').on('click', clickedCalculate);
    $('#clearButton').on('click', clickedClear);
    $(document).on('click', '.number-key', clickedNumberKey);
    $(document).on('click', '.operator-key', clickedOperatorKey);
    $(document).on('click', '.equals-key', clickedEqualsKey);
    $(document).on('click', '.clear-key', clickedClearKey);
}

function clickedNumberKey() {
    console.log('clicked a number key', $(this).data().value);
    var keyValue = $(this).data().value;
    var prevValue = $('.answer-output').text();
    $('.answer-output').text(prevValue + keyValue);
}

function clickedOperatorKey() {
    console.log('clicked an operator key', $(this).data().value);
    objectToSend.type = $(this).data().value;
    var currentValue = $('.answer-output').text();
    if (currentValue.length > 0) {
        objectToSend.x = Number(currentValue);
        $('.answer-output').text('');
    }
    console.log('current object', objectToSend);
}

function clickedEqualsKey() {
    console.log('clicked equals');
    var currentValue = $('.answer-output').text();
    if (currentValue.length > 0 &&
        objectToSend.x !== 'undefined' &&
        objectToSend.type !== 'undefined') {
        objectToSend.y = Number(currentValue);
        $.ajax({
            url: '/',
            type: 'POST',
            data: objectToSend,
            success: function(response) {
                $('.answer-output').text(response.answer);
            }
        });
    }
}

function clickedClearKey() {
    console.log('clicked clear');
    // Reset the object
    objectToSend = {};
    $('.answer-output').text('');
}

function clickedCalculate() {
    console.log('calculate');
    var x = $('#firstNumIn').val();
    var y = $('#secondNumIn').val();
    console.log('x, y', x, y);
    if (x.length < 1) {
        $('#firstNumIn').addClass('no-input');
    } else if (y.length < 1) {
        $('#secondNumIn').addClass('no-input');
    } else {
        var operation = $('#operationIn').val();
        $('#firstNumIn').val('').removeClass('no-input');
        $('#secondNumIn').val('').removeClass('no-input');
        $('#operationIn').val('Add');
        var objectToSend = {
            x: x,
            y: y,
            type: operation
        };
        console.log('sending', objectToSend);
        $.ajax({
            url: '/',
            type: 'POST',
            data: objectToSend,
            success: function(response) {
                $('#answerOut').text(response.answer);
            }
        });
    }
}

function clickedClear() {
    console.log('clear');
    $('#firstNumIn').val('').removeClass('no-input');
    $('#secondNumIn').val('').removeClass('no-input');
    $('#operationIn').val('Add');
    $('#answerOut').text('');
}
