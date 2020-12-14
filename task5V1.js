// Taking a Data from API and display it in table as corrosponding cell...

var urlErp = "https://erp.arco.sa:65//api/GetMyTicket?CustomerId=CIN0000150";
$(document).ready(function () {

    getTableList();

});


function getTableList() {

    $("#loadingModal").show();

    // var url = "https://erp.arco.sa:65//api/GetMyTicket?CustomerId=CIN0000150";
    $.get(urlErp, function (data, status) {

        $("#loadingModal").hide();

        var ticketList = data.Data;
        $("#ticket-body").html("");
        for (i = 0; i < ticketList.length; i++) {

            var html = "<tr>" +
                "<td>" + ticketList[i].EnquiryId + "</td>" +
                "<td>" + ticketList[i].CreatedDatetime + "</td>" +
                "<td>" + ticketList[i].CreatedBy + "</td>" +
                "<td>" + ticketList[i].ContractNumber + "</td>" +
                "<td>" + ticketList[i].CustomerId + "</td>" +
                "<td>" + ticketList[i].CustomerName + "</td>" +
                "<td>" + ticketList[i].StatusName + "</td>" +
                "<td>" + ticketList[i].TicketTypeId + "</td>" +
                "<td>" + ticketList[i].PriorityName + "</td>" +
                "<td>" + ticketList[i].Subject + "</td>" +

                "</tr>";
            
            $("#ticket-body").append(html);
        };


    });


}



function getContractList() {
    $("#loadingModal").show();

    var urlContractNo = " https://erp.arco.sa:65/api/GetTicketCustomerDetails?CustomerId=CIN0000150";

    $.get(urlContractNo, function (data, status) {
        $("#loadingModal").hide();

        var contractNo = data.Result2;

        $("#contractnumber").html("");

        var emptyOption = "<option></option>";
        $("#contractnumber").append(emptyOption);

        for (i = 0; i < contractNo.length; i++) {
            var con = '<option value="' + contractNo[i].ContractNumber + '">' +
                contractNo[i].ContractNumber + '</option>';

            $("#contractnumber").append(con);
        }
    });
}

$("#contractnumber").change(function () {
    getLabourId();
});


function getLabourId() {
    $("#loadingModal").show();

    var urlLabourId = "https://erp.arco.sa:65//api/GetTicketIndContractAllEmployee?CustomerId=CIN0000150&ContractId";
    var contractNo = $("#contractnumber").val()
    var urlLabourfilter = urlLabourId + contractNo;

    $.get(urlLabourfilter, function (data, Status) {
        $("#loadingModal").hide();

        var labourId = data;

        $("#labourid").html("");

        var emptyOptionLabour = "<option></option>";
        $("#labourid").append(emptyOptionLabour);

        for (i = 0; i < labourId.length; i++) {
            var lab = '<option value="' + labourId[i].EmployeeId + '">' +
                labourId[i].EmployeeId + '</option>';

            $("#labourid").append(lab);
        }

    });
}

//Ticket Type section:
// change the button function from above section..

$("#labourid").change(function () {
    getTicketType();
});

// write a function to get the ticket type..



function getTicketType() {
    $("#loadingModal").show();

    var urlTicketType = "https://erp.arco.sa:65//api/TickettypeList";

    $.get(urlTicketType, function (data, status) {
        $("#loadingModal").hide();
        var ticketType = data.Data;

        $("#tickettype").html("");

        var emptyOptionTicketType = "<option></option>";
        $("#tickettype").append(emptyOptionTicketType);

        for (i = 0; i < ticketType.length; i++) {
            var tic = '<option id="' + ticketType[i].ID + '" value="' + ticketType[i].ID + '">' +
                ticketType[i].Name + '</option>';

            $("#tickettype").append(tic);
        }

    });
}

//Department Section: // change the button function from above section..

$("#tickettype").change(function () {
    getDepartmentType();
});

// write a function to get the department once selected the ticket type...



function getDepartmentType() {
    $("#loadingModal").show();

    var urlDepartment = "https://erp.arco.sa:65//api/GetTicketAssignedToGroupByTicketTypeId?TicketTypeID=";
    var ticketType = $("#tickettype").val();
    var urlDepartmentFiltered = urlDepartment + ticketType;

    $.get(urlDepartmentFiltered, function (data, status) {
        $("#loadingModal").hide();
        var department = data;

        $("#department").html("");
        var emptyOptionDepartment = "<option></option>";
        $("#department").append(emptyOptionDepartment);

        for (i = 0; i < department.length; i++) {
            var dep = '<option value="' + department[i].ID + '">' +
                department[i].Name + '</option>';

            $("#department").append(dep);
        }
    });

}

//Assigned To Section: // change the button function from above section..

$("#department").change(function () {
    getAssignedTo();
});


function getAssignedTo() {
    $("#loadingModal").show();

    var urlAssignedTo = "https://erp.arco.sa:65//api/assigntoList";

    $.get(urlAssignedTo, function (data, status) {
        $("#loadingModal").hide();
        var assignedTo = data.Data;

        $("#assignedto").html("");
        var emptyOptionAssignedTo = "<option></option>";

        $("#assignedto").append(emptyOptionAssignedTo);

        for (i = 0; i < assignedTo.length; i++) {
            var assign = '<option value="' + assignedTo[i].ID + '">' +
                assignedTo[i].Name + '</option>';

            $("#assignedto").append(assign);
        }
    });

}

//Priority Section: // change the button function from above section..

$("#assignedto").change(function () {
    getPriority();
});

function getPriority() {
    $("#loadingModal").show();

    var urlPriority = "https://erp.arco.sa:65//api/PriorityList";

    $.get(urlPriority, function (data, status) {
        $("#loadingModal").hide();
        var priority = data.Data;

        $("#priority").html();
        var emptyOptionPriority = "<option></option>";

        $("#priority").append(emptyOptionPriority);

        for (i = 0; i < priority.length; i++) {
            var pri = '<option value="' + priority[i].ID + '">' +
                priority[i].Name + '</option>';

            $("#priority").append(pri);
        }
    });
}

//CategoryList Section: // change the button function from above section..

$("#priority").change(function () {
    getCategoryList();
});


function getCategoryList() {
    $("#loadingModal").show();

    var urlCategory = "https://erp.arco.sa:65//api/GetTicketGroupByDepatmentId?TicketAssignGroupId=";
    var deptId = $("#department").val();
    var urlCategoryAccumulated = urlCategory + deptId;

    $.get(urlCategoryAccumulated, function (data, status) {
        $("#loadingModal").hide();
        var category = data;

        $("#category").html("");
        var emptyOptionCategory = "<option></option>";
        $("#category").append(emptyOptionCategory);

        for (i = 0; i < category.length; i++) {
            var cat = '<option value="' + category[i].TicketGroupID + '">' +
                category[i].TicketGroupName + '</option>';

            $("#category").append(cat);
        }
    });
}

//Sub CategoryList Section: // change the button function from above section..

$("#category").change(function () {
    getSubcategoryList();
});


function getSubcategoryList() {
    $("#loadingModal").show();

    var urlSubcategory = "https://erp.arco.sa:65/api/SubGroupByGroup?id=";
    var categoryId = $("#category").val();
    var urlSubcategoryAccumulated = urlSubcategory + categoryId;

    $.get(urlSubcategoryAccumulated, function (data, status) {
        $("#loadingModal").hide();
        var subCategory = data;

        $("#subcategory").html();
        var emptyOptionSubcategory = "<option></option>";
        $("#subcategory").append(emptyOptionSubcategory);

        for (i = 0; i < subCategory.length; i++) {
            var sub = '<option value="' + subCategory[i].Id + '">' +
                subCategory[i].Description + '</option>';

            $("#subcategory").append(sub);

        }

    });
}

// // this is post the data to database and validate....

function validationData() {

    debugger;

    var ContractNotext = $("#contractnumber option:selected").text();
    var LabourIdtext = $("#labourid option:selected").text();
    var ticketTypetext = $("#tickettype option:selected").text();
    var departmenttext = $("#department option:selected").text();
    var assignedTotext = $("#assignedto option:selected").text();
    var prioritytext = $("#priority option:selected").text();
    var categorytext = $("#category option:selected").text();
    var subCategorytext = $("#subcategory option:selected").text();

    alert("Contract No: " + ContractNotext + "\nLabour Id: " + LabourIdtext +
        "\nTicket Type: " + ticketTypetext + "\nDepartment: " + departmenttext +
        "\nAssigned To: " + assignedTotext + "\nPriority: " + prioritytext +
        "\nCategory: " + categorytext + "\nSub Category: " + subCategorytext);


    // this is post the data to database...


    var urlApi = "https://erp.arco.sa:65//api/CreateTicketNew?UpdateTicketFields=";

    // $("btnSubmit").click(function(){
    //     $.post("demo_test.asp", function(data, status){
    //       alert("Data: " + data + "\nStatus: " + status);
    //     });
    //   });


    var params = {

        cusnam: "",
        custid: "CIN0000150",
        emil: "",
        descp: $("#description").text,
        contno: "",
        Page: "",
        PageSize: "",
        Priority: $("#priority").val(),
        Group: $("#category").val(),
        SubGroup: $("#subcategory").val(),
        Subject: $("#ticketsubject").text,
        AssignedTo: $("#assignedto").val(),
        TicketType: $("#tickettype").val(),
        TicketAssignGroup: $("#department").val(),
        ContractNumber: $("#contractnumber").val(),
        LabourNumber: $("#labourid").val(),
        TicketChannel: 2,
        UserId: "cc.user",
        accuracy: "",

    }

    var paramsJson = JSON.stringify(params);

    var urlAccumulated = urlApi + paramsJson;
    debugger;

    $.post(urlAccumulated, function (data, status) {

        // debugger;
        alert(data);

        getTableList();
        $("#exampleModal .close").click();
    });

}