import Input from "@components/ui/input";
import { useDispatch, useSelector} from 'react-redux';
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import { ImGoogle2, ImFacebook2 } from "react-icons/im";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { customerLogin } from "../../Store/Action/Auth/LoginAction";

const LoginForm: React.FC = () => {
	const dispatch = useDispatch()
	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;
	const Router = useRouter();
	const CUSTOMER = useSelector(state => state.Customer)
	// const LOCALTOKEN = useSelector(state => state.LocalToken);
	// const LocalStorageToken = LOCALTOKEN.localToken;
	const { t } = useTranslation();
	const { setModalView, openModal, closeModal } = useUI();
	const { mutate: login, isLoading } = useLoginMutation();

	const {register, handleSubmit, formState: { errors }, } = useForm<LoginInputType>();

	function onSubmit({ email, password, remember_me }: LoginInputType) {
		const customerData =  JSON.stringify({
			email: email,
			password: password
		});
		dispatch(customerLogin(customerData,token))
	}

	if(CUSTOMER.isAuthorized){
		Router.reload()
		// Router.push('/');
	}

	function handleSignUp() {
		setModalView("SIGN_UP_VIEW");
		return openModal();
	}

	function handleForgetPassword() {
		setModalView("FORGET_PASSWORD");
		return openModal();
	}
	let custmorMsg:any;
	if(CUSTOMER.message == 'Customer does not exists'){
		custmorMsg = true;
	}else{
		custmorMsg = false;
	}

	return (
		<div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
			<div className="text-center mb-6 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					{t("common:login-helper")}
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-3.5">
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
					{/* <div className="flex items-center justify-center">
						<div className="flex ms-auto">
							<button
								type="button"
								onClick={handleForgetPassword}
								className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
							>
								{t("common:text-forgot-password")}
							</button>
						</div>
					</div> */}
					<div className="relative">
						<Button
							type="submit"
							loading={false}
							disabled={false}
							className="h-11 md:h-12 w-full mt-1.5"
						>
							{t("common:text-login")}
						</Button>
						{custmorMsg ?<div style={{'color':'red', 'fontSize':'15px', 'justifyContent':'center', 'display':'flex', 'marginTop':'10px'}}>
							{CUSTOMER.message}
						</div> : '' }						
					</div>
				</div>
			</form>
			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				{t("common:text-no-account")}{" "}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignUp}
				>					{t("common:text-register")}
				</button>
			</div>
		</div>
	);
};

export default LoginForm;
