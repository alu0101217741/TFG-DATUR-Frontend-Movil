import {
  IonCard,
  IonCardContent,
  IonItem,
  IonItemGroup,
  IonList,
  IonListHeader,
} from "@ionic/react";

const TouristExpectationsContent: React.FC = () => {
  return (
    <div>
      <IonList>
        <IonListHeader>
          <h1>Información de la sección</h1>
        </IonListHeader>
        <IonItemGroup>
          <IonItem lines="none">
            <p>
              En esta sección se ofrece una visión sobre el futuro del sector
              turístico canario, a través de una serie de expectativas basadas
              en las opiniones de los gestores de los establecimientos hoteleros
              de Canarias. Estas expectativas se centran en el grado de
              ocupación y en la marcha del negocio.
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
              href="https://datos.canarias.es/catalogos/general/dataset/balance-de-situacion-balance-de-expectativas-e-indices-de-confianza-hotelera-por-islas-de-canar1"
              mode="md"
              target="_blank"
              class="card-link"
            >
              <IonCardContent className="card-button-content">
                <p>
                  Balance de situación, de expectativas e índices de confianza
                  hotelera.
                </p>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="center-card">
            <IonCard
              button={true}
              href="https://datos.canarias.es/catalogos/general/dataset/expectativas-de-la-marcha-del-negocio-respecto-al-trimestre-anterior-segun-categorias-de-los-es1"
              mode="md"
              target="_blank"
              class="card-link"
            >
              <IonCardContent className="card-button-content">
                <p>
                  Expectativas de la marcha del negocio respecto al trimestre
                  anterior.
                </p>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="center-card">
            <IonCard
              button={true}
              href="https://datos.canarias.es/catalogos/general/dataset/expectativas-de-los-principales-factores-de-la-marcha-del-negocio-respecto-a-otros-trimestres-s1"
              mode="md"
              target="_blank"
              class="card-link"
            >
              <IonCardContent className="card-button-content">
                <p>
                  Expectativas de los principales factores de la marcha del
                  negocio.
                </p>
              </IonCardContent>
            </IonCard>
          </div>
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default TouristExpectationsContent;
