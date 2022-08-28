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
import { useEffect, useRef, useState } from "react";

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
      text: "Evolución de la estancia media de turistas",
    },
    subtitle: {
      text: 'Fuente: <a target="_blank" href="http://www.gobiernodecanarias.org/istac/">Instituto Canario de Estadística</a>',
    },
    yAxis: {
      title: {
        text: "Días",
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    tooltip: {
      valueSuffix: " días",
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
    const dataYears = data.reverse().map((item: any) => item.year);
    const dataValues = data.reverse().map((item: any) => item.averageStay);

    setChartOptions({
      xAxis: {
        categories: dataYears,
      },
      series: [
        {
          name: "Estancia media",
          data: dataValues,
          color: "#2f7ed8",
        },
      ],
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
          <h2>Evolución de la estancia media</h2>
        </IonListHeader>
        <IonItemGroup className="item-group-top">
          <IonItem>
            <p>
              En esta gráfica se recoge la forma en la que ha evolucionado, a
              largo de los años, el número de días de media que pasan los
              turistas durante su estancia en el archipiélago.
            </p>
          </IonItem>
          <div className="select-container">
            <IonItem className="custom-select">
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

export default LineChart;
