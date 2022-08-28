import {
  IonCard,
  IonCardContent,
  IonItem,
  IonItemGroup,
  IonList,
  IonListHeader,
} from "@ionic/react";

const TouristSpendingContent: React.FC = () => {
  return (
    <div>
      <IonList>
        <IonListHeader>
          <h1>Información de la sección</h1>
        </IonListHeader>
        <IonItemGroup>
          <IonItem lines="none">
            <p>
              Esta sección pretende aportar un conocimiento total sobre el gasto
              que realizan los turistas en sus viajes a las Islas Canarias, a
              través de gráficas que visualizan la evolución del gasto y su
              desglose en conceptos (alojamiento, transporte, alimentación,
              compras, etc).
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
              href="https://datos.canarias.es/catalogos/general/dataset/gastos-medios-incluyendo-desgloses-del-gasto-segun-paises-de-residencia-por-islas-de-canarias-y1"
              mode="md"
              target="_blank"
              class="card-link"
            >
              <IonCardContent className="card-button-content">
                <p>
                  Gastos medios según países de residencia por islas de Canarias
                  y periodos.
                </p>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="center-card">
            <IonCard
              button={true}
              href="https://datos.canarias.es/catalogos/general/dataset/gasto-turistico-total-segun-nacionalidades-por-periodos1-1"
              mode="md"
              target="_blank"
              class="card-link"
            >
              <IonCardContent className="card-button-content">
                <p>Gasto turístico total según nacionalidades por periodos.</p>
              </IonCardContent>
            </IonCard>
          </div>
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default TouristSpendingContent;
