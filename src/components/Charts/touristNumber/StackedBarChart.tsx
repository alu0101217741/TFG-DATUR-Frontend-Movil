import {
  IonItem,
  IonItemGroup,
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
const StackedBarChart: React.FC<ApiDataInterface> = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [formattedDataFirstYear, setFormattedDataFirstYear] = useState([]);

  const [formattedDataSecondYear, setFormattedDataSecondYear] = useState([]);

  const [formattedDataThirdYear, setFormattedDataThirdYear] = useState([]);

  const [formattedDataFourthYear, setFormattedDataFourthYear] = useState([]);

  const [years, setYears] = useState([]);

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
  });

  useEffect(() => {
    const firstsData = data.slice(0, 4);

    const years = firstsData.map((item: any) => item.year);

    setYears(years);

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
        categories: countries, // Countries
      },
      series: [
        {
          name: "Cuarto trimestre",
          data: fourthTrimester,
        },
        {
          name: "Tercer trimestre",
          data: thirdTrimester,
        },
        {
          name: "Segundo trimestre",
          data: secondTrimester,
        },
        {
          name: " Primer trimestre",
          data: firstTrimester,
        },
      ],
    });
    chartComponentRef.current?.chart.reflow();
  }, [data]);

  const updateChartWithYear = (year: any) => {
    const indexYear = years.indexOf(year as never);
    let dataToBeShow: any = [];

    if (indexYear === 0) dataToBeShow = formattedDataFirstYear;
    if (indexYear === 1) dataToBeShow = formattedDataSecondYear;
    if (indexYear === 2) dataToBeShow = formattedDataThirdYear;
    if (indexYear === 3) dataToBeShow = formattedDataFourthYear;

    setChartOptions({
      title: {
        text: `Rankings de nacionalidades en ${year}`,
      },
      xAxis: {
        categories: dataToBeShow.map((item: any) => item.country), // Countries
      },
      series: [
        {
          name: "Cuarto trimestre",
          data: dataToBeShow.map((item: any) => item.fourthTrimester),
        },
        {
          name: "Tercer trimestre",
          data: dataToBeShow.map((item: any) => item.thirdTrimester),
        },
        {
          name: "Segundo trimestre",
          data: dataToBeShow.map((item: any) => item.secondTrimester),
        },
        {
          name: " Primer trimestre",
          data: dataToBeShow.map((item: any) => item.firstTrimester),
        },
      ],
    });
  };

  return (
    <div>
      <IonList>
        <IonListHeader>
          <h2>Nacionalidades que visitan Canarias</h2>
        </IonListHeader>
        <IonItemGroup>
          <IonItem lines="none">
            <p>
              En esta gráfica se refleja bastante información acerca de las
              nacionalidades que visitan Canarias. Se encuentran disponibles los
              últimos cuatro últimos años de los que se tienen datos, para estos
              años se muestra el ranking de las nacionalidades que visitan las
              islas, para cada una de las nacionalidades se refleja el número de
              turistas por cada trimestre, lo que hace posible conocer la
              distribución de los turistas a lo largo del año.
            </p>
          </IonItem>
          <div className="select-container">
            <IonSelect
              placeholder={years[0]}
              onIonChange={(e) => updateChartWithYear(e.detail.value)}
            >
              <IonSelectOption value={years[3]}>{years[3]}</IonSelectOption>
              <IonSelectOption value={years[2]}>{years[2]}</IonSelectOption>
              <IonSelectOption value={years[1]}>{years[1]}</IonSelectOption>
              <IonSelectOption value={years[0]}>{years[0]}</IonSelectOption>
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

export default StackedBarChart;
