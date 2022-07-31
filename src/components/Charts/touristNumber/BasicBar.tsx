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
import React, { useEffect, useRef, useState } from "react";

function compare(firstElement: any, secondElement: any) {
  if (firstElement.tourists > secondElement.tourists) {
    return -1;
  }
  if (firstElement.tourists < secondElement.tourists) {
    return 1;
  }
  return 0;
}

interface ApiDataInterface {
  data: any;
}

const BasicBar: React.FC<ApiDataInterface> = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [years, setYears] = useState([]);

  const [formattedDataFirstYear, setFormattedDataFirstYear] = useState([]);

  const [formattedDataSecondYear, setFormattedDataSecondYear] = useState([]);

  const [formattedDataThirdYear, setFormattedDataThirdYear] = useState([]);

  const [formattedDataFourthYear, setFormattedDataFourthYear] = useState([]);

  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "bar",
      shadow: true,
    },
    subtitle: {
      text: 'Fuente: <a href="http://www.gobiernodecanarias.org/istac/">Instituto Canario de Estadística</a>',
    },
    yAxis: {
      min: 0,
      title: {
        text: "Número de turistas (millones)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
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

    const formattedDataAux = firstsData.map((element: any) => {
      return element.touristsByIslands.sort(compare);
    });

    setFormattedDataFirstYear(formattedDataAux[0]);
    setFormattedDataSecondYear(formattedDataAux[1]);
    setFormattedDataThirdYear(formattedDataAux[2]);
    setFormattedDataFourthYear(formattedDataAux[3]);

    const firstData = formattedDataAux.slice(0, 1).flat();

    const islands = firstData.map((item: any) => item.island);

    const touristsByIsland = firstData.map((item: any) => item.tourists);

    setChartOptions({
      title: {
        text: `Distribución de turistas por isla en ${years[0]}`, // Ponerlo
      },
      xAxis: {
        categories: islands,
        title: {
          text: null,
        },
      },
      series: [
        {
          name: "Número de turistas", // Ponerlo ordenado
          data: touristsByIsland,
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
        text: `Distribución de turistas por isla en ${year}`,
      },
      xAxis: {
        categories: dataToBeShow.map((item: any) => item.island),
        title: {
          text: null,
        },
      },
      series: [
        {
          name: "Número de turistas",
          data: dataToBeShow.map((item: any) => item.tourists),
        },
      ],
    });
  };

  return (
    <div>
      <IonList>
        <IonListHeader>
          <h2>Distribución de los turistas</h2>
        </IonListHeader>
        <IonItemGroup>
          <IonItem lines="none">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
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

export default BasicBar;
