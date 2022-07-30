import { IonContent } from "@ionic/react";
import React, { useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import { getDataFromApi } from "../services/getDataFromApi";

const TouristNumberAndNationalitiesGraph: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getDataFromApi("/api/v1/touristsNumber").then(setData).catch(console.log);
  }, []);

  return (
    <IonContent>
      <LineChart data={[...data]} />
    </IonContent>
  );
};

export default TouristNumberAndNationalitiesGraph;
