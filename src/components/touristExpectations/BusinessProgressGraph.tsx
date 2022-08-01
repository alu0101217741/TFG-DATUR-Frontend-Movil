import { IonItemGroup, IonList } from "@ionic/react";
import { useEffect, useState } from "react";
import { getDataFromApi } from "../../services/getDataFromApi";
import SemiCircleDonutChartBussinesChart from "../Charts/touristExpectations/SemiCircleDonutChartBussinesChart";
import SemiCircleDonutChartMainFactorsChart from "../Charts/touristExpectations/SemiCircleDonutChartMainFactorsChart";

const BusinessProgressGraph: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getDataFromApi("/api/v1/businessProgressExpectation")
      .then(setData)
      .catch(console.log);
  }, []);

  return (
    <div>
      <IonList>
        <IonItemGroup>
          <SemiCircleDonutChartBussinesChart data={[...data]} />
          <SemiCircleDonutChartMainFactorsChart data={[...data]} />
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default BusinessProgressGraph;
