import React from 'react'
import { Pie } from 'react-chartjs-2';
import './Expertise.css'

const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Level of Expertise',
      },
    },
  };

const Expertise = ({expertise}) => {

    let count = {};

    expertise.forEach(function(x) {
        count[x] = (count[x] || 0) + 1;
    })

    return (
        <div className="nav">
        <div className="charts">
            <Pie
            width={100}
	        height={500}
            data={{
                labels: Object.keys(count),
                datasets: [
                  {
                    label: '# of Candidates',
                    data: Object.values(count),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              }} options={options} />
        </div>
        </div>
    )
}

export default Expertise
