document.addEventListener('DOMContentLoaded', function() {
    fetch('Arknights.json')
        .then(response => response.json())
        .then(data => {
            const limitedPools = [
                "何以为我",
                "突破，援助，任务循环",
                "进攻-防守-战术交汇", 
                "千秋一粟"
            ]; // 限定池子
            const parsedData = parseData(data.data, limitedPools);
            parsedData.sort((a, b) => new Date(b.time) - new Date(a.time));
            populateTable(parsedData);
            drawCharts(parsedData, limitedPools);
        })
        .catch(error => console.error('Error loading JSON:', error));
});

function parseData(data, limitedPools) {
    const parsedData = [];
    for (const [timestamp, value] of Object.entries(data)) {
        value.c.forEach(item => {
            const [name, rankType] = item;
            let gachaType = value.p.startsWith('中坚') ? '中坚寻访' : '干员寻访';
            if (limitedPools.includes(value.p)) {
                gachaType = `【限定】${value.p}`;
            }
            const date = new Date(parseInt(timestamp) * 1000);
            const formattedDate = date.getFullYear() + '-' +
                                  String(date.getMonth() + 1).padStart(2, '0') + '-' +
                                  String(date.getDate()).padStart(2, '0') + ' ' +
                                  String(date.getHours()).padStart(2, '0') + ':' +
                                  String(date.getMinutes()).padStart(2, '0') + ':' +
                                  String(date.getSeconds()).padStart(2, '0');
            parsedData.push({
                gacha_type: gachaType,
                rank_type: '★'.repeat(rankType + 1),
                name: name,
                time: formattedDate
            });
        });
    }
    return parsedData;
}

function populateTable(data) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = '';
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.gacha_type}</td>
            <td>${item.rank_type}</td>
            <td>${item.name}</td>
            <td>${item.time}</td>
        `;
        if (item.rank_type === '★★★★') {
            tr.style.color = '#c864e0';
        } else if (item.rank_type === '★★★★★') {
            tr.style.color = '#ffa500';
        } else if (item.rank_type === '★★★★★★') {
            tr.style.color = '#ff4500'; // 橙色
        }
        tbody.appendChild(tr);
    });
}

function drawCharts(data, limitedPools) {
    const gachaCounts = {
        "干员寻访": { "★★★": 0, "★★★★": 0, "★★★★★": 0, "★★★★★★": 0 },
        "中坚寻访": { "★★★": 0, "★★★★": 0, "★★★★★": 0, "★★★★★★": 0 }
    };

    const limitedCounts = { "★★★": 0, "★★★★": 0, "★★★★★": 0, "★★★★★★": 0 };

    data.forEach(item => {
        const gachaType = item.gacha_type.includes('中坚') ? '中坚寻访' : '干员寻访';
        if (gachaCounts[gachaType]) {
            gachaCounts[gachaType][item.rank_type]++;
        }
        if (limitedPools.some(pool => item.gacha_type.includes(pool))) {
            limitedCounts[item.rank_type]++;
        }
    });

    const chartConfigs = [
        { id: "chartG", type: "干员寻访", label: "干员寻访", infoId: "chartG-info" },
        { id: "chartL", type: "限定卡池", label: "限定卡池", infoId: "chartL-info" },
        { id: "chartC", type: "中坚寻访", label: "中坚寻访", infoId: "chartC-info" }
    ];

    chartConfigs.forEach(config => {
        const ctx = document.getElementById(config.id).getContext('2d');
        const chartData = config.type === "限定卡池" ? {
            labels: [`${config.label} ★★★`, `${config.label} ★★★★`, `${config.label} ★★★★★`, `${config.label} ★★★★★★`],
            datasets: [{
                data: [
                    limitedCounts["★★★"],
                    limitedCounts["★★★★"],
                    limitedCounts["★★★★★"],
                    limitedCounts["★★★★★★"]
                ],
                backgroundColor: ['#5ca1dd', '#c864e0', '#ffa500', '#ff4500']
            }]
        } : {
            labels: [`${config.label} ★★★`, `${config.label} ★★★★`, `${config.label} ★★★★★`, `${config.label} ★★★★★★`],
            datasets: [{
                data: [
                    gachaCounts[config.type]["★★★"],
                    gachaCounts[config.type]["★★★★"],
                    gachaCounts[config.type]["★★★★★"],
                    gachaCounts[config.type]["★★★★★★"]
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