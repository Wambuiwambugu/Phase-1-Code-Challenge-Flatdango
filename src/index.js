initializePage();
// Your code here
const filmTitle = document.querySelector('#title');
const runTime = document.querySelector('#runtime');
const filmInfo = document.querySelector('#film-info');
const showTime = document.querySelector('#showtime');
const ticketNum = document.querySelector('#ticket-num');
const buyTicketBtn = document.querySelector('#buy-ticket');
const poster = document.querySelector('#poster');
const fiilmList = document.querySelector('#films')
fiilmList.replaceChildren();

function getfilms(id = 1){
    fetch(`http://localhost:3000/films/${id}`)
    .then(res => res.json())
    .then(data => {
        renderposterDetails(data);
    })
}

function renderposterDetails(data){
    filmTitle.textContent = data.title;
    runTime.textContent = `${data.runtime} minutes`;
    filmInfo.textContent = data.description;
    showTime.textContent = data.showtime;
    poster.src = data.poster;
    ticketNum.textContent = (data.capacity - data.tickets_sold)
    let remainingTickets = (data.capacity - data.tickets_sold)
    ticketNumber(remainingTickets);
}

function listAllFilms(data){
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(data => {
        data.forEach(film => {
            let filmItem = document.createElement('li');
            filmItem.textContent = film.title;
            fiilmList.append(filmItem);
            filmItem.addEventListener('click', e => {
                e.preventDefault();
                renderposterDetails(film);
            })
        })
        
    })
    
}
function ticketNumber(remainingTickets){
    buyTicketBtn.addEventListener('click',e => {
        e.preventDefault();
            if (remainingTickets > 0){
                remainingTickets -= 1;
            ticketNum.textContent = remainingTickets;
            }
            else if (remainingTickets <= 0){
                buyTicketBtn.textContent = "Sold Out"
            }
        })
        
    }



function initializePage(){
    getfilms();
    listAllFilms()
    
}