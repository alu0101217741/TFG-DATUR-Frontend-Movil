import { IonItem, IonItemGroup, IonList, IonListHeader } from "@ionic/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

function trimesterMapper(trimesterInNumber: any) {
  switch (trimesterInNumber) {
    case "01":
      return "primer";
    case "04":
      return "segundo";
    case "07":
      return "tercer";
    case "10":
      return "cuarto";
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
        size: "110%",
        showInLegend: true,
      },
    },
  });

  const [secondChartOptions, setSecondChartOptions] = useState<any>({
    chart: {
      type: "column",
      shadow: true,
    },
    title: {
      text: "Grado de ocupación previsto para cada mes",
    },
    subtitle: {
      text: "Fuente: Instituto Canario de Estadística",
    },
    xAxis: {
      categories: ["1º mes", "2º mes", "3º mes"],
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
  });

  useEffect(() => {
    const dataSelected = data.slice(0, 1);

    const year = dataSelected.map((item: any) => {
      return item.trimester.slice(0, 4);
    });

    const trimester = dataSelected.map((item: any) => {
      return trimesterMapper(item.trimester.slice(5));
    });

    const dataToFirstChart = dataSelected
      .map((item: any) => {
        return [
          item.occupancyRateTrend.increase,
          item.occupancyRateTrend.decrease,
          item.occupancyRateTrend.stability,
        ];
      })
      .flat();

    const dataForSecondChart = dataSelected.map((item: any) => {
      return item.expectedOccupancyByMonth.map((month: any) => {
        return month.occupancyRate;
      });
    });

    setChartOptions({
      series: [
        {
          type: "pie",
          name: "Expectativa de ocupación",
          innerSize: "50%",
          data: [
            ["Aumento", dataToFirstChart[0]],
            ["Descenso", dataToFirstChart[1]],
            ["Estabilidad", dataToFirstChart[2]],
          ],
        },
      ],
    });
    chartComponentRef.current?.chart.reflow();

    setSecondChartOptions({
      series: [
        {
          name: "Grado de ocupación",
          data: dataForSecondChart.flat(),
        },
      ],
    });
    secondChartComponentRef.current?.chart.reflow();

    setChartExplication({
      trimester: trimester[0],
      previousYear: Number(year[0]) - 1,
      increase: dataToFirstChart[0],
      decrease: dataToFirstChart[1],
      stability: dataToFirstChart[2],
    });
  }, [data]);

  return (
    <div>
      <IonList>
        <IonListHeader>
          <h2>Grado de ocupación</h2>
        </IonListHeader>
        <IonItemGroup>
          <IonItem lines="none">
            <p>
              En cuanto a la tendencia del grado de ocupación para el{" "}
              {chartExplication.trimester} trimestre de{" "}
              {chartExplication.previousYear + 1}, en relación a{" "}
              {chartExplication.previousYear}, el {chartExplication.increase}%
              de los hosteleros piensa que subirá, mientras que el{" "}
              {chartExplication.decrease}% opina que descenderá, por último el{" "}
              {chartExplication.stability}% considera que no cambiará.
            </p>
          </IonItem>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            ref={chartComponentRef}
          />
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
