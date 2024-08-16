import PropTypes from "prop-types";
import { Chart as ChartJs } from "chart.js/auto";
import { useEffect, useRef } from "react";

function ChartComponent({
  chartType,
  labels,
  data,
  informations,
  styles = {},
}) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const {
    bgColor = "bg-blue-200",
    bColor = "rgb(37, 99, 235)",
    bWidth = 2,
    pBgColor = "rgb(37, 99, 235)",
    pBColor = "rgb(255, 255, 255)",
    pBWidth = 2,
    pRadius = 5,
    height = "!h-[325px]",
    width = "w-auto",
    padding = "pt-2",
    margin = "m-0",
  } = styles;

  // Informations for chart (labels etc)
  const { xLabel, yLabel, callbackLabelFun } = informations;

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ChartJs(ctx, {
      type: chartType, // Line chart type
      data: {
        labels: labels, // X-axis labels (days of the month)
        datasets: [
          {
            data: data, // Y-axis data (cumulative balance)
            borderColor: bColor, // Line color
            borderWidth: bWidth, // Line width

            pointBackgroundColor: pBgColor, // Data points color
            pointBorderColor: pBColor, // Data points border color
            pointBorderWidth: pBWidth, // Data points border width
            pointRadius: pRadius, // Data points radius
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
            callbacks: {
              label: (context) => callbackLabelFun(context),
            },
            animation: {
              duration: 500,
            },
            caretSize: 5,
            caretPadding: 5,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: xLabel,
            },
          },
          y: {
            title: {
              display: true,
              text: yLabel,
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels, data]);

  return (
    <canvas
      ref={canvasRef}
      className={`${bgColor} ${height} ${width} ${margin} ${padding}`}
    ></canvas>
  );
}

ChartComponent.propTypes = {
  chartType: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  informations: PropTypes.shape({
    xLabel: PropTypes.string.isRequired,
    yLabel: PropTypes.string.isRequired,
    callbackLabelFun: PropTypes.func.isRequired,
  }).isRequired,
  styles: PropTypes.shape({
    bgColor: PropTypes.string,
    bColor: PropTypes.string,
    bWidth: PropTypes.number,
    pBgColor: PropTypes.string,
    pBColor: PropTypes.string,
    pBWidth: PropTypes.number,
    pRadius: PropTypes.number,
    height: PropTypes.string,
    width: PropTypes.string,
    margin: PropTypes.string,
    padding: PropTypes.string,
  }),
};

export default ChartComponent;
