import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
// import TextArea from "@components/ui/text-area";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui.context";
import { toast } from "react-toastify";
import { useWindowSize } from "@utils/use-window-size";



import { fetchState, addAddress } from "../../Store/Action/Index"
import { Console } from "console";

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
	const STATE = useSelector(state => state.State)
	

	const { width } = useWindowSize();


	const { t } = useTranslation();
	const { mutate: updateUser, isLoading } = useCheckoutMutation();
	const { register, handleSubmit, formState: { errors },} = useForm<CheckoutInputType>();
	const [address, setAddress] = useState([])
	const [value, setValue] = useState("")
	const [state, setState] = useState(STATE.getState)

	useEffect(() => {
		dispatch(fetchState(token))
	}, [])

	const handleChange = (event) => {
		setValue(event.target.value)
	}

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

	function onSubmit(input, e) {
		e.preventDefault();
		
		CUSTOMER.isAuthorized ? 
		toast("Address added", {
			progressClassName: "fancy-progress-bar",
			position: width > 768 ? "bottom-right" : "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		})
		:
		null

		const addressData = JSON.stringify({
			customer_id: CUSTOMER.isAuthorized == true ? CUSTOMER.getCustomer.id : null,
			address:input.address,
			city_name:input.city,
			postal_code:input.zipCode,
			state_id:value
		})

		CUSTOMER.isAuthorized ? dispatch(addAddress(addressData,token)) : handleLogin()
		
		// console.log();
	}

	const DropDown = ({ name, value, handleChange }) => {
		const OptionCard = (item, index) =>  {
			// console.log(item);
			return <option key={item.id} value={item.id}>{item.state_name}</option>;
		};
		
		return (

			<div className="w-full lg:w-1/2 select_state">
				<div className="">
					<label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">Select State</label>
					<select name={name} value={value} onChange={handleChange} required className="form-select appearance-none
					block
					w-full
					px-3
					py-1.5
					text-base
					font-normal
					text-gray-700
					bg-white bg-clip-padding bg-no-repeat
					border border-solid border-gray-300
					rounded
					transition
					ease-in-out
					m-0
					focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none h-12" aria-label="Default select example">
						<option selected>Select State</option>
						
						{state.map(OptionCard)}
					</select>
				</div>
			</div>
		)
	}

	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-add-new")}
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 lg:space-y-5">
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							labelKey="forms:label-address"
							{...register("address")}
							variant="solid"
							className="w-full lg:w-1/2 "
							errorKey={errors.address?.message}
						/>

						<Input
							labelKey="forms:label-city"
							{...register("city")}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
						/>
					</div>
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							labelKey="forms:label-postcode"
							{...register("zipCode")}
							variant="solid"
							className="w-full lg:w-1/2 "
						/>
						<DropDown name="salutation" value={value} handleChange={handleChange} />
					</div>
					<div className="flex w-full">						
						<Button
							className="w-full sm:w-auto"
							loading={ADDRESS.loading}
							disabled={ADDRESS.loading}
						>
							{t("common:button-add-new")}
						</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default CheckoutForm;
