import users from './users.json' assert {type:'json'};

let data = users.users;
let start = 0;
let last = 10;

$("document").ready(function(){

    pagination();

    function pagination(){
        for (let i = start; i < last; i++) {
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
        $("#span1").html(
            `${start+1} to ${last}`
        )
    }

    $("#nextBtn").click(function(){
        (last = last + 10) >= data.length ? last = data.length : last;
        start = last - 10;
        $('#tbody1').empty();
        pagination();

    });

    $("#prevBtn").click(function(){
        (start = start - 10) <= 0 ? start = 0 : start;
        last = start + 10;
        $('#tbody1').empty();
        pagination();
    });

});