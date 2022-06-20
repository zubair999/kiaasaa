import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { customerRegister } from "../../Store/Action/Auth/RegisterAction"

const SignUpForm: React.FC = () => {
	const dispatch = useDispatch()
	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;
	const CUSTOMER = useSelector(state => state.Customer)
	
	//    console.log('CUSTOMER', CUSTOMER); 

	const [value, setValue] = useState("")
	const [checkNumber, setcheckNumber] = useState(false)
	const { t } = useTranslation();
	const Router = useRouter();

	// const { mutate: signUp, isLoading } = useSignUpMutation();
	const { setModalView, openModal, closeModal } = useUI();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpInputType>();

	function handleSignIn() {	
		setModalView("LOGIN_VIEW");	
		return openModal();
	}

	function onSubmit({ name, email, password, phone }: SignUpInputType) {

		if(CUSTOMER.status == "fail"){
			setcheckNumber(true);			
		}	
		const customerData = JSON.stringify({
			name:name,
			email:email,
			password:password,
			phone_no:phone,
			salutation:value
		})

		dispatch(customerRegister(customerData, token))
	}

	if(CUSTOMER.isAuthorized){
		Router.reload()
	}

	const handleChange = (event) => {
		setValue(event.target.value)
	}

    const closeit = () =>{		
		setcheckNumber(false);	
	}

	const DropDown = ({ name, value, handleChange }) => (
		<div className="flex justify-center">
			<div className="mb-3 xl:w-96">
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
				focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
					<option selected>Salutation</option>
					<option value="Mr">Mr</option>
					<option value="Mrs">Mrs</option>
					<option value="Miss">Miss</option>
				</select>
			</div>
		</div>
	)

	return (
		<div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			<div className="text-center mb-6 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					{t("common:registration-helper")}
					<Link
						href={ROUTES.TERMS}
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						{t("common:text-terms")}
					</Link>
					&amp;
					<Link
						href={ROUTES.POLICY}
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						{t("common:text-policy")}
					</Link>
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-4">	
					<DropDown name="salutation" value={value} handleChange={handleChange} />
					<Input
						labelKey="forms:label-name"
						type="text"
						variant="solid"
						{...register("name", {
							required: "forms:name-required",
						})}
						errorKey={errors.name?.message}
					/>
					<Input
						labelKey="forms:label-email"
						type="email"
						variant="solid"
						{...register("email", {
							required: `${t("forms:email-required")}`,
							pattern: {
								value:
									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: t("forms:email-error"),
							},
						})}
						errorKey={errors.email?.message}
					/>
					<Input
						labelKey="forms:label-phone"
						type="phone"
						variant="solid"
						{...register("phone", {
							required: `${t("forms:phone-required")}`,
							pattern: {
								value:
									/^[6789]\d{9}$/,
								message: t("forms:phone-required"),
							},
						})}
						errorKey={errors.phone?.message}
					/>
					{
						checkNumber ?
						<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
						  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
							<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>	
							<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
							
							<div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
								  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
									
									<svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
									  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
									</svg>
								  </div>
								  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Email or Password Already Exist</h3>
									<div className="mt-2">
									  <p className="text-sm text-gray-500">Please check the details you entered and try again...</p>
									</div>
								  </div>
								</div>
							  </div>
							  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">								
								<button onClick={closeit} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
							  </div>
							</div>
						  </div>
						</div>
						 : ""
					}
					<PasswordInput
						labelKey="forms:label-password"
						errorKey={errors.password?.message}
						{...register("password", {
							required: `${t("forms:password-required")}`,
							pattern: {
								value:
									/^[a-zA-Z0-9]{8,}$/,
								message: t("forms:password-required-min"),
							},
						})}
					/>
					<div className="relative">
						<Button
							type="submit"
							loading={CUSTOMER.loading}
							disabled={CUSTOMER.loading}
							className="h-11 md:h-12 w-full mt-2"
						>
							{t("common:text-register")}
						</Button>
					</div>
				</div>
			</form>
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					{t("common:text-or")}
				</span>
			</div>

			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				{t("common:text-have-account")}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignIn}
				>
					{t("common:text-login")}
				</button>
			</div>
		</div>
	);
};

export default SignUpForm;
