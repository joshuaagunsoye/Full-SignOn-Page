//display Users

fetch('http://localhost:8888/users')

.then(res => res.json())
    
.then(jsonArr=>{
    
    displayUsername (jsonArr)
     
    //all of the delete buttons 
    const arrBtns = document.querySelectorAll('.delBtn');
    for (const btn of arrBtns)
    {
        btn.addEventListener('click',handleDeleteCust)
    }

});

function handleDeleteCust(event)
{
    // alert('Deleting');
    const custID = event.currentTarget.value;
    console.dir(event)
    fetch('http://localhost:8888/users/' + custID,
    {
        method: 'DELETE',
    })
    .then(res=> res.text())
    .then(res=> console.log(res))
    event.preventDefault();

  }

  ///show hidden update on click of update button
  function showUpdate(Id)
  {
    localStorage.setItem("Id",Id)
    let x = document.getElementById("second");
    if (x.style.display === "none") {
      x.style.display = "block";
    } 
    else {
      x.style.display = "block";
    }
  }


// displayUsers
function displayUsername(jsonArr)
{
  const userView = document.getElementById('userView');
  const domTable = document.createElement ('table');
  let domainHeaderRow = document.createElement('tr');

  let domainHeaderuName = document.createElement('th')
  domainHeaderuName.innerText = "User Name";

  let domainHeaderUpdate = document.createElement('th')
  domainHeaderUpdate.innerText ="Update";

  let domainHeaderDelete = document.createElement('th')
  domainHeaderDelete.innerText = "Delete";

  // let domainHeaderStatus = document.createElement('th')
  // domainHeaderuName.innerText = "Status";

  domainHeaderRow.appendChild(domainHeaderuName);
  domainHeaderRow.appendChild(domainHeaderDelete);
  domainHeaderRow.appendChild(domainHeaderUpdate);

  domTable.appendChild(domainHeaderRow);

  //border styling
  domTable.setAttribute("border",1);

  
  for (json of jsonArr)
  {
      //make a new row for each json
      let domTR = document.createElement('tr');
      //make a new column for element
      let domTDUN = document.createElement('td');

      domTDUN.innerText = json.UName;
      
      // add button
      let domainButtonDelete = document.createElement('td');
      domainButtonDelete.innerHTML = `<button class = 'delBtn btn' value = ${json.Id}><i class="fa-solid fa-user-minus" ></i></button>`;

      let domStat = document.createElement('td');
      domStat.innerHTML = `<button class = 'update btn' onclick = "showUpdate(${json.Id})"><i class="far fa-edit"></i></button>`;
  
      //add cols

      domTR.appendChild(domTDUN);
      domTR.appendChild(domainButtonDelete);
      domTR.appendChild(domStat);

      //add to row to the table
      domTable.appendChild(domTR);

  }

  userView.appendChild(domTable)};

////////////////////////////////////// sending form data to database tables
  function getData(event)
{
    event.preventDefault();   
    const fd = new FormData (document.getElementById("newForm"))
    fetch('http://localhost:8888/details', 
    {
        method: 'POST', 
        body: fd
      });


    fetch('http://localhost:8888/Address', 
    {
        method: 'POST', 
        body: fd
      });


      fetch('http://localhost:8888/users', 
      {
          method: 'POST', 
          body: fd
        });   
}
/////////////////put
function getUpdatedData(event)
{
  // const custID = event.currentTarget.value;
  event.preventDefault()
  let fd = new FormData (document.getElementById("secondForm"))
  fd.append("Id",localStorage.getItem("Id"))
  fetch('http://localhost:8888/users',
  {
      method: 'PUT', 
      body: fd
    }); 
}





// function handleUpdate(event)
// {
//     alert('Updating');
//     event.preventDefault();   
//     const fd = new FormData (document.getElementById("secondForm"))
//     fetch('http://localhost:8888/users/' + custID,
//     {
//         method: 'PUT',
//         body: fd
//     })
  

//   }

