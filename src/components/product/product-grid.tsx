import react, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import type { FC } from "react";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { Product } from "@framework/types";

import { fetchProductByStore } from "../../Store/Action/Index"



interface ProductGridProps {
	className?: string;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
	const dispatch = useDispatch()
	
	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;

	const { query } = useRouter();
    // console.log(query)
	const PRODUCT = useSelector(state => state.Product)
	// console.log(PRODUCT);
	const [store, setStore] = useState(query.slug)
	const [minPrice, setMinPrice] = useState("")
	const [maxPrice, setMaxPrice] = useState("")
	const [page, setPage] = useState(1)
	const [color, setColor] = useState("")
	const [size, setSize] = useState("")

	console.log('333',color);

	useEffect(() => {
		dispatch(fetchProductByStore(store, minPrice, maxPrice, color, size, page, token));
	}, [page]);
	
	if (PRODUCT.status == "fail") return <p>{PRODUCT.status}</p>;

	return (
		<>
			<div
				className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
			>
				{
					PRODUCT.loading ? ( <ProductFeedLoader limit={20} uniqueKey="search-product" />) 
					: 
					PRODUCT.getProduct.length > 0 ?
					(
						PRODUCT.getProduct?.map((item) => (
							<ProductCard
								key={`product--key${item.product_id}`}
								product={item}
								variant="grid"
							/>))
					)
					:
					<div>No data found!</div>
				}
			</div>

			<div className="text-center pt-8 xl:pt-14">
				<Button
					loading={PRODUCT.loading}
					disabled={PRODUCT.loading}
					onClick={() => setPage((prev) => prev + 1)}
					variant="slim"
				>
					Load More
				</Button>
			</div>
		</>
	);
};
