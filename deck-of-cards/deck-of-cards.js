let deckCount = 1;
let deckId;

async function getDeck() {
  let deckId = (await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`)).data.deck_id;
  return deckId;
};

async function drawCard(deckId) {
    let card = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    
    if(card.data.remaining === 0) {
      $('#deal').remove();
    };

    return card.data.cards[0].image;
};

function dealCard(img) {
  $('#card-container').append(`<div class="card"><img src=${img}></div>`);
}

// on page load
$(async function() {
  deckId = await getDeck();

  // on button click
  $('#deal').on('click',async function() {
    let img = await drawCard(deckId);
    dealCard(img)
  });
});




