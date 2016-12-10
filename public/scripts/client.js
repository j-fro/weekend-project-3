$(document).ready(function() {
    console.log('jq');
    enable();
});

function enable() {
    $('#calculateButton').on('click', clickedCalculate);
    $('#clearButton').on('click', clickedClear);
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
