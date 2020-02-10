// Get a single number's fact info

// await axios.get("http://numbersapi.com/33?json");

// axios.get("http://numbersapi.com/33?json")
//   .then(function (resp) {
//     return resp.data;
//   });

// $.get("http://numbersapi.com/33?json", function (resp) {
//   console.log(resp);
// })

// Get a batch of responses and put on page
  $(function () {
    showBatchOfFacts();
    showBatchOfFacts2();
    showBatchOfFacts3();
    showFourFacts();
    showFourFacts2();
  })

async function showBatchOfFacts() {
  let facts = (await axios.get("http://numbersapi.com/1..10?json")).data;

  for (let i = 1; i <= 10; i++) {
    $(".facts").append(`<li>${facts[i].text}</li>`);
  }

}

function showBatchOfFacts2() {
  let facts = axios.get("http://numbersapi.com/1..10?json")

  facts
    .then(function (resp) {
      for (let i = 1; i <= 10; i++) {
        $(".then-facts").append(`<li>${resp.data[i].text}</li>`);
      }
    });
}

function showBatchOfFacts3() {
  $.get("http://numbersapi.com/1..10?json", function (resp) {
    for (let i = 1; i <= 10; i++) {
      $(".callback-facts").append(`<li>${resp[i].text}</li>`);
    }
  })
}

//4 facts same number

async function showFourFacts() {
  let f1 = axios.get("http://numbersapi.com/13?json")
  let f2 = axios.get("http://numbersapi.com/13?json")
  let f3 = axios.get("http://numbersapi.com/13?json")
  let f4 = axios.get("http://numbersapi.com/13?json")

  let allFacts = await Promise.all([f1, f2, f3, f4]);
  console.log(allFacts)

  allFacts.forEach(el => $(".four-facts").append(`<li>${el.data.text}</li>`))

}

async function showFourFacts2() {
  let f1 = axios.get("http://numbersapi.com/13?json")
  let f2 = axios.get("http://numbersapi.com/13?json")
  let f3 = axios.get("http://numbersapi.com/13?json")
  let f4 = axios.get("http://numbersapi.com/13?json")

  let allFacts = [await f1, await f2, await f3, await f4]

  allFacts.forEach(el => $(".four-facts-2").append(`<li>${el.data.text}</li>`))

}