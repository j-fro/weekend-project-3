var objectToSend = {};
var answer = false;

$(document).ready(function() {
    console.log('jq');
    // Set up event listeners
    enable();
});

function enable() {
    /* Sets all click listeners */
    $(document).on('click', '.number-key', clickedNumberKey);
    $(document).on('click', '.operator-key', clickedOperatorKey);
    $(document).on('click', '.equals-key', clickedEqualsKey);
    $(document).on('click', '.clear-key', clickedClearKey);
    $(document).on('click', '.decimal-key', clickedDecimalKey);
    $(document).on('click', '.single-val-op-key', clickedSingleValOpKey);
}

function clickedNumberKey() {
    /* Adds the number clicked to the currently displayed value */
    console.log('clicked a number key', $(this).data().value);
    var keyValue = $(this).data().value;
    var prevValue = '';
    if (!answer) {
        prevValue = $('.answer-output').text();
    }
    $('.answer-output').text(prevValue + keyValue);
    answer = false;
}

function clickedOperatorKey() {
    /* Saves the currently displayed value (if present) and the clicked
    operator key */
    console.log('clicked an operator key', $(this).data().value);
    objectToSend.type = $(this).data().value;
    var currentValue = $('.answer-output').text();
    // Don't overwrite a saved value with a blank value
    if (currentValue.length > 0) {
        // Save the currently displayed value to the global object
        objectToSend.x = Number(currentValue);
        // Reset the display
        $('.answer-output').text('');
    }
    console.log('current object', objectToSend);
}

function clickedDecimalKey() {
    /* Adds a decimal to the displayed value if one is not already present */
    console.log('clicked the decimal key');
    var prevValue = $('.answer-output').text();
    console.log('index of .', prevValue.indexOf('.'));
    // Search the displayed value for a decimal and add it if there are none
    if (prevValue.indexOf('.') === -1) {
        $('.answer-output').text(prevValue + '.');
    }
}

function clickedSingleValOpKey() {
    /* Stores the currently displayed value (if present) and then immediately
    POSTs the object to the server without waiting for a y value */
    console.log('clicked square key');
    var currentValue = $('.answer-output').text();
    // Don't overwrite a saved value with a blank value
    if (currentValue.length > 0) {
        // Save the currently displayed value to the global object
        objectToSend.x = Number(currentValue);
        // Reset the display
        $('.answer-output').text('');
        objectToSend.type = $(this).data().value;
        getAnswerFromServer(objectToSend);
    }
}

function clickedEqualsKey() {
    /* Verifies that all required object values are present then POSTs the
    object to the server and displays the response */
    console.log('clicked equals');
    var currentValue = $('.answer-output').text();
    // Check if there is a valid current value and that x and type have been
    // set already
    if (currentValue.length > 0 &&
        objectToSend.x !== 'undefined' &&
        objectToSend.type !== 'undefined') {
        // Add the current value to the object
        objectToSend.y = Number(currentValue);
        getAnswerFromServer(objectToSend);
    }
}

function getAnswerFromServer(objectToSend) {
    /* POSTs the object to the server and displays the response */
    $.ajax({
        // POST to the URL represented by the object.type
        url: '/' + objectToSend.type,
        type: 'POST',
        data: objectToSend,
        success: function(response) {
            // Add the answer to the display
            $('.answer-output').text(response.answer);
            answer = true;
        }
    });
}

function clickedClearKey() {
    /* Clears the global object and the display */
    console.log('clicked clear');
    // Reset the object
    objectToSend = {};
    $('.answer-output').text('');
}
