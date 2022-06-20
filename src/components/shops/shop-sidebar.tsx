import { useState, useEffect} from "react";
import * as React from 'react';
import Text from "@components/ui/text";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	FacebookIcon,
	LinkedinIcon,
	TwitterIcon,
} from "react-share";
import { useTranslation } from "next-i18next";
import { fetchProductByStore } from '../../Store/Action/Index';
import {ColorFilter} from "../shop/color-filter";

interface ShopSidebarProps {
	data: any;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ data }) => {

	const dispatch = useDispatch();
	const { query: { slug }, } = useRouter();
	const { t } = useTranslation("common");

	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;

	const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.SHOPS}/${slug}`;
	const [follow, setFollow] = useState(Boolean(false));
	const [minVal, setminVal] = useState(0);
	const [maxVal, setmaxVal] = useState(4000);


	const [selectedColor, setselectedColor] = useState('');
	const [selectedSize, setselectedSize] = useState('');
	const [page, setPage] = useState(0);


	const changeRangeMax = (e:any) =>{
		setmaxVal(parseInt(e.target.value));
		// console.log(maxVal);
	}
	const changeRangeMin = (e:any) =>{
		setminVal(parseInt(e.target.value));
		// console.log(minVal);
	}

	const followHandel = () => {
		return setFollow(!follow);
	};
	const shareHandel = () => {
		return console.log(shareUrl);
	};
	useEffect(() => {
		getSizeData();
	}, [sizeData]);

const progress1 = `${minVal/5000 * 100}%`;
const progress11 = `${minVal/10000 * 100}%`;
const progress2 = `${100 - (maxVal/5000 * 100)}%`;
const progress22 = `${85 - (maxVal/5000 * 100)}%`;

const applyPriceFilter = () =>{
	console.log(minVal, maxVal, slug)
	dispatch(fetchProductByStore(slug, minVal, maxVal, selectedColor, selectedSize, page, token));
}

	return (
		<div className="flex flex-col pt-10 lg:pt-14 px-6">
			<div className="text-center w-full border-b border-gray-300 pb-8">
				<div className="w-32 lg:w-auto h-32 lg:h-auto mx-auto">				
				</div>
				<Text variant="heading" className="mt-6 mb-1.5">
					{data?.store_name}
					<Text>{data?.address_line2}</Text>
				</Text>
				<Text>{data?.description}</Text>
				<div className="flex items-center flex-wrap justify-center space-s-2 pt-4 mt-0.5">
					<FacebookShareButton url={shareUrl}>
						<FacebookIcon
							size={25}
							round
							className="transition-all hover:opacity-90"
						/>
					</FacebookShareButton>
					<TwitterShareButton url={shareUrl}>
						<TwitterIcon
							size={25}
							round
							className="transition-all hover:opacity-90"
						/>
					</TwitterShareButton>
					<LinkedinShareButton url={shareUrl}>
						<LinkedinIcon
							size={25}
							round
							className="transition-all hover:opacity-90"
						/>
					</LinkedinShareButton>
				</div>
			</div>
			<div className="space-y-6 py-7">
				<div className="block">
					<h4 className="text-heading font-semibold text-sm mb-1.5">
						{t("text-address")}:
					</h4>
					<Text>{data?.address_line1}</Text>
				</div>
				<div className="block">
					<h4 className="text-heading font-semibold text-sm mb-1.5">
						{t("text-phone")}:
					</h4>
					<div className="flex items-center justify-between">
						<Text>{data?.phone_no}</Text>
						<button className="font-semibold text-sm text-heading transition-all hover:opacity-80 flex-shrink-0">
							{t("text-call-now")}
						</button>
					</div>
				</div>			
			</div>

			<div className="relative pt-1">			
				<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				Select Price Range
			    </h3>
				<div style={{display:"flex"}}>
					<div className="sliderVal1" style={{left:progress11}}>
					<span>{minVal}<b>Rs.</b></span>
					</div>
					<div className="sliderVal1" style={{right:progress22}}>
					<span>{maxVal}<b>Rs.</b></span>
					</div>
				</div>
				<div className="slider">
					<div className="progress" style={{left:progress1, right:progress2}}></div>
				</div>
				<div className="range-input">
				<input
					type="range"				
					className="
					form-range		
					w-full
					h-6
					p-0
					bg-transparent
					focus:outline-none focus:ring-0 focus:shadow-none
					"
					id="customRange1"
					min={0}
					max={5000}
					value={minVal}
					onChange={changeRangeMin}
				/>
				<input
					type="range"
					className="
					form-range		
					w-full
					h-6
					p-0
					bg-transparent
					focus:outline-none focus:ring-0 focus:shadow-none
					"
					id="customRange1"
					min={0}
					max={5000}	
					value={maxVal}
					onChange={changeRangeMax}				
				/>
				</div>
				<button 
				className="applyBtn bg-blue-500 mt-8 mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={applyPriceFilter}
				>
					Apply Price Filter
			    </button>

				<div className="thin_line"></div>
				<ColorFilter/>				
			</div>
	
		</div>
	);
};

export default ShopSidebar;
