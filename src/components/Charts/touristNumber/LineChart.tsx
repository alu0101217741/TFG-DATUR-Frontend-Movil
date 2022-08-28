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
import React, { useEffect, useRef, useState } from "react";
import "./LineChart.css";

interface ApiDataInterface {
  data: any;
}

const ChartType = {
  LINE: "líneas",
  COLUMN: "columnas",
  AREA: "area",
};

const LineChart: React.FC<ApiDataInterface> = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [chartTypeToShow, setchartTypeToShow] = useState("líneas");

  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "line",
      shadow: true,
    },
    title: {
      text: "Evolución del número de turistas",
    },
    subtitle: {
      text: 'Fuente: <a target="_blank" href="http://www.gobiernodecanarias.org/istac/">Instituto Canario de Estadística</a>',
    },
    yAxis: {
      title: {
        text: "Millones de turistas",
      },
    },
    legend: {
      layout: "vertical",
      align: "center",
      verticalAlign: "bottom",
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },
    series: [
      {
        name: "Número de turistas",
        data: [],
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["viewFullscreen"],
        },
      },
    },
  });

  useEffect(() => {
    const dataMapping = data.reverse().map((item: any) => item.totalTourists);
    setChartOptions({
      series: [{ name: "Número de turistas", data: dataMapping }],
    });
    chartComponentRef.current?.chart.reflow();
  }, [data]);

  const handleSelect = (chartTypeSelected: any) => {
    let chart;
    let duration;
    switch (chartTypeSelected) {
      case ChartType.LINE:
        chart = "line";
        duration = 2000;
        break;
      case ChartType.AREA:
        chart = "area";
        duration = 1700;
        break;
      case ChartType.COLUMN:
        chart = "column";
        duration = 1500;
        break;
      default:
        throw Error("Unknown chart type");
    }

    setChartOptions({
      chart: {
        type: chart,
      },
      series: {
        animation: {
          duration: duration,
          easing: "easeOutBounce",
        },
      },
    });
    setchartTypeToShow(chartTypeSelected);
  };

  return (
    <div>
      <IonList lines="none">
        <IonListHeader>
          <h2>Número total de turistas por año</h2>
        </IonListHeader>
        <IonItemGroup className="item-group-top">
          <IonItem>
            <p>
              Se representa la evolución que ha experimentado la cifra anual de
              turistas que visitan las Islas Canarias.
            </p>
          </IonItem>
          <IonItem className="custom-select" lines="none">
            <IonLabel>Tipo de gráfico:</IonLabel>
            <IonSelect
              placeholder={chartTypeToShow}
              onIonChange={(e) => handleSelect(e.detail.value)}
              cancelText="Cancelar"
            >
              <IonSelectOption value={ChartType.LINE}>
                {ChartType.LINE}
              </IonSelectOption>
              <IonSelectOption value={ChartType.AREA}>
                {ChartType.AREA}
              </IonSelectOption>
              <IonSelectOption value={ChartType.COLUMN}>
                {ChartType.COLUMN}
              </IonSelectOption>
            </IonSelect>
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

export default LineChart;
