document.addEventListener('DOMContentLoaded', function() {
    fetch('Arknights.json')
        .then(response => response.json())
        .then(data => {
            const parsedData = parseData(data.data);
            parsedData.sort((a, b) => new Date(b.time) - new Date(a.time));
            populateTable(parsedData);
            drawCharts(parsedData);

            document.getElementById('filterButton').addEventListener('click', () => {
                const gachaType = document.getElementById('gachaTypeFilter').value;
                const rankType = document.getElementById('rankTypeFilter').value;
                const filteredData = parsedData.filter(item => {
                    return (gachaType === 'all' || item.gacha_type === gachaType) &&
                           (rankType === 'all' || item.rank_type === rankType);
                });
                populateTable(filteredData);
                drawCharts(filteredData);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});

function parseData(data) {
    const parsedData = [];
    for (const [timestamp, value] of Object.entries(data)) {
        value.c.forEach(item => {
            const [name, rankType] = item;
            const gachaType = value.p.startsWith('中坚') ? '中坚寻访' : '干员寻访';
            parsedData.push({
                gacha_type: gachaType,
                rank_type: rankType + 1,
                name: name,
                time: new Date(parseInt(timestamp) * 1000).toISOString()
            });
        });
    }
    return parsedData;
}

const gachaTypeMap = {
    "干员寻访": "干员寻访",
    "中坚寻访": "中坚寻访"
};

function populateTable(data) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = '';
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${gachaTypeMap[item.gacha_type]}</td>
            <td>${item.rank_type}</td>
            <td>${item.name}</td>
            <td>${item.time}</td>
        `;
        if (item.rank_type === 4) {
            tr.style.color = '#c864e0';
        } else if (item.rank_type === 5) {
            tr.style.color = '#ffa500';
        } else if (item.rank_type === 6) {
            tr.style.color = '#ff4500'; // 橙色
        }
        tbody.appendChild(tr);
    });
}

function drawCharts(data) {
    const gachaCounts = {
        "干员寻访": { "3": 0, "4": 0, "5": 0, "6": 0 },
        "中坚寻访": { "3": 0, "4": 0, "5": 0, "6": 0 }
    };

    data.forEach(item => {
        if (gachaCounts[item.gacha_type]) {
            gachaCounts[item.gacha_type][item.rank_type]++;
        }
    });

    const chartConfigs = [
        { id: "chartG", type: "干员寻访", label: "干员寻访", infoId: "chartG-info" },
        { id: "chartC", type: "中坚寻访", label: "中坚寻访", infoId: "chartC-info" }
    ];

    chartConfigs.forEach(config => {
        const ctx = document.getElementById(config.id).getContext('2d');
        const chartData = {
            labels: [`${config.label} 3星`, `${config.label} 4星`, `${config.label} 5星`, `${config.label} 6星`],
            datasets: [{
                data: [
                    gachaCounts[config.type]["3"],
                    gachaCounts[config.type]["4"],
                    gachaCounts[config.type]["5"],
                    gachaCounts[config.type]["6"]
                ],
                backgroundColor: ['#5ca1dd', '#c864e0', '#ffa500', '#ff4500']
            }]
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const value = tooltipItem.raw;
                                const total = tooltipItem.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(2) + '%';
                                return `${tooltipItem.label}: ${value} (${percentage})`;
                            }
                        }
                    }
                }
            }
        });

        const chartInfo = document.getElementById(config.infoId);
        chartInfo.innerHTML = chartData.labels.map((label, index) => {
            const value = chartData.datasets[0].data[index];
            const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            const color = chartData.datasets[0].backgroundColor[index];
            return `<p style="color: ${color}">${label}: ${value} (${percentage})</p>`;
        }).join('');
    });
}
