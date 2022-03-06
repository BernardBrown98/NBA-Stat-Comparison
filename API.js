// *************TODO LIST************************
// finish comments
// look for new json files with player
// possibly update year queries based on player input
// add styles
// add a try catch to async function to catch error when player is searched for a year he didnt play

// INPUT BOXES
const search1 = document.getElementById("search1")
const search2 = document.getElementById("search2")
// dropdown list below input
const dropDown1 = document.querySelector("#drop-down1")
const dropDown2 = document.querySelector("#drop-down2")

const container1 = document.querySelector("#player1-container")
const submission = document.querySelector("#submit-forms")
const form1 = document.querySelector("#search-form1")
const form2 = document.querySelector("#search-form2")
const input2 = document.querySelector("#search-form2 > input").value

const searchedText = async userSearch => {
    // store data in variable
    const res = await axios.get("data3.json")
    console.log(res)
    // create empty array for future "push"
    let nameArray = []
    // loop over json file to store data in nameArray
    for (let i = 0; i < res.data.length; i++) {
        let fullName = res.data[i].name
        nameArray.push(fullName)
        // console.log(nameArray)
    }


    // Use FILTER method to create new array with elements that pass the test implemented  by the provided function
    const playerMatches = nameArray.filter(n => {
        // REGEX METHOD BELOW 
        // const regex = new RegExp(`${userSearch}`, "gi")
        // return n.match(regex)
        // console.log(n)
        // 
        return n.toLowerCase().includes(userSearch)
    })


    console.log(`THIS IS THE playerMatches ${playerMatches}`)


    // Initialize str
    let str = ""
    // If there are less than 15 matches (OF NBA PLAYERS) from users input add options including each match to str to be displayed
    if (playerMatches.length < 15) {
        for (let i = 0; i < playerMatches.length; i++) {
            str += `<option>${playerMatches[i]}</option>`
        }
    }
    // append str contents to dropdown menus
    dropDown1.innerHTML = str
    dropDown2.innerHTML = str

    //If statements prevents dropdown list from being present after a option is selected 
    if (`<option>${search1.value}</option>` == str) {
        dropDown1.innerHTML = ""
        dropDown2.innerHTML = ""
    }
    if (`<option>${search2.value}</option>` == str) {
        dropDown2.innerHTML = ""
        dropDown1.innerHTML = ""
    }
    // END OF FILTER METHOD
    // submission.addEventListener('click', () => setImage(player1Box))



    const player1Box = document.querySelector("#player1-image")
    const player2Box = document.querySelector("#player2-image")
    const outerContainer = document.querySelector("#outer-container")
    const setImage = (playerBox) => {
        const selectedObject = res.data.find(el => el.name == playerMatches)

        // USE OPTIONAL CHAINING OPERATOR TO AVOID ERROR
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

        const idkworkplease = selectedObject?.imgUrl
        console.log(playerBox.src)
        playerBox.src = idkworkplease
    }
    if (playerMatches != '' && search1?.value.toUpperCase() == playerMatches.toString().toUpperCase()) {
        submission.addEventListener('click', () => setImage(player1Box))
    }
    if (playerMatches != '' && search2?.value.toUpperCase() == playerMatches.toString().toUpperCase()) {
        submission.addEventListener('click', () => setImage(player2Box))

    }

    // Shows player information once form is submitted 
    submission.addEventListener('click', () => {
        player1Box.setAttribute("class", "shown")
        player2Box.setAttribute("class", "shown")
        // Allows div to grow to fit content
        outerContainer.setAttribute("class", "grow")
    })

    console.log(player1Box.src)




}

// Eventlisteners for 
search1.addEventListener("keyup", () => searchedText(search1.value.toLowerCase()))
search2.addEventListener("keyup", () => searchedText(search2.value.toLowerCase()))

// let nameArray = []
// for (let i = 0; i < res.data.length; i++) {
//     let fName = res.data[i].firstName
//     let lName = res.data[i].lastName
//     nameArray.push(`${fName} ${lName}`)
// }
// searchedText()




submission.addEventListener("click", () => {
    if (document.querySelector("#search-form1 > input").value != ""
        &&
        document.querySelector("#search-form2 > input").value != ""
    ) {
        showPlayerStats()
    }

})



const showPlayerStats = async () => {
    console.log("SUBMITTED")
    const firstSearch = document.querySelector("#search-form1 > input").value
    console.log(`this is ${firstSearch}`)
    const apiBaseRoute = "https://www.balldontlie.io/api/v1"
    const firstRes = await axios.get(`${apiBaseRoute}/players?search=${firstSearch}`)

    console.log(firstRes)
    const seasonSelect1 = document.querySelector("#season1")
    const selectValue1 = seasonSelect1.value
    // console.log(selectValue1)
    const fName1 = firstRes.data.data[0].first_name
    const lName1 = firstRes.data.data[0].last_name
    const fullName1 = `${fName1} ${lName1}`
    const player1Id = firstRes.data.data[0].id
    const secondRes = await axios.get(`${apiBaseRoute}/season_averages?season=${selectValue1}&player_ids[]=${player1Id}`)
    // console.log(secondRes.data.data[0])
    const season1Display = `${selectValue1} - ${parseInt(selectValue1) + 1}`
    // console.log(season1Display)
    const assist1 = secondRes.data.data[0].ast
    const block1 = secondRes.data.data[0].blk
    const rebound1 = secondRes.data.data[0].reb
    const fgPercent1 = secondRes.data.data[0].fg_pct
    const ftPercent1 = secondRes.data.data[0].ft_pct
    const gamesPlayed1 = secondRes.data.data[0].games_played
    const minutes1 = secondRes.data.data[0].min
    const steals1 = secondRes.data.data[0].stl
    const points1 = secondRes.data.data[0].pts
    console.log(assist1)
    // change innerHTML
    document.querySelector("#player1-container > h3").innerHTML = season1Display
    document.querySelector("#player1-name").innerHTML = fullName1
    document.querySelector("#p1-1").innerHTML = points1.toFixed(1)
    document.querySelector("#p1-2").innerHTML = assist1.toFixed(1)
    document.querySelector("#p1-3").innerHTML = block1.toFixed(1)
    document.querySelector("#p1-4").innerHTML = rebound1.toFixed(1)
    document.querySelector("#p1-5").innerHTML = steals1.toFixed(1)
    document.querySelector("#p1-6").innerHTML = (fgPercent1 * 100).toFixed(1) + "%"
    document.querySelector("#p1-7").innerHTML = (ftPercent1 * 100).toFixed(1) + "%"
    document.querySelector("#p1-8").innerHTML = minutes1
    document.querySelector("#p1-9").innerHTML = gamesPlayed1
    // change hidden display to flex
    let h3 = document.querySelectorAll("h3")
    for (let h of h3) {
        h.style.display = "flex"
    }

    // SECOND SET OF REQUESTS

    const firstSearch2 = document.querySelector("#search-form2 > input").value
    // console.log(firstSearch2)
    const firstRes2 = await axios.get(`${apiBaseRoute}/players?search=${firstSearch2}`)
    // console.log(firstRes2)
    const seasonSelect2 = document.querySelector("#season2")
    const selectValue2 = seasonSelect2.value
    const fName2 = firstRes2.data.data[0].first_name
    const lName2 = firstRes2.data.data[0].last_name
    const fullName2 = `${fName2} ${lName2}`
    // let player1Id = firstRes.data.data[0].id
    const player2Id = firstRes2.data.data[0].id
    const secondRes2 = await axios.get(`${apiBaseRoute}/season_averages?season=${selectValue2}&player_ids[]=${player2Id}`)
    // console.log(secondRes2.data.data[0])
    const season2Display = `${selectValue2} - ${parseInt(selectValue2) + 1}`
    const assist2 = secondRes2.data.data[0].ast
    const block2 = secondRes2.data.data[0].blk
    const rebound2 = secondRes2.data.data[0].reb
    const fgPercent2 = secondRes2.data.data[0].fg_pct
    const ftPercent2 = secondRes2.data.data[0].ft_pct
    const gamesPlayed2 = secondRes2.data.data[0].games_played
    const minutes2 = secondRes2.data.data[0].min
    const steals2 = secondRes2.data.data[0].stl
    const points2 = secondRes2.data.data[0].pts
    console.log(assist2)
    // change innerHTML
    document.querySelector("#player2-container > h3").innerHTML = season2Display
    document.querySelector("#player2-name").innerHTML = fullName2
    document.querySelector("#p2-1").innerHTML = points2.toFixed(1)
    document.querySelector("#p2-2").innerHTML = assist2.toFixed(1)
    document.querySelector("#p2-3").innerHTML = block2.toFixed(1)
    document.querySelector("#p2-4").innerHTML = rebound2.toFixed(1)
    document.querySelector("#p2-5").innerHTML = steals2.toFixed(1)
    document.querySelector("#p2-6").innerHTML = (fgPercent2 * 100).toFixed(1) + "%"
    document.querySelector("#p2-7").innerHTML = (ftPercent2 * 100).toFixed(1) + "%"
    document.querySelector("#p2-8").innerHTML = minutes2
    document.querySelector("#p2-9").innerHTML = gamesPlayed2

    // Initialize Player1 Column variables
    let player1_column1 = document.querySelector("#p1-1")
    let player1_column2 = document.querySelector("#p1-2")
    let player1_column3 = document.querySelector("#p1-3")
    let player1_column4 = document.querySelector("#p1-4")
    let player1_column5 = document.querySelector("#p1-5")
    let player1_column6 = document.querySelector("#p1-6")
    let player1_column7 = document.querySelector("#p1-7")
    let player1_column8 = document.querySelector("#p1-8")
    let player1_column9 = document.querySelector("#p1-9")

    // Initialize Player2 Column variables
    let player2_column1 = document.querySelector("#p2-1")
    let player2_column2 = document.querySelector("#p2-2")
    let player2_column3 = document.querySelector("#p2-3")
    let player2_column4 = document.querySelector("#p2-4")
    let player2_column5 = document.querySelector("#p2-5")
    let player2_column6 = document.querySelector("#p2-6")
    let player2_column7 = document.querySelector("#p2-7")
    let player2_column8 = document.querySelector("#p2-8")
    let player2_column9 = document.querySelector("#p2-9")

    // Add both players column variables to an array
    const columnArray = [
        player1_column1, player1_column2, player1_column3, player1_column4,
        player1_column5, player1_column6, player1_column7, player1_column8, player1_column9,
        player2_column1, player2_column2, player2_column3, player2_column4,
        player2_column5, player2_column6, player2_column7, player2_column8, player2_column9
    ]

    // Call function
    resetHightlights()
    // Create function to reset highlights (BOLD AND GREEN COLORING) from tables after resubmission
    function resetHightlights() {
        for (let i = 0; i < columnArray.length; i++) {
            columnArray[i].style.color = "black"
            columnArray[i].style.fontWeight = "normal"
        }
    }

    //  Make better stats bold and green
    if (points1 > points2) {
        player1_column1.style.color = "green"
        player1_column1.style.fontWeight = "bold"
    }
    if (points2 > points1) {
        player2_column1.style.color = "green"
        player2_column1.style.fontWeight = "bold"
    }
    if (assist1 > assist2) {
        player1_column2.style.color = "green"
        player1_column2.style.fontWeight = "bold"

    }
    if (assist2 > assist1) {
        player2_column2.style.color = "green"
        player2_column2.style.fontWeight = "bold"

    }
    if (block1 > block2) {
        player1_column3.style.color = "green"
        player1_column3.style.fontWeight = "bold"

    }
    if (block2 > block1) {
        player2_column3.style.color = "green"
        player2_column3.style.fontWeight = "bold"

    }
    if (rebound1 > rebound2) {
        player1_column4.style.color = "green"
        player1_column4.style.fontWeight = "bold"

    }
    if (rebound2 > rebound1) {
        player2_column4.style.color = "green"
        player2_column4.style.fontWeight = "bold"

    }
    if (steals1 > steals2) {
        player1_column5.style.color = "green"
        player1_column5.style.fontWeight = "bold"

    }
    if (steals2 > steals1) {
        player2_column5.style.color = "green"
        player2_column5.style.fontWeight = "bold"

    }
    if (fgPercent1 > fgPercent2) {
        player1_column6.style.color = "green"
        player1_column6.style.fontWeight = "bold"

    }
    if (fgPercent2 > fgPercent1) {
        player2_column6.style.color = "green"
        player2_column6.style.fontWeight = "bold"

    }
    if (ftPercent1 > ftPercent2) {
        player1_column7.style.color = "green"
        player1_column7.style.fontWeight = "bold"

    }
    if (ftPercent2 > ftPercent1) {
        player2_column7.style.color = "green"
        player2_column7.style.fontWeight = "bold"

    }

    // function to convert string into int after sripping colon from string.
    // replace method gets rid of ":" and allows for proper comparsion of time
    let deleteColon = minutes => parseInt(minutes.replace(":", ""))
    if (deleteColon(minutes1) > deleteColon(minutes2)) {
        player1_column8.style.color = "green"
        player1_column8.style.fontWeight = "bold"

    }
    if (deleteColon(minutes2) > deleteColon(minutes1)) {
        player2_column8.style.color = "green"
        player2_column8.style.fontWeight = "bold"

    }
    if (gamesPlayed1 > gamesPlayed2) {
        player1_column9.style.color = "green"
        player1_column9.style.fontWeight = "bold"

    }
    if (gamesPlayed2 > gamesPlayed1) {
        player2_column9.style.color = "green"
        player2_column9.style.fontWeight = "bold"

    }

}
