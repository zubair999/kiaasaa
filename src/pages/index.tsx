import react, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from "@components/ui/container";
import HeroSlider from "@containers/hero-slider";
import Layout from "@components/layout/layout";
import { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { homeSixCoupons as banner } from "@framework/static/banner";
import SaleBannerGrid from "@containers/sale-banner-grid";
import BannerCard from "@components/common/banner-card";
import StoreGridBlock from "@containers/store-grid-block";
import TestimonialCarousel from "@containers/testimonial-carousel";
import LowerBanner from "@components/common/lower-banner";
import { homeSixHeroSlider as banners } from "@framework/static/banner";
import { fetchStore, fetchState, currentLangLong, fetchCoordinates} from "../Store/Action/Index"
import ExclusiveBlock from "@containers/exclusive-block";
// import moment from 'moment';

import { fetchToken, getTokenFromLocal } from '../Store/Action/Index'

export default function Home() {

	const dispatch = useDispatch()

	// useMemo(()=> {
	// 	return dispatch(fetchToken());
	//   }, [])
	
	const token = useSelector(state=>state.Customer)

	// console.log('666',token);

	// const actualToken = token.getToken.api_token;
	// const tokenTime = token.getToken.api_token_created_at;

	// localStorage.setItem('Token', actualToken);
	// localStorage.setItem('Time', tokenTime);



	const localStorage_Token = localStorage.getItem('Token');
	const localStorage_Time = localStorage.getItem('Time');
	
	// console.log('token','time', localStorage_Token, localStorage_Time);

	const tokenCreatedTime = localStorage_Time == null||undefined ? "" : localStorage_Time.slice(0,10);

	

	var curDate = new Date();   
	var createDate = new Date(tokenCreatedTime);   
		
	var diff = curDate.getTime() - createDate.getTime();
		
	var daydiff = Math.floor(diff / 1000 / 60 / (60 * 24));  	
	
	console.log('daydiff : ', daydiff);

	let isExpired:Boolean;

	if(daydiff == 0){
		isExpired = false;
	}else{
		isExpired = true;
	}

	useEffect(() => {		
		// dispatch(fetchToken());
		dispatch(getTokenFromLocal(localStorage_Token,localStorage_Time))
		// dispatch(fetchCoordinates())	
		// getUserLocation();
		if(localStorage_Token == "" || localStorage_Token == null || localStorage_Token == undefined){
			console.log('fetch token 1');
			dispatch(fetchToken());
			setInterval(() => {
				window.location.reload();
			  }, 1000)
			
		} else if(localStorage_Token && isExpired == true) {
			console.log("fetch token 2")
			dispatch(fetchToken());
		} else if(localStorage_Token && isExpired == false){
			dispatch(fetchStore(localStorage_Token));
			console.log("fetch store 3")
		} 
	}, []);

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	
	return (
		<>
			<Container>
				<HeroSlider data={banners} buttonGroupClassName="hidden" />
				<SaleBannerGrid />			
				<StoreGridBlock
					sectionHeading="text-our-store"
					limit={8}
					variant="4column"			
				/>
				{/* <BannerCard
					key={`banner--key${banner.id}`}
					banner={banner}
					href={`${ROUTES.HOME}`}
					className="mb-11 md:mb-12 lg:mb-14 2xl:mb-16"
				/> */}
				<BannerCard
					key={`banner--key${banner.id}`}
					banner={banner}
					href={`${ROUTES.HOME}`}
					className="mb-11 md:mb-12 lg:mb-14 2xl:mb-16"			
					effectActive={true}
				/>
				<ExclusiveBlock className="mb-12 md:mb-14 xl:mb-16 px-2.5 mx-auto max-w-[1920px]" />
				<TestimonialCarousel sectionHeading="text-testimonial" />
				<LowerBanner />
			</Container>
		</>
	);
}

Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const queryClient = new QueryClient();

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
		revalidate: 60,
	};
};