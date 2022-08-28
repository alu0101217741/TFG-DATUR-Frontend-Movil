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

const PeriodTime = {
  YEAR: "año",
  TRIMESTER: "trimestre",
};

const LineChart: React.FC<ApiDataInterface> = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [chartTypeToShow, setchartTypeToShow] = useState("líneas");

  const [dataForYears, setDataForYears] = useState();

  const [dataForTrimesters, setDataForTrimester] = useState();

  const [periodTime, setPeriodTime] = useState(PeriodTime.YEAR);

  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "line",
      shadow: true,
    },
    title: {
      text: "Evolución del gasto turístico",
    },
    subtitle: {
      text: 'Fuente: <a target="_blank" href="http://www.gobiernodecanarias.org/istac/">Instituto Canario de Estadística</a>',
    },
    yAxis: {
      title: {
        text: "Gasto total (€)",
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
      valueSuffix: " €",
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
      // Data for years
      const dataYears = data.reverse().map((item: any) => item.year);
      const dataValuesForYears = data.map((item: any) => {
        let totalYear = 0;
        item.data.forEach((element: any) => {
          totalYear += element.totalSpending;
        });
        return Math.trunc(totalYear);
      });

      setDataForYears(dataValuesForYears);

      // Data for trimester
      const dataValue = data.slice(0, 5);

      const valuesForTrimester = [
        { name: "Primer trimestre", data: [], color: "#2f7ed8" },
        { name: "Segundo trimestre", data: [], color: "#f28f43" },
        { name: "Tercer trimestre", data: [], color: "#492970" },
        { name: "Cuarto trimestre", data: [], color: "#c42525" },
      ];

      dataValue.forEach((item: any) => {
        item.data.forEach((element: any) => {
          if (element.trimester.slice(4) === "Q1")
            valuesForTrimester[0].data.push(element.totalSpending as never);
          if (element.trimester.slice(4) === "Q2")
            valuesForTrimester[1].data.push(element.totalSpending as never);
          if (element.trimester.slice(4) === "Q3")
            valuesForTrimester[2].data.push(element.totalSpending as never);
          if (element.trimester.slice(4) === "Q4")
            valuesForTrimester[3].data.push(element.totalSpending as never);
        });
      });

      setDataForTrimester(valuesForTrimester as any);

      setChartOptions({
        xAxis: {
          categories: dataYears,
        },
        series: [
          {
            name: "Gasto total",
            data: dataValuesForYears,
            color: "#2f7ed8",
          },
        ],
      });
      chartComponentRef.current?.chart.reflow();
    }
  }, [data]);

  const handleSelect = (periodTime: any, chartType: any) => {
    const chart = chartType
      ? {
          type: chartType.type,
        }
      : {};

    const animation = chartType
      ? { duration: chartType.duration, easing: "easeOutBounce" }
      : {};

    if (periodTime === PeriodTime.YEAR) {
      setChartOptions({
        chart,
        series: [
          {
            name: "Gasto total",
            data: dataForYears,
            color: "#2f7ed8",
            animation,
          },
        ],
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
          },
        },
      });
    } else {
      const series = (dataForTrimesters as any).map((element: any) => {
        return {
          ...element,
          animation,
        };
      });

      setChartOptions({
        chart,
        series,
        tooltip: {
          crosshairs: true,
          shared: true,
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: false,
            },
          },
        },
      });
    }
  };

  const handleChartType = (chartTypeSelected: any) => {
    let chart;
    let duration;
    switch (chartTypeSelected) {
      case ChartType.LINE:
        chart = "line";
        duration = 1800;
        break;
      case ChartType.AREA:
        chart = "area";
        duration = 1700;
        break;
      case ChartType.COLUMN:
        chart = "column";
        duration = 1600;
        break;
      default:
        throw Error("Unknown chart type");
    }

    setchartTypeToShow(chartTypeSelected);

    const chartType = {
      type: chart,
      duration: duration,
    };

    handleSelect(periodTime, chartType);
  };

  const handlePeriodTime = (periodTimeSelected: any) => {
    setPeriodTime(periodTimeSelected);
    handleSelect(periodTimeSelected, undefined);
  };

  return (
    <div>
      <IonList lines="none">
        <IonListHeader>
          <h2>Evolución del gasto turístico</h2>
        </IonListHeader>
        <IonItemGroup className="item-group-top">
          <IonItem>
            <p>
              En esta gráfica se muestra la evolución del gasto turístico
              durante los últimos años, ofreciendo la posibilidad de observar
              los gastos totales anuales, o conocer estas cantidades por
              trimestre.
            </p>
          </IonItem>
          <div className="select-container">
            <IonItem className="custom-select">
              <IonLabel>Tipo de gráfico:</IonLabel>
              <IonSelect
                placeholder={chartTypeToShow}
                onIonChange={(e) => handleChartType(e.detail.value)}
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
            <IonItem className="custom-select">
              <IonLabel>Organizar por:</IonLabel>
              <IonSelect
                placeholder={periodTime}
                onIonChange={(e) => handlePeriodTime(e.detail.value)}
                cancelText="Cancelar"
              >
                <IonSelectOption value={PeriodTime.YEAR}>
                  {PeriodTime.YEAR}
                </IonSelectOption>
                <IonSelectOption value={PeriodTime.TRIMESTER}>
                  {PeriodTime.TRIMESTER}
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
