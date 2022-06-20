import react, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOrderQuery } from "@framework/order/get-order";
import usePrice from "@framework/product/use-price";
import { OrderItem } from "@framework/types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { roundOffTwo } from "../../Constants/index"
import { fetchOrderDetail } from "../../Store/Action/Index"

const OrderItemCard = ({ product }: { product: OrderItem }) => {
	const { price: itemTotal } = usePrice({
		amount: product.price * product.quantity,
		currencyCode: "USD",
	});


	return (
		<tr
			className="border-b font-normal border-gray-300 last:border-b-0"
			key={product.id}
		>
			<td className="p-4">
				{product.name} * {product.quantity}
			</td>
			<td className="p-4">{itemTotal}</td>
		</tr>
	);
};


const ProductDetails: React.FC<{ className?: string }> = ({
	className = "pt-10 lg:pt-12",
}) => {

	const dispatch = useDispatch();

	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;
	
	const { query: { id }, } = useRouter();
	const { t } = useTranslation("common");
	const { data: order, isLoading } = useOrderQuery(id?.toString()!);
	const { price: subtotal } = usePrice(
		order && {
			amount: order.total,
			currencyCode: "USD",
		}
	);
	const { price: total } = usePrice(
		order && {
			amount: order.shipping_fee
				? order.total + order.shipping_fee
				: order.total,
			currencyCode: "USD",
		}
	);
	const { price: shipping } = usePrice(
		order && {
			amount: order.shipping_fee,
			currencyCode: "USD",
		}
	);

	const ORDER = useSelector(state => state.Order)
	
	const selected_order = ORDER.getOrder.orders_list.find(item => {
		if(item.order_id == id){
			return item
		}
	})

	useEffect(() => {
		if(Object.keys(selected_order).includes('order_detail') == false){
			dispatch(fetchOrderDetail(selected_order.order_id, token))
		}
	}, [])

	console.log(selected_order.order_detail)


	if (ORDER.loading) return <p>Loading...</p>;


	return (
		<div className={className}>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-order-details")}:
			</h2>
			<table className="w-full text-heading font-semibold text-sm lg:text-base">
				<thead>
					<tr>
						<th className="bg-gray-150 p-4 text-start first:rounded-ts-md w-1/2">
							{t("text-product")}
						</th>
						<th className="bg-gray-150 p-4 text-start last:rounded-te-md w-1/2">
							{t("text-total")}
						</th>
					</tr>
				</thead>
				<tbody>
					{order?.products.map((product, index) => (
						<OrderItemCard key={index} product={product} />
					))}
				</tbody>
				<tfoot>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-order-number")}:</td>
						<td className="p-4">{Object.keys(selected_order).includes('order_detail') == true ? selected_order.order_detail.order_no : null}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-customer")}:</td>
						<td className="p-4">
							{shipping}
							<span className="text-[13px] font-normal ps-1.5 inline-block">
								{Object.keys(selected_order).includes('order_detail') == true ? selected_order.order_detail.customer_name : null}
							</span>
						</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-address")}:</td>
						<td className="p-4">{Object.keys(selected_order).includes('order_detail') == true ? selected_order.order_detail.address : null}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-store")}:</td>
						<td className="p-4">{Object.keys(selected_order).includes('order_detail') == true ? selected_order.order_detail.store_name : null}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-total")}:</td>
						<td className="p-4">{Object.keys(selected_order).includes('order_detail') == true ? roundOffTwo(selected_order.order_detail.total_price) : null}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-note")}:</td>
						<td className="p-4">new order</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default ProductDetails;
