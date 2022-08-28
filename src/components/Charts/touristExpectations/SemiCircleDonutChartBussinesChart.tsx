import { IonItem, IonItemGroup, IonList, IonListHeader } from "@ionic/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

function trimesterMapper(trimester: any) {
  const previousYear = Number(trimester.slice(0, 4)) - 1;
  return previousYear + trimester.slice(4);
}

function trimesterLabelMapper(trimester: any) {
  const trimesterInNumber = trimester.slice(5);
  const year = trimester.slice(0, 4);

  let label;
  switch (trimesterInNumber) {
    case "01":
      label = "Primer trimestre";
      break;
    case "04":
      label = "Segundo trimestre";
      break;
    case "07":
      label = "Tercer trimestre";
      break;
    case "10":
      label = "Cuarto trimestre";
      break;
    default:
      label = "Trimestre no válido";
      break;
  }
  return label + " " + year;
}

interface ApiDataInterface {
  data: any;
}

const SemiCircleDonutChartBussinesChart: React.FC<ApiDataInterface> = ({
  data,
}) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const secondChartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [chartExplication, setChartExplication] = useState({
    trimester: "",
    previousYear: 0,
    favorable: "",
    normal: "",
    desfavorable: "",
  });

  const [hotelConfidenceIndexes, setHotelConfidenceIndexes] = useState<any>([]);

  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      shadow: true,
    },
    title: {
      text: "Expectativas<br>tendencia marcha<br> del negocio",
      align: "center",
      verticalAlign: "middle",
      y: 60,
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{series.name}</span><table>',
      pointFormat:
        "<tr><td>{point.name}: <b>{point.percentage:.1f}%</b></td></tr>",
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    legend: {
      itemWidth: 100,
      itemStyle: {
        fontSize: "14px",
        color: "blue",
        textOverflow: "allow",
      },
      itemMarginBottom: 50,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "90%"],
        size: "130%",
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
    credits: {
      enabled: false,
    },
  });

  const [secondChartOptions, setSecondChartOptions] = useState<any>({
    chart: {
      type: "bar",
      shadow: true,
    },
    title: {
      text: "Índice de confianza hotelera",
    },
    subtitle: {
      text: "Se compara el índice del trimestre actual con el mismo trimestre del año anterior",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Confianza hotelera",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "bottom",
      align: "center",
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
    if (data.length !== 0) {
      const dataSelected = data[0];

      const year = dataSelected.trimester.slice(0, 4);

      const previousTrimester = trimesterMapper(dataSelected.trimester);

      const previousData = data.find((item: any) => {
        return item.trimester === previousTrimester;
      });

      const businessTendencyFirstChart = [
        ["Favorable", dataSelected.businessProgressTendency.favorable],
        ["Normal", dataSelected.businessProgressTendency.normal],
        ["Desfavorable", dataSelected.businessProgressTendency.unfavorable],
      ];

      const hotelConfidenceIndexes = [
        dataSelected.hotelConfidenceIndex,
        previousData.hotelConfidenceIndex,
      ];

      setHotelConfidenceIndexes(hotelConfidenceIndexes);

      setChartExplication({
        trimester: trimesterLabelMapper(dataSelected.trimester),
        previousYear: Number(year) - 1,
        favorable: businessTendencyFirstChart[0][1],
        normal: businessTendencyFirstChart[1][1],
        desfavorable: businessTendencyFirstChart[2][1],
      });

      setChartOptions({
        series: [
          {
            type: "pie",
            name: "Expectativa marcha del negocio",
            innerSize: "50%",
            data: businessTendencyFirstChart,
            colors: ["#10A610", "#F28F43", "#B52323"],
          },
        ],
      });
      chartComponentRef.current?.chart.reflow();

      setSecondChartOptions({
        xAxis: {
          categories: [
            trimesterLabelMapper(dataSelected.trimester),
            trimesterLabelMapper(previousData.trimester),
          ],
          title: {
            text: null,
          },
        },
        series: [
          {
            name: "Indice de confianza hotelera",
            data: hotelConfidenceIndexes,
            color: "#2f7ed8",
          },
        ],
      });
      secondChartComponentRef.current?.chart.reflow();
    }
  }, [data]);

  return (
    <div>
      <IonList lines="none" className="first-chart-top">
        <IonListHeader>
          <h2>Marcha del negocio</h2>
        </IonListHeader>
        <IonListHeader>
          <h3>{chartExplication.trimester}</h3>
        </IonListHeader>
        <IonItemGroup className="item-top semicircle-style">
          <IonItem lines="none">
            <p>
              Estudiando la <b>marcha del negocio</b> para el{" "}
              {chartExplication.trimester.toLowerCase()}, en relación a{" "}
              {chartExplication.previousYear}, el {chartExplication.favorable}%
              de los hosteleros piensa que será favorable, mientras que el{" "}
              {chartExplication.desfavorable}% opina que será desfavorable, por
              último, el {chartExplication.normal}% considera que será normal.
            </p>
          </IonItem>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            ref={chartComponentRef}
          />
          <IonItem lines="none">
            <p>
              El <b>Índice de Confianza Hotelera (ICH)</b>, aumenta respecto al{" "}
              {chartExplication.trimester.split(" ")[0].toLowerCase()} trimestre
              de {chartExplication.previousYear} pasando de{" "}
              {hotelConfidenceIndexes[1]} a {hotelConfidenceIndexes[0]}.
            </p>
          </IonItem>
          <HighchartsReact
            highcharts={Highcharts}
            options={secondChartOptions}
            ref={secondChartComponentRef}
          />
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default SemiCircleDonutChartBussinesChart;
