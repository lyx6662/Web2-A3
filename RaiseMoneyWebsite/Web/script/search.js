//Create a method and run it on the loading page
document.addEventListener('DOMContentLoaded', function () {
    const dropDown = document.getElementById('dropDownBox');//Get the div with the id dropDownBox
    const select = document.createElement('select');//Create a select
    select.name = 'category';

    const prime = document.createElement('option');
    prime.value = 'Click here to select';
    prime.textContent = 'Click here to select';
    select.appendChild(prime);
//The api called by fetch is used to fetch all categories
    fetch('http://localhost:3060/api/raisemoney/use/search/CATEGORY')
  .then(response => response.json())  //数据转json格式
  .then(data => {
            data.forEach(category => {
                if (category && category['NAME']) {
                        //Add all the categories you get to the drop-down options
                        const option = document.createElement('option');
                        option.value = category['NAME'];
                        option.textContent = category['NAME'];
                        select.appendChild(option);
                    } else {
                        console.log('Need more data');
                    }
                });
                dropDown.appendChild(select);
            })
      .catch(error => console.error('Error:', error));
    });
//The method used to search
function startSearch(){
    const organizer = document.getElementById('organizerInput').value;//Gets the three values entered by the user
    const city = document.getElementById('cityInput').value;
    const dropDownBox = document.getElementById('dropDownBox');
    const categorySelect = dropDownBox.querySelector('select');
    let category = categorySelect.options[categorySelect.selectedIndex].value;
    if(category==='Click here to select') { //The default value of the drop-down box is empty
        category='';
    }
    
    let url = 'http://localhost:3060/api/raisemoney/Search/';   
    if(organizer||city||category){//When there is at least one value, a special url is built to facilitate the back-end get to realize the query logic by looking up the string
        if(organizer){
            url += organizer+'&';
        }else{
            url +='&';
        }

        if(city){
            url += city+'&';
        }else{
            url +='&';
        }

        if(category){
            url += category;
        }

   console.log(url);
    fetch(url)//Call the api through fetch
        .then(response => response.json())//Convert the format
        .then(data =>{
            const tableBodyDiv = document.getElementById('tableBody');
            tableBodyDiv.innerHTML = "";
            console.log(data);
            if(data.length > 0){             
                data.forEach(fundraiser => {
                    //Use javascript to dynamically create html and display the obtained data on the page
                    const newRow = document.createElement("tr"); 

                    newRow.addEventListener("click", function () {
                        localStorage.setItem("ID", fundraiser.FUNDRAISER_ID);
                        location.href = '/fundraiser';
                    });

                    const captionCell = document.createElement("td");  
                    captionCell.textContent = fundraiser.CAPTION;  
                    newRow.appendChild(captionCell); 

                    const organizerCell = document.createElement("td");  
                    organizerCell.textContent = fundraiser.ORGANIZER;  
                    newRow.appendChild(organizerCell);  

                    const categoryNameCell = document.createElement("td");  
                    categoryNameCell.textContent = fundraiser.CATEGORY_NAME;
                    newRow.appendChild(categoryNameCell);  

                    tableBodyDiv.appendChild(newRow);  

                    
                });
            }else{//No fundraisers found. And set it to red bold
                const noDataMessage = document.createElement("tr");
                const noDataCell = document.createElement("td");
                noDataCell.colSpan = 3;
                noDataCell.textContent = "No fundraisers found.";
                noDataCell.style.fontWeight = "bold";
                noDataCell.style.color = "red";
                noDataCell.style.textAlign = "center";
                noDataMessage.appendChild(noDataCell);
                tableBodyDiv.appendChild(noDataMessage);
            }
        })

        .catch(error =>{
            console.error("Error here",error);
            document.getElementById('data').textContent = "Load failure";
        });
        
    }else{//User didn't choose anything to alert
        alert('At least one piece of data needs to be provided for lookup!');
        const tableBodyDiv = document.getElementById('tableBody');
        tableBodyDiv.textContent = "";
    }
}
//Clear button method, clear user input, clear previous data
function claerChechboxes(){
    document.getElementById('organizerInput').value = '';
    document.getElementById('cityInput').value = '';
    const categorySelect = document.getElementsByName('category')[0];
    categorySelect.selectedIndex = 0;
    const tableBodyDiv = document.getElementById('tableBody');
    tableBodyDiv.textContent = "";
}