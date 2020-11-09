var dbPromised = idb.open("epl-fixtures", 1, function(upgradeDb) {
    const matchObjectStore = upgradeDb.createObjectStore("matches", {
      keyPath: "id"
    });
    matchObjectStore.createIndex("matchday", "matchday", { unique: false });
});


// save data to indexeddb
const saveForLater = data => {
  dbPromised.then(db => {
    const tx = db.transaction("matches", "readwrite");
    const store = tx.objectStore("matches");

    store.put(data.match);
    return tx.complete;
  }).then(()=>{
    window.location = "./index.html#saved-schedule";
  })
}


// get all data
const getAll = () => {
  return new Promise((resolve,reject) => {
    dbPromised.then(db => {
      const tx = db.transaction("matches", "readonly");
      const store = tx.objectStore("matches");

      return store.getAll();
    }).then(data => {
      resolve(data);
    })
  })
}


// get data by id
const getById = id => {
  return new Promise((resolve,reject) => {
    dbPromised.then(db => {
      const tx = db.transaction("matches", "readonly");
      const store = tx.objectStore("matches");
            
      return store.get(parseInt(id));       
    }).then(data => {      
      resolve(data);
    })
  })
}


// delete data by id
const deleteById = id => {
  dbPromised.then(db => {
    var tx = db.transaction('matches', 'readwrite');
    var store = tx.objectStore('matches');
    store.delete(parseInt(id));
    return tx.complete;
  }).then(() => {
    window.location = "./index.html#saved-schedule";
  });
}





