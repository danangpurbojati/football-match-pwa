document.addEventListener("DOMContentLoaded", () => {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let idSaved = urlParams.get("id");
    
    const btnSave = document.getElementById("save");
    const btnDelete = document.getElementById("delete");

    if(isFromSaved){
      btnSave.style.display = "none";
      btnDelete.style.display = "block";
      getSavedMatchById();
    } else {
      var item = getDetailFixture();
    }


    btnSave.addEventListener("click", () => {
      console.log("tombol FAB di klik");
      item.then((data)=>{
        saveForLater(data);
      })
    })

    btnDelete.addEventListener("click", () => {
      console.log(idSaved);
      deleteById(idSaved);
    })
  });