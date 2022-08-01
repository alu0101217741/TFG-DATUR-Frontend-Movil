import { IonItem, IonItemGroup, IonList, IonListHeader } from "@ionic/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

interface ApiDataInterface {
  data: any;
}

const LineChart: React.FC<ApiDataInterface> = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "line",
      shadow: true,
    },
    title: {
      text: "Evolución de la estancia media de turistas",
    },
    subtitle: {
      text: "Fuente: Instituto Canario de Estadística",
    },
    yAxis: {
      title: {
        text: "Estancia media",
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
      },
    },
  });

  useEffect(() => {
    const dataYears = data.reverse().map((item: any) => item.year);
    const dataValues = data.reverse().map((item: any) => item.averageStay);

    setChartOptions({
      xAxis: {
        categories: dataYears,
      },
      series: [
        {
          name: "Estancia media",
          data: dataValues,
        },
      ],
    });
    chartComponentRef.current?.chart.reflow();
  }, [data]);

  return (
    <div>
      <IonList>
        <IonListHeader>
          <h2>Estancia media por año</h2>
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
