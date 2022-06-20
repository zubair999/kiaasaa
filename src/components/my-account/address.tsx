import react, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";

import { roundOffTwo } from "../../Constants/index"
import { fetchOrder, fetchCustomerAddress } from "../../Store/Action/Index"

const Address: React.FC = () => {
	const dispatch = useDispatch()
	const { width } = useWindowSize();
	const { t } = useTranslation("common");

	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;

	const CUSTOMER = useSelector(state => state.Customer)
	const ORDER = useSelector(state => state.Order)
	const ADDRESS = useSelector(state => state.Address)

	useEffect(() => {
		if(ORDER.isInitialFetch){
			dispatch(fetchOrder(CUSTOMER.getCustomer.id, token))
		}
		dispatch(fetchCustomerAddress(CUSTOMER.getCustomer.id, token))
	}, [])

	const TableHead = () => {

		return (
			<tr>
				<th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
					{t("text-srno")}
				</th>
				<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
					{t("text-address")}
				</th>
			</tr>
		)
	}

	const AddressListCardTableView = props => {
		const address_list = props.address;
		console.log("props table",props);
		if(props.address.length == 0){
			return null
		}
		else{
			return address_list.map((item, index) => {
				return (
					<tr className="border-b border-gray-300 last:border-b-0">
						<td className="text-start lg:text-center px-4 py-5 text-heading">
						 	#{index+1}
						</td>
						<td className="text-start lg:text-center px-4 py-5 text-heading">
						 	Address: {item.address}, {item.city_name}, <br /> Postal Code: {item.postal_code}, <br /> State: {item.state_name}
						</td>
					</tr>
				)
			})
		}
	}

	const AddressListCardListView = props => {
		console.log("props list",props);
		const address_list = props.address;

		if(props.address.length == 0){
			return null
		}
		else{
			return address_list.map((item, index) => {
				return (
					<ul className="text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5">
						<li className="flex items-center justify-between">
							{t("text-srno")}
							<span className="font-normal">#{index+1}</span>
						</li>
						<li className="flex items-center justify-between">
							{t("text-address")}
							<span className="font-normal">Address: {item.address}, {item.city_name}, <br /> Postal Code: {item.postal_code}, <br /> State: {item.state_name}</span>
						</li>
					</ul>
				)
			})
		}
	}

	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-address")}
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
								ADDRESS.loading ? <div>Loading...</div>
								:
								<AddressListCardTableView address={ADDRESS.getAddress}/>
							}
						</tbody>
					</table>
				) : (
					<div className="w-full space-y-4">
							{
								ADDRESS.loading ? <div>Loading...</div>
								:
								<AddressListCardListView  address={ADDRESS.getAddress}/>
							}
					</div>
				)}
			</motion.div>
		</>
	);
};

export default Address;
