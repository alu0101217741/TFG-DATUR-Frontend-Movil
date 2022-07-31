import { IonItem, IonItemGroup, IonList, IonListHeader } from "@ionic/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useRef, useState } from "react";

interface ApiDataInterface {
  data: any;
}

const LineChart: React.FC<ApiDataInterface> = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      shadow: true,
    },
    title: {
      text: "Evolución del número de turistas",
    },
    subtitle: {
      text: "Fuente: Instituto Canario de Estadística",
    },
    yAxis: {
      title: {
        text: "Millones de turistas",
      },
    },
    xAxis: {
      accessibility: {
        rangeDescription: "Range: 2010 to 2022",
      },
    },
    legend: {
      layout: "vertical",
      align: "center",
      verticalAlign: "bottom",
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },
    series: [
      {
        name: "Número de turistas",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const dataMapping = data.reverse().map((item: any) => item.totalTourists);
    setChartOptions({
      series: [{ name: "Número de turistas", data: dataMapping }],
    });
    chartComponentRef.current?.chart.reflow();
  }, [data]);

  return (
    <div>
      <IonList>
        <IonListHeader>
          <h3>Número total de turistas por año</h3>
        </IonListHeader>
        <IonItemGroup>
          <IonItem lines="none">
            <p>
              Se proporciona una visión global acerca del número de turistas que
              visitan las Islas Canarias, profundizando en las nacionalidades
              que visitan Canarias y la distribución de estos turistas por
              islas.
            </p>
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

export default LineChart;
