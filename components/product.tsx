import Image, { StaticImageData} from 'next/image';

export interface IProduct {
    id: string
    name: string
    price: number
    url: string
    description: string
    image?: StaticImageData
}

interface IProductProps {
    product: IProduct
}

const Product = (props: IProductProps) => {
    return (
        <div>
     
            <h2 >{props.product.name}</h2>
            <p >{props.product.description}</p>
            <div>
            {props.product.image && <Image src={props.product.image} alt={props.product.image.src} />}
            </div>
            <div className="product__price-button-container py-8">
                <div className="mb-4">${props.product.price.toFixed(2)}</div>
                <button
                    className={`snipcart-add-item py-2 px-3 bg-purple-600 text-white`}
                    data-item-id={props.product.id}
                    data-item-name={props.product.name}
                    data-item-price={props.product.price}
                    data-item-url={props.product.url}
                    //data-item-image={props.product.image.src}
                    >
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default Product;