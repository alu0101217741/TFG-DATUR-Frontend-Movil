import { IonItemGroup, IonList, IonListHeader } from "@ionic/react";
import { useEffect, useState } from "react";
import { getDataFromApi } from "../../services/getDataFromApi";
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
          <h2>Visualización de los datos</h2>
        </IonListHeader>
        <IonItemGroup>
          <LineChart data={[...data]} />
          <IonItemGroup>
            <h3>Gasto turístico por trimestre</h3>
            <BasicColumnTotalSpendChart data={[...data]} />
          </IonItemGroup>
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default TouristSpendingChart;
