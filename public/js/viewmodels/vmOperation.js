//####################################################
//#### LOVE OPERATIONS: ##############################
//####################################################
var operationResponseFunction = new Array();

// Make a Love action on an Object and return te result data to your function.
// param id_destination: id of target object to give love action
// param object_type: String type on uppercase
// param response_function: Javascript function to execute like a callback
// param array_index: some index of an array, it is not necessary
function operationLoveAction(id_destination, object_type, response_function, array_index_i, array_index_j){
    // buffer of response functions:
    var response_index = null;
    for (var i=0; i < operationResponseFunction.length; i++){
        if (operationResponseFunction[i] == null){
            operationResponseFunction[i] = response_function;
            response_index = i;
            break;
        }
    }
    if (response_index == null){
        operationResponseFunction.push(response_function);
        response_index = operationResponseFunction.length - 1;
    }
    // end buffer
    var parameters = {}
    if (object_type == "BEE"){
        parameters = {'id_bee_destination': id_destination, 'id_post_destination': null,
                      'id_award_destination': null, 'id_comment_destination': null,
                      'array_index_i': array_index_i, 'array_index_j': array_index_j,
                      'response_index': response_index};
    }else if (object_type == "POST") {
        parameters = {'id_bee_destination': null, 'id_post_destination': id_destination,
                      'id_award_destination': null, 'id_comment_destination': null,
                      'array_index_i': array_index_i, 'array_index_j': array_index_j,
                      'response_index': response_index};
    }else if (object_type == "COMMENT"){
        parameters = {'id_bee_destination': null, 'id_post_destination': null,
                      'id_award_destination': null, 'id_comment_destination': id_destination,
                      'array_index_i': array_index_i, 'array_index_j': array_index_j,
                      'response_index': response_index};
    }else if (object_type == "AWARD"){
        parameters = {'id_bee_destination': null, 'id_post_destination': null,
                      'id_award_destination': id_destination, 'id_comment_destination': null,
                      'array_index_i': array_index_i, 'array_index_j': array_index_j,
                      'response_index': response_index};
    }
    Dajaxice.operation.dajax_operation_love_action(operationLoveActionCallback, parameters);
};
// Dajaxice operationLoveAction callback:
function operationLoveActionCallback(data){
    // Call to function that make the operation request:
    operationResponseFunction[data.response_index](data);
    operationResponseFunction[data.response_index] = null;
};

//####################################################
//#### FLY OPERATIONS: ###############################
//####################################################

// Make a Fly action on an Object and return te result data to your function.
// param id_destination: id of target object to give love action
// param object_type: String type on uppercase
// param response_function: Javascript function to execute like a callback
// param array_index: some index of an array, it is not necessary
function operationFly(id_destination, object_type, response_function, array_index){
    // buffer to store the response functions:
    var response_index = null;
    for (var i=0; i < operationResponseFunction.length; i++){
        if (operationResponseFunction[i] == null){
            operationResponseFunction[i] = response_function;
            response_index = i;
            break;
        }
    }
    if (response_index == null){
        operationResponseFunction.push(response_function);
        response_index = operationResponseFunction.length - 1;
    }
    // end buffer
    var parameters = {}
    if (object_type == "BEE"){
        parameters = {'id_bee_destination': id_destination, 'id_post_destination': null,
                      'id_award_destination': null, 'array_index': array_index, 'response_index': response_index};
    }else if (object_type == "POST") {
        parameters = {'id_bee_destination': null, 'id_post_destination': id_destination,
            'id_award_destination': null, 'array_index': array_index, 'response_index': response_index};
    }else if (object_type == "AWARD"){
        parameters = {'id_bee_destination': null, 'id_post_destination': null,
            'id_award_destination': id_destination, 'array_index': array_index, 'response_index': response_index};
    }
    Dajaxice.operation.dajax_operation_fly_action(operationFlyCallback, parameters);
};
// Dajaxice operationLoveAction callback:
function operationFlyCallback(data){
    // Call to function that make the operation request:
    operationResponseFunction[data.response_index](data);
    operationResponseFunction[data.response_index] = null;
};























function operationFlyActionCause(id_bee_destination){
    Dajaxice.operation.dajax_operation_fly_action(operationFlyActionCauseCallback, {'id_bee_destination':id_bee_destination,
                                                  'id_post_destination':null });
};

// Dajaxice user_validate_from_social_network callback:
function operationFlyActionCauseCallback(data){
	alert("Gracias por tu colaboración");
};

function operationFlyActionPost(id_post_destination){
    Dajaxice.operation.dajax_operation_fly_action(operationFlyActionPostCallback, {'id_bee_destination':null, 'id_post_destination':id_post_destination });
};

// Dajaxice user_validate_from_social_network callback:
function operationFlyActionPostCallback(data){
	alert("Gracias por tu colaboración");
};

function OperationViewModel(){
	var self = this;
}
//ko.applyBindings(new OperationViewModel(), document.getElementById("OperationViewModel")); 