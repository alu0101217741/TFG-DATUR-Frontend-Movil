import Card from "../components/Card";
import "./CardsGroup.css";

const CardsGroup: React.FC = () => {
  return (
    <>
      <div className="card-container">
        <h2>Nuestras secciones</h2>
      </div>
      <div className="ion-padding">
        <Card
          src="assets/images/touristNumberAndNationalities.jpg"
          title="Número turistas"
          text="Conoce el número de turistas y nacionalidades que visitan las Islas Canarias, incluyendo su evolución a lo largo de los años y un clasificación por islas."
          label="Instituto Canario de Estadística"
          details="Actualización estimada: mensual"
          path="/tourist-number"
        />
        <Card
          src="assets/images/tourist-spending.jpg"
          title="Gasto turístico"
          text="Conoce el número de turistas y nacionalidades que visitan las Islas Canarias, incluyendo su evolución a lo largo de los años y un clasificación por islas."
          label="Instituto Canario de Estadística"
          details="Actualización estimada: mensual"
          path="/tourist-spending"
        />
        <Card
          src="assets/images/touristStay.jpg"
          title="Estancia turística"
          text="Conoce el número de turistas y nacionalidades que visitan las Islas Canarias, incluyendo su evolución a lo largo de los años y un clasificación por islas."
          label="Instituto Canario de Estadística"
          details="Actualización estimada: mensual"
          path="/estancia-turistica"
        />
        <Card
          src="assets/images/img-header-energy-data.png"
          title="Expectativas turísticas"
          text="Conoce el número de turistas y nacionalidades que visitan las Islas Canarias, incluyendo su evolución a lo largo de los años y un clasificación por islas."
          label="Instituto Canario de Estadística"
          details="Actualización estimada: mensual"
          path="/products"
        />
      </div>
    </>
  );
};

export default CardsGroup;
