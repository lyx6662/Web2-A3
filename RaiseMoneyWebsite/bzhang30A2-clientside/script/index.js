fetch("http://localhost:3060/api/raisemoney") //Get database data through the api
    .then(response=>response.json())   //Convert to json format
    .then(data=>{    //Get the data element
    const dataDiv = document.getElementById('data');
    dataDiv.innerHTML = "";
    console.log(data);
    if(data.length > 0){         
        data.forEach(fundraiser => { //Below is to display the incoming data on the page, using javascript to dynamically generate html, I am using css plus html to make a card display.
                const homePageCard = document.createElement('div');
                homePageCard.classList.add('home_card');
                const logoContainer = document.createElement('div');
                logoContainer.classList.add('logo_Container');
                const img = document.createElement('img');//Display pictures by category ID and assign logos to different categories
                if(fundraiser.CATEGORY_ID === 1){
                    img.src = '../image/1.png';
                }else if(fundraiser.CATEGORY_ID === 2){
                    img.src = '../image/2.png';
                }else if(fundraiser.CATEGORY_ID === 3){
                    img.src = '../image/3.png';
                }else if(fundraiser.CATEGORY_ID === 4){
                    img.src = '../image/4.png';
                }else if(fundraiser.CATEGORY_ID === 5){
                    img.src = '../image/5.png';
                }
                img.classList.add('logo');
                logoContainer.appendChild(img);
                const caption = document.createElement('h3');//Adds the element to the parent element
                caption.textContent = fundraiser.CAPTION;
                logoContainer.appendChild(caption);
                homePageCard.appendChild(logoContainer);

                const organizer = document.createElement('p');
                organizer.textContent = `Organizer: ${fundraiser.ORGANIZER}`;
                homePageCard.appendChild(organizer);

                const city = document.createElement('p');
                city.textContent = `City: ${fundraiser.CITY}`;
                homePageCard.appendChild(city);

                const funding = document.createElement('p');
                city.textContent = `$${fundraiser.CURRENT_FUNDING} raised`;
                homePageCard.appendChild(funding);

                const progressBar = document.createElement('meter');//A progress bar
                progressBar.min = 0;
                progressBar.max = parseFloat(fundraiser.TARGET_FUNDING);
                progressBar.value = parseFloat(fundraiser.CURRENT_FUNDING);
                homePageCard.appendChild(progressBar);
                dataDiv.appendChild(homePageCard);

                homePageCard.addEventListener("click",function(){//Click on the card to jump to the fundraiser page and store the ORGANIZER locally
                    localStorage.setItem("ORGANIZER",fundraiser.ORGANIZER);
                    location.href = '/fundraiser';
                });

        });
    }else{
        dataDiv.textContent = "No fundraiser"
    }
    })

    .catch(error =>{
        console.error("Error here",error);
        document.getElementById('data').textContent = "Load failure";
    });