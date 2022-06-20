import { react, useEffect, useState } from 'react';
import { AnyIfEmpty, useDispatch, useSelector } from 'react-redux';
import StoreCard from '@components/common/store-card';
import SectionHeader from '@components/common/section-header';
import BrandCardLoader from '@components/ui/loaders/brand-card-loader';
import { useBrandsQuery } from '@framework/brand/get-all-brands';
import Alert from '@components/ui/alert';
import { fetchStore, fetchState, currentLangLong, fetchCoordinates} from "../Store/Action/Index"
import {getDistance, getPreciseDistance} from 'geolib';
 


interface StoreProps {
  sectionHeading: string;
  className?: string;
  limit?: number;
  variant?: '6column' | '4column';
  lati?:any;
  Longi?:any;
}

const StoreGridBlock: React.FC<StoreProps> = ({
    className = 'mb-12 md:mb-14 xl:mb-16',
    sectionHeading,
    variant = '4column',
    limit = 10  
  }) => {

    // const [CoordinateData, setCoordinateData]=useState([]);
    const [allStoreLat, setAllStoreLat]=useState([]);
    const [allStoreLong, setAllStoreLong]=useState([]);
   
    
    
    const dispatch = useDispatch();
    const STORE = useSelector(state => state.Store);
    console.log('STORE',STORE);
    const CURRENT_POSI = useSelector(state => state.CurrentPos)


    useEffect(() => {	
      getUserLocation();
      getAllStoreLocation();
    }, []);

    const mylat = CURRENT_POSI.latitude;
    const mylong = CURRENT_POSI.longitude;   
   
    console.log('my lat long', mylat, mylong)

 
// -------------------------- fetch distance between coordinates - start ---------------------------------

// const key = "AIzaSyBTZcMdRQoyiaZI9s4wWB7Xjkzt_RdSqqA";


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

  const columnClasses =
    variant === '4column'
      ? 'grid-cols-2 sm:grid-cols-4'
      : 'grid-cols-2 sm:grid-cols-4 2xl:grid-cols-6';


  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />

      {
        STORE.status == 'fail' ? 
          (
            <Alert message={STORE.error?.STORE.message} />
          ) 
          : 
          (
            <div
              className={`grid ${columnClasses} gap-2.5 md:gap-3 lg:gap-5 xl:gap-7`}
            >
              {
                STORE.loading ? Array.from({ length: limit }).map((_, idx) => (
                    <BrandCardLoader key={idx} uniqueKey={`top-brand-${idx}`} />
                ))
                : 
                filteredStores?.slice(0, limit).map((store) => (
                  <StoreCard key={`brand--key${store.id}`} store={store} />
                ))
              }
            </div>
          )
      }



    </div>
  );
};

export default StoreGridBlock;
