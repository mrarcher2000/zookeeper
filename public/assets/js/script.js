const { response } = require("express");

const $animalForm = document.querySelector('#animal-form');

const handleAnimalFormSubmit = (event) => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personalityTraits"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };


  apiURL = `${window.location.href}` + `/api/animals`;


  //send fetch request to server
  // fetch(apiURL, {
  //   method: "POST",
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(animalObject),
  // })
  $.ajax({
    type: "POST",
    url: apiURL,
    body: animalObject,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        console.log ('response is okay');
        return response.json();
      }
      alert('Error: ' + response.statusText);
    })
    .then(
      postResponse => {
        console.log(postResponse);
        alert('Thank you for adding an animal!');
      }
    );

};

$animalForm.addEventListener('submit', handleAnimalFormSubmit(event));
