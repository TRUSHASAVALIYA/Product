import { useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "./productSlice";
import "./productDetail.css"
import loder from "../../assets/images/loder.gif"

const ProductDetail = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const productDetail = useSelector((state) => state.Product.ProductDetail)
    const loading = productDetail.loading
    const data = productDetail.data
    const [selectedImg, setSelectedImg] = useState("")
    console.log(data, "====data");

    useEffect(() => {
        if (productId) {
            dispatch(getProductDetail(productId))
        }
    }, [dispatch, productId])
    useEffect(() => {
       if(data && data.images && data.images.length > 0){
         setSelectedImg(data.images[0])
       }
    },[data])
    return (
        <>
            {loading ?
                <img src={loder} width={0} height={300}/>
                :
                <div className="card-wrapper">
                    <div className="card">
                        <div className="product-imgs">
                            <div className="img-display">
                                <div className="img-showcase">
                                    <img src={selectedImg} alt="shoe image" />
                                </div>
                            </div>
                            <div className="img-select">
                                {data?.images?.map((image, idx) => {
                                    return (
                                        <div className={`img-item ${selectedImg == image ? 'border' : '' } `} 
                                        onClick={() => {
                                          setSelectedImg(image)
                                        }}
                                        >
                                            <a href="#" data-id={idx + 1}>
                                                <img src={image} alt="shoe image" />
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="product-content">
                            <h2 className="product-title">{data?.title}</h2>
                            <a href="#" className="product-link">visit {data?.brand} store</a>
                            <div className="product-rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                                <span>{data?.rating}({data?.stock})</span>
                            </div>

                            <div className="product-price">
                                <p className="last-price">Old Price: <span>₹{data?.price}</span></p> 
                                <p className="new-price">New Price: <span>₹{(data?.price - (data?.price * data?.discountPercentage / 100)).toFixed(2)} ({data?.discountPercentage}%)</span></p>
                            </div>

                            <div className="product-detail">
                                <h2>about this item: </h2>
                                <p>{data?.description}</p>
                                <ul>
                                    <li>Available: <span>{data?.stock ? `in stock` : `outstock`}</span></li>
                                    <li>Category: <span>{data?.category}</span></li>
                                    <li>Shipping Fee: <span>Free</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}
export default ProductDetail;
