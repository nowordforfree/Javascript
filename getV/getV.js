//Code from example:
$(function(){
  
  // Handle form submit.
  $("#request input[type='button']").click(function(){
    var proxy = 'proxy.php',
      url = proxy + '?' + $("#request").serialize();
    
    // Update some stuff.
    $('#response').html( 'Loading...' );
    
    // Test to see if HTML mode.
    // if ( /mode=native/.test( url ) ) {
      
      // Make GET request.
      $.get( url, function(data){
        
        $('#response')
          .html( '<pre class="brush:xml"/>' )
          .find( 'pre' )
            .text( data );
      });
      
    /*} else {
      
      // Make JSON request.
      $.getJSON( url, function(data){
        
        $('#response')
          .html( '<pre class="brush:js"/>' )
          .find( 'pre' )
            .text( JSON.stringify( data, null, 2 ) );
        
        SyntaxHighlighter.highlight();
      });
    }*/
    
    // Prevent default form submit action.
    return false;
  });
  
});




// function Get () {
// 	var url = document.getElementById('request').children[1].value + '/_vti_bin/Authentication.asmx?op=Login';
// 	req = new XMLHttpRequest();

// 	req.onreadystatechange = function() {
// 		if (req.readyState == 4 && req.status == 200) {
// 			req.HttpOnly = false;
// 			document.getElementById('response').innerHTML = req.responseText;
// 		}
// 		else document.getElementById('response').innerHTML += '.';
// 	}
	
// 	req.open('POST', url, true);
// 	req.setRequestHeader("Content-Type","text/xml; charset=utf-8")
// 	req.setRequestHeader("Content-Length","http://schemas.microsoft.com/sharepoint/soap/Login");
	
	var authXML = 	'<?xml version="1.0" encoding="utf-8"?>'+
					'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+
									'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '+
									'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
						'<soap:Body>'+
							'<Login xmlns="http://schemas.microsoft.com/sharepoint/soap/">'+
								'<username>admin</username>'+
								'<password>AdminUsh!</password>'+
							'</Login>'+
						'</soap:Body>'+
					'</soap:Envelope>';
// 	req.send(authXML);
// 	document.getElementById('response').innerHTML = 'Authorizing<br/>Waiting for server response';
// }

	var soap2 = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:soap1="http://schemas.microsoft.com/sharepoint/soap/">' +
					'<soap:Header/>' +
						'<soap:Body>' +
							'<soap1:GetListItems>' +
								'<soap1:listName>Reporting Rules</soap1:listName>' +
								'<soap1:viewName></soap1:viewName>' +
							'</soap1:GetListItems>' +
						'</soap:Body>' +
					'</soap:Envelope>';
/*
$(document).ready(function () {
	$("#request input[type='button'").click(function () {
		var a =
		$.ajax({
			url: $("#request input[type='text']")[0].value + "/_vti_bin/Authentication.asmx?op=Login",
			type: "GET",
			dataType: "jsonp",
			mimeType: "text/html",
			jsonp: 'callback',
			jsonpCallback: Back,
			crossDomain: true,
			data: null,
			processData: false,
			contentType: "text/xml",
			error: function(request, textStatus, errorThrown) {
				console.log(request.responseText);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
		return a;
	});
});

function Back (request, textStatus) {
	alert('This is Back function');
	var text = request + ' ' + textStatus;
	return Retr;
}

function Retr (request) {
	request.overrideMimeType('text/html');
}
*/
			// success: function( data ) {
			// 	$("#response").append(data);
			// }
// $(document).ready(function () {
// 	$("#request input[type='button'").click(function () {
// 		$.getJSON("http://40rules.r2ss.net/_vti_bin/ListData.svc", function (data) {
// 			$("#response").append(data);
// 		});
// 	});
// });