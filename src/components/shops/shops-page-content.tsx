import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ShopCard from "@components/common/shop-card";
import { useTranslation } from "next-i18next";

import { fetchStore, currentLangLong } from "../../Store/Action/Index"
import {getDistance, getPreciseDistance} from 'geolib';


const ShopsPageContent: React.FC = () => {	

	const dispatch = useDispatch()
	const [gridView, setGridView] = useState(Boolean(false));
	const [allStoreLat, setAllStoreLat]=useState([]);
    const [allStoreLong, setAllStoreLong]=useState([]);

	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;

	const STORE = useSelector(state => state.Store);
	const CURRENT_POSI = useSelector(state => state.CurrentPos)

	useEffect(() => {
		dispatch(fetchStore(token));
		getUserLocation();
		getAllStoreLocation();
	}, []);	
	const { t } = useTranslation("common");
	const [page, setPage] = useState(6);

	const loadMore = () => {
		setPage(page+6)		
	}

	function success(pos:any) {
		var crd = pos.coords; 
		dispatch(currentLangLong(crd.latitude,crd.longitude));
		console.log("Your current position is:");
		console.log(`Latitude : ${crd.latitude}`);
		console.log(`Longitude: ${crd.longitude}`);
		console.log(`More or less ${crd.accuracy} meters.`);
	  }
	
	  function errors(err:any) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	  }
	  
	const getUserLocation = () => {
		if (navigator.geolocation) {
		  navigator.permissions
			.query({ name: "geolocation" })
			.then(function (result) {
			  if (result.state === "granted") {
				// console.log("result state",result);
				//If granted then you can directly call your function here
				navigator.geolocation.getCurrentPosition(success);
			  } else if (result.state === "prompt") {
				navigator.geolocation.getCurrentPosition(success, errors);
			  } else if (result.state === "denied") {
				//If denied then you have to show instructions to enable location
			  }
			  result.onchange = function () {
				console.log(result.state);
			  };
			});
		} else {
		  alert("Sorry Not available!");
		}
	  }  

    const mylat = CURRENT_POSI.latitude;
    const mylong = CURRENT_POSI.longitude;   
   
    console.log('my lat long', mylat, mylong)

 
// -------------------------- fetch distance between coordinates - start ---------------------------------

    function getAllStoreLocation(){
      const location2 = STORE.getStore.map(res=>res);
      const allStoreLat1 = location2.map(coordi=>(coordi.latitude))
      const allStoreLong1 = location2.map(coordi=>(coordi.longitude)) 
      setAllStoreLat(allStoreLat1);
      setAllStoreLong(allStoreLong1);
   
    }

    // console.log('allStoreLat', allStoreLat)
   
 var allDistanceValue:any = [];

    for(let i in allStoreLat){
      let allLat = allStoreLat[i];
      let allLong = allStoreLong[i];     
        if(allLat === null || allLong === null){
          console.log('lat and long are null');   
          allDistanceValue.push({...STORE.getStore[i], distance:'undefined'})
        }else{
          var dis = getDistance(
            {latitude: mylat, longitude: mylong},
            {latitude: allLat, longitude: allLong},
          );
            // allDistanceValue.push( dis/1000 );        
          // console.log(
          //   `Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`
          // );
          allDistanceValue.push({...STORE.getStore[i], distance:dis / 1000})
        }       
    }
    // console.log(allDistanceValue, 'himanshu');
     
    let filteredStores = allDistanceValue.filter(res=>(res.distance <= 60));
    console.log(filteredStores, 'zubair')

// -------------------------- fetch distance between coordinates - end -----------------------------------  


	if (STORE.loading && STORE.isInitialFetch)
	return
	<div className="border-t border-gray-300 pt-10 lg:pt-12 xl:pt-14 pb-14 lg:pb-16 xl:pb-20 px-4 md:px-8">
		<div className="w-full xl:max-w-[1170px] mx-auto">
			<span>Loading Store..</span>
		</div>
	</div>

	return (
		<div className="border-t border-gray-300 pt-10 lg:pt-12 xl:pt-14 pb-14 lg:pb-16 xl:pb-20 px-4 md:px-8">
			<div className="w-full xl:max-w-[1170px] mx-auto">
				<div className="flex items-center justify-between mb-6 xl:mb-8">
					<h2 className="font-bold text-heading text-lg md:text-xl lg:text-2xl xl:text-3xl">
						{t("text-super-shop")}
					</h2>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
					{filteredStores?.slice(0, page).map((item) => (
						<ShopCard
							key={item.id}
							shop={item}
							variant={gridView === true ? "grid" : "list"}
						/>
					))}
				</div>
				<button 
					className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => loadMore()}
				>
					Load More
				</button>
			</div>
		</div>
	);
};

export default ShopsPageContent;







  