const X_CLASS = 'x' 
const O_CLASS = 'o' 
const fieldElements = document.querySelectorAll('[data-field]')
const MessageText = document.querySelector('[data-winning-message-text]')
let oTurn = false
let turn = ['X Turn','O Turn']
const WINNING_COMBINATIONS =[
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
]

fieldElements.forEach(field =>{
   field.addEventListener('click',HandleClick,{once: true})
})

function HandleClick(e){
   const field = e.target
   const currentClass = oTurn ? O_CLASS : X_CLASS
   placeMark(field, currentClass)
   if(checkWin(currentClass)){
      endGame(false)
   } else if(isDraw()){
      endGame(true)
   } else swapTurn()
   
}
function placeMark(field, currentClass){
   field.classList.add(currentClass)
}
function swapTurn(){
   oTurn = !oTurn
   if(oTurn == false) document.getElementById("turn").innerHTML = turn[0]
   if(oTurn == true) document.getElementById("turn").innerHTML = turn[1]
}
function checkWin(currentClass){
   return WINNING_COMBINATIONS.some(combination =>{
      return combination.every(index => {
         return fieldElements[index].classList.contains(currentClass)
      })
   })
}
function endGame(draw){
   if(draw){
     MessageText.innerText = "Draw!"
   }else{
     MessageText.innerText = `${oTurn ? "O Wins" : "X Wins"} !`
   }
   document.getElementById("message").classList.remove("disabled");
}
function isDraw(){
   return [...fieldElements].every(field => {
      return field.classList.contains(X_CLASS) || field.classList.contains(O_CLASS)
   })
}
document.getElementById("restart").addEventListener("click",() => {
   window.location.reload(true);
})
