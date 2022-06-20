import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";
import { privacyPolicy } from "@settings/privacy-settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

function makeTitleToDOMId(title: string) {
	return title.toLowerCase().split(" ").join("_");
}

export default function PrivacyPage() {
	const { t } = useTranslation("privacy");
	return (
		<>
			<PageHeader pageHeader="text-page-privacy-policy" />
			<Container>
				<div className="mt-10 p-20">Welcome to the website www.kiaasa.com. KIAASA can be contacted by email at weborder@kiaasaretail.com. The protection and security of your personal information is one of our top priorities. This online Privacy Policy discloses our information practices for this Website and subscriber / membership based services (“Services’ ‘) including the type of information being collected, method of such information collection, use of such information and sharing of such information with third parties. By using this Website you agree to accept the terms of this Privacy Policy as well as the Website’s Terms of Use. By accessing or using this Website you expressly consent to our use and disclosure of your personal information in any manner described in this Privacy Policy. This Privacy Policy extends to both, users who visit the Website but do not transact business on the Website (“Users”) as well as users who are registered and are authorized by the Website to transact business on the Website (“Members”). “Personal Information” refers to any information that identifies or can be used to identify, contact or locate the person, to whom such information pertains including, but not limited to, name, address, phone number, fax number, email address, financial profiles, identification number and credit card information.</div>
			</Container>
			<div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
				<Container>
					<div className="flex flex-col md:flex-row">
						<nav className="md:w-72 xl:w-3/12 mb-8 md:mb-0">
							<ol className="sticky md:top-16 lg:top-28 z-10">
								{privacyPolicy?.map((item, index) => (
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
							{privacyPolicy?.map((item) => (
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

PrivacyPage.Layout = Layout;

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
