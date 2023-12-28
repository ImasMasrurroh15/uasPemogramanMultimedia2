// function fetchData(searchTerm = '') {
//     const apiUrl = `https://www.freetogame.com/api/games?platform=pc`;

//     // Menggunakan jQuery untuk AJAX request
//     $.ajax({
//         url: apiUrl,
//         method: 'GET',
//         dataType: 'json',
//         success: function (data) {
//             displayData(data);
//         },
//         error: function (error) {
//             console.error('Error fetching data:', error);
//         }
//     });
// }

// function displayData(data) {
//     const resultContainer = $('#result');
//     resultContainer.empty();

//     if (data.length === 0) {
//         resultContainer.append('<p>No data found.</p>');
//         return;
//     }

//     // Menampilkan data dalam bentuk tabel
//     const table = $('<table>');
//     const headerRow = $('<tr>');
//     Object.keys(data[0]).forEach(key => {
//         headerRow.append($('<th>').text(key));
//     });
//     table.append(headerRow);

//     data.forEach(item => {
//         const row = $('<tr>');
//         Object.values(item).forEach(value => {
//             row.append($('<td>').text(value));
//         });
//         table.append(row);
//     });

//     resultContainer.append(table);
// }

// function searchData() {
//     const searchTerm = $('#searchInput').val();
//     fetchData(searchTerm);
// }

// // Memanggil fetchData saat halaman dimuat
// $(document).ready(function () {
//     fetchData();
// });


document.addEventListener('DOMContentLoaded', async function () {
    const gameList = document.getElementById('gameList');
    const searchInput = document.getElementById('searchInput');
    let displayedGames = [];

    const fetchData = async () => {
        try {
            // const response = await fetch('https://www.freetogame.com/api/games');
            const response = await fetch('https://www.cheapshark.com/api/1.0/deals?upperPrice=15');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const displayGames = async () => {
        const games = await fetchData();
        if (games) {
            displayedGames = games;
            renderGames(displayedGames);
        }
    };

    const renderGames = (games) => {
        gameList.innerHTML = '';
        const headerRow = document.createElement('tr');
        gameList.appendChild(headerRow);

        const gamesToDisplay = games.slice(0, 10); // Menampilkan hanya 10 produk

        gamesToDisplay.forEach(game => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${game.title}</td>
                <td>${game.salePrice}</td>
                <td>${game.normalPrice}</td>
                <td><img src="${game.thumb}" alt="${game.title}" 
                style="width: 50px; height: 50px;"></td>
            `;
            gameList.appendChild(row);
        });
    };
    

    displayGames();

    searchInput.addEventListener('input', function () {
        const searchValue = this.value.toLowerCase();
        const filteredGames = displayedGames.filter(game =>
            game.title.toLowerCase().includes(searchValue)
        );
        renderGames(filteredGames);
    });
});
