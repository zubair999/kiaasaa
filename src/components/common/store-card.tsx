import Link from "next/link";
import Image from "next/image";
import { Store } from "@framework/types";
// import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
// import '../../styles/custom-plugins.css';


const StoreCard: React.FC<{ store: Store }> = ({ store }) => {
	const { id, store_name, back_picture, front_picture } = store;
	const { t } = useTranslation("common");

console.log('my store', store);

let storeName;

	if(store_name.includes('TIKI')){
		storeName = store_name.slice(4);
	}else{
		storeName = store_name;
		// console.log('no available');
	}
	

	return (
	<div className="block">
		<Link
			href={{
				pathname: `shops/${id}`,
				// query: { brand: id },
			}}
		>
			<a className="group flex justify-center text-center relative overflow-hidden rounded-md">
				{/* <Image
					src={"https://kiaasa.com/wp-content/uploads/2021/03/IMG_0949_-2-450x585.jpg"}
					alt={name || t("text-brand-thumbnail")}
					width={428}
					height={428}
					className="rounded-md object-cover transform transition-transform ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125"
				/> */}
				<img
					src={back_picture}
					// alt={name || t("text-brand-thumbnail")}
								
					className="flex-shrink-0 h-56 w-46 rounded-md object-cover transform transition-transform ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125"

				/>
				<div className="absolute top left bg-black w-full h-full opacity-70 transition-opacity duration-500 group-hover:opacity-80" />
				<div className="absolute top left h-full w-full flex items-center justify-center p-8">
					<img
						src={front_picture}
						// alt={name || t("text-brand-thumbnail")}
									
						className="flex-shrink-0 rounded-md object-cover transform transition-transform ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125"

					/>
				</div>				
			</a>
		</Link>
		<p>{storeName}</p>
	</div>	
	);
};

export default StoreCard;