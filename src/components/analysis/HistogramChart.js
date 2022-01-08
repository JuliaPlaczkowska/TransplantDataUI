import React from 'react';
import {useState, useEffect} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function HistogramChart(props) {

    const CHART_COLORS = [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
    ];

    const options = {
            plugins: {
                title: {
                    display: true,

                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                yAxes: {
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepValue: 10,
                        max: 100,
                        suggestedMax: 100
                    }
                },
            },
        };


    let data = {
        labels: props.histogramData.labels,
        datasets: []
    };

    if (props.histogramData.datasets !== undefined)
        data = {
            labels: props.histogramData.labels,
            datasets:
                props.histogramData.datasets.map((set, index) => {

                    return {
                        label: set.label,
                        data: set.data,
                        backgroundColor: CHART_COLORS[index],
                    }
                }),
        };


    return (
        <div>
            {data !== {} ?
            <Bar options={options} data={data} />
            :
                <div>
                </div>}
        </div>
    );
}
