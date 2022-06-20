import { useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { useUI } from "@contexts/ui.context";

import { ColorFilter } from "./color-filter";
import { SizeFilter } from "./size-filter";
import { PriceFilter } from "./price-filter";

import { fetchProductByStore } from '../../Store/Action/Index';

import { useTranslation } from "next-i18next";


export const ShopFilters: React.FC = () => {
	const [page, setPage] = useState(0);
	const COLOR_ID = useSelector(state => state.Filter.color);
	const MINVALUE = useSelector(state => state.Filter.minValue);
	const MAXVALUE = useSelector(state => state.Filter.maxValue);
	const SIZE_ID = useSelector(state => state.Filter.sizeId);
	const { query: { slug }, } = useRouter();
	const dispatch = useDispatch();

	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;

	const { query } = useRouter();
	const { t } = useTranslation("common");	
	let { closeFilter } = useUI();

	const selectedColor = COLOR_ID;
	const minVal = MINVALUE;
	const maxVal = MAXVALUE;
	const selectedSize = SIZE_ID;


	const newSlug = query.slug;
	const selectedColor2 = "";
	const minVal2 = "";
	const maxVal2 = "";
	const selectedSize2 = "";

	const applyAllFilters = () =>{
		// console.log('slug:', slug, 'colorid:',COLOR_ID, "minval:", MINVALUE, "maxval:",MAXVALUE, 'sizeid:', SIZE_ID);	
		dispatch(fetchProductByStore(slug, minVal, maxVal, selectedColor, selectedSize, page, token));
	}
	const removeAllFilters = () =>{	
		dispatch(fetchProductByStore(newSlug, minVal2, maxVal2, selectedColor2, selectedSize2, page, token));
	}

	return (
	<>
		<div className="pt-1">
			{/* <div className="block border-b border-gray-300 pb-7 mb-7">
				<div className="flex items-center justify-between mb-2.5">
					<h2 className="font-semibold text-heading text-xl md:text-2xl">
						{t("text-filters")}
					</h2>
				</div>
			</div> */}
			<PriceFilter />
			<ColorFilter />
			<SizeFilter />				
		</div>
			<div onClick={closeFilter}>
				<button 
					className="applyBtn bg-gray-900 mt-5 mb-10 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
					style={{'fontSize':'13px'}}
					onClick={applyAllFilters}
					>
					Apply Filters
				</button>
				
				<button 
				className="applyBtn bg-gray-900 mt-5 ml-4 mb-10 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
				style={{'fontSize':'13px'}}
				onClick={removeAllFilters}
				>
				Remove Filters
				</button>
			</div>
		
	</>
	);
};
