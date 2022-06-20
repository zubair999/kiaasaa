import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";
import { aboutUs } from "@settings/about-settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

function makeTitleToDOMId(title: string) {
	return title.toLowerCase().split(" ").join("_");
}

export default function AboutPage() {
	const { t } = useTranslation("privacy");

	
	return (
		<>
			<PageHeader pageHeader="text-page-about-us" />
			<div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
				<section className="relative py-20">
					<div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20">
						<svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
							<polygon className="text-white fill-current" points="2560 0 2560 100 0 100">
						</polygon></svg>
					</div>
					<div className="container mx-auto px-4">
						<div className="items-center flex flex-wrap">
							<div className="w-full md:w-4/12 ml-auto mb-auto mr-auto px-0">
								<img alt="..." className="max-w-full rounded-lg shadow-lg" src="https://kiaasa.com/wp-content/uploads/2021/07/03.jpg"/>
							</div>

							<div className="w-full md:w-5/12 ml-auto mr-auto px-4">
								<div className="md:pr-12">
									{/* <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
										<i className="fas fa-rocket text-xl"></i>
									</div> */}
									<h3 className="text-3xl font-semibold">A little about Kiaasa</h3>
									<p className="about_p mt-4 text-lg leading-relaxed text-blueGray-500">
										Kiaasa started as a concept store has today become a unique idea, a known name, as a homegrown fashion brand, we continue to maintain that fine balance between staying true to our Indian roots and culture, yet branching out with new-age, ethnic trends.
									</p>
									<p className="about_p mt-4 text-lg leading-relaxed text-blueGray-500">
										KIAASA word glorifies itself with the component of “KIA”- Women as pure Goddess & “ASHA” -as its hidden desire; a Brand with an exclusive discovered taste for the ethnic yet modern Indian woman. The brand draws its pride in integrating various cultural threads of Indian ethnicity with a blend of ultramodern fusion & confident styling.
									</p>
									{/* <p className="about_p mt-4 text-lg leading-relaxed text-blueGray-500">
									Commenced in 2018 by Mr. K.G Maheshwari of Krishna Beads Industries, KIAASA Retail LLP was acquired in 2021 by Rugs In Style. The duo, Om Prakash & Amit Chauhan, a successful new generation entrepreneur, now manages the operation of KIAASA.
									</p> */}
									{/* <ul className="list-none mt-6">
										<li className="py-2">
											<div className="flex items-center">
												<div>
													<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
														<i className="fas fa-fingerprint"></i>
													</span>
												</div>
												<div>
													<h4 className="text-blueGray-500">Carefully crafted dress</h4>
												</div>
											</div>
										</li>
										<li className="py-2">
											<div className="flex items-center">
												<div>
													<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
														<i className="fab fa-html5"></i>
													</span>
												</div>
												<div>
													<h4 className="text-blueGray-500">Beautiful color & combinations</h4>
												</div>
											</div>
										</li>
										<li className="py-2">
											<div className="flex items-center"><div>
												<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
													<i className="far fa-paper-plane"></i>	
												</span>
											</div>
												<div>
													<h4 className="text-blueGray-500">Authentic fabrics</h4>
												</div>
											</div>
										</li>
									</ul> */}
								</div>
							</div>
						</div>					
					</div>



					<div className="mt-40 container mx-auto px-4">
						<div className="items-center flex flex-wrap">
							

							<div className="w-full md:w-5/12 ml-auto mr-auto px-4">
								<div className="md:pr-12">
									
									{/* <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
										<i className="fas fa-rocket text-xl"></i>
									</div> */}

									<h3 className="text-3xl font-semibold">Our focus is on</h3>
									<ul className="list-none mt-6">
										<li className="py-2">
											<div className="flex items-center">
												<div>
													<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
														<i className="fas fa-fingerprint"></i>
													</span>
												</div>
												<div>
													<h4 className="text-blueGray-500">1. Meeting ethnic fashion needs of Indian customers.</h4>
												</div>
											</div>
										</li>
										<li className="py-2">
											<div className="flex items-center">
												<div>
													<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
														<i className="fab fa-html5"></i>
													</span>
												</div>
												<div>
													<h4 className="text-blueGray-500">2. Fulfilling demands across the nation with women’s wear ethnic fashion retail outlets..</h4>
												</div>
											</div>
										</li>
										<li className="py-2">
											<div className="flex items-center"><div>
												<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
													<i className="far fa-paper-plane"></i>	
												</span>
											</div>
												<div>
													<h4 className="text-blueGray-500">3. Synching KIAASA with modern day trends so that our Indian Women does not stay behind.</h4>
												</div>
											</div>
										</li>
										<li className="py-2">
											<div className="flex items-center"><div>
												<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
													<i className="far fa-paper-plane"></i>	
												</span>
											</div>
												<div>
													<h4 className="text-blueGray-500">4. Synching KIAASA with modern day trends so that our Indian Women does not stay behind.</h4>
												</div>
											</div>
										</li>
									</ul>						
									
								</div>
							</div>

							<div className="w-full md:w-4/12 ml-auto mb-auto mr-auto px-4">
								<img alt="..." className="max-w-full rounded-lg shadow-lg" src="https://kiaasa.com/wp-content/uploads/2021/07/01.jpg"/>
							</div>
						</div>					
					</div>


					<div className="container mx-auto px-4">
						<div className="items-center flex flex-wrap">				

							<div className="w-full md:w-12/12 ml-auto mr-auto px-4">
								<div className="md:pr-12">	

									<h3 className="text-3xl font-semibold mt-20">To maintain..</h3>

									<p className="about_p mt-4 text-lg leading-relaxed text-blueGray-500">
										To maintain our success story and to sustain in the fashion industry we strongly believe to give the Indian fashion a new blend and this comes out with an innovation in the traditional fashion as we believe these days ethnicity aims to spread their wings across the globe and we wish to share our ethnic spirit with the world. We believe that there’s beauty in diversity. So, we shelved the one-size-fits-all approach in favor of one that celebrates differences, of every kind. Whatever her style, size, or spending power, we want each woman who shops with us to feel welcome, inspired and excited as KIAASA owns large no of unique designs in ethnic wear – a rapid fashion wear brand comprising of INDIAN trendy apparel and accessories; and Curve – a Indian Wear brand for plus-sized women’s also.
									</p>
									<p className="about_p mt-4 text-lg leading-relaxed text-blueGray-500">
										KIAASA has uniquely positioned itself as the 360 degree solution to all urban style fashion – something that matches women’s fashion needs. Besides INDIAN fashion wear – and taking it to as style dressing, KIAASA brands have an inimitable style signature and are attuned to the women of today.
									</p>

									<p className="about_p mt-4 text-lg leading-relaxed text-blueGray-500">
										KIAASA, is very young fashion brand in the Indian women ethnic wear segment and with presence in 20 Indian states with 100 operational stores, we are growing strong. To deliver best quality & latest designed product for Indian women, KIAASA is leaving no stone unturned and making regular Endeavours to satisfy its end customers. In a very short span of time, KIAASA has created a huge client base with an increasing percentage of loyal customers. Thanks to the people for showing their trust in KIAASA! Our vision is to have 250 retail outlets spread all over India by 2023 and we are slowly and steadily moving in same direction to achieve our goal.
									</p>
									<p className="about_p mt-4 text-lg leading-relaxed text-blueGray-500">
										Kiaasa as a fashion brand tells the story of a new-age Indian woman who is free-spirited, independent and aware. Our constant Endeavour is to provide a fashionable, stylish, unbeatable collection of ethnic and fusion wear to carefully curate into the line with fashion trends in India. Kiaasa as a brand believes in making special memories even more precious so that every woman celebrates her dressing with full zing. With interiors that match the brand’s personality with our courteous staff who makes your shopping experience memorable, shopping at KIAASA will indeed give every lady a wonderful shopping experience. So do visit KIAASA for a memorable fashion shopping experience…….Wear KIAASA.
									</p>
									
								</div>
							</div>
						</div>					
					</div>


				</section>
			</div>
		</>
	);
}

AboutPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"privacy",
				"footer",
			])),
		},
	};
};
