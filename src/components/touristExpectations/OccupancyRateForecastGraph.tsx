import { IonItemGroup, IonList, IonListHeader } from "@ionic/react";
import { useEffect, useState } from "react";
import { getDataFromApi } from "../../services/getDataFromApi";
import SemiCircleDonutChart from "../Charts/touristExpectations/SemiCircleDonutChart";

const OccupancyRateForecastGraph: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getDataFromApi("/api/v1/occupancyRateForecast")
      .then(setData)
      .catch(console.log);
  }, []);

  return (
    <div>
      <IonList>
        <IonListHeader>
          <h1>Visualización de los datos</h1>
        </IonListHeader>
        <IonItemGroup>
          <SemiCircleDonutChart data={[...data]} />
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default OccupancyRateForecastGraph;
