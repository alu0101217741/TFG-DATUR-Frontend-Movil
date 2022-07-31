import { IonItemGroup, IonList, IonListHeader } from "@ionic/react";
import { useEffect, useState } from "react";
import { getDataFromApi } from "../../services/getDataFromApi";
import BasicColumnAverageSpendChart from "../Charts/touristSpending/BasicColumnAverageSpendChart";
import BasicColumnSpendChart from "../Charts/touristSpending/BasicColumnSpendChart";
import BasicColumnTotalSpendChart from "../Charts/touristSpending/BasicColumnTotalSpendChart";
import LineChart from "../Charts/touristSpending/LineChart";

const TouristSpendingChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getDataFromApi("/api/v1/touristSpending").then(setData).catch(console.log);
  }, []);

  return (
    <div>
      <IonList>
        <IonListHeader>
          <h1>Visualización de los datos</h1>
        </IonListHeader>
        <IonItemGroup>
          <LineChart data={[...data]} />
          <IonItemGroup>
            <BasicColumnTotalSpendChart data={[...data]} />
            <BasicColumnAverageSpendChart data={[...data]} />
            <BasicColumnSpendChart data={[...data]} />
          </IonItemGroup>
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default TouristSpendingChart;
