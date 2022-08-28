import { IonItem, IonItemGroup, IonList, IonListHeader } from "@ionic/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";
import "./SemiCircleDonutChart.css";

enum MONTHS {
  JANUARY = "Enero",
  FEBRUARY = "Febrero",
  MARCH = "Marzo",
  APRIL = "Abril",
  MAY = "Mayo",
  JUNE = "Junio",
  JULY = "Julio",
  AUGUST = "Agosto",
  SEPTEMBER = "Septiembre",
  OCTUBER = "Octubre",
  NOVEMBER = "Noviembre",
  DECEMBER = "Diciembre",
}

function trimesterMapper(trimesterInNumber: any) {
  switch (trimesterInNumber) {
    case "01":
      return "Primer";
    case "04":
      return "Segundo";
    case "07":
      return "Tercer";
    case "10":
      return "Cuarto";
    default:
      return "Trimestre no válido";
  }
}

interface ApiDataInterface {
  data: any;
}

const SemiCircleDonutChart: React.FC<ApiDataInterface> = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const secondChartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [chartExplication, setChartExplication] = useState<any>({
    trimester: "",
    previousYear: "",
    increase: "",
    decrease: "",
    stability: "",
  });

  const [secondChartExplication, setSecondChartExplication] = useState([]);

  const [chartMonths, setChartMonths] = useState<any>([]);

  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      shadow: true,
    },
    title: {
      text: "Expectativas<br>tendencia<br>ocupación",
      align: "center",
      verticalAlign: "middle",
      y: 60,
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{series.name}</span><table>',
      pointFormat:
        "<tr><td>{point.name}: <b>{point.percentage:.1f}%</b></td></tr>",
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    legend: {
      itemWidth: 100,
      itemStyle: {
        fontSize: "14px",
        color: "blue",
        textOverflow: "allow",
      },
      itemMarginBottom: 50,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "90%"],
        size: "120%",
        showInLegend: true,
      },
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["viewFullscreen"],
        },
      },
    },
    credits: {
      enabled: false,
    },
  });

  const [secondChartOptions, setSecondChartOptions] = useState<any>({
    chart: {
      type: "column",
      shadow: true,
    },
    title: {
      text: "Índice de ocupación previsto para cada mes",
    },
    subtitle: {
      text: 'Fuente: <a target="_blank" href="http://www.gobiernodecanarias.org/istac/">Instituto Canario de Estadística</a>',
    },
    xAxis: {
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Porcentaje de ocupación",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b> {point.y} %</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["viewFullscreen"],
        },
      },
    },
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (data.length > 0) {
      const dataSelected = data[0];

      const year = dataSelected.trimester.slice(0, 4);

      const trimester = trimesterMapper(dataSelected.trimester.slice(5));

      let chartMonths;

      if (trimester === "Primer")
        chartMonths = [MONTHS.JANUARY, MONTHS.FEBRUARY, MONTHS.MARCH];
      if (trimester === "Segundo")
        chartMonths = [MONTHS.APRIL, MONTHS.MAY, MONTHS.JUNE];
      if (trimester === "Tercer")
        chartMonths = [MONTHS.JULY, MONTHS.AUGUST, MONTHS.SEPTEMBER];
      if (trimester === "Cuarto")
        chartMonths = [MONTHS.OCTUBER, MONTHS.NOVEMBER, MONTHS.DECEMBER];

      setChartMonths(chartMonths);

      const dataToFirstChart = [
        dataSelected.occupancyRateTrend.increase,
        dataSelected.occupancyRateTrend.decrease,
        dataSelected.occupancyRateTrend.stability,
      ];

      const dataForSecondChart = dataSelected.expectedOccupancyByMonth.map(
        (month: any) => {
          return month.occupancyRate;
        }
      );

      setSecondChartExplication(dataForSecondChart);

      setChartOptions({
        series: [
          {
            type: "pie",
            name: "Expectativa de ocupación",
            innerSize: "50%",
            data: [
              ["Aumento", dataToFirstChart[0]],
              ["Estabilidad", dataToFirstChart[2]],
              ["Descenso", dataToFirstChart[1]],
            ],
            colors: ["#10A610", "#F28F43", "#B52323"],
          },
        ],
      });

      chartComponentRef.current?.chart.reflow();

      setSecondChartOptions({
        series: [
          {
            name: "Grado de ocupación",
            data: dataForSecondChart,
            color: "#2f7ed8",
          },
        ],
        xAxis: {
          categories: chartMonths,
        },
      });
      secondChartComponentRef.current?.chart.reflow();

      setChartExplication({
        trimester: trimester,
        previousYear: Number(year) - 1,
        increase: dataToFirstChart[0],
        decrease: dataToFirstChart[1],
        stability: dataToFirstChart[2],
      });
    }
  }, [data]);

  return (
    <div>
      <IonList className="first-chart-top">
        <IonListHeader>
          <h2>Grado de ocupación</h2>
        </IonListHeader>
        <IonListHeader>
          <h3>
            {chartExplication.trimester} trimestre{" "}
            {chartExplication.previousYear + 1}
          </h3>
        </IonListHeader>
        <IonItemGroup className="item-top semicircle-style">
          <IonItem lines="none">
            <p>
              Analizando la tendencia del <b>grado de ocupación</b> para el{" "}
              {chartExplication.trimester.toLowerCase()} trimestre de{" "}
              {chartExplication.previousYear + 1}, en relación a{" "}
              {chartExplication.previousYear}, el {chartExplication.increase}%
              de los hosteleros piensa que subirá, mientras que el{" "}
              {chartExplication.decrease}% opina que descenderá, por último, el{" "}
              {chartExplication.stability}% considera que no cambiará.
            </p>
          </IonItem>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            ref={chartComponentRef}
          />
          <IonItem lines="none">
            <p>
              Además, los hosteleros esperan que para el mes de{" "}
              {chartMonths[0]?.toLowerCase()} el <b>índice de ocupación</b>{" "}
              hotelera se sitúe en el {secondChartExplication[0]}%, para{" "}
              {chartMonths[1]?.toLowerCase()} en el {secondChartExplication[1]}%
              y para {chartMonths[2]?.toLowerCase()} en el{" "}
              {secondChartExplication[2]}%.
            </p>
          </IonItem>
          <HighchartsReact
            highcharts={Highcharts}
            options={secondChartOptions}
            ref={secondChartComponentRef}
          />
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default SemiCircleDonutChart;
