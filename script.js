const seats = document.querySelectorAll('.seat:not(.booked)');
const seatCount = document.getElementById('seatCount');
const totalPrice = document.getElementById('totalPrice');
const selectedSeatsEl=document.getElementById("selectedSeats");
const confirmBtn=document.getElementById("confirmBtn");

const TICKET_PRICE =200;

seats.forEach(seat =>{
    seat.addEventListener('click',()=>{
        seat.classList.toggle('selected');
        updateSelectedSeats();
    })
})

function updateSelectedSeats(){
    const selectedSeats=document.querySelectorAll(".seat.selected");
    const seatNames= [];

    selectedSeats.forEach(seat => {
        seatNames.push(seat.dataset.seat);
    });

    selectedSeatsEl.textContent=seatNames.length ? seatNames.join(', '): "None";
    seatCount.innerText= selectedSeats.length;
    totalPrice.innerText= (selectedSeats.length)*TICKET_PRICE;
    confirmBtn.disabled = seatNames.length===0;

    localStorage.setItem("selectedSeats",JSON.stringify(seatNames));
}

window.addEventListener("DOMContentLoaded"
    ,()=>{
        const savedSeats=
        JSON.parse(localStorage.getItem("selectedSeats"))||[];
        if(savedSeats.length>0){
            document.querySelectorAll(".seat").forEach(
                seat =>{
                    if(savedSeats.includes(seat.dataset.seat)){
                        seat.classList.add("selected");
                    }
                }
            );
            updateSelectedSeats();
        }

        const bookedSeats=JSON.parse(localStorage.getItem("bookedSeats"))||[];

        document.querySelectorAll(".seat").forEach(
            seat=>{
                if(bookedSeats.includes(seat.dataset.seat)){
                    seat.classList.add("booked");
                }
            }
        )
    }
)

confirmBtn.addEventListener("click", ()=>{
    const confirmBooking = confirm("Do you want to confirm booking?");

    if(!confirmBooking) return;

    const selectedSeats=document.querySelectorAll(".seat.selected");
    const bookedSeats=JSON.parse(localStorage.getItem("bookedSeats")) || [];

    selectedSeats.forEach(seat => {
        seat.classList.remove("selected");
        seat.classList.add("booked");

        bookedSeats.push(seat.dataset.seat);
    });

    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));

    localStorage.removeItem("selectedSeats");

    updateSelectedSeats();
    alert("Booking Confirmed!")
});

const resetBtn=document.getElementById("resetBtn");

resetBtn.addEventListener("click",()=>{
    const confirmReset=confirm("Reset all bookings and selections?");

    if(!confirmReset) return;
    alert("All seats reset to original state")
    localStorage.clear();
    location.reload();
});
