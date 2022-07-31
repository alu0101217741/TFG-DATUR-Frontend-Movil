import { IonItemGroup, IonList, IonListHeader } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { getDataFromApi } from "../../services/getDataFromApi";
import BasicBar from "../Charts/touristNumber/BasicBar";
import LineChart from "../Charts/touristNumber/LineChart";
import StackedBarChart from "../Charts/touristNumber/StackedBarChart";
import "./TouristNumberGraph.css";

const TouristNumberGraph: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getDataFromApi("/api/v1/touristsNumber").then(setData).catch(console.log);
  }, []);

  return (
    <div>
      <IonList>
        <IonListHeader>
          <h1>Visualización de los datos</h1>
        </IonListHeader>
        <IonItemGroup>
          <LineChart data={[...data]} />
          <StackedBarChart data={[...data]} />
          <BasicBar data={[...data]} />
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default TouristNumberGraph;
