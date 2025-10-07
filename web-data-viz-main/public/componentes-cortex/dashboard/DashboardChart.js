class DashboardChart extends HTMLElement {
    
    static get observedAttributes() {
        return ['type', 'chart-title', 'chart-labels', 'chart-data'];
    }

    constructor() {
        super();
        this._chartInstance = null;
    }

    connectedCallback() {
        this.render();
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isConnected) {
            this.render();
        }
    }
    
    destroyChart() {
        if (this._chartInstance) {
            this._chartInstance.destroy();
        }
    }

    render() {
        this.destroyChart();

        const type = this.getAttribute('type') || 'bar';
        const chartTitle = this.getAttribute('chart-title') || 'Gráfico';
        let labels = [], data = [];

        try {
            labels = JSON.parse(this.getAttribute('chart-labels') || '[]');
            data = JSON.parse(this.getAttribute('chart-data') || '[]');
        } catch (e) {
            console.error('Erro ao processar os dados do gráfico:', e);
            const errorP = document.createElement('p');
            errorP.textContent = 'Erro nos dados do gráfico.';
            this.replaceChildren(errorP); // Substitui o conteúdo pelo erro
            return;
        }

        const header = document.createElement('div');
        header.className = 'chart-header';
        
        const title = document.createElement('h3');
        title.textContent = chartTitle;
        header.appendChild(title);

        const container = document.createElement('div');
        container.className = 'chart-container';
        
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        // Limpa o componente e adiciona a nova estrutura
        this.replaceChildren(header, container);
        
        const ctx = canvas.getContext('2d');
        
        const colors = {
            primary: {
                solid: '#6A6EE5',
                gradient: 'rgba(106, 110, 229, 0.1)',
                light: 'rgba(106, 110, 229, 0.85)'
            },
            secondary: {
                solid: '#D8ACEB',
                gradient: 'rgba(216, 172, 235, 0.1)',
                light: 'rgba(216, 172, 235, 0.85)'
            },
            tertiary: {
                solid: '#4ECDC4',
                light: 'rgba(78, 205, 196, 0.85)'
            },
            quaternary: {
                solid: '#FF6B6B',
                light: 'rgba(255, 107, 107, 0.85)'
            },
            grid: 'rgba(0, 0, 0, 0.06)',
            text: '#64748B'
        };
        
        let datasetsConfig = [];
        
        if (Array.isArray(data[0])) {
            datasetsConfig.push({
                label: 'Revenue',
                data: data[0],
                borderColor: colors.primary.solid,
                backgroundColor: type === 'line' ? colors.primary.gradient : colors.primary.light,
                tension: 0.4,
                fill: type === 'line' ? 'start' : false,
                pointRadius: type === 'line' ? 4 : 0,
                pointHoverRadius: type === 'line' ? 6 : 0,
                pointBackgroundColor: colors.primary.solid,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                borderWidth: 3,
                barThickness: type === 'bar' ? 32 : undefined,
            });
            
            if (data[1]) {
                datasetsConfig.push({
                    label: 'Trips',
                    data: data[1],
                    borderColor: colors.secondary.solid,
                    backgroundColor: type === 'line' ? colors.secondary.gradient : colors.secondary.light,
                    tension: 0.4,
                    fill: type === 'line' ? 'start' : false,
                    pointRadius: type === 'line' ? 4 : 0,
                    pointHoverRadius: type === 'line' ? 6 : 0,
                    pointBackgroundColor: colors.secondary.solid,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    borderWidth: 3,
                    barThickness: type === 'bar' ? 32 : undefined,
                });
            }
        } else {
            const colorArray = [
                colors.primary.solid,
                colors.secondary.solid,
                colors.tertiary.solid,
                colors.quaternary.solid
            ];
            
            datasetsConfig.push({
                label: chartTitle,
                data: data,
                backgroundColor: colorArray.map(c => c + 'D9'),
                borderColor: '#fff',
                borderWidth: 3,
                hoverOffset: 10
            });
        }

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 12,
                        boxHeight: 12,
                        padding: 15,
                        font: {
                            size: 13,
                            family: "'Lato', 'Inter', -apple-system, sans-serif",
                            weight: '500'
                        },
                        color: colors.text,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#0A202D',
                    bodyColor: '#64748B',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    titleFont: {
                        size: 13,
                        weight: '600',
                        family: "'Lato', 'Inter', -apple-system, sans-serif"
                    },
                    bodyFont: {
                        size: 13,
                        family: "'Lato', 'Inter', -apple-system, sans-serif"
                    },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            const value = context.parsed.y !== undefined ? context.parsed.y : context.parsed;
                            label += new Intl.NumberFormat('pt-BR').format(value);
                            return label;
                        }
                    }
                }
            }
        };

        if (type === 'line' || type === 'bar') {
            chartOptions.scales = {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Lato', 'Inter', -apple-system, sans-serif",
                            size: 12,
                            weight: '500'
                        },
                        color: colors.text,
                        padding: 8
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.grid,
                        drawBorder: false,
                        lineWidth: 1
                    },
                    border: {
                        display: false,
                        dash: [4, 4]
                    },
                    ticks: {
                        callback: (value) => {
                            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                            if (value >= 1000) return (value / 1000).toFixed(0) + 'k';
                            return value;
                        },
                        font: {
                            family: "'Lato', 'Inter', -apple-system, sans-serif",
                            size: 12,
                            weight: '500'
                        },
                        color: colors.text,
                        padding: 8,
                        maxTicksLimit: 6
                    }
                }
            };
            
            if (type === 'bar') {
                chartOptions.elements = {
                    bar: {
                        borderRadius: 8,
                        borderSkipped: false
                    }
                };
            }
        }

        this._chartInstance = new Chart(ctx, {
            type: type,
            data: { labels: labels, datasets: datasetsConfig },
            options: chartOptions
        });
    }
}

customElements.define('dashboard-chart', DashboardChart);