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
import highcharts3d from "highcharts/highcharts-3d";
import React, { useEffect, useRef, useState } from "react";
import "./BasicColumnSpendChart.css";

highcharts3d(Highcharts);

function dataMapping(data: any) {
  const valuesAux = {
    accommodation: 0,
    nationalTransport: 0,
    localTransport: 0,
    feeding: 0,
    culture: 0,
    shopping: 0,
    other: 0,
  };

  data.forEach((item: any) => {
    item.data.forEach((element: any) => {
      element.spendingByConcept.forEach((element2: any) => {
        if (element2.concept === "Alojamiento")
          valuesAux.accommodation += element2.totalSpending;
        if (element2.concept === "Transporte nacional / internacional")
          valuesAux.nationalTransport += element2.totalSpending;
        if (element2.concept === "Transporte local")
          valuesAux.localTransport += element2.totalSpending;
        if (element2.concept === "Alimentación")
          valuesAux.feeding += element2.totalSpending;
        if (element2.concept === "Recreación, cultura y actividades deportivas")
          valuesAux.culture += element2.totalSpending;
        if (element2.concept === "Compras")
          valuesAux.shopping += element2.totalSpending;
        if (element2.concept === "Otros")
          valuesAux.other += element2.totalSpending;
      });
    });
  });

  const dataValue = [
    ["Alojamiento", Math.trunc(valuesAux.accommodation)],
    [
      "Transporte nacional / internacional",
      Math.trunc(valuesAux.nationalTransport),
    ],
    ["Transporte local", Math.trunc(valuesAux.localTransport)],
    ["Alimentación", Math.trunc(valuesAux.feeding)],
    ["Cultura y actividades deportivas", Math.trunc(valuesAux.culture)],
    ["Compras", Math.trunc(valuesAux.shopping)],
    ["Otros", Math.trunc(valuesAux.other)],
  ];

  return dataValue;
}

interface ApiDataInterface {
  data: any;
}

const BasicColumnSpendChart: React.FC<ApiDataInterface> = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [dataSelected, setDataSelected] = useState([]);
  const [years, setYears] = useState([]);
  const [activeYear, setActiveYear] = useState();
  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "pie",
      shadow: true,
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
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

    setDataSelected(data);

    setYears(dataYears);

    setActiveYear(dataYears[0]);

    const firstData = data.slice(0, 1);

    const value = dataMapping(firstData);

    setChartOptions({
      title: {
        text: `Desglose de gasto en ${dataYears[0]}`,
      },
      series: [
        {
          name: "Gasto",
          data: value,
        },
      ],
    });
    chartComponentRef.current?.chart.reflow();
  }, [data]);

  const handleSelect = (year: any) => {
    setActiveYear(year);

    const indexActualYear = years.indexOf(year as never);

    const value = dataMapping([dataSelected[indexActualYear]]);

    setChartOptions({
      title: {
        text: `Desglose de gasto en ${year}`,
      },
      series: [
        {
          name: "Gasto",
          data: value,
        },
      ],
    });
  };

  return (
    <div>
      <IonList>
        <IonListHeader>
          <h2>Desglose de gasto</h2>
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
              placeholder={activeYear}
              onIonChange={(e) => handleSelect(e.detail.value)}
            >
              {years.map((year) => (
                <IonSelectOption value={year}>{year}</IonSelectOption>
              ))}
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

export default BasicColumnSpendChart;
