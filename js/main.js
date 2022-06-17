let nameInput = document.getElementById("nameInput");
let urlInput = document.getElementById("urlInput");
let submitBtn = document.getElementById("submitBtn");
let myLinks = document.getElementById("myLinks");
let nameAlert = document.getElementById("nameAlert");


let allLinks;

if(localStorage.getItem("links") != null) {
    allLinks = JSON.parse(localStorage.getItem("links"));
    display(allLinks);
} else {
    allLinks = [];
}


function addLink(){
    if(validName()==true){
        if(nameAlert.classList.contains("d-block")){
            nameAlert.classList.remove("d-block");
            nameAlert.classList.add("d-none");
        }
        let linkDetails = {
            name: nameInput.value,
            url: urlInput.value
        }
    
        allLinks.push(linkDetails);
        localStorage.setItem("links", JSON.stringify(allLinks));
        display(JSON.parse(localStorage.getItem("links")));
        clear();
    } else {
        nameAlert.classList.replace("d-none", "d-block");
    }
    
}

function clear(){
    nameInput.value = "";
    urlInput.value = "";
}



function display(arr){
    let linkDivs = ``;
    for(let i=0; i< arr.length; i++){
        linkDivs += `
                <div id="link-item" class="link-item my-4">
                    <div class="row">
                        <div class="col-md-4">
                            <h2 id="title" class="title">
                                ${arr[i].name}
                            </h2>
                        </div>
                        <div id="visitBtn" class="col-md-1"><a target="_blank" href="${arr[i].url}" class="btn btn-primary">Visit</a></div>
                        <div id="deleteBtn" onclick="deleteLink(${i})" class="col-md-1"><button class="btn btn-danger">Delete</button></div>
                    </div>
                </div> `    
    }

    myLinks.innerHTML = linkDivs;
}

function deleteLink(index) {
    allLinks.splice(index, 1);
    localStorage.setItem("links", JSON.stringify(allLinks));
    display(JSON.parse(localStorage.getItem("links")));
}

function validName(){
    counter=0;
    for(let i =0; i<allLinks.length; i++){
        if(nameInput.value == allLinks[i].name){
            counter++
        }
    }
    if(counter == 0){
        return true;
    } else {
        return false;
    }
}