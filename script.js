document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('promoMessage').style.display = 'block';
});

document.getElementById('queryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const serverIp = document.getElementById('serverIp').value;
    const serverPort = document.getElementById('serverPort').value || ''; // Puerto opcional
    const serverType = document.getElementById('serverType').value;
    const resultDiv = document.getElementById('result');
    
 
    document.getElementById('promoMessage').style.display = 'none';

    
    const endpoint = serverType === 'bedrock' 
        ? `https://api.mcsrvstat.us/bedrock/3/${serverIp}${serverPort ? ':' + serverPort : ''}`
        : `https://api.mcsrvstat.us/3/${serverIp}${serverPort ? ':' + serverPort : ''}`;

    // Realiza la consulta a la API de mcsrvstats
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.online) {
                const { hostname, players, version, motd, port, protocol, cache } = data;
                const playersOnline = players.online || 0;
                const playersMax = players.max || 0;
                const motdText = motd.clean ? motd.clean.join('<br>') : "No disponible";

                resultDiv.innerHTML = `
                    <h3>${hostname || "Servidor Desconocido"}</h3>
                    <p><strong>ServerName:</strong> ${motdText}</p>
                    <p><strong>Jugadores:</strong> ${playersOnline} / ${playersMax}</p>
                    <p><strong>Versión:</strong> ${version}</p>
                    <p><strong>Dirección IP:</strong> ${serverIp}</p>
                    <p><strong>Puerto:</strong> ${port || serverPort}</p>
                    <p><strong>Versión del protocolo:</strong> ${protocol?.name || "No disponible"}</p>
                    <button onclick="openMOTDCreator('${hostname}')">Abrir en creador de MOTD</button>
                    <p class="cache-time">Consulta realizada el: ${cache ? new Date(cache * 1000).toLocaleString() : "No disponible"}</p>
                `;
            } else {
                resultDiv.innerHTML = `<p>Error: El servidor está offline o no existe.</p>`;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<p>Error al consultar el servidor. ${error.message}</p>`;
            console.error(error);
        });
});


function openMOTDCreator(serverName) {
    const url = `https://CraftsmanServerStatus.github.io/status`;
    window.open(url, '_blank');
            }
