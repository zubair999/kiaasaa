import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { CheckBox } from "@components/ui/checkbox";
import { RadioBox } from "@components/ui/radiobox";
import Button from "@components/ui/button";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui.context";
import Link from "@components/ui/link";
import cn from "classnames";


import { fetchCustomerAddress, selectAddress } from "../../Store/Action/Index"

interface CheckoutInputType {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	zipCode: string;
	save: boolean;
	note: string;
}

const CheckoutForm: React.FC = () => {
	const dispatch = useDispatch()

	const CUSTOMER = useSelector(state => state.Customer)
	const ADDRESS = useSelector(state => state.Address)
	const CART = useSelector(state => state.Cart)
	const { t } = useTranslation();
	const { mutate: updateUser, isLoading } = useCheckoutMutation();
	const { register, handleSubmit, formState: { errors },} = useForm<CheckoutInputType>();

	const [selectedAddress, setSelectedAddress] = useState(ADDRESS.getAddress.length == 0 ? '' : ADDRESS.getAddress[0].address_id);

	console.log(ADDRESS);
	const {
		// openSidebar,
		// setDrawerView,
		// openSearch,
		openModal,
		setModalView,
		isAuthorized,
	} = useUI();

	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;

	function handleLogin() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}  
	useEffect(() => {
		dispatch(fetchCustomerAddress(CUSTOMER.getCustomer.id, token))
	}, [ADDRESS.isNewAddressAdded])

	function onSubmit(input: CheckoutInputType) {
		// updateUser(input);
		CUSTOMER.isAuthorized ? Router.push(ROUTES.ORDER) : handleLogin()
		console.log("order place")
	}

	const AddressCard = ({ options, selected, onChange }) => {
		const AddressListCard = (item, index) =>  {
			return ( 
				<div className="flex p-4 rounded-md mt-1 md:mt-1 xl:mt-2 bg-gray-150 text-sm font-semibold text-heading">
					<label  key={index} className="group flex items-center text-heading text-sm cursor-pointer">
						<input
							type="radio"
							className="form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading"
							value={item.address_id}
							key={index}
							checked={CART.addressId == item.address_id}
							onChange={onChange}						
						/>
						<span className="ms-2 text-sm text-heading relative">
							{item.address}
						</span>
					</label>
				</div>
			)
		};
		if(ADDRESS.loading){
			return null
		}
		else{
			return (
				<div className="address_block pt-6 md:pt-0 2xl:ps-4">
					{ options?.map(AddressListCard) }
				</div>
			)
		}
	}

	const onRadioChange = (e) => {
		setSelectedAddress(e.target.value);
		dispatch(selectAddress(e.target.value))	
	}

	return (
		<>
			<h2 className="shiping_address text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-shipping-address")}
			</h2>
			<form
				// onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				// noValidate
			>
				<div className="flex mt-4 flex-col space-y-4 lg:space-y-5">
					{
							Object.keys(CUSTOMER.getCustomer).length == 0 ?
							<span>Pleaes sign in to view saved address.</span>
							:
							<AddressCard options={ADDRESS.getAddress} onChange={(e) => onRadioChange(e)} selected={selectedAddress} />
					}

					<div className="flex w-full">
						{
							CUSTOMER.isAuthorized ?
								<Link
									href={"/checkout"}
									className={cn(
										"w-half px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300 hover:bg-gray-600",
										{
											"cursor-not-allowed bg-gray-400 hover:bg-gray-400":  0 ,
										}
									)}
								>
									<span className="w-full pe-5 -mt-0.5 py-0.5">
										{t("text-continue")}
									</span>
								</Link>
								:
								null
						}
					</div>					
				</div>
			</form>
		</>
	);
};

export default CheckoutForm;



