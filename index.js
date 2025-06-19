document.addEventListener("DOMContentLoaded" , function(){
    const usernameInput = this.getElementById("userName");
    const searchbutton = this.getElementById("search");
    const statsContainer = this.querySelector(".statsCircle");
    const easyProgressCircle = this.getElementById("easy");
    const mediumProgressCircle = this.getElementById("medium");
    const hardProgressCircle = this.getElementById("hard");
    const statsCards = this.querySelector(".statcard");

    function validateUsername(username){
            if(username.trim() === ""){
                alert("username can't be empty");
                return false;
            }
            const isValid = /^[a-zA-Z0-9]([a-zA-Z0-9_-]{1,14})[a-zA-Z0-9]$/.test(username);
            if(!isValid){
                alert("Invalid Input");
            }
            return isValid;

    }
    async function fetchUser(username){
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchbutton.textContent = "Searching...";
            searchbutton.disabled = true;
            
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Network error or invalid response");
            }
            const data = await response.json();
            console.log(data);
            if(data.status === "error"){
                throw new Error("unable to fetch user");
            }
            return data;
        }
        catch(error){
            statsContainer.innerHTML = `<p>user not found</p>`
            // alert("unable to fetch user");
        }
        finally{
            searchbutton.textContent = "Search";
            searchbutton.disabled = false;
        }
    }
    

    searchbutton.addEventListener( 'click',async function(){
        const username = usernameInput.value;
        console.log(username);
        if(validateUsername(username)){
            const data = await fetchUser(username);
            const Totalquestions = data.totalQuestions;
            // console.log(Totalquestions);
            const Totaleasy = data.totalEasy;
            const Totalmedium = data.totalMedium;
            const Totalhard = data.totalHard;


            const easysolved = data.easySolved;
            const mediumsolved = data.mediumSolved;
            const hardsolved = data.hardSolved;

            const easypercentage = ((easysolved/Totaleasy)*100).toFixed(2);
            const mediumpercentage = ((mediumsolved/Totalmedium)*100).toFixed(2);
            const hardpercentage = ((hardsolved/Totalhard)*100).toFixed(2);

            easyProgressCircle.textContent = `Easy: ${easypercentage}%`;
            mediumProgressCircle.textContent = `Medium: ${mediumpercentage}%`;
            hardProgressCircle.textContent = `Hard: ${hardpercentage}%`;

            easyProgressCircle.style.background = `conic-gradient(rgb(1, 82, 1) var(--progress, ${easypercentage}%),rgba(3, 100, 3, 0.177) 0%)`;
            mediumProgressCircle.style.background = `conic-gradient(rgb(1, 82, 1) var(--progress, ${mediumpercentage}%),rgba(3, 100, 3, 0.177) 0%)`;
            hardProgressCircle.style.background = `conic-gradient(rgb(1, 82, 1) var(--progress, ${hardpercentage}%),rgba(3, 100, 3, 0.177) 0%)`;
        }

        
        
    })
})

