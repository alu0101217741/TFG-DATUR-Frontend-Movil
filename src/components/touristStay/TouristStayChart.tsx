import { IonItemGroup, IonList, IonListHeader } from "@ionic/react";
import { useEffect, useState } from "react";
import { getDataFromApi } from "../../services/getDataFromApi";
import ColumnComparisonChart from "../Charts/touristStay/ColumnComparisonChart";
import ColumnDrilldownStayByAccommodations from "../Charts/touristStay/ColumnDrilldownStayByAccommodations";
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
          <h1>Visualización de los datos</h1>
        </IonListHeader>
        <IonItemGroup>
          <LineChart data={[...data]} />
          <ColumnComparisonChart data={[...data]} />
          <ColumnDrilldownStayByIslandChart data={[...data]} />
          <ColumnDrilldownStayByAccommodations data={[...data]} />
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default TouristStayChart;
