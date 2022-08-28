import {
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import React, { useEffect, useRef, useState } from "react";

highcharts3d(Highcharts);

enum TimeOption {
  YEAR = "año",
  MONTH = "trimestre",
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
      text: 'Fuente: <a target="_blank" href="http://www.gobiernodecanarias.org/istac/">Instituto Canario de Estadística</a>',
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
        text: "Gasto (€)",
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
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    const dataYears = data.slice(0, 5).map((item: any) => item.year);

    const dataValue = data.slice(0, 5).reverse();

    const values = [
      { name: "Primer trimestre", data: [], color: "#2f7ed8" },
      { name: "Segundo trimestre", data: [], color: "#f28f43" },
      { name: "Tercer trimestre", data: [], color: "#492970" },
      { name: "Cuarto trimestre", data: [], color: "#c42525" },
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
          color: "#2f7ed8",
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
      <IonList lines="none">
        <IonListHeader className="header-top">
          <h2>Gasto medio por turista y día</h2>
        </IonListHeader>
        <IonItemGroup className="item-group-top">
          <IonItem>
            <p>
              Se visualiza el gasto medio por día que realizan los turistas
              durante su estancia en el archipiélago, incluyendo datos anuales y
              trimestrales.
            </p>
          </IonItem>
          <div className="select-container">
            <IonItem className="custom-select">
              <IonLabel>Organizar por:</IonLabel>
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
            </IonItem>
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
