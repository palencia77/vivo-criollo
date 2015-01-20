function goNextPages(array_elements, indexInf, indexSup) {
	var resta = array_elements.length - indexSup;
	var result_pagination = new Array();
	if (resta >= 4) {
		result_pagination.push(array_elements.slice(indexInf + 4, indexSup + 4));
		result_pagination.push(indexInf + 4);
		result_pagination.push(indexSup + 4);
		return result_pagination;

	} else if (resta > 0 && resta < 4) {
		result_pagination.push(array_elements.slice(indexSup, array_elements.length));
		result_pagination.push(indexInf);
		result_pagination.push(indexSup);
		return result_pagination;
	}
};

function paginationGeneral(array_elements, indexInf, indexSup) {
	if (array_elements.length <= 4) {
		return array_elements;		
	} else {
		return array_elements.slice(indexInf, indexSup);
	}
};

function previewPages (array_elements, indexInf,indexSup) {
	var result_pagination = new Array();
	if (indexInf >= 4) {		
		result_pagination.push(array_elements.slice(indexInf, indexSup));
		result_pagination.push(indexInf - 4);
		result_pagination.push(indexSup - 4);
		return result_pagination;	
		
	} else {
		result_pagination.push(array_elements.slice(indexInf,indexSup));
		result_pagination.push(indexInf);
		result_pagination.push(indexSup);
		return result_pagination;
	}
};

/*
 * End Pagination Methods
 */