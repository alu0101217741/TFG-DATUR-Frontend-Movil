import { IonContent } from "@ionic/react";
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
      align: "right",
      verticalAlign: "middle",
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
    <IonContent>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartComponentRef}
      />
    </IonContent>
  );
};

export default LineChart;
