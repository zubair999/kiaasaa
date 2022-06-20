import { FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import Link from "@components/ui/link";
import Image from "next/image";
import { ROUTES } from "@utils/routes";
import cn from "classnames";

type VendorCardProps = {
	shop?: any;
	variant?: "list" | "grid";
};

const VendorCard: React.FC<VendorCardProps> = ({ shop, variant = "list" }) => {
	const { t } = useTranslation();
	const placeholderImage = `/assets/placeholder/products/product-grid.svg`;
	const { store_name, id, address_line1, logo, is_active, city_name } = shop;

	// console.log('no available',store_name);

	let storeName;

	if(store_name.includes('TIKI')){
		storeName = store_name.slice(4);
	}else{
		storeName = store_name;
		// console.log('no available');
	}
	

	return (
		<Link
			href={`/shops/${id}`}
			className={cn(
				"flex items-center rounded-md shadow-vendorCard cursor-pointer relative bg-white transition-all hover:shadow-vendorCardHover",
				{
					"pt-10 lg:pt-12 pb-9 lg:pb-11 flex-col text-center":
						variant === "grid",
					// "py-5 lg:py-6": variant === "list",
				}
			)}
		>
			<div className="container">
				<div className="row"> 
					<div className="card1">
					<div className="card-header1"><b>{storeName}</b></div>
					<div className="card-body1">
						<h5 className="card-title1">{address_line1}</h5>
						<p className="card-text1">{city_name}</p>
					</div>
				</div>
				</div>
			</div>
		</Link>
	);
};

export default VendorCard;
