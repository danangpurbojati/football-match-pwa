const API = '02ffa5aef17d43358b36e86b2e9d5012';
const loadImg = teamId => `https://crests.football-data.org/${teamId}.svg`;

// template function
// get standings html
const standingHtml = data => {
    let standingTable = "";
    const standingsJson = data.standings[0].table;
    standingsJson.forEach(standing => {
        standingTable += `
            <tr>
                <td>${standing.position}</td>
                <td>
                    <img class="left img-table" src="${standing.team.crestUrl}" alt="team-image">
                    ${standing.team.name}
                </td>
                <td class="center-align">${standing.playedGames}</td>
                <td class="center-align hide-on-med-and-down">${standing.won}</td>
                <td class="center-align hide-on-med-and-down">${standing.draw}</td>
                <td class="center-align hide-on-med-and-down">${standing.lost}</td>
                <td class="center-align hide-on-med-and-down">${standing.goalsFor}</td>
                <td class="center-align hide-on-med-and-down">${standing.goalsAgainst}</td>
                <td class="center-align hide-on-med-and-down">${standing.goalDifference}</td>
                <td class="center-align">${standing.points}</td>
            </tr>
        `;
    });
    document.getElementById("table-content").innerHTML = standingTable;
}


// get fixture html
const fixtureHtml = data => {
    let schedules = "";
    const matches = data.matches;
    matches.forEach(match => {
        schedules += `
            <a href="schedule-detail.html?id=${match.id}" class="collection-item">
                <div class="team-match">
                    <span class="team black-text right-align">${match.homeTeam.name}</span>
                    <span class="matchday grey darken-2 white-text center-align">MatchDay ${match.matchday}</span>
                    <span class="team black-text">${match.awayTeam.name}</span>
                </div>
            </a>
        `;
    })
    document.getElementById("fixtures-content").innerHTML = schedules;
}


// get detail Fixture html
const detailFixtureHtml = data => {
    let match = "";
    let detailMatch = data.match;
    match = `
        <div class="location">
            <div class="container">
                <span class="white-text">${new Date(detailMatch.utcDate).toLocaleDateString()} <strong>${detailMatch.venue} </strong></span>
            </div>
        </div>
        <div class="image-team container">
            <img src="${loadImg(detailMatch.homeTeam.id)}" alt="hometeam">
            <img src="${loadImg(detailMatch.awayTeam.id)}" alt="awayteam">
        </div>
        <div class="detail-match white-text">
            <div class="container versus black">
                <p>${detailMatch.homeTeam.name}</p>
                <p class="center-align">MatchDay ${detailMatch.matchday}</p>
                <p>${detailMatch.awayTeam.name}</p>
            </div>
            <p class="center-align">Kick Off</p>
            <p class="center-align">${new Date(detailMatch.utcDate).toLocaleTimeString()}</p>
        </div>            
    `;
    document.getElementById("detail-match").innerHTML = match;
}
// end template function





// Get Standings Data
const getStandings = () => {
    const url = 'https://api.football-data.org/v2/competitions/2021/standings';

    if ("caches" in window) {
        caches.match(url)
            .then(response => {
                if (response) {
                    response.json().then(data => {
                        standingHtml(data);
                    })
                }
            })
    }

    fetch(url, { headers: { 'X-Auth-Token': API } })
        .then(response => response.json())
        .then(responseJson => {
            standingHtml(responseJson);
        })
}
// End Get Standings Data




// Get Fixture Data
const getFixtures = () => {
    const url = 'https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED';

    if ("caches" in window) {
        caches.match(url)
            .then(response => {
                if (response) {
                    response.json().then(data => {
                        fixtureHtml(data);
                    })
                }
            })
    }

    fetch(url, { headers: { 'X-Auth-Token': API } })
        .then(response => response.json())
        .then(responseJson => {
            fixtureHtml(responseJson);
        })
}
// End Get Fixture Data




// Get Detail Fixture
const getDetailFixture = () => {
    return new Promise(function (resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");
        let url = `https://api.football-data.org/v2/matches/${idParam}`;
        if ("caches" in window) {
            caches.match(url)
                .then(response => {
                    if (response) {
                        response.json().then(data => {
                            detailFixtureHtml(data);
                            resolve(data);
                        })
                    }
                })
        }

        fetch(url, { headers: { 'X-Auth-Token': API } })
            .then(response => response.json())
            .then(responseJson => {
                detailFixtureHtml(responseJson);
                resolve(responseJson);
            })
    })
}
// End Detail Fixture






// IndexedDB
const getSavedMatches = () => {
    getAll().then(data => {

        let schedules = "";
        
        if(data.length === 0){
            schedules = ` 
                <div class="center-align">                
                    <span><strong>No Saved Matches</strong></span>
                </div>
            `;
        } else {
            const matches = data;
            // console.log(matches);
            matches.forEach(match => {
                schedules += `
                    <a href="schedule-detail.html?id=${match.id}&saved=true" class="collection-item">
                        <div class="team-match">
                            <span class="team black-text right-align">${match.homeTeam.name}</span>
                            <span class="matchday grey darken-2 white-text center-align">MatchDay ${match.matchday}</span>
                            <span class="team black-text">${match.awayTeam.name}</span>
                        </div>
                    </a>
                `;
            })
        }

        document.getElementById("saved-match").innerHTML = schedules;
    })
}

const getSavedMatchById = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    // console.log(idParam);

    let data = getById(idParam)

    getById(idParam).then(data => {
        let match = "";
        let detailMatch = data;
        match = `
            <div class="location">
                <div class="container">
                    <span class="white-text">${new Date(detailMatch.utcDate).toLocaleDateString()} <strong>${detailMatch.venue} </strong></span>
                </div>
            </div>
            <div class="image-team container">
                <img src="${loadImg(detailMatch.homeTeam.id)}" alt="hometeam">
                <img src="${loadImg(detailMatch.awayTeam.id)}" alt="awayteam">
            </div>
            <div class="detail-match white-text">
                <div class="container versus black">
                    <p>${detailMatch.homeTeam.name}</p>
                    <p class="center-align">MatchDay ${detailMatch.matchday}</p>
                    <p>${detailMatch.awayTeam.name}</p>
                </div>
                <p class="center-align">Kick Off</p>
                <p class="center-align">${new Date(detailMatch.utcDate).toLocaleTimeString()}</p>
            </div>            
        `;

        document.getElementById("detail-match").innerHTML = match;
    })
}


