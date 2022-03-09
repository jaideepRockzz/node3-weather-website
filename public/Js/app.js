const weatherform = document.querySelector('form')
const inputtext = document.querySelector('input')
const messageone = document.querySelector('#message1')
const messagetwo = document.querySelector('#message2')

weatherform.addEventListener('submit',(e) => {
    e.preventDefault()
    const searchvalue = inputtext.value
    messageone.textContent = 'Loading weather information'
    messagetwo.textContent = ''
    fetch('/weather?address='+searchvalue).then((response) => {
    response.json().then((dataweather) => {
        if(dataweather.error){
        messageone.textContent = dataweather.error
        }else{
        messageone.textContent = dataweather.forecast
        messagetwo.textContent = dataweather.location
        // console.log(dataweather.location)
        // console.log(dataweather.address)
        }
    })
})
})

