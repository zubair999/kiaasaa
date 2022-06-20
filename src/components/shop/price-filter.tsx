import React from "react";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import {selectedMinMax} from "../../Store/Action/Index";

export const PriceFilter = () => {
	
	const { t } = useTranslation("common");
	const dispatch = useDispatch();
	let [minVal, setminVal] = useState(0);
    let [maxVal, setmaxVal] = useState(4000);

	let [minVal2, setminVal2] = useState(0);
    let [maxVal2, setmaxVal2] = useState(4000);

	const progress1 = `${minVal/5000 * 100}%`;
	const progress2 = `${100 - (maxVal/5000 * 100)}%`;	

	const changeRangeMax = (e:any) =>{
		const curValueMax = e.target.value;
		setmaxVal(parseInt(curValueMax));			
	}
	const changeRangeMin = (e:any) =>{
		const curValueMin = e.target.value;
		setminVal(parseInt(curValueMin));		
	}

	function minValueMobile(e:any){
		setminVal2(e.target.value);	
		minVal = parseInt(e.target.value);
		// console.log(minVal);
	}
	function maxValueMobile(e:any){
		setmaxVal2(e.target.value);	
		maxVal = parseInt(e.target.value);	
		// console.log(maxVal);
	}

	let isMobile;
	if (navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i) 
	|| navigator.userAgent.match(/iPad/i) 
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i)) {
		isMobile = true;
	} else {
		isMobile = false;
	}
	dispatch(selectedMinMax(minVal, maxVal));
	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-price")}
			</h3>		

			{
				isMobile ? 	<div className="flex justify-center">
				<div className="mb-3 xl:w-96">
					<label style={{'fontSize':'13px'}} className="form-label inline-block mb-2 text-gray-700"
					>Minimum Price = {minVal2}</label
					>				
					<input
					type="number"
					onChange={minValueMobile}
					value={minVal2}
					className="
						form-control
						block
						w-full
						px-3
						py-1.5
						text-base
						font-normal
						text-gray-700
						bg-white bg-clip-padding
						border border-solid border-gray-300
						rounded
						transition
						ease-in-out
						m-0
						focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
					"
					id="exampleNumber0"			
					/>
					<p className="mt-1" style={{'fontSize':'10px', 'color':'red'}}>*Minimum Limit is ₹0</p>
				</div>
				<div className="mb-3 ml-5 xl:w-96">
					<label style={{'fontSize':'13px'}} className="form-label inline-block mb-2 text-gray-700"
					>Maximum Price = {maxVal2}</label
					>
					<input
					type="number"
					onChange={maxValueMobile}
					value={maxVal2}					
					className="
						form-control
						block
						w-full
						px-3
						py-1.5
						text-base
						font-normal
						text-gray-700
						bg-white bg-clip-padding
						border border-solid border-gray-300
						rounded
						transition
						ease-in-out
						m-0
						focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
					"
					id="exampleNumber0"			
					/>
					<p className="mt-1" style={{'fontSize':'10px', 'color':'red'}}>*Maximum Limit is ₹5000</p>
				</div>
			</div> : <div className="mt-2 flex flex-col space-y-4">
				<div>
					<div style={{display:'flex', justifyContent:'space-between'}}>
						<span style={{fontSize:'13px'}}>
							₹{minVal}
						</span>
						<span style={{fontSize:'13px'}}>
							₹{maxVal}
						</span>
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
							id="range-input"
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
							id="range-input"
							min={0}
							max={5000}	
							value={maxVal}
						    onChange={changeRangeMax}						
						/>
					</div>				
				</div>
			</div>
			}
		</div>
	);
};
