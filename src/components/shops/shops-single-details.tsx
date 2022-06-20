import react, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDirection } from "@utils/get-direction";
import { useRouter } from "next/router";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ShopDetail from "@components/shop/shop-detail";
import { ShopFilters } from "@components/shop/filters";
import StickyBox from "react-sticky-box";
import { ProductGrid } from "@components/product/product-grid";
import SearchTopBar from "@components/shop/top-bar";
import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";



const ShopsSingleDetails: React.FC = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	
	const PRODUCT = useSelector(state => state.Product)
	const STORE = useSelector(state => state.Store)
	const selected_store = STORE.getStore?.find(item => {
		if(item.id == router.query.slug){
			return item;
		}
	})

	const [minPrice, setMinPrice] = useState()
	const [maxPrice, setMaxPrice] = useState()
	const [page, setPage] = useState(1)
	const [color, setColor] = useState()
	const [size, setSize] = useState()

	const {t} = useTranslation("common")

	const { locale } = useRouter();
	const dir = getDirection(locale);

console.log("selected_store",selected_store);

	return (
		<>
			<ShopDetail 
			name={selected_store.store_name}
			address={selected_store.address_line1}
			phone={selected_store.phone_no}
			/>
			<Container>
				<div className={`flex pt-8 pb-16 lg:pb-20`}>
					<div className="flex-shrink-0 pe-24 hidden lg:block w-96">
						<StickyBox offsetTop={50} offsetBottom={20}>
							<div className="pb-7">
								<BreadcrumbItems separator="/">
									<ActiveLink
										href={"/"}
										activeClassName="font-semibold text-heading"
									>
										<a>{t("breadcrumb-home")}</a>
									</ActiveLink>
									<ActiveLink
										href={ROUTES.SEARCH}
										activeClassName="font-semibold text-heading"
									>
										<a className="capitalize">{t("breadcrumb-search")}</a>
									</ActiveLink>
								</BreadcrumbItems>
							</div>
							<ShopFilters />
						</StickyBox>
					</div>

					<div className="w-full lg:-ms-9">
						<SearchTopBar />
						<ProductGrid />
					</div>
				</div>
				{/* <Subscription /> */}
			</Container>
		</>
	);
};

export default ShopsSingleDetails;
