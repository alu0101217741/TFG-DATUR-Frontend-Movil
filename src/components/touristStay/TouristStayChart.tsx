import { IonItemGroup, IonList, IonListHeader } from "@ionic/react";
import { useEffect, useState } from "react";
import { getDataFromApi } from "../../services/getDataFromApi";
import ColumnComparisonChart from "../Charts/touristStay/ColumnComparisonChart";
import ColumnDrilldownStayByIslandChart from "../Charts/touristStay/ColumnDrilldownStayByIslandChart";
import LineChart from "../Charts/touristStay/LineChart";

const TouristStayChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getDataFromApi("/api/v1/touristStay").then(setData).catch(console.log);
  }, []);

  return (
    <div>
      <IonList>
        <IonListHeader>
          <h2>Visualización de los datos</h2>
        </IonListHeader>
        <IonItemGroup>
          <LineChart data={[...data]} />
          <ColumnComparisonChart data={[...data]} />
          <ColumnDrilldownStayByIslandChart data={[...data]} />
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default TouristStayChart;
