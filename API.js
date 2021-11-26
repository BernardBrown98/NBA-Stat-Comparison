// *************TODO LIST************************
// finish comments
// look for new json files with player
// possibly update year queries based on player input
// add styles
// add a try catch to async function to catch error when player is searched for a year he didnt play

// INPUT BOXES
let search1 = document.getElementById("search1")
let search2 = document.getElementById("search2")
// dropdown list below input
let matchList = document.querySelector("#match-list")
let dropDown1 = document.querySelector("#dropDown1")
let dropDown2 = document.querySelector("#dropDown2")

let container1 = document.querySelector("#player1-container")
let submission = document.querySelector("#submit-forms")
const form1 = document.querySelector("#searchForm1")
const form2 = document.querySelector("#searchForm2")
const input2 = document.querySelector("#searchForm2 > input").value

let searchedText = async userSearch => {
    // store data in variable
    const res = await axios.get("data3.json")
    console.log(res)
    // create empty array for future "push"
    let nameCollection = []
    // loop over json file to store data in nameCollection
    for (let i = 0; i < res.data.length; i++) {
        let fullName = res.data[i].name
        nameCollection.push(fullName)
        // console.log(nameCollection)
    }


    // Use FILTER method to create new array with elements that pass the test implemented  by the provided function
    let matches = nameCollection.filter(n => {
        // REGEX METHOD BELOW 
        // const regex = new RegExp(`${userSearch}`, "gi")
        // return n.match(regex)
        // console.log(n)
        // 
        return n.toLowerCase().includes(userSearch)
    })


    console.log(`THIS IS THE MATCHES ${matches}`)


    // Initialize str
    let str = ""
    // If there are less than 15 matches (OF NBA PLAYERS) from users input add options including each match to str to be displayed
    if (matches.length < 15) {
        for (let i = 0; i < matches.length; i++) {
            str += `<option>${matches[i]}</option>`
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



    let player1Box = document.querySelector("#player1-image")
    let player2Box = document.querySelector("#player2-image")
    let setImage = (playerBox) => {
        let selectedObject = res.data.find(el => el.name == matches)

        // USE OPTIONAL CHAINING OPERATOR TO AVOID ERROR
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining



        let idkworkplease = selectedObject?.imgUrl

        console.log(playerBox.src)
        playerBox.src = idkworkplease


    }
    if (matches != '' && search1?.value.toUpperCase() == matches.toString().toUpperCase()) {
        submission.addEventListener('click', () => setImage(player1Box))
    }
    if (matches != '' && search2?.value.toUpperCase() == matches.toString().toUpperCase()) {
        submission.addEventListener('click', () => setImage(player2Box))

    }

    // PLAYER 1 TABLE HEADER



    submission.addEventListener('click', () => {
        player1Box.setAttribute("class", "shown")
        player2Box.setAttribute("class", "shown")
    })

    console.log(player1Box.src)




}

// Eventlisteners for 
search1.addEventListener("keyup", () => searchedText(search1.value.toLowerCase()))
search2.addEventListener("keyup", () => searchedText(search2.value.toLowerCase()))

// let nameCollection = []
// for (let i = 0; i < res.data.length; i++) {
//     let fName = res.data[i].firstName
//     let lName = res.data[i].lastName
//     nameCollection.push(`${fName} ${lName}`)
// }
searchedText()




submission.addEventListener("click", () => {
    if (document.querySelector("#searchForm1 > input").value != ""
        &&
        document.querySelector("#searchForm2 > input").value != ""
    ) {
        playerStats()

    }

})



let playerStats = async () => {
    console.log("SUBMITTED")
    const firstSearch = document.querySelector("#searchForm1 > input").value
    console.log(`this is ${firstSearch}`)
    const firstRes = await axios.get(`https://www.balldontlie.io/api/v1/players?search=${firstSearch}`)

    console.log(firstRes)
    let seasonSelect1 = document.querySelector("#season1")
    let selectValue1 = seasonSelect1.value
    // console.log(selectValue1)
    let fName1 = firstRes.data.data[0].first_name
    let lName1 = firstRes.data.data[0].last_name
    let fullName1 = `${fName1} ${lName1}`
    let player1Id = firstRes.data.data[0].id
    const secondRes = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${selectValue1}&player_ids[]=${player1Id}`)
    // console.log(secondRes.data.data[0])
    let season1Display = `${selectValue1} - ${parseInt(selectValue1) + 1}`
    // console.log(season1Display)
    let assist1 = secondRes.data.data[0].ast
    let block1 = secondRes.data.data[0].blk
    let rebound1 = secondRes.data.data[0].reb
    let fgPercent1 = secondRes.data.data[0].fg_pct
    let ftPercent1 = secondRes.data.data[0].ft_pct
    let gamesPlayed1 = secondRes.data.data[0].games_played
    let minutes1 = secondRes.data.data[0].min
    let steals1 = secondRes.data.data[0].stl
    let points1 = secondRes.data.data[0].pts
    console.log(assist1)
    // change innerHTML
    document.querySelector("#player1-container > h3").innerHTML = season1Display
    document.querySelector("#player1Name").innerHTML = fullName1
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

    const firstSearch2 = document.querySelector("#searchForm2 > input").value
    // console.log(firstSearch2)
    const firstRes2 = await axios.get(`https://www.balldontlie.io/api/v1/players?search=${firstSearch2}`)
    // console.log(firstRes2)
    let seasonSelect2 = document.querySelector("#season2")
    let selectValue2 = seasonSelect2.value
    let fName2 = firstRes2.data.data[0].first_name
    let lName2 = firstRes2.data.data[0].last_name
    let fullName2 = `${fName2} ${lName2}`
    // let player1Id = firstRes.data.data[0].id
    let player2Id = firstRes2.data.data[0].id
    const secondRes2 = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${selectValue2}&player_ids[]=${player2Id}`)
    // console.log(secondRes2.data.data[0])
    let season2Display = `${selectValue2} - ${parseInt(selectValue2) + 1}`
    let assist2 = secondRes2.data.data[0].ast
    let block2 = secondRes2.data.data[0].blk
    let rebound2 = secondRes2.data.data[0].reb
    let fgPercent2 = secondRes2.data.data[0].fg_pct
    let ftPercent2 = secondRes2.data.data[0].ft_pct
    let gamesPlayed2 = secondRes2.data.data[0].games_played
    let minutes2 = secondRes2.data.data[0].min
    let steals2 = secondRes2.data.data[0].stl
    let points2 = secondRes2.data.data[0].pts
    console.log(assist2)
    // change innerHTML
    document.querySelector("#player2-container > h3").innerHTML = season2Display
    document.querySelector("#player2Name").innerHTML = fullName2
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
    let columnArray = [
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
    if (minutes1 > minutes2) {
        player1_column8.style.color = "green"
        player1_column8.style.fontWeight = "bold"

    }
    if (minutes2 > minutes1) {
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
