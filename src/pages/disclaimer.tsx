import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";
import { disclaimer } from "@settings/disclaimer-settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

function makeTitleToDOMId(title: string) {
	return title.toLowerCase().split(" ").join("_");
}

export default function DisclaimerPage() {
	const { t } = useTranslation("disclaimer");

	return (
		<>
			<PageHeader pageHeader="text-page-disclaimer" />
			<Container>
				<div className="mt-10 p-20">KIAASA RETAIL LLP owns the copyright to all the contents of this website, including images. All trademarks and other intellectual property are owned or licensed by us (unless otherwise specified).

You may not copy, reproduce, distribute, republish, download, display, post or transmit any part of the website without written consent from us (except as stated below).

You may print or download any page(s) for your own personal and non-commercial use only. If you have any doubts about what you can do, please go to our contact us page to apply for permission to reproduce the content.

While our website is as accurate as possible, we cannot accept responsibility for any inaccuracies or errors beyond our reasonable control.</div>
			</Container>
			<div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
				<Container>
					<div className="flex flex-col md:flex-row">
						<nav className="md:w-72 xl:w-3/12 mb-8 md:mb-0">
							<ol className="sticky md:top-16 lg:top-28 z-10">
								{disclaimer?.map((item, index) => (
									<li key={item.id}>
										<Link
											spy={true}
											offset={-120}
											smooth={true}
											duration={500}
											to={makeTitleToDOMId(item.title)}
											activeClass="text-heading font-semibold"
											className="block cursor-pointer py-3 lg:py-3.5  text-sm lg:text-base  text-gray-700 uppercase"
										>
											{(index <= 9 ? "0" : "") +
												index +
												" " +
												t(`${item.title}`)}
										</Link>
									</li>
								))}
							</ol>
						</nav>
						{/* End of section scroll spy menu */}

						<div className="md:w-9/12 md:ps-8 pt-0 lg:pt-2">
							{disclaimer?.map((item) => (
								// @ts-ignore
								<Element
									key={item.title}
									id={makeTitleToDOMId(item.title)}
									className="mb-10"
								>
									<h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">
										{t(`${item.title}`)}
									</h2>
									<div
										className="text-heading text-sm leading-7 lg:text-base lg:leading-loose"
										dangerouslySetInnerHTML={{
											__html: t(`${item.description}`),
										}}
									/>
								</Element>
							))}
						</div>
						{/* End of content */}
					</div>
				</Container>
				<p className="mt-20">If you have any questions about this Privacy Policy, please feel free to contact us through our Website or write to us at weborder@kiaasaretail.com .com</p>
			</div>
		</>
	);
}

DisclaimerPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"disclaimer",
				"footer",
			])),
		},
	};
};
