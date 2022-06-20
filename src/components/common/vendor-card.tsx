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

	return (
		<Link
			href={`${ROUTES.SHOPS}/${id}`}
			// className={cn(
			// 	"flex items-center px-5 lg:px-6 rounded-md shadow-vendorCard cursor-pointer relative bg-white transition-all hover:shadow-vendorCardHover",
			// 	{
			// 		"pt-10 lg:pt-12 pb-9 lg:pb-11 flex-col text-center":
			// 			variant === "grid",
			// 		"py-5 lg:py-6": variant === "list",
			// 	}
			// )}
		>
			{is_active && (
				<span className="text-[10px] xl:text-xs font-semibold text-white uppercase px-2 py-1 xl:py-[5px] rounded bg-[#2B78C6] absolute top-2 end-2">
					{t('text-new')}
				</span>
			)}

			<div
				className={cn("flex flex-col", { "mb-1 pt-4 md:pt-5 lg:pt-6": variant === "grid", "ms-4": variant === "list", })}
			>
				<h4
					className={cn(
						"text-heading font-semibold text-sm sm:leading-6 leading-7 md:text-base xl:text-lg",
						{
							"2xl:text-xl mb-1.5": variant === "grid",
							"mb-0.5": variant === "list",
						}
					)}
				>
					{store_name}
				</h4>
				<p
					className={cn("text-[13px] leading-5 flex items-start", {
						"text-sm": variant === "grid",
					})}
				>
					<span className="inline-block me-1 text-[#6B7280] relative top-1">
						<FaMapMarkerAlt />
					</span>
					{address_line1} <br />
					{city_name}
				</p>
			</div>
		</Link>
	);
};

export default VendorCard;
