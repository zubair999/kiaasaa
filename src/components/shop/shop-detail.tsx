import { useState } from "react";
import Container from "@components/ui/container";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import Text from "@components/ui/text";
import Link from 'next/link'
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	FacebookIcon,
	LinkedinIcon,
	TwitterIcon,
} from "react-share";

const ShopDiscount = (props:any) => {
	const [status, setStatus] = useState(false);
	const hide = () => {
		setStatus(true);
	};
	// console.log(props)
	const { t } = useTranslation("common");
	
	return (
		<div className="shopDetails">
		
			<h1><b>{props.name}</b></h1>
			<h3 className="mb-4">{props.address}</h3>
			<div>
			<Text>{props.phone} <button className="font-semibold text-sm text-heading transition-all hover:opacity-80 flex-shrink-0">
				<Link href={`tel:+91${props.phone}`}>
					<a >Call Now</a>
				</Link>
			</button></Text>
			
			</div>
			<div className="flex items-center flex-wrap justify-center space-s-2 pt-4 mt-0.5">
					<FacebookShareButton url={''}>
						<FacebookIcon
							size={25}
							round
							className="transition-all hover:opacity-90"
						/>
					</FacebookShareButton>
					<TwitterShareButton url={''}>
						<TwitterIcon
							size={25}
							round
							className="transition-all hover:opacity-90"
						/>
					</TwitterShareButton>
					<LinkedinShareButton url={''}>
						<LinkedinIcon
							size={25}
							round
							className="transition-all hover:opacity-90"
						/>
					</LinkedinShareButton>					
				</div>
		</div>
			
	);
};

export default ShopDiscount;
