var USER_API_URL = "http://localhost:3000/_api/v1/users";

$(document).ready(function(){	
	var page = Number(getUrlParameter('page'));
	var limit = Number(getUrlParameter('limit'));
	loadUser(page, limit);
});

function loadUser(page, limit){
	$.ajax({
		url: USER_API_URL + '?page=' + page + '&limit=' + limit,
		type: 'GET',				
		success: function(response){
			var listUser = response.listUser;
			var totalPage = response.totalPage;
			var content = '';
			for (var i = 0; i < listUser.length; i++) {
				var id = listUser[i]._id;			
				content += '<tr>';
					content += '<td>' + listUser[i].firstName + '</td>';
					content += '<td>' + listUser[i].lastName + '</td>';				
					content += '<td>';
						content += '<a href="useredit-form.html?id=' + id + '" class="btn btn-default">Edit</a>&nbsp;';
						content += '<a href="#" onclick="deleteUser(\'' + id + '\')" class="btn btn-danger">Delete</a>';
					content += '</td>';
				content += '</tr>';
			}

			var paginateContent = '';
			if(page > 1){
				paginateContent += '<li><a href="?page=1&limit=' + limit + '" aria-label="First"><span aria-hidden="true"><<</span></a></li>';
				paginateContent += '<li><a href="?page=' + (page - 1) + '&limit=' + limit + '" aria-label="Previous"><span aria-hidden="true"><</span></a></li>';
			}
			if(page > 2){
				paginateContent += '<li><a href="?page=' + (page - 2) + '&limit=' + limit + '">' + (page - 2) + '</a></li>';
			}
			if(page > 1){
				paginateContent += '<li><a href="?page=' + (page - 1) + '&limit=' + limit + '">' + (page - 1) + '</a></li>';
			}
			paginateContent += '<li class="active"><a href="?page=' + page + '">' + page + '</a></li>';			
			if(totalPage > page){
				paginateContent += '<li><a href="?page=' + (page + 1) + '&limit=' + limit + '">' + (page + 1) + '</a></li>';	
			}
			if((totalPage - 1) > page){
				paginateContent += '<li><a href="?page=' + (page + 2) + '&limit=' + limit + '">' + (page + 2) + '</a></li>';	
			}
			if(page < totalPage){
				paginateContent += '<li><a href="?page=' + (page + 1) + '&limit=' + limit + '" aria-label="Next"><span aria-hidden="true">></span></a></li>';
				paginateContent += '<li><a href="?page=' + (totalPage) + '&limit=' + limit + '" aria-label="Last"><span aria-hidden="true">>></span></a></li>';
			}
				
   			$('.pagination').html(paginateContent);
			$('#result').html(content);
		},
		error: function(response, message){
			alert('Có lỗi xảy ra. ' + message);
		}
	});
}



function deleteUser(id){			
	if(confirm('Are you sure?')){
		$.ajax({
			url: USER_API_URL + '/' + id,
			type: 'DELETE',							
			success: function(response){
				alert('Success.');
				location.reload();
			},
			error: function(response, message){
				alert('Error. ' + message);
			}
		});
	}
}

// Lấy tham số truyền lên trong url theo tên.
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};