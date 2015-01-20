var operationResponseFunction = new Array();

// Make a Love action on an Object and return te result data to your function.
// param id_destination: id of target object to give love action
// param response_function: Javascript function to execute like a callback
// param array_index: some index of an array, it is not necessary
function findBeeById(id_bee, response_function, array_index_i, array_index_j){
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
    parameters = {'id_bee': id_bee, 'array_index_i': array_index_i, 'array_index_j': array_index_j,'response_index': response_index};
    Dajaxice.bee.dajax_bee_find_by_id(findBeeByIdCallback, parameters);
};
// Dajaxice operationLoveAction callback:
function findBeeByIdCallback(data){
    // Call to function that make the operation request:
    operationResponseFunction[data.response_index](data);
    operationResponseFunction[data.response_index] = null;
};

function BeeViewModel(){
	var self = this;
}