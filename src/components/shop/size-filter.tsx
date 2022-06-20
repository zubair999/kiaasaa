import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import FormControl from '@mui/material/FormControl';

import {fetchSize} from "../../Store/Action/Index"
import {selectedSizeId} from "../../Store/Action/Index"


export const SizeFilter = () => {
	const dispatch = useDispatch();
	
	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;
	
	const handleChange = (event) => {
		dispatch(selectedSizeId(event.target.value));
	  };

	useEffect(() => {
		dispatch(fetchSize(token));
	}, []);	

	const SIZE = useSelector(state=>state.Size.getSize);
	const sizeData = SIZE;
	return (
	    <>
			<h3 className="text-heading text-sm md:text-base font-semibold mb-0 mt-5">
			Size
			</h3>
			<FormControl sx={{ m: 1, minWidth: 260 }}>	
				<select onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
						<option value="value" selected> </option>
						{
						sizeData.map(res=>(					
						<option key={res.id} value={res.id}>{res.size}</option>
						))	
						}					
				</select>
			</FormControl>
	    </>
	);	
};
