import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import Address from "@components/my-account/add-address";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function AddressPage() {
	return (
		<AccountLayout>
			<Address />
		</AccountLayout>
	);
}

AddressPage.Layout = Layout;

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
