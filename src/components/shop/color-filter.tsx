import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchColor, selectedColor } from "../../Store/Action/Index";
import { useRouter } from "next/router";
import { fetchProductByStore } from "../../Store/Action/Index"

export const ColorFilter = () => {

	const dispatch = useDispatch();

	const { query } = useRouter();

	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;

	const productStoreValues = {
		store:query.slug,
		minPrice:'',
		maxPrice: '',
		color:'',
		size:'',
		page:1
	}
	const {store, minPrice, maxPrice, color, size, page} = productStoreValues;
	
	useEffect(() => {
		dispatch(fetchColor(token));
	}, []);

	const COLOR = useSelector(state => state.Color);
	
	function handleItemClick(e:any) {
		dispatch(selectedColor(e.target.value));	
	}

	function selectNoneColor() {
		// dispatch(selectedColor(''));	
		dispatch(fetchProductByStore(store, minPrice, maxPrice, color, size, page, token));
	}	
	

	if(COLOR.loading){
		return <div>Loading...</div>
	}
	else{
		return (
			<div className="block border-b border-gray-300 pb-0">
				<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
					Color
				</h3>
				<div className="mt-2 mb-8 flex flex-col space-y-4">	
						<div key={0} className="form-check">								
							<label className="form-check-label inline-block cursor-pointer">
							<input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-900 checked:border-gray-900 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" onChange={selectNoneColor} name="flexRadioDefault" id='0' value={0}/> <span className="text-red-500 font-semibold">All Colors</span>
							</label>
						</div>				
					{
						COLOR.getColor?.slice(0,12)?.map((item: any) => (
							<div key={item.id} className="form-check">								
								<label className="form-check-label inline-block cursor-pointer">
								<input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-900 checked:border-gray-900 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" onChange={handleItemClick} name="flexRadioDefault" id={item.id} value={item.id}/> {item.name}
								</label>
							</div>
						))
					}
				</div>	
			</div>
		);
	}
};
