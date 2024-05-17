import { Link } from "react-router-dom";

const ProductList=({data})=>{
    return(
        data?.map((product,index)=>{
            console.log(product); 
            return(
                <Link to={`/product/${product?.id}`}>
            <div className="product" key={index}>
            <div className="image-box">
                    <img className="images" id="image-1" src={product?.thumbnail} style={{width:"310px"}}/>
            </div>
            <div className="text-box">
                 <h2 className="item" title={product?.title}>{product?.title?.length > 15? `${product?.title.slice(0,15)}...`:product?.title}</h2>
                 <h4 className="item" style={{fontSize:"18px"}}>{product?.brand}</h4>
                 <h3 className="item" style={{color:"orange"}}>{product?.category}</h3>
                <h3 className="price" style={{color:"green"}}> ${product?.price}/-</h3>
                <p style={{fontSize:'12px'}} className="description" title={product?.description}>{product?.description?.length > 70 ? `${product.description.slice(0,70)}...`:product?.description}</p>
                 <label type="number"  for="item-1-quantity">Quantity:</label>
                 <input type="text" name="item-1-quantity" id="item-1-quantity" value="1" />
            </div>
          </div>
          </Link>
            )
        })
    )
}

export default ProductList