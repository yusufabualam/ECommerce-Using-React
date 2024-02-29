import { useSelector } from "react-redux";
import ProductCard from "../Components/ProductCard";

function Wishlist(){
    const wishlist = useSelector((state) => state.wish.wishlist);
return (
    <div className="container mt-5 mb-5">
    <div className="row row-cols-1 row-cols-md-3 g-4">
        {wishlist.map((wishlist) => (
            <div key={wishlist.id} className="col">
                <ProductCard
                    product={wishlist}
                />
            </div>
        ))}
    </div>
</div>
    );
}
export default Wishlist;