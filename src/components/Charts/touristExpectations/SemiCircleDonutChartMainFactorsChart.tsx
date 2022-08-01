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
import "./SemiCircleDonutChartMainFactorsChart.css";

enum MainFactors {
  BUSINESS_VOLUME = "Facturación",
  HIRED_STAFF = "Empleo",
  INVESTMENT = "Inversión",
  PRICE_LEVEL = "Nivel de precios",
}

enum MainFactorsToPrint {
  BUSINESS_VOLUME = "Facturación",
  HIRED_STAFF = "Empleo",
  INVESTMENT = "Inversión",
  PRICE_LEVEL = "Nivel de<br>precios",
}

interface ApiDataInterface {
  data: any;
}

const SemiCircleDonutChartMainFactorsChart: React.FC<ApiDataInterface> = ({
  data,
}) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      shadow: true,
    },
    title: {
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
        center: ["50%", "95%"],
        size: "130%",
        showInLegend: true,
      },
    },
  });

  const [mainFactorsExpectations, setMainFactorsExpectations] = useState<any>();

  useEffect(() => {
    if (data.length !== 0) {
      const dataSelected = data[0];

      setMainFactorsExpectations(dataSelected.mainFactorsExpectations);

      const chartValue = [
        [
          "Aumento",
          dataSelected.mainFactorsExpectations.businessVolume.increase,
        ],
        [
          "Descenso",
          dataSelected.mainFactorsExpectations.businessVolume.decline,
        ],
        [
          "Estabilidad",
          dataSelected.mainFactorsExpectations.businessVolume.stability,
        ],
      ];

      setChartOptions({
        title: {
          text: "Expectativas<br>en " + MainFactorsToPrint.BUSINESS_VOLUME,
        },
        series: [
          {
            type: "pie",
            name: "Expectativa marcha del negocio",
            innerSize: "50%",
            data: chartValue,
          },
        ],
      });
    }
    chartComponentRef.current?.chart.reflow();
  }, [data]);

  const handleSelect = (mainFactorSelected: any) => {
    let mainFactors;
    let title;

    switch (mainFactorSelected) {
      case MainFactors.BUSINESS_VOLUME:
        mainFactors = mainFactorsExpectations.businessVolume;
        title = MainFactorsToPrint.BUSINESS_VOLUME;
        break;
      case MainFactors.HIRED_STAFF:
        mainFactors = mainFactorsExpectations.hiredStaff;
        title = MainFactorsToPrint.HIRED_STAFF;
        break;
      case MainFactors.INVESTMENT:
        mainFactors = mainFactorsExpectations.investment;
        title = MainFactorsToPrint.INVESTMENT;
        break;
      case MainFactors.PRICE_LEVEL:
        mainFactors = mainFactorsExpectations.priceLevel;
        title = MainFactorsToPrint.PRICE_LEVEL;
        break;
      default:
        mainFactors = mainFactorsExpectations.businessVolume;
        title = MainFactorsToPrint.BUSINESS_VOLUME;
        break;
    }

    const chartValue = [
      ["Aumento", mainFactors.increase],
      ["Descenso", mainFactors.decline],
      ["Estabilidad", mainFactors.stability],
    ];

    setChartOptions({
      title: {
        text: "Expectativas<br>en " + title,
      },
      series: [
        {
          type: "pie",
          name: "Expectativa marcha del negocio",
          innerSize: "50%",
          data: chartValue,
        },
      ],
    });
  };

  return (
    <div>
      <IonList>
        <IonListHeader>
          <h2>Factores de la marcha del negocio</h2>
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
          <div className="select-container select-factor">
            <IonSelect
              placeholder={MainFactors.BUSINESS_VOLUME}
              onIonChange={(e) => handleSelect(e.detail.value)}
            >
              <IonSelectOption value={MainFactors.BUSINESS_VOLUME}>
                {MainFactors.BUSINESS_VOLUME}
              </IonSelectOption>
              <IonSelectOption value={MainFactors.HIRED_STAFF}>
                {MainFactors.HIRED_STAFF}
              </IonSelectOption>
              <IonSelectOption value={MainFactors.INVESTMENT}>
                {MainFactors.INVESTMENT}
              </IonSelectOption>
              <IonSelectOption value={MainFactors.PRICE_LEVEL}>
                {MainFactors.PRICE_LEVEL}
              </IonSelectOption>
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

export default SemiCircleDonutChartMainFactorsChart;
