import { useSelector } from "react-redux";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import PageHeader from "@components/ui/page-header";
import CheckoutForm from "@components/checkout/checkout-form";
import CheckoutCard from "@components/checkout/checkout-card";
import AddAddressForm from "@components/checkout/add-address-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";


export default function CheckoutPage() {
	const Router = useRouter();
	const CUSTOMER = useSelector(state => state.Customer)

	if(CUSTOMER.isAuthorized){
		return (
			<>
				{/* <PageHeader pageHeader="text-page-checkout" /> */}
				<Container>
					<div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
						<div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
							<CheckoutForm />
						</div>
						<div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5 mr-5">
							<CheckoutCard />
						</div>
						{/* {
							CUSTOMER.isAuthorized == true ?
							<div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
								<AddAddressForm />
							</div>
							:
							null
						} */}
						
						
						
						
					</div>
					<Subscription />
				</Container>
			</>
		);
	}
	else{
		Router.replace("/address");
		return null
	}
}

CheckoutPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
