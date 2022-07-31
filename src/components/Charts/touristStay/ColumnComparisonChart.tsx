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

const COUNTRIES = [
  {
    name: "Alemania",
    flag: "de",
    color: "rgb(201, 36, 39)",
  },
  {
    name: "España",
    flag: "es",
    color: "rgb(201, 36, 39)",
  },
  {
    name: "Reino Unido",
    flag: "gb",
    color: "rgb(0, 82, 180)",
  },
  {
    name: "Países Nórdicos",
    flag: "pn",
    color: "rgb(0, 0, 0)",
  },
  {
    name: "Otros países",
    flag: "op",
    color: "rgb(240, 240, 240)",
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
      allowHTML: true,
    },
  });

  useEffect(() => {
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

    const firstData = dataSelected.slice(0, 1).flat();

    const secondData = dataSelected.slice(1, 2).flat();

    const firstDataToBeShow = firstData.map((element: any) => {
      return element.stayByResidencePlaces.map((item: any) => {
        return [item.residencePlace, item.averageStay];
      });
    });

    const firstDataName = firstData.map((element: any) => {
      return element.year;
    });

    const secondDataToBeShow = secondData.map((element: any) => {
      return element.stayByResidencePlaces.map((item: any) => {
        return [item.residencePlace, item.averageStay];
      });
    });

    const secondDataName = secondData.map((element: any) => {
      return element.year;
    });

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
          data: secondDataToBeShow[0],
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
          data: getData(firstDataToBeShow)[0],
        },
      ],
    });
    chartComponentRef.current?.chart.reflow();
  }, [data]);

  const getData = (data: any) =>
    data.map((item: any) => {
      return item.map((country: any, i: any) => ({
        name: country[0],
        y: country[1],
        color: COUNTRIES[i].color,
      }));
    });

  const handleSelect = (year: any) => {
    setActiveYear(year);

    const indexActualYear = years.indexOf(year as never);
    const indexPreviousYear = indexActualYear + 1;

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
        text: `Comparando los resultados con ${year - 1}`,
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
          data: getData([actualDataToBeShow])[0],
        },
      ],
    });
  };

  return (
    <div>
      <IonList>
        <IonListHeader>
          <h2>Estancia media según lugar de residencia</h2>
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

export default ColumnComparisonChart;
