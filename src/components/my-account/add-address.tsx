import { useDispatch, useSelector } from "react-redux";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { useUpdateUserMutation, UpdateUserType } from "@framework/customer/use-update-customer";
import { RadioBox } from "@components/ui/radiobox";
import { useTranslation } from "next-i18next";
import { customerProfileUpdate } from "../../Store/Action/Index"

const defaultValues = {};
const AccountDetails: React.FC = () => {
	const dispatch = useDispatch()
	const CUSTOMER = useSelector(state => state.Customer)
	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;

	const { mutate: updateUser, isLoading } = useUpdateUserMutation();
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateUserType>({
		defaultValues,
	});

	function onSubmit(input: UpdateUserType) {
		const customerData =  JSON.stringify({
			salutation: CUSTOMER.getCustomer.salutation,
			customer_id: CUSTOMER.getCustomer.id,
			name: input.firstName,
			phone_no: input.phoneNumber
		})
		dispatch(customerProfileUpdate(customerData,token))
	}

	return (
		<motion.div
			layout
			initial="from"
			animate="to"
			exit="from"
			//@ts-ignore
			variants={fadeInTop(0.35)}
			className={`w-full flex flex-col`}
		>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("common:text-add-new")}
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 sm:space-y-5">

					<div>
						{
							CUSTOMER.status == "success" ?
							CUSTOMER.message
							:
							CUSTOMER.message
						}
					</div>
					<div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
						<Input
							labelKey="forms:label-first-name"
							{...register("firstName", {
								required: "forms:first-name-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.firstName?.message}
							defaultValue={CUSTOMER.getCustomer.customer_name}
						/>
						<Input
							type="tel"
							labelKey="forms:label-phone"
							{...register("phoneNumber", {
								required: "forms:phone-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.phoneNumber?.message}
							defaultValue={CUSTOMER.getCustomer.phone}
						/>
					</div>
					

					<div className="relative">
						<Button
							type="submit"
							loading={CUSTOMER.loading}
							disabled={CUSTOMER.loading}
							className="h-12 mt-3 w-full sm:w-32"
						>
							{t("common:button-save")}
						</Button>
					</div>
				</div>
			</form>
		</motion.div>
	);
};

export default AccountDetails;
