import { useSelector } from "react-redux";
import ProductCard from '../Components/ProductCard'

function Favorites(){
    const favorites = useSelector((state) => state.favor.favorites);
return (
    <div className="container mt-5 mb-5">
    <div className="row row-cols-1 row-cols-md-3 g-4">
        {favorites.map((favorite) => (
            <div key={favorite.id} className="col">
                <ProductCard 
                product={favorite}
                />
            </div>
        ))}
    </div>
</div>
    );
}
export default Favorites;