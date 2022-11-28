$(document).ready(function(){
    getData();
})

function getData(){
    $.ajax({
        url:'https://dummyjson.com/users',
        type:'GET',
        dataType:'json',
        data: {get_param:'value'},
        success:successCall,
        error: errorCall,
        complete: completeCall
    })
}


function errorCall(){
    console.log("Error");
}

function completeCall(){
    console.log("Request completed");
}

function successCall(data) {
    console.log("Success");
    let dataSet = data.users;
    let row = 3;
    let pages = Math.ceil(dataSet.length / row);
    let state = {
        'currentPage':1,
        'window':4
    };

    function pagination() {
        let trimmedData = updatepage();
        let data = trimmedData.data;
        $("#tbody1").empty();
        for (let i in data) {
            $('#tbody1').append(
                `<tr>
                <td>${data[i].id}</td>
                <td>${data[i].firstName}</td>
                <td>${data[i].lastName}</td>
                <td>${data[i].age}</td>
                <td>${data[i].gender}</td>
                <td>${data[i].email}</td>
                <td>${data[i].phone}</td>
                <td>${data[i].username}</td>
                <td>${data[i].password}</td>
                <td>${data[i].bloodGroup}</td>
                <td>${data[i].height}</td>
                <td>${data[i].weight}</td>
                <td>${data[i].eyeColor}</td>
                <td>${data[i].hair.color}</td>
                <td>${data[i].address.address}</td>
                </tr>`
            );
        }
        pagebuttons();
    }

    function updatepage() {
        let trimStart = (state.currentPage - 1) * row;
        let trimEnd = trimStart + row;
        let trimmedData = dataSet.slice(trimStart, trimEnd);
        return {
            'data': trimmedData,
        }
    }

    function pagebuttons() {
        let currentPage = state.currentPage, startPage = 1, endPage = pages,left = state.currentPage - 2,right = state.currentPage + 2;
        let sequence = ""
        if (left<=0) {left = startPage}
        if (right>=pages) {right = endPage}

        sequence += `<span class='pageNum' id='${startPage}'> ${startPage} </span>`

        if(currentPage !== startPage && currentPage !== startPage+1 && currentPage !== startPage+2 && currentPage !== startPage+3){
            sequence += `<span> ... </span>`
        }

        for (let page = left; page <= right; page++) {
            if(page!==startPage && page!==endPage){
                sequence += `<span class='pageNum' id='${page}'> ${page} </span>`
            }
        }

        if(currentPage !== endPage-3 && currentPage !== endPage-2 && currentPage !== endPage-1 && currentPage !== endPage){
            sequence += `<span> ... </span>`
        }

        sequence += `<span class='pageNum' id='${endPage}'> ${endPage} </span>`

        $('#paginationButtons').html(
            sequence
        )

        $("#"+state.currentPage).css("border","solid blue")

        $(".pageNum").click(function() {
            state.currentPage = parseInt((this).innerText);
            pagination();

        });
    }
    pagination();
}
