import {
  IonItem,
  IonItemGroup,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import React, { useEffect, useRef, useState } from "react";

highcharts3d(Highcharts);

enum TimeOption {
  YEAR = "Año",
  MONTH = "Trimestre",
}

interface ApiDataInterface {
  data: any;
}

const BasicColumnAverageSpendChart: React.FC<ApiDataInterface> = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [timeOption, setTimeOption] = useState<any>();

  const [trimestralData, setTrimestralData] = useState<any>([]);

  const [annualData, setAnnualData] = useState<any>([]);

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

      setTrimestralData(values);

      setTimeOption(TimeOption.YEAR);

      const yearsValues = [0, 0, 0, 0, 0];

      for (const value of values) {
        yearsValues[0] += value.data[0] || 0;
        yearsValues[1] += value.data[1] || 0;
        yearsValues[2] += value.data[2] || 0;
        yearsValues[3] += value.data[3] || 0;
        yearsValues[4] += value.data[4] || 0;
      }

      const annualDataValues = [
        {
          name: "Gasto total",
          data: yearsValues.map((value) => parseFloat((value / 4).toFixed(2))),
        },
      ];

      setAnnualData(annualDataValues);

      setChartOptions({
        xAxis: {
          categories: dataYears.reverse(),
        },
        series: annualDataValues,
      });
    });

    chartComponentRef.current?.chart.reflow();
  }, [data]);

  const handleSelect = (timeOption: any) => {
    setTimeOption(timeOption);

    let values = trimestralData;

    if (timeOption === TimeOption.YEAR) {
      values = annualData;
    }

    setChartOptions({
      series: values,
    });
  };

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
          <div className="select-container select-time">
            <IonSelect
              placeholder={timeOption}
              onIonChange={(e) => handleSelect(e.detail.value)}
            >
              <IonSelectOption value={TimeOption.YEAR}>
                {TimeOption.YEAR}
              </IonSelectOption>
              <IonSelectOption value={TimeOption.MONTH}>
                {TimeOption.MONTH}
              </IonSelectOption>
            </IonSelect>
          </div>
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
