import react, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";

import { roundOffTwo } from "../../Constants/index"
import { fetchOrder } from "../../Store/Action/Index"

const OrdersTable: React.FC = () => {
	const dispatch = useDispatch()
	const { width } = useWindowSize();
	const { t } = useTranslation("common");
	
	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;

	const CUSTOMER = useSelector(state => state.Customer)
	const ORDER = useSelector(state => state.Order)

	useEffect(() => {
		if(ORDER.isInitialFetch){
			dispatch(fetchOrder(CUSTOMER.getCustomer.id, token))
		}
	}, [])

	const TableHead = () => {
		return (
			<tr>
				<th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
					{t("text-order")}
				</th>
				<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
					{t("text-date")}
				</th>
				<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
					{t("text-status")}
				</th>
				<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
					{t("text-total")}
				</th>
				<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
					{t("text-actions")}
				</th>
			</tr>
		)
	}

	const OrderTableView = props => {
		const order_list = props.order;

		if(props.order.length == 0){
			return null
		}
		else{
			return order_list.map(item => {
				return (
					<tr className="border-b border-gray-300 last:border-b-0">
						<td className="px-4 py-5 text-start">
							<Link
								href={`/my-account/orders/${item.order_id}`}
								className="underline hover:no-underline text-body"
							>
								#{item.order_id}
							</Link>
						</td>
						<td className="text-start lg:text-center px-4 py-5 text-heading">
							{item.created_at}
						</td>
						<td className="text-start lg:text-center px-4 py-5 text-heading">
							Completed
						</td>
						<td className="text-start lg:text-center px-4 py-5 text-heading">
							₹{roundOffTwo(item.total_price)}
						</td>
						<td className="text-end px-4 py-5 text-heading">
							<Link
								href={`/my-account/orders/${item.order_id}`}
								className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
							>
								{t("button-view")}
							</Link>
							<div className="m-1"></div>
							{/* <Link
								href={`/order/product/${item.order_id}`}
								className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
							>
								{t("button-product")}
							</Link> */}
						</td>
					</tr>
				)
			})

		}

	}

	const OrderListView = props => {
		const order_list = props.order;

		if(props.order.length == 0){
			return null
		}
		else{
			return order_list.map((item) => {
				return (
					<ul className="text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5">
						<li className="flex items-center justify-between">
							{t("text-order")}
							<span className="font-normal">
								<Link
									href={`/my-account/orders/${item.order_id}`}
									className="underline hover:no-underline text-body"
								>
									#{item.order_id}
								</Link>
							</span>
						</li>
						<li className="flex items-center justify-between">
							{t("text-date")}
							<span className="font-normal">{item.created_at}</span>
						</li>
						<li className="flex items-center justify-between">
							{t("text-status")}
							<span className="font-normal">Completed</span>
						</li>
						<li className="flex items-center justify-between">
							{t("text-total")}
							<span className="font-normal">₹{roundOffTwo(item.total_price)}</span>
						</li>
						<li className="flex items-center justify-between">
							{t("text-actions")}
							<span className="font-normal">
								<Link
									href={`/my-account/orders/${item.order_id}`}
									className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
								>
									{t("button-view")}
								</Link>
							</span>
						</li>
					</ul>
				)
			})
		}
	}

	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-orders")}
			</h2>
			<motion.div
				layout
				initial="from"
				animate="to"
				exit="from"
				//@ts-ignore
				variants={fadeInTop(0.35)}
				className={`w-full flex flex-col`}
			>
				{width >= 1025 ? (
					<table>
						<thead className="text-sm lg:text-base">
							<TableHead />
						</thead>
						<tbody className="text-sm lg:text-base">
							{
								ORDER.loading ? <div>Loading...</div>
								:
								<OrderTableView order={ORDER.getOrder}/>
							}
						</tbody>
					</table>
				) : (
					<div className="w-full space-y-4">
							{
								ORDER.loading ? <div>Loading...</div>
								:
								<OrderListView  order={ORDER.getOrder}/>
							}
					</div>
				)}
			</motion.div>
		</>
	);
};

export default OrdersTable;
