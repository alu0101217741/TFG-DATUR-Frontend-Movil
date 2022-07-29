import React, { useEffect, useState } from 'react';
import { IonContent } from '@ionic/react';
import { getDataFromApi } from '../services/getDataFromApi';
import LineChart from '../components/LineChart';

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
  