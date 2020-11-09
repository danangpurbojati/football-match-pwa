document.addEventListener("DOMContentLoaded", () => {
    const elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems, {edge:'right'});


   

	const loadNav = () =>
	{
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				if(this.status != 200) return;

				// Muat daftar tautan menu
				document.querySelectorAll(".topnav, .sidenav")
				.forEach(elm => {
					elm.innerHTML = xhttp.responseText;
				});

				// Daftarkan event listener untuk setiap tautan menu
				document.querySelectorAll('.sidenav a, .topnav a')
				.forEach(elm =>{
					elm.addEventListener('click', event => {
						// Tutup sidenav
						const sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();
						
						// Muat konten halaman yang dipanggil 
						page = event.target.getAttribute('href').substr(1);
						loadPage(page);
					});
				});
			}
		};
		xhttp.open("GET", 'nav.html', true);
		xhttp.send();
	}
	
	

	const loadPage = page =>
	{
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				const content = document.querySelector(".body-content");

				// console.log(window);

				if(page === "table"){
					getStandings();
				} else if(page === "fixture"){
					getFixtures();
				} else if (page === "saved-schedule") {
					getSavedMatches();
				}

				if(this.status == 200) {
					content.innerHTML = xhttp.responseText;
				} else if(this.status == 404) {
					content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
				} else {
					content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
				}
			}
		};
		xhttp.open("GET", 'pages/'+page+'.html', true);
		xhttp.send();
	}

	// Load Navigation
	loadNav();

	// Load page content
	let page = window.location.hash.substr(1);
	if(page == '') page = 'home';
	loadPage(page);

})