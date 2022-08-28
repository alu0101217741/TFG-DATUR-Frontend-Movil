import {
  IonCard,
  IonCardContent,
  IonItem,
  IonItemGroup,
  IonList,
  IonListHeader,
} from "@ionic/react";

const TouristStayContent: React.FC = () => {
  return (
    <div>
      <IonList>
        <IonListHeader>
          <h1>Información de la sección</h1>
        </IonListHeader>
        <IonItemGroup>
          <IonItem lines="none">
            <p>
              Esta sección muestra diversa información sobre la cantidad de días
              que permanecen los turistas en Canarias, teniendo en cuenta
              factores relevantes como su nacionalidad, isla que visitan o el
              tipo de alojamiento en el que se hospedan.
            </p>
          </IonItem>
          <IonItem lines="none">
            <p>
              Para generar estas gráficas se han procesado los siguientes
              datasets del repositorio &nbsp;
              <b>
                <a
                  target="_blank"
                  href="https://datos.canarias.es/portal/"
                  rel="noreferrer"
                >
                  Canarias Datos Abiertos
                </a>
              </b>
              :
            </p>
          </IonItem>
          <div className="center-card">
            <IonCard
              button={true}
              href="https://datos.canarias.es/catalogos/general/dataset/estancia-media-de-los-viajeros-segun-lugares-de-residencia-por-islas-de-alojamiento-de-canarias1"
              mode="md"
              target="_blank"
              class="card-link"
            >
              <IonCardContent className="card-button-content">
                <p>
                  Estancia media de los viajeros por islas de alojamiento de
                  Canarias y periodos.
                </p>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="center-card">
            <IonCard
              button={true}
              href="https://datos.canarias.es/catalogos/general/dataset/estancia-media-segun-tipos-de-alojamiento-y-paises-de-residencia-islas-de-canarias-y-periodos1"
              mode="md"
              target="_blank"
              class="card-link"
            >
              <IonCardContent className="card-button-content">
                <p>
                  Estancia media según tipos de alojamiento y países de
                  residencia.
                </p>
              </IonCardContent>
            </IonCard>
          </div>
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default TouristStayContent;
