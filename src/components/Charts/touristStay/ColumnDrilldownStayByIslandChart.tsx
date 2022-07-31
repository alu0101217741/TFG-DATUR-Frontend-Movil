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
import drilldown from "highcharts/modules/drilldown";
import exportdata from "highcharts/modules/export-data";
import exporting from "highcharts/modules/exporting";
import React, { useEffect, useRef, useState } from "react";

drilldown(Highcharts);
exporting(Highcharts);
exportdata(Highcharts);

interface ApiDataInterface {
  data: any;
}

const ColumnDrilldownStayByIslandChart: React.FC<ApiDataInterface> = ({
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
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
            "viewFullscreen",
            "printChart",
          ],
        },
      },
    },
    credits: {
      enabled: false,
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
  });

  useEffect(() => {
    const dataSelected = data.map((item: any) => {
      return {
        year: item.year,
        stayByIsland: item.stayByIsland,
      };
    });

    const years = dataSelected.map((item: any) => item.year.toString());

    setDataSelected(dataSelected);

    setYears(years);

    setActiveYear(years[0]);

    const firstData = dataSelected.slice(0, 1).flat();

    const mainData = firstData.map((item: any) => {
      return item.stayByIsland.map((element: any) => {
        return {
          name: element.island,
          y: element.averageStay,
          drilldown: element.island,
        };
      });
    });

    const secondaryData = firstData.map((item: any) => {
      return item.stayByIsland.map((element: any) => {
        return {
          name: element.island,
          id: element.island,
          data: element.islandStayByResidencePlaces.map(
            (residencePlace: any) => {
              return [
                residencePlace.residencePlace,
                residencePlace.averageStay,
              ];
            }
          ),
        };
      });
    });

    setChartOptions({
      title: {
        text: `Estancia media por isla en ${years[0]}`,
      },
      series: [
        {
          data: mainData[0],
        },
      ],
      drilldown: {
        series: secondaryData[0],
      },
    });

    chartComponentRef.current?.chart.reflow();
  }, [data]);

  const handleSelect = (year: any) => {
    setActiveYear(year);

    const indexActualYear = years.indexOf(year as never);

    const mainData = (dataSelected[indexActualYear] as any).stayByIsland.map(
      (element: any) => {
        return {
          name: element.island,
          y: element.averageStay,
          drilldown: element.island,
        };
      }
    );

    const secondaryData = (
      dataSelected[indexActualYear] as any
    ).stayByIsland.map((element: any) => {
      return {
        name: element.island,
        id: element.island,
        data: element.islandStayByResidencePlaces.map((residencePlace: any) => {
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
        <IonListHeader>
          <h3>Estancia media por isla</h3>
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
          <IonItem>
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

export default ColumnDrilldownStayByIslandChart;
