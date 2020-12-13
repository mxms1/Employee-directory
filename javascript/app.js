

//Variables
const gridContainer = document.getElementById('container');
let employeeDataArray =[];
var generalProfile = document.getElementById('profileContent');
var modalContent = document.getElementById('modalContent');
var modal = document.getElementById("myModal");
var newData = document.getElementById("newData");
  const searchInput = document.getElementById('searchInput');

const profiles = document.getElementsByClassName('profileDiv');
const children = gridContainer.children;
const textDiv = document.getElementsByClassName('textDiv');


const navButton =  document.getElementsByClassName('navButton');
const nav = document.getElementById('nav');
const backButton = document.getElementById('back');
const nextButton = document.getElementById('next');



//Fetch the Data

fetchData('https://randomuser.me/api/?results=12&nat=gb')
        .then(jsonResponse => getAttributes(jsonResponse.results))
        .then(attributes => clickListener())



//Functions

function fetchData(url){
  //fetch the data, check the status,
  //turn the response to json and catch any errors
  return fetch(url)
          .then(checkStatus)
          .then(response => response.json())
          .catch(e => console.log(`Looks like there was an error: ${e}`))

}



//checkStatus
function checkStatus(response) {
  if(response.ok){
    return Promise.resolve(response);

  }else{
  return Promise.reject(new Error(response.statusText));
  }
}



//getAttributes
function getAttributes(response) {

for(let i = 0; i < response.length; i++){

//collecting the info from the response
  const email = response[i].email;
  const nameObject = response[i].name;
  const fullName = nameObject.first + ' ' + nameObject.last;
  const picture = response[i].picture.large;
  const city = response[i].location.city;
  const telephone = response[i].cell;
  const streetNumber = response[i].location.street.number;
  const streetName = response[i].location.street.name;
  const postcode = response[i].location.postcode;
  const fullAddress = `${streetNumber} ${streetName}, ${city} ${postcode}`;
  // Format: 5869 Park Road, Sheffield W148EU
  const dob = response[i].dob.date;
  const age = response[i].dob.age;
  const year = dob.substring(2,4);
  const month = dob.substring(5,7);
  const day = dob.substring(8,10);
  const fullDob = `${day}/${month}/${year}`


      //Create the profileDiv and textDiv

      let profileDiv = document.createElement('div');
      let textDiv = document.createElement('div');
      textDiv.classList.add('textDiv');
      profileDiv.classList.add('profileDiv');

      //Put the profileDiv in the gridContainer
      //and the textDiv in the profileDiv
      gridContainer.appendChild(profileDiv);
      profileDiv.appendChild(textDiv);

      //Profile Pic
      let image = document.createElement('img');
      image.setAttribute("src", `${picture}`);
      //Name
      let nameText = document.createElement('h2');
      nameText.textContent = `${fullName}`;
      //Email
      let emailText = document.createElement('p');
      emailText.textContent = `${email}`;
      //City
      let locationText = document.createElement('p');
      locationText.textContent = `${city}`;
      //Put them all in the profileDiv and textDiv
      profileDiv.appendChild(image);
      textDiv.appendChild(nameText);
      textDiv.appendChild(emailText);
      textDiv.appendChild(locationText);



      const employeeObject = {}

//let employeeDataArray =[];
//fill the employeeDataArray with the different employeeObjects

  employeeObject.name = `${fullName}`
  employeeObject.address = `${fullAddress}`
  employeeObject.number = `${telephone}`
  employeeObject.dob = `${fullDob}`
  employeeObject.city = `${city}`
  employeeObject.picture = `${picture}`
  employeeObject.email = `${email}`

//Push the data to the array
employeeDataArray.push(employeeObject)



}

}






function clickListener(){


    const profilesArray = [...profiles];

    profilesArray.forEach(profile => {

    profile.addEventListener('click', (e)=>{

    let clicked = e.currentTarget.innerHTML;
    generalProfile.innerHTML = clicked;

    modal.style.display = "block";
    generalProfile.style.flexDirection = "column-reverse";


    for(let i = 0; i < employeeDataArray.length; i++){
      //for each profileDiv get the name of the person(personName)
      const personName = profile.firstElementChild.firstElementChild.textContent;
      //Find the personName in the employeeDataArray
      if(personName == employeeDataArray[i].name ){
        //Fill in the data with the corresponding name
  newData.innerHTML =
            `<p>${employeeDataArray[i].number}</p>
             <p>${employeeDataArray[i].address}</p>
             <p>${employeeDataArray[i].dob}</p>`
}}
  })
});}












//Search


function search(){
  var search = searchInput.value.toLowerCase();
  for (let i = 0; i < profiles.length; i++){

const thePeople = children[i].firstElementChild.firstElementChild.textContent.toLowerCase();
  //console.log(thePeople);
    if (thePeople.includes(search)){
      profiles[i].classList.remove('hide');



    }else{
      profiles[i].classList.add('hide');



            }

        }


    }


//This function removes the nav buttons once a profile has been searched for
function removeNav(){ for (let i = 0; i < profiles.length; i++){
    if(profiles[i].classList.contains('hide')){

    nav.classList.add('hide');
    break;

    }else{
      nav.classList.remove('hide');

    }
}}



function nextBack(profilesCollection){

//Create a new array of only the visible profiles
const visibleProfilesArray =
[...profilesCollection].filter(profile => profile.classList.contains('hide') === false);



for (let i = 0; i < visibleProfilesArray.length; i++){
  //Gets the name displayed in the modal(bName)
  //along with the names from each profileDiv that is visible(aName)
let aName = visibleProfilesArray[i].firstElementChild.firstElementChild.textContent;
let bName = generalProfile.firstElementChild.firstElementChild.textContent;

// Once the name displayed in the modal finds its name in the visible profileDivs
  if(aName == bName){


if(target === nextButton ){

//first part of the modal
//Set the innerHTML of the modal to index + 1 of the visible people
generalProfile.innerHTML=` ${visibleProfilesArray[i+1].innerHTML}`

//second part of the modal
    for(let i = 0; i < employeeDataArray.length; i++){

//Finds the name in the employeeDataArray then sets the innerHTML
//of the second section to the following person in the employeeDataArray
    if(bName === employeeDataArray[i].name ){

   newData.innerHTML =
             `<p>${employeeDataArray[i+1].number}</p>
              <p>${employeeDataArray[i+1].address}</p>
              <p>${employeeDataArray[i+1].dob}</p>`

    }

}

}else{
//first part of the modal
//Set the innerHTML of the modal to index - 1 of the visible people

  generalProfile.innerHTML=` ${visibleProfilesArray[i-1].innerHTML}`

//second part of the modal
      for(let i = 0; i < employeeDataArray.length; i++){

        //Finds the name in the employeeDataArray then sets the innerHTML
        //of the second section to the previous person in the employeeDataArray
      if(bName === employeeDataArray[i].name){

        newData.innerHTML =
                  `<p>${employeeDataArray[i-1].number}</p>
                   <p>${employeeDataArray[i-1].address}</p>
                   <p>${employeeDataArray[i-1].dob}</p>`


      }

  }

}
break;
}
}}



//Event Listeners
  searchInput.addEventListener('keyup', search);
  searchInput.addEventListener('keyup', removeNav);





//Modal
let target = '';

//The X button removes the modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}


//Clicking anywhere outside the box will remove the modal too
window.onclick = function(event) {
   target = event.target;
  if (target == modal) {
    modal.style.display = "none";
  }
  //Clicking the navButtons will run the nextBack function
    if (target.classList.contains('navButton')){

      nextBack(profiles);
    }
}
