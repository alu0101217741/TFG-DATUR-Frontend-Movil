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

const COUNTRIES = [
  {
    name: "Alemania",
    flag: "de",
    color: "#2f7ed8",
  },
  {
    name: "España",
    flag: "es",
    color: "#f28f43",
  },
  {
    name: "Reino Unido",
    flag: "gb",
    color: "#492970",
  },
  {
    name: "Países Nórdicos",
    flag: "pn",
    color: "#c42525",
  },
  {
    name: "Otros países",
    flag: "op",
    color: "#0DAF12",
  },
];

interface ApiDataInterface {
  data: any;
}

const ColumnComparisonChart: React.FC<ApiDataInterface> = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [dataSelected, setDataSelected] = useState([]);
  const [years, setYears] = useState([]);
  const [activeYear, setActiveYear] = useState();
  const [comparativeYear, setComparativeYear] = useState();
  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "column",
      shadow: true,
    },
    plotOptions: {
      series: {
        grouping: false,
        borderWidth: 0,
      },
      column: {
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: "#000000",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      headerFormat:
        '<span style="font-size: 15px">{point.point.name}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} días</b><br/>',
    },
    xAxis: {
      type: "category",
      accessibility: {
        description: "Países",
      },
    },
    yAxis: [
      {
        title: {
          text: "Días",
        },
        showFirstLabel: false,
      },
    ],
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
      const dataSelected = data.map((item: any) => {
        return {
          year: item.year,
          stayByResidencePlaces: item.stayByResidencePlaces,
        };
      });

      const years = dataSelected.map((item: any) => item.year.toString());

      setDataSelected(dataSelected);

      setYears(years);

      setActiveYear(years[0]);

      setComparativeYear(years[1]);

      const firstData = dataSelected[0];

      const secondData = dataSelected[1];

      const firstDataToBeShow = firstData.stayByResidencePlaces.map(
        (element: any) => {
          return [element.residencePlace, element.averageStay];
        }
      );

      const firstDataName = firstData.year;

      const secondDataToBeShow = secondData.stayByResidencePlaces.map(
        (element: any) => {
          return [element.residencePlace, element.averageStay];
        }
      );

      const secondDataName = secondData.year;

      setChartOptions({
        title: {
          text: `Estancia media según lugar de residencia en ${years[0]}`,
          align: "center",
        },
        subtitle: {
          text: `Comparando los resultados con ${years[0] - 1}`,
          align: "center",
        },
        series: [
          {
            color: "rgb(158, 159, 163)",
            pointPlacement: -0.2,
            linkedTo: "main",
            data: secondDataToBeShow,
            name: secondDataName,
          },
          {
            name: firstDataName,
            id: "main",
            dataSorting: {
              enabled: true,
              matchByName: true,
            },
            dataLabels: [
              {
                enabled: true,
                inside: true,
                style: {
                  fontSize: "16px",
                },
              },
            ],
            data: getData(firstDataToBeShow),
          },
        ],
      });
      chartComponentRef.current?.chart.reflow();
    }
  }, [data]);

  const getData = (data: any) =>
    data.map((item: any, i: any) => {
      return {
        name: item[0],
        y: item[1],
        color: COUNTRIES[i].color,
      };
    });

  const handleSelect = (year: any, comparativeYear: any) => {
    const indexActualYear = years.indexOf(year as never);
    const indexPreviousYear = years.indexOf(comparativeYear as never);

    const actualDataToBeShow = (
      dataSelected[indexActualYear] as any
    ).stayByResidencePlaces.map((element: any) => {
      return [element.residencePlace, element.averageStay];
    });

    setChartOptions({
      title: {
        text: `Estancia media según lugar de residencia en ${year}`,
        align: "center",
      },
      subtitle: {
        text: `Comparando los resultados con ${comparativeYear}`,
        align: "center",
      },
      series: [
        {
          color: "rgb(158, 159, 163)",
          pointPlacement: -0.2,
          linkedTo: "main",
          data: (
            dataSelected[indexPreviousYear] as any
          ).stayByResidencePlaces.map((item: any) => {
            return [item.residencePlace, item.averageStay];
          }),
          name: (dataSelected[indexPreviousYear] as any).year.toString(),
        },
        {
          name: (dataSelected[indexActualYear] as any).year.toString(),

          id: "main",
          dataSorting: {
            enabled: true,
            matchByName: true,
          },
          dataLabels: [
            {
              enabled: true,
              inside: true,
              style: {
                fontSize: "16px",
              },
            },
          ],
          data: getData(actualDataToBeShow),
        },
      ],
    });
  };

  const handleActiveYear = (activeYearSelected: any) => {
    setActiveYear(activeYearSelected);
    handleSelect(activeYearSelected, comparativeYear);
  };

  const handleComparativeYear = (comparativeYearSelected: any) => {
    setComparativeYear(comparativeYearSelected);
    handleSelect(activeYear, comparativeYearSelected);
  };

  return (
    <div>
      <IonList lines="none">
        <IonListHeader className="header-top">
          <h2>Estancia media por lugar de residencia</h2>
        </IonListHeader>
        <IonItemGroup className="item-group-top">
          <IonItem>
            <p>
              Se muestra la estancia media de los turistas en Canarias según su
              país de origen. Se ofrece la posibilidad de visualizar esta
              información para una gran cantidad de años, además también se
              puede comparar la información del año seleccionado con cualquier
              otro dentro de los disponibles. Cabe destacar que en la fuente
              oficial sólo existían datos para España a partir de 2019, por ello
              en las gráficas, esta columna se muestra a cero para años
              anteriores.
            </p>
          </IonItem>
          <IonItem className="custom-select" lines="none">
            <IonLabel>Año:</IonLabel>
            <IonSelect
              placeholder={activeYear}
              onIonChange={(e) => handleActiveYear(e.detail.value)}
              cancelText="Cancelar"
            >
              {years.map((year) => (
                <IonSelectOption value={year} key={year}>
                  {year}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem className="custom-select" lines="none">
            <IonLabel>Comparando con:</IonLabel>
            <IonSelect
              placeholder={activeYear}
              onIonChange={(e) => handleComparativeYear(e.detail.value)}
              cancelText="Cancelar"
            >
              {years.map((year) => (
                <IonSelectOption value={year} key={year}>
                  {year}
                </IonSelectOption>
              ))}
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

export default ColumnComparisonChart;
