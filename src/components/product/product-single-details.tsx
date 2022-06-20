import react, { useEffect, useState } from "react";
import {  useDispatch, useSelector } from 'react-redux';
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useRouter } from "next/router";
// import { useProductQuery } from "@framework/product/get-product";
// import { getVariations } from "@framework/utils/get-variations";
// import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
// import { ProductAttributes } from "./product-attributes";
import cn from "classnames";

// import isEmpty from "lodash/isEmpty";
// import Link from "@components/ui/link";
import { toast } from "react-toastify";
import { useWindowSize } from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
// import { SwiperSlide } from "swiper/react";
import ProductMetaReview from "@components/product/product-meta-review";

import { addToCart } from "../../Store/Action/Index"

const productGalleryCarouselResponsive = {
	"768": {
		slidesPerView: 2,
	},
	"0": {
		slidesPerView: 1,
	},
};

const ProductSingleDetails: React.FC = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const PRODUCT = useSelector(state => state.Product)
	console.log('itme',PRODUCT);
	const CART = useSelector(state => state.Cart)
	const { width } = useWindowSize();
	const { addItemToCart } = useCart();
	const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
	const [quantity, setQuantity] = useState(1);
	const [isSelected, setIsSelected] = useState(false);
	const [selectedSize, setSelectedSize] = useState("");
	const [selectedColor, setSelectedColor] = useState("");
	const [isSizeSelected, setIsSizeSelected] = useState(false);
	const [colorArray, setColorArray] = useState([]);
	const [isColorSelected, setIsColorSelected] = useState(false);
	const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

	const selected_product = PRODUCT.getProduct.find(item => {
		if(item.product_id == router.query.slug){
			return item;
		}
	})

	if (PRODUCT.loading) return <p>Loading...</p>;

	function addToCartHandler(){
		if (!isSelected) return;

		toast("Added to the bag", {
			progressClassName: "fancy-progress-bar",
			position: width > 768 ? "bottom-right" : "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});	

		dispatch(addToCart(selected_product, selectedColor, selectedSize, quantity, selected_product.net_price, 1))
	}

	const gallery = [
		{
		  "id": 1,
		  "thumbnail": "https://kiaasa.com/wp-content/uploads/2021/03/IMG_0949_-2-450x585.jpg",
		  "original": "https://kiaasa.com/wp-content/uploads/2021/03/IMG_0949_-2-450x585.jpg"
		},
		{
		  "id": 2,
		  "thumbnail": "https://kiaasa.com/wp-content/uploads/2020/10/IMG_0521_-450x585.jpg",
		  "original": "https://kiaasa.com/wp-content/uploads/2020/10/IMG_0521_-450x585.jpg"
		},
		{
		  "id": 3,
		  "thumbnail": "https://kiaasa.com/wp-content/uploads/2020/10/IMG_0521_-450x585.jpg",
		  "original": "https://kiaasa.com/wp-content/uploads/2020/10/IMG_0521_-450x585.jpg"
		},
		{
		  "id": 4,
		  "thumbnail": "https://kiaasa.com/wp-content/uploads/2021/03/IMG_0949_-2-450x585.jpg",
		  "original": "https://kiaasa.com/wp-content/uploads/2021/03/IMG_0949_-2-450x585.jpg"
		}
	]

	const metaData = [
		{
		  "id": 1,
		  "title": "Product Details",
		  "content": "This is product detail"
		},
		{
		  "id": 2,
		  "title": "Additional Information",
		  "content": "This is product additional information"
		},
		{
		  "id": 3,
		  "title": "Customer Reviews",
		  "content": "This is customer reviews"
		}
	]

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


	return (
		<div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
			{width < 1025 ? (
				<Carousel
					pagination={{
						clickable: true,
					}}
					breakpoints={productGalleryCarouselResponsive}
					className="product-gallery"
					buttonGroupClassName="hidden"
				>
					{/* {data?.gallery?.map((item, index: number) => (
						<SwiperSlide key={`product-gallery-key-${index}`}>
							<div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
								<img
									src={
										item?.original ??
										"/assets/placeholder/products/product-gallery.svg"
									}
									alt={`${data?.name}--${index}`}
									className="object-cover w-full"
								/>
							</div>
						</SwiperSlide>
					))} */}

					{/* {gallery.map((item, index: number) => (
						<SwiperSlide key={`product-gallery-key-${index}`}>
							<div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
								<img
									src={
										item?.original ??
										"/assets/placeholder/products/product-gallery.svg"
									}
									alt={`${data?.name}--${index}`}
									className="object-cover w-full"
								/>
							</div>
						</SwiperSlide>
					))} */}
				</Carousel>
			) : (
				<div className="col-span-5 grid grid-cols-2 gap-2.5">
					{gallery.map((item, index: number) => (
						<div
							key={index}
							className="col-span-1 transition duration-150 ease-in hover:opacity-90"
						>
							<img
								src={
									item?.original ??
									"/assets/placeholder/products/product-gallery.svg"
								}
								// alt={`${data?.name}--${index}`}
								className="object-cover w-full"
							/>
						</div>
					))}
				</div>
			)}

			<div className="col-span-4 pt-8 lg:pt-0">
				<div className="pb-7 mb-7 border-b border-gray-300">
					<h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
						{selected_product.product_name}
					</h2>
					<p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
						{selected_product.product_description}
					</p>
					<div className="flex items-center mt-5">
						<div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
							₹{selected_product.net_price}
						</div>
						{selected_product.discount_percent > 0 && (
							<span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
								₹{selected_product.sale_price}
							</span>
						)}
					</div>
				</div>

				<div className="pb-3 border-b border-gray-300">
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
											className={cn("cursor-pointer rounded border border-gray-100 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
												{
													"border-black": item.size_id == selectedSize,
												}
											)}
											onClick={() => select_size(item)}
										>
											{item.size_name}
										</li>
									);
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
											className={cn("cursor-pointer rounded border border-gray-100 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
												{
													"border-black": item.color_id === selectedColor,
												}
											)}
											onClick={() => select_color(item)}
										>
											{item.color_name}
										</li>
									);
								})
							}
						</ul>
					</div>
				</div>

				<div className="flex items-center space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48 border-b border-gray-300 py-8">
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
						variant="slim"
						className={`w-full md:w-6/12 xl:w-full ${
							!isSelected && "bg-gray-400 hover:bg-gray-400"
						}`}
						disabled={!isSelected}
						loading={addToCartLoader}
					>
						<span className="py-2 3xl:px-8">Add to cart</span>
					</Button>
				</div>

				<div className="py-6">
					<ul className="text-sm space-y-5 pb-1">
						<li>
							<span className="font-semibold text-heading inline-block pe-2">
								SKU:
							</span>
							{selected_product.product_sku}
						</li>
						<li>
							<span className="font-semibold text-heading inline-block pe-2">
								Category:
							</span>
							{selected_product.category_name}
						</li>
						<li>
							<span className="font-semibold text-heading inline-block pe-2">
								Type	:
							</span>
							{selected_product.subcategory_name}
						</li>
					</ul>
				</div>

				<ProductMetaReview data = {metaData}/>
			</div>
		</div>
	);
};

export default ProductSingleDetails;
