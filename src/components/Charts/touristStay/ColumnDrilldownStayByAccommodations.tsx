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
import drilldown from "highcharts/modules/drilldown";
import React, { useEffect, useRef, useState } from "react";

drilldown(Highcharts);

interface ApiDataInterface {
  data: any;
}

const COLORS = [
  "#2f7ed8",
  "#f28f43",
  "#492970",
  "#B52323",
  "#10A615",
  "#8C1FA7",
  "#1CB4B6",
];

function compare(a: any, b: any) {
  if (
    a.accommodation === "Otros establecimientos colectivos" ||
    a.residencePlace === "Otros países"
  )
    return 1;
  if (a.averageStay > b.averageStay) return -1;
  if (a.averageStay < b.averageStay) return 1;

  return 0;
}

const ColumnDrilldownStayByAccommodations: React.FC<ApiDataInterface> = ({
  data,
}) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [dataSelected, setDataSelected] = useState([]);
  const [years, setYears] = useState([]);
  const [activeYear, setActiveYear] = useState();
  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "column",
      shadow: true,
    },
    title: {
      align: "center",
    },
    subtitle: {
      align: "center",
      text: "Pulsa sobre las columnas para obtener más información.",
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Días",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y} días",
        },
      },
      column: {
        borderRadius: 5,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> días<br/>',
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["viewFullscreen"],
        },
      },
    },
    drilldown: {
      breadcrumbs: {
        position: {
          align: "right",
        },
      },
    },
    series: [
      {
        name: "Islas",
        colorByPoint: true,
      },
    ],
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (data.length > 0) {
      const dataSelected = data.map((item: any) => {
        return {
          year: item.year,
          stayByAccommodations: item.stayByAccommodations,
        };
      });

      const years = dataSelected.map((item: any) => item.year.toString());

      const firstYearAvailableData = years.indexOf("2018");

      const availableYears = years.slice(0, firstYearAvailableData + 1);

      setDataSelected(dataSelected);

      setYears(availableYears);

      setActiveYear(availableYears[0]);

      const firstData = dataSelected[1];

      const mainData = firstData.stayByAccommodations
        .sort(compare)
        .map((item: any, i: any) => {
          return {
            name: item.accommodation,
            y: item.averageStay,
            drilldown: item.accommodation,
            color: COLORS[i],
          };
        });

      const secondaryData = firstData.stayByAccommodations.map((item: any) => {
        return {
          name: item.accommodation,
          id: item.accommodation,
          data: item.accommodationStayByResidencePlace
            .sort(compare)
            .map((residencePlace: any) => {
              return [
                residencePlace.residencePlace,
                residencePlace.averageStay,
              ];
            }),
        };
      });

      setChartOptions({
        title: {
          text: `Estancia media por alojamiento en ${years[0]}`,
        },
        series: [
          {
            data: mainData,
          },
        ],
        drilldown: {
          series: secondaryData,
        },
      });
      chartComponentRef.current?.chart.reflow();
    }
  }, [data]);

  const handleSelect = (year: any) => {
    setActiveYear(year);

    const indexActualYear = years.indexOf(year as never);
    const mainData = (dataSelected[indexActualYear] as any).stayByAccommodations
      .sort(compare)
      .map((element: any) => {
        return {
          name: element.accommodation,
          y: element.averageStay,
          drilldown: element.accommodation,
        };
      });

    const secondaryData = (
      dataSelected[indexActualYear] as any
    ).stayByAccommodations.map((element: any) => {
      return {
        name: element.accommodation,
        id: element.accommodation,
        data: element.accommodationStayByResidencePlace
          .sort(compare)
          .map((residencePlace: any) => {
            return [residencePlace.residencePlace, residencePlace.averageStay];
          }),
      };
    });

    setChartOptions({
      title: {
        text: `Estancia media por isla en ${year}`,
      },
      series: [
        {
          data: mainData,
        },
      ],
      drilldown: {
        series: secondaryData,
      },
    });
  };

  return (
    <div>
      <IonList>
        <IonListHeader className="header-top">
          <h2>Estancia media según alojamiento</h2>
        </IonListHeader>
        <IonItemGroup className="item-group-top">
          <IonItem lines="none">
            <p>
              Esta gráfica incluye información sobre la estancia media según el
              tipo de alojamiento. Además, pulsando sobre las columnas, se puede
              conocer la estancia media de las principales nacionalidades en el
              tipo de alojamiento seleccionado.
            </p>
          </IonItem>
          <IonItem className="custom-select" lines="none">
            <IonLabel>Año:</IonLabel>
            <IonSelect
              placeholder={activeYear}
              onIonChange={(e) => handleSelect(e.detail.value)}
            >
              {years.map((year) => (
                <IonSelectOption value={year}>{year}</IonSelectOption>
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

export default ColumnDrilldownStayByAccommodations;
