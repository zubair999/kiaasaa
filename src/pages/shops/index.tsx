import react, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Layout from "@components/layout/layout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@components/ui/container";
import Subscription from "@components/common/subscription";
import ShopsPageContent from "@components/shops/shops-page-content";
import { fetchStore } from "../../Store/Action/Store/StoreAction"

export default function ShopsPage() {
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(fetchShop());
	// }, []);

	const SHOP = useSelector(state => state)

	return (
		<>
			<ShopsPageContent />
			<Container>
				<Subscription />
			</Container>
		</>
	);
}

ShopsPage.Layout = Layout;

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
