import react, { useState, useEffect} from "react";
import Image from "next/image";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router";
// import isEmpty from "lodash/isEmpty";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
// import { useCart } from "@contexts/cart/cart.context";
// import { ProductAttributes } from "@components/product/product-attributes";
// import { generateCartItem } from "@utils/generate-cart-item";
// import usePrice from "@framework/product/use-price";
// import { getVariations } from "@framework/utils/get-variations";
import { useTranslation } from "next-i18next";

import { addToCart } from "../../Store/Action/Index"
const placeholderImage = `/assets/placeholder/products/product-list.svg`;

export default function ProductPopup() {
	const dispatch = useDispatch()
	const { t } = useTranslation("common");
	const { modalData: { data }, closeModal, openCart, } = useUI();
	const router = useRouter();
	// const { addItemToCart } = useCart();
	let [quantity, setQuantity] = useState(1);
	// const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
	const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
	const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
	const [colorArray, setColorArray] = useState([]);
	const [isSelected, setIsSelected] = useState(false);
	const [selectedSize, setSelectedSize] = useState("");
	const [selectedColor, setSelectedColor] = useState("");
	const[addToCartAlert, setaddToCartAlert] = useState(false);

	// const { price, basePrice, discount } = usePrice({
	// 	amount: data.sale_price ? data.sale_price : data.price,
	// 	baseAmount: data.price,
	// 	currencyCode: "USD",
	// });

	const { product_id, product_name } = data;

	const PRODUCT = useSelector(state => state.Product)
	const STORE = useSelector(state => state.Store)
	const CART = useSelector(state=>state.Cart)

	
	const itemsInCart = CART.items;
	// console.log('itemsInCart', Object.entries(itemsInCart).length );
	
	const selected_store = STORE.getStore?.find(item => {
		if(item.id == router.query.slug){
			return item;
		}
	})
const currentStoreid = selected_store.id;
    const cartItems = useSelector((state) => {
	
        const transformedCartItems = [];
        for (const key in state.Cart.items) {
          transformedCartItems.push({
            product_id: key,
            product_name: state.Cart.items[key].product_name,
            quantity:state.Cart.items[key].quantity,
            color:state.Cart.items[key].color,
            size:state.Cart.items[key].size,
            netPrice:state.Cart.items[key].net_price,
            imageUrl:state.Cart.items[key].image_url,
            total_price:state.Cart.items[key].total_price,
          });
        
        }
        return transformedCartItems.sort((a, b) => (a.product_id > b.product_id ? 1 : -1));
    });

	// console.log('cartItems', cartItems);	

	function navigateToProductPage(){
		closeModal();
		router.push(`${ROUTES.PRODUCT}/${product_id}`, undefined, {
			locale: router.locale,
		});
	}

	function navigateToCartPage() {
		closeModal();
		setTimeout(() => {
			openCart();
		}, 300);
	}

	const selected_product = PRODUCT.getProduct?.find(item => {
		if(item.product_id == data.product_id){
			return item;
		}
	})

	const size_array = selected_product.size_data.map((item) => {
		useEffect(() => {
			setColorArray(item.colors)
		}, [])

		return {
			size_id:item.size_id,
			size_name:item.size_name,
			color:item.colors
		}
	})
//  for(let size in cartItems){
// 	console.log('size',size );
//  }
	
	// console.log('colorarray',colorArray);

	const select_size = (item) => {
		setSelectedSize(item.size_id)
		setColorArray(item.color)
		setSelectedColor("")
		setIsSelected(false);	
	}

	const select_color = (item) => {
		setSelectedColor(item.color_id)
		setIsSelected(true);
	}
	let prevQuantity = cartItems.map(res=>(res.quantity));
	let prevQuantity2 = cartItems.find(quan => {
		if(quan.product_id == data.product_id){
			return quan;
		}
	})

    const productInCart = cartItems.map(res=>(res.product_id));

	let quantity2;
	function addToCartHandler(){
		if (!isSelected) return;
		if(productInCart.includes(String(selected_product.product_id))){
			quantity2 = prevQuantity2.quantity + quantity;
			quantity = quantity2;
			dispatch(addToCart(selected_product, selectedColor, selectedSize, quantity, selected_product.net_price, currentStoreid))	
		}else{
			dispatch(addToCart(selected_product, selectedColor, selectedSize, quantity, selected_product.net_price, currentStoreid))
		}
		
		if(PRODUCT.getProduct !== undefined || PRODUCT.getProduct !== null){
			setaddToCartAlert(true);
		}
		setTimeout(alertOut, 2000);
		function alertOut() {
			setaddToCartAlert(false);
		}
	
		
	}

	return (
		<div className="rounded-lg bg-white">
			<div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
				<div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
					<Image
						src={selected_product.image_url == "" || selected_product.image_url == null ? placeholderImage  : selected_product.image_url}
						alt={product_name}
						className="lg:object-cover lg:w-full lg:h-full"
						width={440}
						height={560}
					/>
				</div>

				<div className="flex flex-col p-5 md:p-8 w-full">
					<div className="pb-5">
						<div
							className="mb-2 md:mb-2.5 block -mt-1.5"
							onClick={navigateToProductPage}
							role="button"
						>
							<h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
							{selected_product.product_name}
							</h2>
						</div>
						<p className="text-sm leading-6 md:text-body md:leading-7">
							This is a product description
						</p>

						<div className="flex items-center mt-3">
							<div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
								₹{selected_product.net_price}
							</div>
							{selected_product.discount_percent > 0 && (
								<del className="font-segoe text-gray-400 text-base lg:text-xl ps-2.5 -mt-0.5 md:mt-0">
									₹{selected_product.sale_price}
								</del>
							)}
						</div>
					</div>
					
					<div className="mb-4">
						<h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
							Size
						</h3>
						<ul className="colors flex flex-wrap -me-3">
							{ 
								size_array.map((item) => {
									return (
										<li
											key={item.size_id}
											className={cn(
												"cursor-pointer rounded border border-gray-100 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
												{
													"border-black": item.size_id == selectedSize,
												}
											)}
											onClick={() => select_size(item)}
										>
											{item.size_name}
										</li>
									)
								})
							}
						</ul> 
					</div>

					<div className="mb-4">
						<h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
							Color
						</h3>
						<ul className="colors flex flex-wrap -me-3">
							{ 
								colorArray.map((item) => {
									return (
										<li
											key={item.color_id}
											className={cn(
												"cursor-pointer rounded border border-gray-100 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
												{
													"border-black": item.color_id == selectedColor,
												}
											)}
											onClick={() => select_color(item)}
										>
											{item.color_name}
										</li>
									)
								})
							}
						</ul> 
					</div>					
					{addToCartAlert ?
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
						<strong className="font-bold">Item Added</strong>
						<span className="block sm:inline" style={{"fontSize":"14px"}}>Item successfully added in your Cart</span>
						<span className="absolute top-0 bottom-0 right-0 px-4 py-3">
							<svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
						</span>
					</div> : ""
					}
					<div className="pt-2 md:pt-4">
						<div className="flex items-center justify-between mb-4 space-s-3 sm:space-s-4">
							<Counter
								quantity={quantity}
								onIncrement={() => setQuantity((prev) => prev + 1)}
								onDecrement={() =>
									setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
								}
								disableDecrement={quantity === 1}
							/>
							<Button
								onClick={addToCartHandler}
								variant="flat"
								className={`w-full h-11 md:h-12 px-1.5 ${
									!isSelected && "bg-gray-400 hover:bg-gray-400"
								}`}
								disabled={!isSelected}
								loading={addToCartLoader}
							>
								{t("text-add-to-cart")}
							</Button>
						</div>

					{
						Object.entries(itemsInCart).length === 0 ? '' : <button
						onClick={navigateToCartPage}
						className="w-full mb-4 h-11 md:h-12 rounded bg-gray-100 text-heading focus:outline-none border border-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50"
					>
						{t("text-view-cart")}
					</button>
				
					}					

						<Button
							onClick={navigateToProductPage}
							variant="flat"
							className="w-full h-11 md:h-12"
						>
							{t("text-view-details")}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
