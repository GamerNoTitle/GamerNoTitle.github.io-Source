document.addEventListener('DOMContentLoaded', function() {
    fetch('GenshinImpact.json')
        .then(response => response.json())
        .then(data => {
            data.list.sort((a, b) => new Date(b.time) - new Date(a.time));
            populateTable(data.list);
            drawCharts(data.list);

            document.getElementById('filterButton').addEventListener('click', () => {
                const gachaType = document.getElementById('gachaTypeFilter').value;
                const rankType = document.getElementById('rankTypeFilter').value;
                const filteredData = data.list.filter(item => {
                    return (gachaType === 'all' || item.gacha_type === gachaType) &&
                           (rankType === 'all' || item.rank_type === rankType)
                });
                populateTable(filteredData);
                drawCharts(filteredData);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});

const gachaTypeMap = {
    "200": "常驻祈愿",
    "301": "角色活动祈愿",
    "302": "武器活动祈愿"
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
        if (item.rank_type === '4') {
            tr.style.color = '#c864e0';
        } else if (item.rank_type === '5') {
            tr.style.color = '#ffa500';
        }
        tbody.appendChild(tr);
    });
}

function drawCharts(data) {
    const gachaCounts = {
        "200": { "3": 0, "4": 0, "5": 0 },
        "301": { "3": 0, "4": 0, "5": 0 },
        "302": { "3": 0, "4": 0, "5": 0 }
    };

    data.forEach(item => {
        if (gachaCounts[item.gacha_type]) {
            gachaCounts[item.gacha_type][item.rank_type]++;
        }
    });

    const chartConfigs = [
        { id: "chart200", type: "200", label: "常驻祈愿", infoId: "chart200-info" },
        { id: "chart301", type: "301", label: "角色活动祈愿", infoId: "chart301-info" },
        { id: "chart302", type: "302", label: "武器活动祈愿", infoId: "chart302-info" }
    ];

    chartConfigs.forEach(config => {
        const ctx = document.getElementById(config.id).getContext('2d');
        const chartData = {
            labels: [`${config.label} 3星`, `${config.label} 4星`, `${config.label} 5星`],
            datasets: [{
                data: [
                    gachaCounts[config.type]["3"],
                    gachaCounts[config.type]["4"],
                    gachaCounts[config.type]["5"]
                ],
                backgroundColor: ['#5ca1dd', '#c864e0', '#ffa500']
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
