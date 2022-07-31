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
      text: "Evolución del gasto turístico",
    },
    subtitle: {
      text: "Fuente: Instituto Canario de Estadística",
    },
    yAxis: {
      title: {
        text: "Gasto total",
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
    const dataValues = data.map((item: any) => {
      let totalYear = 0;
      item.data.forEach((element: any) => {
        totalYear += element.totalSpending;
      });
      return Math.trunc(totalYear);
    });

    setChartOptions({
      xAxis: {
        categories: dataYears,
      },
      series: [
        {
          name: "Gasto total",
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
          <h3>Estancia media de los turistas por año</h3>
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
