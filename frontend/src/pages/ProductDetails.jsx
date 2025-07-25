import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
    const {products, navigate, currency, addToCart} = useAppContext()
    const {id} = useParams()
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = products.find((item) => item._id === id)

    useEffect(()=>{
        if(products.length >0){
            let productCopy = products.slice();
            productCopy = productCopy.filter((item)=> product.category.toLowerCase()=== item.category.toLowerCase());
            setRelatedProducts(productCopy);
        }
    }, [products]);

    useEffect(()=>{
        if(product && product.image.length > 0) {
            setThumbnail(product.image[0]);
        }
        else{
            setThumbnail(null);
        }
    }, [product]);

    return product && (
        <div className="mt-12">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-indigo-500"> {product.name}</span>
            </p>
            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            <img src={i<4 ? assets.star_icon: assets.star_dull_icon} alt="star" className="w-3.5 h-3.5 md:w-4 md:h-4"/>
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button
                        onClick={() => addToCart(product._id)}
                         className="w-full py-3.5 cursor-pointer font-medium hover:bg-gray-100 border border-gray-600 hover:text-gray-800/80 bg-gray-600 text-white hover:scale-105 transition" >
                            Add to Cart
                        </button>
                        <button 
                        onClick={() => {addToCart(product._id); navigate("/cart")}}
                        className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-secondary hover:scale-105 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            {/*-----------Related Products Section---------*/}
            <div className='flex flex-col items-center mt-20'>
                <div className='flex flex-col items-center w-max'>
                    <h2 className="text-2xl text-center font-medium mt-16">Related Products</h2>
                    <div className='w-24 h-0.5 bg-primary mx-auto mb-4'></div>
                </div>
                <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-5">
                    {relatedProducts.filter((product)=> product.inStock).map((item, index) => {
                        if (item._id !== product._id) {
                            return <ProductCard key={index} product={item} />;
                        }
                    })}
                </div>
                <button 
                onClick={() => {navigate("/products"); scrollTo(0, 0)}}
                className='mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-green-500 hover:bg-green-600 hover:text-white transition'>See more</button>
            </div>
        </div>
    );
}

export default ProductDetails