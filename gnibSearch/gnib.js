(function() {

chrome.storage.sync.get('user', function(data) {
	
	let user;
	if(data.user == undefined){
		chrome.tabs.create({url: "options.html"});
	}
	else {
user = data.user;  
/////////////////////////////////////////////////////////////////
$('#dvDeclareCheck').removeClass('hideThis');
$('#dvDeclareCheck').attr('style', '');
$('#Category').val('All').trigger('change');
catChange();
resetSubCatFld();
$('#dvPPNo').show();
$('#dvPPRes').hide();
($('#SubCategory')).val('All').trigger('change');
if(user.boolGnib == "Yes")
	user.boolGnib = "Renewal"
else
	user.boolGnib = "New"	
$('#ConfirmGNIB').val(user.boolGnib);
$('#GNIBNo')[0].value = user.gnibNumber;
$('#GNIBExDT')[0].value = user.gnibExDate;
$('#UsrDeclaration')[0].checked = 'true';
$('#GivenName')[0].value = user.givenName;
$('#SurName')[0].value = user.surName;
$('#DOB')[0].value = user.birth;
$("#Nationality").val(user.nationality);
$('#Email')[0].value = user.email;
$('#EmailConfirm')[0].value = user.email;
($('#FamAppYN')[0])[2].selected = true;
($('#PPNoYN')).val('Yes').trigger('change');
$('#PPNo')[0].value = user.passport;

var btn = document.createElement("audio");
btn.setAttribute("id", "audio1");
btn.src = 'https://www.soundjay.com/free-music/midnight-ride-01a.mp3';
var achou = false;
var existeHorario = false;
var tempos = [];
}
 
var myFunc01 = function() {
	var errors = userHasOptions();
if(errors == ""){
	var i = 0;
  while (i < 100000 && existeHorario == false) {
 (function(i) {
   
var tempo = setTimeout(function() {
$("#dvAppOptions").hide();
 $("#dvSubmitContent").hide();
 var sCat = "cat=" + $('#Category').val();
 var sSCat = "&sbcat=All" //+ $('#SubCategory').val();
 var sTyp = "&typ=" + $('#ConfirmGNIB').val();
 var sK = "&k=" + $('#k').val();
 var sP = "&p=" + $('#p').val();
 var stPath = 'Website/AMSREG/AMSRegWeb.nsf';
 if (isValidForm()) {
  
  var dataThis = sCat + sSCat + sTyp + sK + sP;
  $('#btSrch4Apps').prop('disabled', true);
  var html = $
  .ajax( {
   dataType : "json",
   cache : false,
   type : "GET",
   url :   "/" + stPath + "/(getAppsNear)?readform",
   data : dataThis,
   async : true,
   success : function(data) {
	   if(document.getElementById('idTries') == undefined){
			var para = document.createElement("h2");
			var info = document.createElement("p");
			var nodeText = document.createTextNode("Refresh the page if you want to stop the counter");
			info.appendChild(nodeText);
			para.setAttribute("id", "idTries");
			var node = document.createTextNode("Try number:" + (i + 1) + " out of 100000");
			para.appendChild(node);
			var element = document.getElementById("dvInputHead");
			element.appendChild(para);
			element.appendChild(info);
	   }
	   else{
		   document.getElementById('idTries').innerText = "Try number:" + (i + 1) + " out of 100000";
	   }

    if (!(data.error === undefined || data.error === null)) {
     $("#valErrDateSearch").html("<span class=\"appOpMsg\">" + data.error + "</span>");
     $("#valErrDateSearch").show();
     $('#btSrch4Apps').prop('disabled', false);
     return;
    }

    $("#dvAppOptions").show();
    $("#valErrDateSearch").hide();
    if (!(data.empty === undefined || data.empty === null)) {
    console.log('nothing');
     $("#dvAppOptions")
     .html(
     "<table class=\"table\"><tr><td></td><td>No appointment(s) are currently available</td></tr></table>");
     $('#btSrch4Apps').prop('disabled', false);
    } else {
		//test slot
		//var slotsMock = [];
		//var objSlot = {id:"AA123456789", time: "4 September 2019 - 16:00"};
		//slotsMock.push(objSlot);
		//data.slots = slotsMock;
		//end test
		
     if (data.slots[0] == "empty") {
     console.log('nothing');
      $("#dvAppOptions")
      .html(
      "<table class=\"table\"><tr><td></td><td>No appointment(s) are currently available</td></tr></table>");
      $('#btSrch4Apps').prop('disabled', false);
     } else {
      
      var sTmp = '';
      for (i = 0; i < data.slots.length; i++) {
		if(checkExtrasFilter(data.slots[i], data.slots.length)){
			existeHorario = true;
		}
		else{
			console.log('not yet');
		}
		sTmp += '<div id="rw'
        + data.slots[i].id
        + '" class="appOption"><table class="table"><tr><td id="td'
        + data.slots[i].id
        + '"><button type="button" class="btn btn-success" onclick="bookit(\''
        + data.slots[i].id
        + '\')">Book This</button></td><td>'
        + data.slots[i].time
        sTmp += '</td></tr></table></div>'
        $('#btSrch4Apps').prop('disabled', false);
      }
     if(existeHorario){
      document.getElementById('idTries').innerText = "<<<<<<<<<<APPOINTMENT FOUND>>>>>>>>>>>>";
	  document.getElementById('idTries').style.color = "green";
      btn.play();
      tempos.forEach(clearTimeout); 
     }
      $('#btSrch4Apps').prop('disabled', false);
      $("#dvAppOptions").html(sTmp);
     }
    }
   }
  }).responseText;
 }
   }, 1000 * i);
   tempos.push(tempo);}
 )(i++)
  }
}
else {
	alert(errors);
}
};
function isValidForm() {
	var fldLst = ["Category","SubCategory","GivenName",
	"SurName","DOB","Nationality","Email","EmailConfirm",
	"PPNoYN","ConfirmGNIB","FamAppYN", "UsrDeclaration"];
	var success = true;
	var k; var tmp;
	try {
		for (k=0;k < fldLst.length;k++) {
			tmp = $.trim($('#' + fldLst[k]).val());
			if ((tmp.length == 0)  || (tmp.toUpperCase() == "SELECT...")
					|| tmp == "...") {
				$('#' + fldLst[k]).addClass('alert-danger');
				success = false;
				console.log(fldLst[k]);
				$("#valErrMsg").show();
			} else {
				$('#' + fldLst[k]).removeClass('alert-danger');
			}
		}
		
		if ($('#UsrDeclaration').is(":checked") == false){
			$('#dvDeclareCheck').addClass('alert-danger');
			success = false;
			$("#valErrMsg").show();		
		} else {
			$('#dvDeclareCheck').removeClass('alert-danger');
		}

		if ($('#ConfirmGNIB').val() == "Renewal") {
			if ($.trim($('#GNIBNo').val()).length == 0) {
				$('#GNIBNo').addClass('alert-danger');
				success = false;
				$("#valErrMsg").show();	
			} else {
				$('#GNIBNo').removeClass('alert-danger');
			}
			
			if ($.trim($('#GNIBExDT').val()).length == 0) {
				$('#GNIBExDT').addClass('alert-danger');
				success = false;
				$("#valErrMsg").show();	
			} else {
				$('#GNIBExDT').removeClass('alert-danger');
			}
		}

		if (($.trim($('#EmailConfirm').val()) != $.trim($('#Email').val()))) {
			success = false;
			$('#EmailConfirm').addClass('alert-danger');
			$('#Email').addClass('alert-danger');
			$("#valEmlCMsg").show();
			$("#valErrMsg").show();
		} else {
			$("#valEmlCMsg").hide();
		}
		
		if (success == true && validateEmail($.trim($('#Email').val())) == false) {
			success = false;
			$('#EmailConfirm').addClass('alert-danger');
			$('#Email').addClass('alert-danger');
			$("#valEmlFormatMsg").show();
		} else {
			$("#valEmlFormatMsg").hide();
		}

		rdTmp = $.trim($('#FamAppNo').val());
		if (($.trim($('#FamAppYN').val()) == "Yes") && (rdTmp.length == 0 || rdTmp == "..." || rdTmp.toUpperCase() == "SELECT...")) {
			$('#FamAppNo').addClass('alert-danger');
			success = false;
			$("#valErrMsg").show();
		} else {
			$('#FamAppNo').removeClass('alert-danger');
		}

		rdTmp = $.trim($('#PPReason').val());
		if (($.trim($('#PPNoYN').val()) == "No") && (rdTmp.length == 0 || rdTmp == "..." || rdTmp.toUpperCase() == "SELECT...")) {
			$('#PPReason').addClass('alert-danger');
			success = false;
			$("#valErrMsg").show();
		} else {
			$('#PPReason').removeClass('alert-danger');
		}

		rdTmp = $.trim($('#PPNo').val());
		if (($.trim($('#PPNoYN').val()) == "Yes") && (rdTmp.length == 0)) {
			$('#PPNo').addClass('alert-danger');
			success = false;
			$("#valErrMsg").show();
		} else {
			$('#PPNo').removeClass('alert-danger');
		}

		if (success == true) {
			$("#valEmlCMsg").hide();
			$("#valErrMsg").hide();
			$("#valErrEmNum").hide();
		}	

		return success;
	} catch (e) {
		alert(e.toString())
		return false;
	};
}
function validateEmail(email) {
	
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
}	
function catChange() {
	var tmp = $('#Category').val();
	if (tmp != "Select..." && tmp != "..." && (tmp.length > 0)) {
		$('#dvSubCat').show();
	} else {
		$('#SubCategory').val("");
		$('#dvSubCat').hide();
	}		
}
function resetSubCatFld() {
	var Cats = [{"Main":"All","Sub":["All"]}];
	$('#SubCategory').html("");
	$('#SubCategory')
    .append($("<option></option>")
    .attr("value","...")
    .text("Select..."));
	var key = $('#Category').val()
	var vals;
	if (key != "Select..." && key != "..." && key.length > 0) {
		for (i=0;i < Cats.length;i++){
			if (Cats[i].Main === key){
				vals = Cats[i].Sub;
			}
		}
			
		$.each(vals, function(key, val) {
		     $('#SubCategory')
		         .append($("<option></option>")
		         .attr("value",val)
		         .text(val));
		});
	} else {
		$('#SubCategory').val("");
	}
}

var months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'];

function monthNumToName(monthnum) {
    return months[monthnum - 1] || '';
}
function monthNameToNum(monthname) {
    var month = months.indexOf(monthname);
    return month ? month + 1 : 0;
}

function checkExtrasFilter(slot, slotsLength){
	if(user.blockedAppointments >= slotsLength)
		return false;
	if(user.minDate != "" && user.maxDate != "")
	{
		var slotDay = parseInt((slot.time).split(" ")[0]);
		var slotMonth = (slot.time).split(" ")[1];
		var slotYear = (slot.time).split(" ")[2];
		var slotDate = new Date(slotYear+ "-" +monthNameToNum(slotMonth)+ "-" +slotDay);
		
		var startDate = new Date(user.minDate + "T00:00:00");
		var endDate = new Date(user.maxDate+ "T00:00:00");
		
		if(slotDate >= startDate && slotDate <= endDate)
			return true;
		return false;
	}
	else if(user.minDate != ""){
		var startDate = new Date(user.minDate+ "T00:00:00");
		var slotDay = parseInt((slot.time).split(" ")[0]);
		var slotMonth = (slot.time).split(" ")[1];
		var slotYear = (slot.time).split(" ")[2];
		var slotDate = new Date(slotYear+ "-" +monthNameToNum(slotMonth)+ "-" +slotDay);
		
		if(slotDate >= startDate)
			return true;
		return false;
	}
	else if(user.maxDate != ""){
		var endDate = new Date(user.maxDate+ "T00:00:00");
		var slotDay = parseInt((slot.time).split(" ")[0]);
		var slotMonth = (slot.time).split(" ")[1];
		var slotYear = (slot.time).split(" ")[2];
		var slotDate = new Date(slotYear+ "-" +monthNameToNum(slotMonth)+ "-" +slotDay);
		
		if(slotDate <= endDate)
			return true;
		return false;
	}
	
	return true;
}

function userHasOptions(){
	var invalidText = "Please add:";
	if(user == undefined){
		console.log("Fill your information first");
		return "";
	}
	else if(user.boolGnib == "Renewal" && user.gnibNumber == "")
		return invalidText + " GNIB number";
	else if(user.boolGnib == "Renewal" && user.gnibExDate == "")
		return invalidText + "Please add: GNIB expiry date";
	else if(user.givenName == "")
		return invalidText + "Given Name";
	else if(user.surName == "")
		return invalidText + "Surname";
	else if(user.birth == "")
		return invalidText + "Birth Date";	
	else if(user.email == "")
		return invalidText + "E-mail";
	else if(user.passport == "")
		return invalidText + "Passport number";
	else if(user.nationality == "")
		return invalidText + "Nationality";	
	else
		return "";
}

	//////////////////////////////////////////////////////////////////	
myFunc01();
});

})();