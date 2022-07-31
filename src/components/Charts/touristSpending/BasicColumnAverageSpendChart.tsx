import { IonItem, IonItemGroup, IonList } from "@ionic/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import React, { useEffect, useRef, useState } from "react";

highcharts3d(Highcharts);

interface ApiDataInterface {
  data: any;
}

const BasicColumnAverageSpendChart: React.FC<ApiDataInterface> = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "column",
      shadow: true,
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 10,
        depth: 100,
      },
    },
    title: {
      text: "Gasto medio por turista y día",
    },
    subtitle: {
      text: "Fuente: Instituto Canario de Estadística",
    },
    xAxis: {
      crosshair: true,
      labels: {
        skew3d: true,
        style: {
          fontSize: "16px",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Gasto",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} €</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
      column: {
        depth: 25,
      },
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
  });

  useEffect(() => {
    const dataYears = data.slice(0, 5).map((item: any) => item.year);

    const dataValue = data.slice(0, 5).reverse();

    const values = [
      { name: "Primer trimestre", data: [] },
      { name: "Segundo trimestre", data: [] },
      { name: "Tercer trimestre", data: [] },
      { name: "Cuarto trimestre", data: [] },
    ];

    dataValue.forEach((item: any) => {
      item.data.forEach((element: any) => {
        if (element.trimester.slice(4) === "Q1")
          values[0].data.push(element.averageSpendingByDay as never);
        if (element.trimester.slice(4) === "Q2")
          values[1].data.push(element.averageSpendingByDay as never);
        if (element.trimester.slice(4) === "Q3")
          values[2].data.push(element.averageSpendingByDay as never);
        if (element.trimester.slice(4) === "Q4")
          values[3].data.push(element.averageSpendingByDay as never);
      });

      setChartOptions({
        xAxis: {
          categories: dataYears.reverse(),
        },
        series: values,
      });
    });
    chartComponentRef.current?.chart.reflow();
  }, [data]);

  return (
    <div>
      <IonList>
        <IonItemGroup>
          <IonItem lines="none">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </IonItem>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            ref={chartComponentRef}
          />
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default BasicColumnAverageSpendChart;
