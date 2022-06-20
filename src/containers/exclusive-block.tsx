import Image from "next/image";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";

const data = {
	exclusiveName: "text-new-year",
	year: 2021,
	exclusiveData: [
		{
			id: 1,
			slug: "/search",
			buttonText: "button-women-exclusive",
			image: "/assets/images/exclusive/men.jpg",
			backgroundColor: "bg-gray-150",
		},
		{
			id: 2,
			slug: "/search",
			buttonText: "button-men-exclusive",
			image: "/assets/images/exclusive/women.jpg",
			backgroundColor: "bg-linenSecondary",
		},
	],
};

interface Props {
	className?: string;
	variant?: "default" | "modern";
}

const ExclusiveBlock: React.FC<Props> = ({
	className = "mb-12 md:mb-14 xl:mb-16",
	variant = "default",
}) => {
	const { t } = useTranslation("common");
	return (
		<div className={`rounded-md overflow-hidden lg:block ${className}`}>
			<div className="flex justify-between">
				{data.exclusiveData.slice(0, 2).map((item: any) => (
					<div
						className={`group w-2/4 flex justify-between items-end relative transition duration-200 ease-in ${
							item.id === 2 && variant === "modern"
								? "flex-row"
								: "flex-row-reverse"
						} ${item.backgroundColor}`}
						key={`exclusive--key${item.id}`}
					>
						<div
							className={`exclusiveImage relative z-10 flex transform transition duration-200 ease-in group-hover:scale-105 ${
								variant === "modern" && item.id === 2
									? "me-auto 2xl:ps-24 3xl:ps-40"
									: "ms-auto 2xl:pe-24 3xl:pe-40"
							}`}
						>
							<Image
								src={item.image}
								alt={item.buttonText}
								width={600}
								height={600}
							/>
						</div>
					
						{/* {data.exclusiveName && (
							<div
								className={`z-0 absolute top-10 xl:top-12 2xl:top-16 3xl:top-24 uppercase text-black opacity-10 text-xl xl:text-2xl 3xl:text-3xl tracking-widest leading-5 ${
									item.id === 2 ? "start-5 xl:start-7" : "end-5 xl:end-7"
								}`}
							>
								{item.id !== 2
									? t(`${data.exclusiveName}`)
									: t("text-exclusive")}
							</div>
						)}					 */}
					</div>
				))}
			</div>
		</div>
	);
};

export default ExclusiveBlock;
