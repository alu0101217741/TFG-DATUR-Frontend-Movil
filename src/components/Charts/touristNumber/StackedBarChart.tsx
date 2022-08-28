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
import "./StackedBarChart.css";

function compare(firstElement: any, secondElement: any) {
  const firstElementNumber =
    firstElement.firstTrimester +
    firstElement.secondTrimester +
    firstElement.thirdTrimester +
    firstElement.fourthTrimester;

  const secondElementNumber =
    secondElement.firstTrimester +
    secondElement.secondTrimester +
    secondElement.thirdTrimester +
    secondElement.fourthTrimester;

  if (firstElementNumber > secondElementNumber) {
    return -1;
  }
  if (firstElementNumber < secondElementNumber) {
    return 1;
  }
  return 0;
}

interface ApiDataInterface {
  data: any;
}

const ChartType = {
  LINE: "líneas",
  COLUMN: "columnas",
  AREA: "area",
  BAR: "barras",
};

const PeriodTime = {
  YEAR: "año",
  TRIMESTER: "trimestre",
};

const StackedBarChart: React.FC<ApiDataInterface> = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [formattedDataFirstYear, setFormattedDataFirstYear] = useState([]);

  const [formattedDataSecondYear, setFormattedDataSecondYear] = useState([]);

  const [formattedDataThirdYear, setFormattedDataThirdYear] = useState([]);

  const [formattedDataFourthYear, setFormattedDataFourthYear] = useState([]);

  const [years, setYears] = useState([]);

  const [activeYear, setActiveYear] = useState(0);

  const [chartTypeToShow, setchartTypeToShow] = useState(ChartType.BAR);

  const [periodTime, setPeriodTime] = useState(PeriodTime.TRIMESTER);

  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "bar",
      shadow: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Número de turistas",
      },
    },
    legend: {
      reversed: true,
      align: "center",
      verticalAlign: "bottom",
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    tooltip: {
      valueSuffix: " turistas",
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
    const firstsData = data.slice(0, 4);

    const years = firstsData.map((item: any) => item.year);

    setYears(years);

    setActiveYear(years[0]);

    const formattedDataAux = firstsData.map((element: any) => {
      return element.touristsByCountryAndTrimester
        .sort(compare)
        .filter((item: any) => item.country !== "Otros países");
    });

    setFormattedDataFirstYear(formattedDataAux[0]);
    setFormattedDataSecondYear(formattedDataAux[1]);
    setFormattedDataThirdYear(formattedDataAux[2]);
    setFormattedDataFourthYear(formattedDataAux[3]);

    const firstData = formattedDataAux.slice(0, 1).flat();

    const countries = firstData.map((item: any) => item.country);

    const firstTrimester = firstData.map((item: any) => item.firstTrimester);

    const secondTrimester = firstData.map((item: any) => item.secondTrimester);

    const thirdTrimester = firstData.map((item: any) => item.thirdTrimester);

    const fourthTrimester = firstData.map((item: any) => item.fourthTrimester);

    setChartOptions({
      title: {
        text: `Rankings de nacionalidades en ${years[0]}`,
      },
      xAxis: {
        categories: countries,
      },
      series: [
        {
          name: "Cuarto trimestre",
          data: fourthTrimester,
          color: "#2f7ed8",
        },
        {
          name: "Tercer trimestre",
          data: thirdTrimester,
          color: "#f28f43",
        },
        {
          name: "Segundo trimestre",
          data: secondTrimester,
          color: "#492970",
        },
        {
          name: " Primer trimestre",
          data: firstTrimester,
          color: "#c42525",
        },
      ],
    });
    chartComponentRef.current?.chart.reflow();
  }, [data]);

  const handleSelect = (year: any, period: any, chartType: any) => {
    const indexYear = years.indexOf(year as never);
    let dataToBeShow: any = [];

    if (indexYear === 0) dataToBeShow = formattedDataFirstYear;
    if (indexYear === 1) dataToBeShow = formattedDataSecondYear;
    if (indexYear === 2) dataToBeShow = formattedDataThirdYear;
    if (indexYear === 3) dataToBeShow = formattedDataFourthYear;

    const chart = chartType ? { type: chartType.type } : {};

    const animation = chartType
      ? {
          duration: chartType.duration,
          easing: "easeOutBounce",
        }
      : {};

    let series;
    if (period === PeriodTime.YEAR) {
      const totalByNationality = dataToBeShow.map((item: any) => {
        return (
          item.firstTrimester +
          item.secondTrimester +
          item.thirdTrimester +
          item.fourthTrimester
        );
      });

      series = [
        {
          name: "Número total de turistas",
          data: totalByNationality,
          animation: animation,
        },
      ];
    } else {
      series = [
        {
          name: "Cuarto trimestre",
          data: dataToBeShow.map((item: any) => item.fourthTrimester),
          animation: animation,
          color: "#2f7ed8",
        },
        {
          name: "Tercer trimestre",
          data: dataToBeShow.map((item: any) => item.thirdTrimester),
          animation: animation,
          color: "#f28f43",
        },
        {
          name: "Segundo trimestre",
          data: dataToBeShow.map((item: any) => item.secondTrimester),
          animation: animation,
          color: "#492970",
        },
        {
          name: " Primer trimestre",
          data: dataToBeShow.map((item: any) => item.firstTrimester),
          animation: animation,
          color: "#c42525",
        },
      ];
    }

    const tooltip =
      chartType?.type === "bar"
        ? {
            crosshairs: false,
            shared: false,
          }
        : {
            crosshairs: true,
            shared: true,
          };

    setChartOptions({
      title: {
        text: `Rankings de nacionalidades en ${year}`,
      },
      xAxis: {
        categories: dataToBeShow.map((item: any) => item.country),
      },
      chart,
      series,
      tooltip,
    });
  };

  const handleTypeChart = (chartTypeSelected: any) => {
    let chart;
    let duration;
    switch (chartTypeSelected) {
      case ChartType.BAR:
        chart = "bar";
        duration = 1800;
        break;
      case ChartType.LINE:
        chart = "line";
        duration = 1600;
        break;
      case ChartType.AREA:
        chart = "area";
        duration = 1400;
        break;
      case ChartType.COLUMN:
        chart = "column";
        duration = 1200;
        break;
      default:
        throw Error("Unknown chart type");
    }

    setchartTypeToShow(chartTypeSelected);

    const chartType = {
      type: chart,
      duration: duration,
    };

    handleSelect(activeYear, periodTime, chartType);
  };

  const handleYear = (yearSelected: any) => {
    setActiveYear(Number(yearSelected));
    handleSelect(Number(yearSelected), periodTime, undefined);
  };

  const handlePeriodTime = (periodTimeSelected: any) => {
    setPeriodTime(periodTimeSelected);
    handleSelect(activeYear, periodTimeSelected, undefined);
  };

  return (
    <div>
      <IonList lines="none">
        <IonListHeader className="header-top">
          <h2>Nacionalidades que visitan Canarias</h2>
        </IonListHeader>
        <IonItemGroup className="item-group-top">
          <IonItem>
            <p>
              En esta gráfica se muestran las principales nacionalidades que
              visitan Canarias, se ordenan según el número de turistas que
              llegan al archipiélago procedentes de ese país de origen. Para la
              consulta se encuentran disponibles los últimos cuatro años de los
              que se tienen datos, y se ofrece la posibilidad de organizar la
              información por año o por trimestre.
            </p>
          </IonItem>
          <IonItem className="custom-select" lines="none">
            <IonLabel>Tipo de gráfico:</IonLabel>
            <IonSelect
              placeholder={chartTypeToShow}
              onIonChange={(e) => handleTypeChart(e.detail.value)}
              cancelText="Cancelar"
            >
              <IonSelectOption value={ChartType.BAR}>
                {ChartType.BAR}
              </IonSelectOption>
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
          <IonItem className="custom-select" lines="none">
            <IonLabel>Año:</IonLabel>
            <IonSelect
              placeholder={String(activeYear)}
              onIonChange={(e) => handleYear(e.detail.value)}
              cancelText="Cancelar"
            >
              <IonSelectOption value={years[0]}>{years[0]}</IonSelectOption>
              <IonSelectOption value={years[1]}>{years[1]}</IonSelectOption>
              <IonSelectOption value={years[2]}>{years[2]}</IonSelectOption>
              <IonSelectOption value={years[3]}>{years[3]}</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem className="custom-select" lines="none">
            <IonLabel>Organizar por:</IonLabel>
            <IonSelect
              placeholder={String(periodTime)}
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

export default StackedBarChart;
